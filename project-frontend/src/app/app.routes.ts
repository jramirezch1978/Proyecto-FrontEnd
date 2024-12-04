import { Routes } from '@angular/router';
import { UnidadesComponent } from './pages/unidades/unidades.component';

export const routes: Routes = [
  { path: 'unidades', component: UnidadesComponent },
  { path: '', redirectTo: 'unidades', pathMatch: 'full' }
];
