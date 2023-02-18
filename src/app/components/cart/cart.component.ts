import { Component, OnInit } from "@angular/core";
import { async } from "@angular/core/testing";
import { Router } from "@angular/router";
import { OrdersService } from "src/app/services/orders.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  reservation: any = [];
  N: number;
  p: any = [];
  id: any;

  constructor(private router: Router, private orderService: OrdersService) {
  

    this.orderService.dataoberve().subscribe((data)=>{
     if (data == "reload") {
      this.getOrderTab();
      
     }
      
    })
 
  }

  ngOnInit() {
   this.getOrderTab();
   this.orderService.cartCountob().subscribe((data)=>{
    console.log("observable",data);
    this.N += data
         this.getOrderTab();
    
  })
 
    };

  
  
getOrderTab(){
  let id = JSON.parse(localStorage.getItem("user")).id;

    this.orderService.cart(id).subscribe((data)=>{
      this.p = data.data
      this.N = data.data.length
      console.log("data",data.data);
   
      
    })
    
}
  deleteOrder(id) {
    console.log("delete fn");

    this.orderService.deletOrderById(id).subscribe((data) => {
      const item = this.p.find((item) => item._id === id);
      this.p.splice(this.p.indexOf(item), 1);
    });
  }

  goToSingleProduct(id) {
    this.router.navigate([`single-product/${id}`]);
  }
}
