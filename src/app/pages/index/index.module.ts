import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { TablesComponent } from './components/tables/tables.component';
import { SearchsComponent } from './components/searchs/searchs.component';
import { ContentsComponent } from './components/contents/contents.component';

export const routes: Routes = [
  { 
    //不能写full
    path: '', component: IndexComponent, children: [
      {
        path: '', component: ContentsComponent, pathMatch: 'full'
      },
      {
        path: 'gf', component: ContentsComponent,
      },
      {
        path: 'gfadd', loadChildren: '../../pages/gfadd/gfadd.module#GfaddModule',
      },
      {
        path: 'gfedit/:id', loadChildren: '../../pages/gfadd/gfadd.module#GfaddModule',
      }
    ]
  },
  
];

@NgModule({
  declarations: [IndexComponent, TablesComponent, SearchsComponent, ContentsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class IndexModule { }
