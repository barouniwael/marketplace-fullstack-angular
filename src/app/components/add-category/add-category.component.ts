import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor() { }
category:any;

catForm :FormGroup;
  ngOnInit() {
  }
  addCategory(){

let category= JSON.parse(localStorage.getItem('category')|| "[]");
 category.push(this.category);
 localStorage.setItem('category',JSON.stringify(category));

  
 alert('category added')
 this.category="";
  }
}
