import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GfaddComponent } from './gfadd.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { PersonsComponent } from './persons/persons.component';

export const routes: Routes = [
  { 
    path: '', component: GfaddComponent, pathMatch: 'full'
  }
];

@NgModule({
  declarations: [GfaddComponent, PersonsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class GfaddModule { }
