import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmesComponent } from './components/filmes/filmes.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'filmes',
    pathMatch: 'full'
  },
  {
    path: 'filmes',
    component: FilmesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
