import { NgModule } from '@angular/core';
import { ChooseZoneComponent } from './choose-zone/choose-zone.component';
import { ChooseHouseComponent } from './choose-house/choose-house.component';
import { ChooseRoomComponent } from './choose-room/choose-room.component';
import { XfsysprintComponent } from './xfsysprint/xfsysprint.component';

import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared/shared.module';
import { HeadsComponent } from './components/heads/heads.component';

export const routes: Routes = [
  { 
    path: '', component: ChooseZoneComponent, pathMatch: 'full'
  },
  {
    path: 'house', component: ChooseHouseComponent
  },
  {
    path: 'room', component: ChooseRoomComponent
  },
  {
    path: 'print', component: XfsysprintComponent
  }
];

@NgModule({
  declarations: [ChooseZoneComponent, ChooseHouseComponent, ChooseRoomComponent, XfsysprintComponent, HeadsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class XfsysModule { }
