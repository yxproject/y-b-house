import { Component, ElementRef, HostListener, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { HJQK } from '../../../model/gf.class';
import * as _ from 'lodash';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {
  mapOfExpandData: { [key: string]: boolean } = {};

  isVisible = false;
  @Output()
  savePerson:EventEmitter<any> = new EventEmitter<any>();

  currentSavePerson = [];

  constructor() {}

  ngOnInit() {
    for(let i=0;i<20;i++){
      let p = new HJQK();
      this.listOfData.push(p);
    }
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  handleOk(): void {
    this.isVisible = false;
    let res = [];
    for(let r of this.listOfData){
      if(r.xm){
        res.push(r);
      }
    }
    this.savePerson.emit(res);
  }

  changeStatus(ev, data){
    if(ev == '是'){
      data.fq = new HJQK();
      data.fq.gx = "配偶";
      data.tags = ['fq'];
      this.mapOfExpandData[data.id] = true;
    }else{
      data.fq = null;
      data.tags = null;
      this.mapOfExpandData[data.id] = false;
    }
  }

  ///////////////////////
  editId: string | null;
  listOfData: HJQK[] = [];
  @ViewChild(NzInputDirective, { static: false, read: ElementRef }) inputElement: ElementRef;

  @HostListener('window:click', ['$event'])
  handleClick(e: MouseEvent): void {
    if (this.editId && (e.target['className'].indexOf('editinp') < 0 &&  e.target['className'].indexOf('ant-select') < 0)/* this.inputElement && this.inputElement.nativeElement !== e.target */) {
      this.editId = null;
    }
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }

  startEdit(id: string, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.editId = id;

    let res = [];
    for(let r of this.listOfData){
      if(r.xm){
        res.push(r);
      }
    }
    this.currentSavePerson = res;
  }

}
