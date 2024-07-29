import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  router = inject(Router)

  loginObject: any = {
    username: '',
    password: ''
  };

  private username = 'agileinfoway';
  private password = 'agile123!';
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcl90eXBlIjotMSwiZW1haWwiOiJhZG1pbkBkYmQuY29tIiwiZGV2aWNlX2lkIjoic3RyaW5nIiwicGFzc3dvcmQiOiJuQWYwbjJpd2lpUHpSUmJQTEZlUjRnPT0iLCJwZXJtaXNzaW9ucyI6eyJhbGxvd19kZWxldGUiOjEsImFsbG93X2RlYWN0aXZlIjoxfSwiaWF0IjoxNzIxOTAwNzcxLCJleHAiOjE3MjI1MDU1NzF9.bwCmGjxffGhQv46llKdB8zVaHZOcD7VwtaWLq1AV-VQ';
  private role = 'admin'
  login() {
    if (this.loginObject.username === this.username && this.loginObject.password === this.password) {
      this.storeToken(this.token, this.role);
      this.router.navigateByUrl('view-form');
    } else {
      alert('Invalid credentials');
    }
  }
  private storeToken(token: string, role: string) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('role', role);
  }

}
