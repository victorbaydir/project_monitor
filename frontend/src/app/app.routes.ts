import { Routes } from '@angular/router';
import { UsuarioIndexComponent } from './usuario/usuario-index/usuario-index.component';
import { UsuarioCreateComponent } from './usuario/usuario-create/usuario-create.component';
import { UsuarioEditComponent } from './usuario/usuario-edit/usuario-edit.component';

export const routes: Routes = [
    {path: 'usuarios',component: UsuarioIndexComponent},
    {path: 'usuario/create',component: UsuarioCreateComponent},
    {path: 'usuario/:id',component: UsuarioEditComponent},
    {path: 'projects', loadComponent: () => import('./project/project-index/project-index.component').then(m => m.ProjectIndexComponent)},
    {path: 'project/create', loadComponent: () => import('./project/project-create/project-create.component').then(m => m.ProjectCreateComponent)},
    {path: 'project/:id', loadComponent: () => import('./project/project-edit/project-edit.component').then(m => m.ProjectEditComponent)}
];
