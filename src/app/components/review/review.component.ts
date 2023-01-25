import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
reviews:any=[];
comment:any={};
commentForm:FormGroup;
pId:any;

  constructor(private activatedroute:ActivatedRoute,private auth:AuthService,private modalService: NgbModal) { }
product:any;
  ngOnInit() {
    

  //   let userId =JSON.parse(localStorage.getItem('userId'));
  //   let user = this.auth.searchUserById(userId);
  //  let  username = user.firstName + ' ' + user.lastName;
  
let reviews = JSON.parse(localStorage.getItem('review')||"[]");
this.pId= this.activatedroute.snapshot.paramMap.get("id");
for (let i = 0; i < reviews.length; i++) {
 if (reviews[i].pId ==  this.pId ) {

  this.reviews.push(reviews[i]);

  
 }
 
  
}
console.log(this.reviews)
  }
addComment(){


let pId= this.activatedroute.snapshot.paramMap.get("id");
 this.comment.pId = this.pId;
 let userId =JSON.parse(localStorage.getItem('userId'));
 this.comment.userId=userId;

let review= JSON.parse(localStorage.getItem('review')||"[]");
review.push(this.comment);
 localStorage.setItem('review', JSON.stringify(review));
this.modalService.dismissAll();
 }
 openVerticallyCentered(content) {
  this.modalService.open(content, { centered: true });
  
}
}
