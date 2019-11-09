import { NgModule } from '@angular/core';
import { XfloginadminComponent } from './xfloginadmin/xfloginadmin.component';
import { XfloginuserComponent } from './xfloginuser/xfloginuser.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared/shared.module';

export const routes: Routes = [
  { 
    path: '', component: XfloginadminComponent, pathMatch: 'full'
  },
  {
    path: 'user', component: XfloginuserComponent
  }
];



@NgModule({
  declarations: [XfloginadminComponent, XfloginuserComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class XfloginModule { }
