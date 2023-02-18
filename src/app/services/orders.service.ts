import { HttpClient, HttpResponse } from "@angular/common/http";
import { ElementRef, Injectable } from "@angular/core";
import { Subject } from "rxjs";


@Injectable({
  providedIn: "root",
})
export class OrdersService {

   cartCount = new Subject<number>();
   data= new Subject<any>();
  
  
   orders:any;
  order: any = {};
  constructor(private http:HttpClient) {}
verifyOrder(orders,id,userid){
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].pId == id && orders[i].userId == userid) {
     
    return true;
    } 
  }
}
 reservation  (obj) {
   this.cartCount.next(1);
   this.data.next("reload");
  
 return   this.http.post<{msg:string}>("http://localhost:3000/order",obj);
   
    }
  
  

  getAllOrder(id) {
   return this.http.get<{data:any}>(`http://localhost:3000/orderstab/${id}`)
    }
    
  

 
  cart(id){
  
    return   this.http.get<{data:any}>(`http://localhost:3000/order/${id}`)


  

 }
 
  
cartCountob(){
return this.cartCount.asObservable();
}
dataoberve(){
return this.data.asObservable();
}

  deletOrderById(id){
    this.cartCount.next(-1);
  return  this.http.delete<{msg:string}>(`http://localhost:3000/order/${id}`)
  }



}
