import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {formatDate} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

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
imagePreview:string;
  constructor(private fb:FormBuilder, private activatedrouter:ActivatedRoute,private router:Router,private productService:ProductsService) { }

  ngOnInit() {
     this.route = this.activatedrouter.snapshot.paramMap.get("id");
     this.getAllCategories() 
    if (this.route) {
  this.productService.getProductsById(this.route).subscribe((data)=>{this.product=data.doc;
  
    
  });
 
  
 this.title="Edit product"
      
    }
   

    this.userId = JSON.parse (localStorage.getItem("user")).id;
    this.productForm = this.fb.group({
      category: [''],
      name: [''],
      price: [''],
      time:[''],
      user:[''],
      status: [''],
      img:[''],
    });
  }
  addProduct(){
    if (this.route) {

      this.product=this.productForm.value;
      this.product.time = formatDate(new Date(),'dd/MM/yyyy','en');
      this.product.status = "pending";
      this.product.user= this.userId;
      this.product._id=this.route
     this.productService.editProduct(this.product,this.productForm.value.img).subscribe((data)=>{alert(data.msg);
     })
    this.router.navigate(["/mesannonces"])
    }else{
    this.product=this.productForm.value;
    this.product.time = formatDate(new Date(),'dd/MM/yyyy','en');
    this.product.status = "pending";
    this.product.user= this.userId;
    console.log("proform",this.productForm.value);
  this.productService.addProduct(this.product,this.productForm.value.img).subscribe((data)=>{console.log("product data",data);
  });
    alert("added")
    // this.productForm.reset();
    this.router.navigate(["mesannonces"])
    }
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
    
    this.productForm.patchValue({img: file });
    this.productForm.updateValueAndValidity();
 console.log("proform",this.productForm.value);
 
    const reader = new FileReader();
    
    reader.onload = () => {
      this.imagePreview = reader.result as string
     
    };
    reader.readAsDataURL(file);
  }
  getAllCategories(){
    this.productService.getAllCategories().subscribe((data)=>{this.category= data.categories});
    }
  }

