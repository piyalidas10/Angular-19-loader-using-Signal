import { Component, effect, input } from '@angular/core';
import { User } from './user';
@Component({
  selector: 'app-users',
  imports: [],
  standalone: true,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  users = input.required<User[]>();

  constructor() {
    effect(() => {
      console.log(this.users());
    });
  }
}
