import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { OrdersService } from "src/app/services/orders.service";
import { ProductsService } from "src/app/services/products.service";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"],
})
export class OrdersComponent implements OnInit {
  orders: any = [];
  constructor(
    private router: Router,
    private orderservice: OrdersService,
    private productservice: ProductsService,
    private authservice: AuthService
  ) {}

  ngOnInit() {
    let id = JSON.parse(localStorage.getItem("user")).id;
    this.orderservice.getAllOrder(id).subscribe((data) => {
      this.orders = data.data;
      console.log(this.orders);
    });

    
  }
  goToSingleProduct(id){
    this.router.navigate([`myproduct/${id}`])
     console.log(id);
     }
  deleteOrder(id) {
    this.orderservice.deletOrderById(id).subscribe((res)=> alert(res.msg));
    const item = this.orders.find((item) => item._id === id);
    this.orders.splice(this.orders.indexOf(item), 1);
  }
}
