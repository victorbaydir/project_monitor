import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../interfaces/usuario'; // Mantenha o caminho da sua interface
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-user-index',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './usuario-index.component.html',
  styleUrl: './usuario-index.component.scss'
})
export class UsuarioIndexComponent {

  searchTerm = signal<string>('');

  mockUsers = signal<Usuario[]>([
    { id: 1, name: 'João Silva', email: 'joao@email.com', birth: '1995-05-10', password: '' },
    { id: 2, name: 'Maria Souza', email: 'maria@email.com', birth: '1998-08-22', password: '' }
  ]);

  filteredUsers = computed(() => {
    const search = this.searchTerm().toLowerCase().trim();

    if (!search) {
      return this.mockUsers();
    }
    
    return this.mockUsers().filter(user =>
      user.name.toLowerCase().includes(search)
    );
  });

  constructor(
    private service: UsuarioService,
    private router: Router
  ) { }

  search() {
    console.log('Filtering by:', this.searchTerm());
  }

  deleteUser(id: number | string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.mockUsers.update(users => users.filter(user => user.id !== id));
      console.log(`User with ID ${id} deleted.`);

      // this.service.delete(id).subscribe(() => { e });
    }
  }

  navigateToCreate() {
    this.router.navigate(['/users/create']);
  }
}