import { Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

 public authStatusListener = new Subject<boolean>();  
  private authisadmin= new Subject<boolean>();  
  private userObj= new Subject<any>();  
  constructor(private router:Router) { }



  //  isAdmin:any;


  connectedId: string;
  ngOnInit() {
    }   
    
    getAuthStatusListener() {  
      return this.authStatusListener.asObservable();  
      
    }  
    getAdminStatusListener()
{
  return this.authisadmin.asObservable(); 
}
getUserObjListener()
{
  return this.userObj.asObservable(); 
}

  authUser(user:any){
    let users = JSON.parse(localStorage.getItem('users' || "[]"));
    let u=users.find((u)=> u.phone == user.phone && u.pwd == user.pwd)
// localStorage.setItem('isAdmin', JSON.stringify(u.isAdmin));
   
if ( u){
   localStorage.setItem('userId', u.id)
   
 
    this.authStatusListener.next(true);  
    this.userObj.next(u);  
     if (u.isAdmin) {
      this.authisadmin.next(true);  
    }
 
localStorage.setItem("user",JSON.stringify(u));
 

  this.router.navigate(['']);
}else{
alert("phone or passsword is incorrect")
   return false;
  
}

  }
logout(){
  localStorage.removeItem('userId');
  localStorage.removeItem('user');
  // this.islogged= false;
  this.router.navigate(['']);
  this.authStatusListener.next(false);  
  this.authisadmin.next(false);  

  
}

searchUserById(id){
  let users = JSON.parse(localStorage.getItem('users') || "[]");
  let user=users.find(u=> u.id == id);
  return user;
}

getAllusers(){
let users= JSON.parse(localStorage.getItem('users')|| "[]");

return users
}

deleteUser(id){
  let users = JSON.parse(localStorage.getItem('users')||"[]");
  let index = users.indexOf(user => user.pId==id);
  users.splice(index,1);
  localStorage.setItem('users',JSON.stringify(users));
}
}
