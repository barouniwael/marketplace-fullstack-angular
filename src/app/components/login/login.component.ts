import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
user:any={};
loginForm:FormGroup;
islogged:boolean ;
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem("userId")){
      this.router.navigate([""])
    }
   
  }
login(){
let islogged = this.auth.authUser(this.user);
if (islogged){
 
this.router.navigate([""])
// this.islogged = true;

}


}
}
