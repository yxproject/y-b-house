import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HouseService } from '../../services/house.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [HouseService]
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  isShowMessage = false;
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if(this.validateForm.valid){
      let val = this.validateForm.value;
      this.serv.login(val.userName, val.password).then((res:any)=>{
        if(res.code == 200){
          localStorage.setItem("user", JSON.stringify(res.data));
          this.router.navigate(['/main/gf']);
        }else if(res.code == 500){
          // this.message.create("error", res.mes);
          this.isShowMessage = true;
        }
      }).catch((err)=>{
        this.message.create("error", '服务器内部错误');
      });
    }
  }
  constructor(private fb: FormBuilder, private serv: HouseService, private message: NzMessageService, private router:Router) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

}
