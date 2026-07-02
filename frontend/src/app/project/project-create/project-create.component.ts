import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.scss'
})
export class ProjectCreateComponent {

  formGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      key: ['', [Validators.required, Validators.maxLength(5)]],
      status: [true, Validators.required]
    });
  }

  save() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      console.log('Invalid form! Fill all fields.');
      return;
    }

    const project = this.formGroup.value;

    this.projectService.save(project).subscribe({
      next: (savedProject) => {
        console.log('Project saved successfully:', savedProject);
        this.formGroup.reset({ status: true });
        alert('Project created successfully!');
        this.router.navigate(['/projects']);
      },
      error: (e) => {
        console.error('Error saving project:', e);
      }
    });
  }
}