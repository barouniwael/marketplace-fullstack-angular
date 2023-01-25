import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css']
})
export class AllproductsComponent implements OnInit {
products:any=[];
p: number = 1;
term:any;
categoryVal:any;
  constructor(private router:Router,private orderservice:OrdersService,private searchservice:SearchService) { }

  ngOnInit() {
    let products= JSON.parse(localStorage.getItem('products')||"[]");
for (let i = 0; i < products.length; i++) {
if (products[i].status =="enabled") {
  this.products.push(products[i]);
}
  
}


 this.searchservice.search.subscribe((val:any)=> this.term = val);
 console.log(this.term)
 this.searchservice.category.subscribe((val:any)=> this.categoryVal = val);
 console.log(this.categoryVal);
}
goToSingleProduct(id){
this.router.navigate([`single-product/${id}`])
}
reservation(id){

this.orderservice.reservation(id);
}

}
