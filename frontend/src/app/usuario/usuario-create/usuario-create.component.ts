import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // 1. Importado para navegação
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario-create',
  imports: [ReactiveFormsModule],
  templateUrl: './usuario-create.component.html',
  styleUrl: './usuario-create.component.scss'
})
export class UsuarioCreateComponent {

  formGroup!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private service: UsuarioService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      birth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  save() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      console.log('Formulário inválido! Preencha todos os campos.');
      return;
    }

    const usuario = this.formGroup.value;

    this.service.save(usuario).subscribe({
      next: (usuarioSalvo) => {
        console.log('Usuário salvo com sucesso:', usuarioSalvo);
        
        this.formGroup.reset();
        
        this.router.navigate(['/usuarios']); 
        
        alert('Usuário cadastrado com sucesso!');
      },
      error: (e) => {
        console.error('Erro ao salvar usuário:', e);
        alert('Ocorreu um erro ao salvar o usuário. Tente novamente.');
      } 
    });
  }
}