import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  message: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.message = 'Welcome to the User Dashboard!';
  }

  logout() {
    this.authService.logout().subscribe(
      res => {
        this.router.navigate(['/login']);
      },
      err => {
        console.error('Logout failed');
      }
    );
  }
}
