import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
messages:any=[] ;
isAdmin:any =   true;
  constructor(private productservice:ProductsService, private userservice:AuthService, private router:Router,private messageService:MessageService) { }

  ngOnInit() {
    let id =JSON.parse (localStorage.getItem('user')).id

this.getMessage(id);
 
 
 }

getMessage(id){
  this.messageService.getMessage(id).subscribe((message)=>{
  this.messages = message.message

  
  })
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
