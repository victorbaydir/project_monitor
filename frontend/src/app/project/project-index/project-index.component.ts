import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Project } from '../../interfaces/project';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-index',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './project-index.component.html',
  styleUrl: './project-index.component.scss'
})
export class ProjectIndexComponent {

  searchTerm = signal<string>('');

  mockProjects = signal<Project[]>([
    { id: 1, name: 'Apollo Project', description: 'Internal ERP', key: 'APL', status: true, created_at: new Date(), updated_at: new Date() },
    { id: 2, name: 'Zeus API', description: 'Gateway Service', key: 'ZUS', status: false, created_at: new Date(), updated_at: new Date() }
  ]);

  filteredProjects = computed(() => {
    const search = this.searchTerm().toLowerCase().trim();
    if (!search) {
      return this.mockProjects();
    }
    return this.mockProjects().filter(project => 
      project.name.toLowerCase().includes(search)
    );
  });

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) {}

  search() {
    console.log('Filtering by:', this.searchTerm());
  }

  deleteProject(id: number | string) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.mockProjects.update(projects => projects.filter(p => p.id !== id));
      console.log(`Project with ID ${id} deleted.`);
    }
  }

  navigateToCreate() {
    this.router.navigate(['/projects/create']);
  }
}