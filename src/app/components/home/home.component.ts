import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
 import { FiltreService } from 'src/app/services/filtre.service';
import { AuthService } from 'src/app/services/auth.service';
 import { OrdersService } from 'src/app/services/orders.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
search: any;
term:any;
status:any;
  constructor(private auth:AuthService, private router:Router,private orderservice:OrdersService,private filtreservice:FiltreService) { 
 
  }
products:any=[
]
order:any={};
  ngOnInit() {
  let products= JSON.parse(localStorage.getItem('products')||"[]");
this.products=products.slice(-6);
   
  }
  goToSingleProduct(id){
  this.router.navigate([`single-product/${id}`])
  }
  reservation(id){
 
this.orderservice.reservation(id);
  }

}
