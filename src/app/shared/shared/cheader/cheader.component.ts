import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cheader',
  templateUrl: './cheader.component.html',
  styleUrls: ['./cheader.component.scss']
})
export class CheaderComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  goto(menu){
    this.route.navigate([menu]);
  }

}
