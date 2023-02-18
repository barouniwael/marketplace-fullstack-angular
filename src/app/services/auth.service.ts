import { HttpClient } from "@angular/common/http";
import { Injectable, Output } from "@angular/core";
import { Router } from "@angular/router";

import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  url: string = "http://127.0.0.1:3000";
  public authStatusListener = new Subject<boolean>();
  private authisadmin = new Subject<boolean>();
  private userObj = new Subject<any>();

token:any;
expireIn:any;
tokenTimer:any;

  constructor(private router: Router, private http: HttpClient) {}

  //  isAdmin:any;

  connectedId: string;
  ngOnInit() {
   

  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  getAdminStatusListener() {
    return this.authisadmin.asObservable();
  }
  getUserObjListener() {
    return this.userObj.asObservable();
  }

  authUser(user: any) {
    return this.http
      .post<{ msg: string; user: any ,token:any,expireIn:any}>(this.url + "/login", user)
      .subscribe((data) => {
        this.authStatusListener.next(true);
    
        if (data.user.isAdmin) {
          this.authisadmin.next(true);
        }
        this.token = data.token;
      
        if (this.token) {
          const expiresInDuration = data.expireIn;
          this.setAuthTimer(expiresInDuration);
          this.authStatusListener.next(true);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        this.userObj.next(data.user);
        }
      });
  }

  getToken() {
    return this.token;
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }


  logout() {

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.authStatusListener.next(false);
    this.authisadmin.next(false);
    this.userObj.next();
    this.token = null;
    clearTimeout(this.tokenTimer);
    this.router.navigate([""]);

  }

  searchUserById(id) {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    let user = users.find((u) => u.id == id);
    return user;
  }

  getAllusers() {
  return this.http.get<{users:any}>(this.url+"/getusers")
  }

  deleteUser(id) {
  return this.http.delete<{msg:string,isDeleted:boolean}>(`${this.url}/deleteuser/${id}`);
  }

  signup(user) {
    return this.http.post<{ msg: string; doc: any }>(
      this.url + "/signup",
      user
    );
  }
}
