import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
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
  constructor(private router:Router,private orderservice:OrdersService,private searchservice:SearchService,private productService:ProductsService) { }

  ngOnInit() {
 

this.productService.getAllProducts().subscribe((products)=>{
  this.products = products.products;
  console.log(this.products);
  
})
 this.searchservice.search.subscribe((val:any)=> this.term = val);

 this.searchservice.category.subscribe((val:any)=> this.categoryVal = val);
 
}
goToSingleProduct(id){
this.router.navigate([`single-product/${id}`])
}
reservation(id){

this.orderservice.reservation(id);
}

}
