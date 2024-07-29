import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  router = inject(Router)
  onLogin() {
    this.router.navigateByUrl('/admin-login');
  }
  onSubmit() {
    this.router.navigateByUrl('/application-form')
  }
}
