import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {
  router = inject(Router);
  private route = inject(ActivatedRoute);
  resumeForm: FormGroup;
  languages = ['English', 'Hindi', 'Gujarati'];
  languageDetails: any = {};
  technicalExperienceOptions = ['Beginner', 'Mediator', 'Expert'];
  locations = ['New York', 'Chicago', 'India'];

  constructor(private fb: FormBuilder) {
    this.resumeForm = this.fb.group({
      basicDetails: this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        address: [''],
        gender: [''],
        contact: ['', [Validators.required, Validators.pattern('^\\d{10}$')]]
      }),
      education: this.fb.array([]),
      workExperience: this.fb.array([]),
      languages: this.fb.group({}),
      technicalExperience: this.fb.array([]),
      preferences: this.fb.group({
        preferredLocation: [''],
        expectedCTC: [''],
        currentCTC: [''],
        noticePeriod: ['']
      })
    });

    this.initializeLanguageDetails();
  }

  ngOnInit(): void {
    this.loadFormData();
    this.addEducation();
    this.addWorkExperience();
    this.addTechnicalExperience();
    this.route.paramMap.subscribe(params => {
      const index = params.get('index');
      if (index) {
        this.editIndex = +index;
        this.isEditing = true;
        this.loadFormData();
      }
    });
  }

  get education(): FormArray {
    return this.resumeForm.get('education') as FormArray;
  }

  get workExperience(): FormArray {
    return this.resumeForm.get('workExperience') as FormArray;
  }

  get languagesControl(): FormGroup {
    return this.resumeForm.get('languages') as FormGroup;
  }

  get technicalExperience(): FormArray {
    return this.resumeForm.get('technicalExperience') as FormArray;
  }

  get preferences(): FormGroup {
    return this.resumeForm.get('preferences') as FormGroup;
  }

  initializeLanguageDetails() {
    this.languages.forEach(language => {
      this.languageDetails[language] = this.fb.group({
        read: [false],
        write: [false],
        speak: [false]
      });
      (this.resumeForm.get('languages') as FormGroup).addControl(language, this.languageDetails[language]);
    });
  }

  addEducation() {
    const educationGroup = this.fb.group({
      board: [''],
      year: [''],
      cgpa: ['']
    });
    this.education.push(educationGroup);
  }

  removeEducation(index: number) {
    this.education.removeAt(index);
  }

  addWorkExperience() {
    const workExpGroup = this.fb.group({
      company: [''],
      designation: [''],
      from: [''],
      to: ['']
    });
    this.workExperience.push(workExpGroup);
  }

  removeWorkExperience(index: number) {
    this.workExperience.removeAt(index);
  }

  onLanguageChange(language: string, field: string) {
    const control = this.languagesControl.get(language)?.get(field);
    if (control) {
      control.setValue(!control.value);
    }
  }

  addTechnicalExperience() {
    const techGroup = this.fb.group({
      technology: [''],
      proficiency: ['']
    });
    this.technicalExperience.push(techGroup);
  }

  removeTechnicalExperience(index: number) {
    this.technicalExperience.removeAt(index);
  }

  onTechnologyInput(index: number) {
    const techControl = this.technicalExperience.at(index).get('technology');
    if (techControl) {
      techControl.setValue(techControl.value.trim());
    }
  }

  onSubmit() {
    if (this.resumeForm.valid) {
      const formData = this.resumeForm.value;
      const existingData = localStorage.getItem('resumeFormsData');
      let formsArray = existingData ? JSON.parse(existingData) : [];

      if (this.isEditing) {
        formsArray[this.editIndex] = formData;
      } else {
        formsArray.push(formData);
      }

      localStorage.setItem('resumeFormsData', JSON.stringify(formsArray));
      console.log('Form data saved to local storage:', formData);
      alert("Forms submitted successfully");
      this.router.navigateByUrl("/");
    } else {
      alert("Forms is invalid");
    }
  }

  private loadFormData(): void {
    const savedData = localStorage.getItem('resumeFormsData');
    if (savedData) {
      const formsArray = JSON.parse(savedData);
      if (this.editIndex !== null && this.editIndex >= 0 && this.editIndex < formsArray.length) {
        const formData = formsArray[this.editIndex];
        this.resumeForm.patchValue(formData);

        this.updateFormArray(this.education, formData.education);
        this.updateFormArray(this.workExperience, formData.workExperience);
        this.updateFormArray(this.technicalExperience, formData.technicalExperience);


        Object.keys(formData.languages).forEach(language => {
          const languageGroup = this.languagesControl.get(language) as FormGroup;
          if (languageGroup) {
            languageGroup.patchValue(formData.languages[language]);
          }
        });
      }
    }
  }

  private updateFormArray(formArray: FormArray, dataArray: any[]) {
    while (formArray.length) {
      formArray.removeAt(0);
    }

    dataArray.forEach(data => {
      formArray.push(this.fb.group(data));
    });
  }
  isEditing = false;
  editIndex: number = -1;
}
