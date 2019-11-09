import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.class';

@Injectable()
export class HouseService {
    baseurl = "/y-b-house/index.php/Enroller/";
    userbaseurl = "/y-b-house/index.php/User/";

    constructor(
        private rest: HttpClient
    ) { }

    private getUserId(){
        let userstr = localStorage.getItem("user");
        let user:User = JSON.parse(userstr);
        return user.Id;
    }

    public addInfo(housetype, username, verifycode, detail){
        let userid = this.getUserId();
        let body = {
            userid: userid,
            housetype: housetype,
            username: username,
            verifycode: verifycode,
            detail: detail
        };
        return this.rest.post(`${this.baseurl}/addInfo`, body).toPromise();
    }
    public modifyInfo(Id, housetype, username, verifycode, detail){
        let userid = this.getUserId();
        let body = {
            userid: userid,
            housetype: housetype,
            username: username,
            verifycode: verifycode,
            detail: detail
        };
        return this.rest.post(`${this.baseurl}/modifyInfo/${Id}`, body).toPromise();
    }

    public getInfo(page=1, username=null, verifycode=null){
        let userid = this.getUserId();
        let body = {
            userid: userid,
            username: username,
            verifycode: verifycode
        };
        return this.rest.post(`${this.baseurl}/getInfo/${page}`, body).toPromise();
    }

    public getInfoById(cid){
        let userid = this.getUserId();
        let body = {
            userid: userid
        };
        return this.rest.post(`${this.baseurl}/getInfoById/${cid}`, body).toPromise();
    }

    public delInfo(cid){
        let userid = this.getUserId();
        let body = {
            userid: userid
        };
        return this.rest.post(`${this.baseurl}/delInfo/${cid}`, body).toPromise();
    }

    public login(username, password){
        let body = {
            username: username,
            password: password
        };
        return this.rest.post(`${this.userbaseurl}/Login`, body).toPromise();
    }

}