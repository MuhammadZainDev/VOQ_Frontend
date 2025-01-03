import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{

  users: any[] = [];
  errorMessage: string = '';

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.http.get<any>('http://localhost:5000/api/auth/admin/dashboard', { withCredentials: true })
      .subscribe(
        res => {
          this.users = res.users;
        },
        err => {
          this.errorMessage = err.error.msg || 'Failed to fetch users';
        }
      );
  }

  logout(): void {
    this.authService.logout().subscribe(
      res => {
        window.location.href = '/login';
      },
      err => {
        console.error('Logout failed');
      }
    );
  }

}
