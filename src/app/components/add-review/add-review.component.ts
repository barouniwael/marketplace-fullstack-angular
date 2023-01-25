import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

  constructor(private activatedroute:ActivatedRoute) { }
 messageForm:FormGroup;
message:any={};


  ngOnInit() {
    let messages= JSON.parse(localStorage.getItem('message')||"[]");
   
   
      
  
  }
  addMessage(){
    let pId= this.activatedroute.snapshot.paramMap.get('id');
    let messages = JSON.parse(localStorage.getItem('messages')||"[]");
this.message.pId = pId;
let products = JSON.parse(localStorage.getItem('products')||"[]");
let targetId ;
for (let i = 0; i < products.length; i++) {
  if (products[i].pId == pId) {
    targetId = products[i].user;
  }
  
}
this.message.targetId = targetId;
let userId=localStorage.getItem("userId")
this.message.userId=userId;
 messages.push(this.message);
localStorage.setItem('messages', JSON.stringify(messages));

  }



}
  