import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {formatDate} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
product:any={};
productForm:FormGroup;
category = [];
userId:any;
title:any="Add Product";
route:any;
  constructor(private fb:FormBuilder, private activatedrouter:ActivatedRoute,private router:Router) { }

  ngOnInit() {
     this.route = this.activatedrouter.snapshot.paramMap.get("id")
    if (this.route) {
      let products = JSON.parse(localStorage.getItem("products")||"[]");
  let index = products.findIndex((product)=>product.pId == this.route);
 this.product = products[index];
 console.log("product",this.product); 
 this.title="Edit product"
      
    }
    this.category= JSON.parse(localStorage.getItem("category"||"[]"));

    this.userId = localStorage.getItem("userId");
    this.productForm = this.fb.group({
      category: [''],
      name: [''],
      price: [''],
      time:[''],
      user:[''],
      status: [''],
    });
  }
  addProduct(){
    if (this.route) {

     
        this.route = this.activatedrouter.snapshot.paramMap.get("id");
      let products = JSON.parse(localStorage.getItem("products")||"[]");

     this.product=this.productForm.value;
    this.product.pId= this.route;
    this.product.time = formatDate(new Date(),'dd/MM/yyyy','en');
    this.product.status = "pending";
    this.product.user= this.userId;
    let i = products.findIndex((product)=>product.pId == this.route);
    products[i] = this.product;
    localStorage.setItem("products",JSON.stringify(products));
    this.router.navigate(["annonces"])
    }else{

    let products = JSON.parse(localStorage.getItem("products")||"[]");
     let productId = JSON.parse( localStorage.getItem("productId")|| "1");
  

    this.product=this.productForm.value;
    this.product.pId= productId;
    this.product.time = formatDate(new Date(),'dd/MM/yyyy','en');
    this.product.status = "pending";
    this.product.user= this.userId;
  
    products.push(this.product);
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem(("productId"),productId +1);
    alert("added")
    this.productForm.reset();
    }
  }
}
