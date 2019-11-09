import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/basic.interceptor';
import { ErrorInterceptor } from './services/error.interceptor';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData, LocationStrategy, HashLocationStrategy } from '@angular/common';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

const routes:Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'main'
  },
  {
    path: 'main', loadChildren: './pages/index/index.module#IndexModule',//首页
  },
  {
    path: 'login', loadChildren: './pages/login/login.module#LoginModule',//登陆
  },
  {
    path: 'xflogin', loadChildren: './pages/xflogin/xflogin.module#XfloginModule',//选房登录
  },
  {
    path: 'xfsys', loadChildren: './pages/xfsys/xfsys.module#XfsysModule',//选房登录
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    FormsModule,
    NgZorroAntdModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
