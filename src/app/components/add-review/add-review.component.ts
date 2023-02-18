import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

  constructor(private activatedroute:ActivatedRoute, private messageService:MessageService) { }
 messageForm:FormGroup;
message:any={};


  ngOnInit() {
    let messages= JSON.parse(localStorage.getItem('message')||"[]");
   
   
      
  
  }
  addMessage(){
    let productId= this.activatedroute.snapshot.paramMap.get('id');
    
let userId= JSON.parse (localStorage.getItem("user")).id
this.message.productId= productId;
this.message.senderId= userId;

this.messageService.postMessage(this.message).subscribe((message)=>{
  alert(message.msg);
});


  }



}
  