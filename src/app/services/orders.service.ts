import { ElementRef, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  order: any = {};
  constructor() {}
verifyOrder(orders,id,userid){
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].pId == id && orders[i].userId == userid) {
     
    return true;
    } 
  }
}
  reservation(id) {
    let userid = localStorage.getItem("userId");
    this.order.pId = id;
    this.order.userId = userid;
    var orderId = JSON.parse(localStorage.getItem("orderId") || "1");
    localStorage.setItem("orderId", orderId + 1);
    this.order.id = orderId;
    let orders = JSON.parse(localStorage.getItem("orders") || "[]");
  if (this.verifyOrder(orders,id,userid)) {
    alert("vous avez deja reservé ce produit");
  }  else{
    orders.push(this.order);
    localStorage.setItem("orders", JSON.stringify(orders));
  }
    
  
  }

  getAllOrder() {
    let orders = JSON.parse(localStorage.getItem("orders") || "[]");
    let products = JSON.parse(localStorage.getItem("products") || "[]");
    let id = localStorage.getItem("userId");
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    let user = users.find((user) => user.id == id);
   
    let userOrder = [];
  
    if (user.isAdmin) {
     
      return orders;
     
    } else {
      for (let i = 0; i < orders.length; i++) {
        let product = products.find((product) => product.pId == orders[i].pId);
        if (product.user == id) {
          userOrder.push(orders[i]);

        }
      }
    
      return userOrder;
    }
    
  }

  deleteOrder(id) {
    let orders = JSON.parse(localStorage.getItem("orders") || "[]");
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].id == id) {
        orders.splice(i, 1);
      }
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }
  cart(){
    
  }
}
