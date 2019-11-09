import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared/shared.module';

export const routes: Routes = [
  { 
    path: '', component: LoginComponent, pathMatch: 'full'
  }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class LoginModule { }
