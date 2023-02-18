import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';

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
p:number=1;



  constructor(private activatedroute:ActivatedRoute,private auth:AuthService,private modalService: NgbModal,private commentService:CommentService) { }
product:any;
  ngOnInit() {
    
    this.getComment();


  
 }
 

addComment(){
this.comment.productId= this.activatedroute.snapshot.paramMap.get("id");
console.log(this.comment);

this.commentService.addComment(this.comment).subscribe((data) => {
alert(data.msg);



})
 }
 openVerticallyCentered(content) {
  this.modalService.open(content, { centered: true });
  
}

getComment(){
  let id = this.activatedroute.snapshot.paramMap.get("id")
  console.log(id);
  this.commentService.getComment(id).subscribe((comments)=>{
    this.reviews = comments.comments
    console.log(this.reviews); 
  })
}
}
