import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-mesannonces',
  templateUrl: './mesannonces.component.html',
  styleUrls: ['./mesannonces.component.css']
})
export class MesannoncesComponent implements OnInit {
myproducts:any ;
  constructor(private productservice:ProductsService,private router:Router) { }

  ngOnInit() {
    let id = localStorage.getItem('userId');
    this.myproducts = this.productservice.getmyProducts(id);
    console.log("myproducts",this.myproducts);
  }
  goToSingleProduct(id){
    this.router.navigate([`myproduct/${id}`])
}
deleteMyproduct(id){
  this.productservice.deleteMyproduct(id);
  const item = this.myproducts.find(item => item.id === id);
  this.myproducts.splice(this.myproducts.indexOf(item),1);
}
editProduct(id){
this.router.navigate([`addproduct/${id}`])
}
}