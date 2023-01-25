import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
reservation:any=[];
N:number;
p:any=[];

  constructor(private router:Router) { }

  ngOnInit() {
let orders = JSON.parse( localStorage.getItem('orders')||"[]");
let userId=localStorage.getItem("userId");
let products = JSON.parse( localStorage.getItem('products')||"[]");
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].userId == userId) {
        this.reservation.push(orders[i]);
        this.p.push ( products.find(elt=> elt.pId == orders[i].pId));
      }
   
    }
    console.log(this.p);
   
this.N = this.reservation.length;


  }

  goToSingleProduct(id){
    this.router.navigate([`single-product/${id}`])
    }

}
