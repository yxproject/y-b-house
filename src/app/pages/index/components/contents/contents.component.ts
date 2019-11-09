import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss']
})
export class ContentsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  searchHandler(ev, table){
    table.username = ev.username;
    table.verifycode = ev.verifyname;
    table.page = 1;
    table.initInfo();
  }

}
