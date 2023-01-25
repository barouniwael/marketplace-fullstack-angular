import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
messages:any=[] ;
isAdmin:any =   true;
  constructor(private productservice:ProductsService, private userservice:AuthService, private router:Router) { }

  ngOnInit() {
let messages= JSON.parse(localStorage.getItem('messages')|| "[]");

for (let i = 0; i < messages.length; i++) {
  let product = this.productservice.getProductsById(messages[i].pId);

  let user = this.userservice.searchUserById(messages[i].userId);
 
  let userId = JSON.parse(localStorage.getItem('userId'));
  this.isAdmin = this.userservice.searchUserById(userId).isAdmin;
  console.log("isadmin message", this.isAdmin)
  if (messages[i].targetId == userId || this.isAdmin) {
    
 
  let message={
    name:"",
    userName:"",
    phone:"",
    message :"",
    targetId:"",
    pId:product.pId,

  };
   message.name = product.name;
   message.userName = user.firstName;
      message.phone = user.phone;
      message.message = messages[i].message;
      message.targetId = messages[i].targetId;
      message.pId = messages[i].pId;
 this.messages.push(message);
 
 }


 
}
 

  }
deleteMessage(id){
  let messages=JSON.parse(localStorage.getItem('messages')|| "[]");
  for (let i = 0; i < messages.length; i++) {
   if (messages[i].targetId == id) {
    messages.splice(i,1);
        break;
    
   }
    
  }
  localStorage.setItem('messages',JSON.stringify(messages));
  

  const item = this.messages.find(item => item.phone === id);
  this.messages.splice(this.messages.indexOf(item),1);
}
goToSingleProduct(id){
  this.router.navigate([`single-product/${id}`])
  }

}
