import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
  ViewRef,
} from '@angular/core';
import { LoaderService } from './loader/loader.service';
import { ApiService } from './api.service';
import { LoaderComponent } from './loader/loader.component';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { User } from './users/user';
import { Subject, takeUntil } from 'rxjs';

const onDestroy = () => {
  const destroy$ = new Subject<void>();
  const viewRef = inject(ChangeDetectorRef) as ViewRef;

  viewRef.onDestroy(() => {
    destroy$.next();
    destroy$.complete();
  });

  return destroy$;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [CommonModule, LoaderComponent, UsersComponent],
  providers: [LoaderService, ApiService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  loaderService = inject(LoaderService);
  apiService = inject(ApiService);
  users = signal<User[]>([]);
  destroy$ = onDestroy();

  constructor() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.loaderService.loadingOn();
    this.apiService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.users.set(data.users);
          console.log('Users: ' + this.users());
          setTimeout(() => {
            this.loaderService.loadingOff();
          }, 5000);
        },
        error: (err) => {
          console.error('Error: ' + err);
          this.loaderService.loadingOff();
        },
      });
  }
}
