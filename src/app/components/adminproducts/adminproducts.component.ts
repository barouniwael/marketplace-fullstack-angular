import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort,Sort } from '@angular/material/sort';

import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-adminproducts',
  templateUrl: './adminproducts.component.html',
  styleUrls: ['./adminproducts.component.css']
})
export class AdminproductsComponent implements OnInit,AfterViewInit {
products:any;
term:any;
displayedColumns = ["name", "category", "price","date","status", "action"];
@ViewChild(MatSort,{static: true})sort:MatSort;
  constructor(private productservice:ProductsService) { }

  ngOnInit() {
let products =   JSON.parse(localStorage.getItem("products")||"[]");
this.products = products.reverse();
  }
  ngAfterViewInit(): void {
   
    this.products.sort= this.sort;
  }
  deleteproduct(id){
    this.productservice.deleteMyproduct(id);
    let item = this.products.find(item => item.pId === id);
    this.products.splice(this.products.indexOf(item),1);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.term = filterValue.toLocaleLowerCase();
    console.log(this.term)
}
allowProduct(id){
  let products =   JSON.parse(localStorage.getItem("products")||"[]");
  for (let i = 0; i < products.length; i++) {
   if (products[i].pId === id) {products[i].status = "enabled";
    
   }
    
  }
  localStorage.setItem("products",JSON.stringify(products));
  this.ngOnInit();
}
}