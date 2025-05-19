import { Component, effect, inject, Signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  imports: [MatProgressSpinnerModule],
})
export class LoaderComponent {
  loaderService = inject(LoaderService);
  loading = this.loaderService.loading;

  constructor() {
    effect(() => {
      console.log('loading => ', this.loading());
    });
  }
}
