import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario-edit',
  standalone: true,
  imports: [ReactiveFormsModule], // Necessário para o [formGroup] rodar no HTML
  templateUrl: './usuario-edit.component.html',
  styleUrl: './usuario-edit.component.scss'
})
export class UsuarioEditComponent implements OnInit {

  formGroup!: FormGroup;
  usuarioId!: number | string;

  constructor(
    private fb: FormBuilder,
    private service: UsuarioService,
    private route: ActivatedRoute, 
    private router: Router         
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      birth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam) {
      this.usuarioId = idParam;
      this.carregarUsuario();
    }
  }

  carregarUsuario() {
    this.service.getById(this.usuarioId).subscribe({
      next: (usuario) => {
        this.formGroup.patchValue(usuario);
      },
      error: (e) => {
        console.error('Erro ao carregar usuário:', e);
        alert('Não foi possível carregar os dados do usuário.');
      }
    });
  }

  update() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      console.log('Formulário inválido! Verifique os campos.');
      return;
    }

    const dadosAtualizados = this.formGroup.value;

    this.service.update(this.usuarioId, dadosAtualizados).subscribe({
      next: (usuarioSalvo) => {
        console.log('Usuário atualizado com sucesso:', usuarioSalvo);
        alert('Usuário atualizado com sucesso!');
        
        // Redireciona de volta para a listagem (ajuste a rota se necessário)
        this.router.navigate(['/usuarios']);
      },
      error: (e) => {
        console.error('Erro ao atualizar usuário:', e);
        alert('Erro ao atualizar o usuário. Tente novamente.');
      }
    });
  }
}