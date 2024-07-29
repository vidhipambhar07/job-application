import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-application',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './view-application.component.html',
  styleUrls: ['./view-application.component.css']
})
export class ViewApplicationComponent implements OnInit {
  private router = inject(Router);
  formData: any[] = [];
  modalData: boolean = false;
  modalType: string | undefined;
  modalIndex: number | undefined;
  formDataFiltered: any[] = [];
  searchText: string = '';
  ngOnInit(): void {
    this.checkAuthorization();
  }

  private checkAuthorization(): void {
    const authToken = localStorage.getItem('authToken');
    const role = localStorage.getItem('role');
    if (!authToken || role !== 'admin') {
      this.router.navigateByUrl('/admin-login');
    } else {
      this.loadFormData();
    }
  }

  private loadFormData(): void {
    const savedData = localStorage.getItem('resumeFormsData');
    if (savedData) {
      this.formData = JSON.parse(savedData);
      this.applySearch();
    }
  }

  logout() {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('authToken')
      localStorage.removeItem('role')
      this.router.navigateByUrl("/")
    }

  }

  openModal(type: string, index?: number): void {
    this.modalType = type;
    this.modalIndex = index;
    this.modalData = true;
  }

  closeModal(): void {
    this.modalData = false;
  }

  getLanguages(index: number): { name: string, read: boolean, write: boolean, speak: boolean }[] {
    const user = this.formData[index];
    if (user && user.languages) {
      return Object.keys(user.languages).map(lang => ({
        name: lang,
        ...user.languages[lang]
      }));
    }
    return [];
  }
  applySearch(): void {
    if (this.searchText.trim() === '') {
      this.formDataFiltered = [...this.formData];
    } else {
      const searchTerm = this.searchText.toLowerCase().trim();
      this.formDataFiltered = this.formData.filter(user =>
        user.basicDetails.name.toLowerCase().includes(searchTerm) ||
        user.basicDetails.email.toLowerCase().includes(searchTerm)
      );
    }
  }

  editApplication(index: number): void {
    this.router.navigate(['/edit-application', index]);
  }
  deleteApplication(index: number): void {
    if (confirm('Are you sure you want to delete this application?')) {
      this.formData.splice(index, 1);
      this.updateAndSaveFormData();
      localStorage.setItem('resumeFormsData', JSON.stringify(this.formData));
    }
  }
  private updateAndSaveFormData(): void {
    this.applySearch();
    localStorage.setItem('resumeFormsData', JSON.stringify(this.formData));
  }
}
