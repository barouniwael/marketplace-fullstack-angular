import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { exist } from 'src/app/exist';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm:FormGroup;
  disabled=true;
  constructor(private formbuilder:FormBuilder, private activatedroute:ActivatedRoute) { }

  ngOnInit() {
    let users= JSON.parse(localStorage.getItem('users') || '[]'); 
    this.signupForm = this.formbuilder.group({
      firstName:['',[Validators.required, Validators.minLength(3)]],
      lastName:['',[Validators.required, Validators.minLength(3)]],
      email:['',[Validators.required, Validators.email]],
      phone:['',[Validators.required, Validators.minLength(8)]],
      pwd:['',[Validators.required, Validators.minLength(6)]],
      adress:['',[Validators.required]],
      isAdmin:[false],

    
    
    })
  }
  signup(){
    let user:any;
    var signupId = JSON.parse(localStorage.getItem("signupId")||"1");
    user = this.signupForm.value;
    let users= JSON.parse(localStorage.getItem('users') || '[]'); 
    user.id= signupId ;
    if( this.activatedroute.routeConfig.path == "addadmin"){
      user.isAdmin = true;
    }
    users.push(user);
    
     localStorage.setItem('users', JSON.stringify(users)) ; 
    localStorage.setItem('signupId', signupId + 1);
    alert("user added successfully")
    this.signupForm.reset();
   
   
  }
}
