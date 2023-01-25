import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }


  getProductsById(id){
    let products = JSON.parse(localStorage.getItem('products')||"[]");
   let product= products.find(product=> product.pId==id);
    return product;
  }
  getmyProducts(id){
    let users = JSON.parse(localStorage.getItem('users')||"[]");
    let products = JSON.parse(localStorage.getItem('products')||"[]");
    let user= users.find(user=> user.id==id);
     if(user.isAdmin){
      return products
     }
  
    let myproducts=[];
    for (let i = 0; i < products.length; i++) {
     if (products[i].user==id) {
      myproducts.push(products[i]);
     }
      
    }
    
    return myproducts;
  }

  deleteMyproduct(id){
    let products = JSON.parse(localStorage.getItem('products')||"[]");
    let index = products.indexOf(product => product.pId==id);
    products.splice(index,1);
    localStorage.setItem('products',JSON.stringify(products));
  }

  getAllProcut(){
   let products = JSON.parse(localStorage.getItem("products")||"[]");
 
   return products;
  }
}
