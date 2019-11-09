import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private router:Router) { 
    let user = localStorage.getItem("user");
    if(!user){
      this.quit();
    }
  }

  ngOnInit() {
  }

  quit(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
