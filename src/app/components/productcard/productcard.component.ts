import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-productcard',
  templateUrl: './productcard.component.html',
  styleUrls: ['./productcard.component.css']
})
export class ProductcardComponent implements OnInit {
@Input() public item: {}; 
  constructor(private router:Router,private orderService:OrdersService) { }

  ngOnInit() {
 
    
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
