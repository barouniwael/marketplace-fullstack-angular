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
  constructor(private auth:AuthService, private router:Router,private orderService:OrdersService,private filtreservice:FiltreService,private productService:ProductsService) { 
 
  }
products:any=[
]
order:any={};
  ngOnInit() {
this.productService.homeProduct().subscribe(data=> this.products = data.doc)
   
  }
  goToSingleProduct(id){
  this.router.navigate([`single-product/${id}`])
  }
  reservation(id){
    let productId = id;
    let userId= JSON.parse(localStorage.getItem('user')).id;
    let obj = {productId : productId, userId : userId};
this.orderService.reservation(obj).subscribe((msg)=>{alert(msg.msg)});

  }

}
