import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.scss'
})
export class ProjectEditComponent implements OnInit {

  formGroup!: FormGroup;
  projectId!: number | string;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      key: ['', [Validators.required, Validators.maxLength(5)]],
      status: [true, Validators.required]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.projectId = idParam;
      this.loadProject();
    }
  }

  loadProject() {
    this.projectService.getById(this.projectId).subscribe({
      next: (project) => {
        this.formGroup.patchValue(project);
      },
      error: (e) => {
        console.error('Error loading project:', e);
      }
    });
  }

  save() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const updatedData = this.formGroup.value;

    this.projectService.update(this.projectId, updatedData).subscribe({
      next: (savedProject) => {
        console.log('Project updated successfully:', savedProject);
        alert('Project updated successfully!');
        this.router.navigate(['/projects']);
      },
      error: (e) => {
        console.error('Error updating project:', e);
      }
    });
  }
}