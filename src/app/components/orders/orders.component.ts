import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService} from 'src/app/services/products.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
orders:any=[];
  constructor(private router:Router,private orderservice:OrdersService, private productservice:ProductsService, private authservice:AuthService) { }

  ngOnInit() {
let orders = this.orderservice.getAllOrder();

// let userId = localStorage.getItem('userId');

for (let i = 0; i < orders.length; i++) {
// if (orders[i].userId = userId) {
  let order={
    id:"",
    name:"",
    product:"",
    phone:"",
    pId:"",
  };

let  product = this.productservice.getProductsById(orders[i].pId);

let userId = orders[i].userId
    let user= this.authservice.searchUserById(userId);



  order.id = orders[i].id;
 order.name = user.lastName + "  "+user.firstName;
 order.product = product.name;
 order.phone = user.phone;
 order.pId= orders[i].pId
 this.orders.push(order);
  console.log("order",this.orders)
}

}

  
  goToSingleProduct(id){
    this.router.navigate([`myproduct/${id}`])
    console.log(id);
    }

    deleteOrder(id){
      this.orderservice.deleteOrder(id);
      const item = this.orders.find(item => item.id === id);
    this.orders.splice(this.orders.indexOf(item),1);

    }
}


