import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';





@Component({
  selector: 'app-singleproduct',
  templateUrl: './singleproduct.component.html',
  styleUrls: ['./singleproduct.component.css']
})
export class SingleproductComponent implements OnInit {
id:any;
product:any={};
message:any={};
myproduct:boolean = false;

  constructor(private activatedroute:ActivatedRoute, private router:Router, 
    private productservice:ProductsService,private orderservice:OrdersService) { }

  ngOnInit() {
    this.id=this.activatedroute.snapshot.paramMap.get('id');
 
   this.product = this.productservice.getProductsById(this.id).subscribe((data)=>{this.product = data.doc})
    

   let route = this.activatedroute.routeConfig.path
 if (route == "myproduct/:id") {
  this.myproduct = true;
}

  }
  reservation(id){
    let productId = id;
    let userId= JSON.parse(localStorage.getItem('user')).id;
    let obj = {productId : productId, userId : userId};
this.orderservice.reservation(obj).subscribe((msg)=>{alert(msg.msg)});


  }
 sendMessage(){
    let pId= this.activatedroute.snapshot.paramMap.get('id');
    let messageId = JSON.parse( localStorage.getItem("messageId")|| "1");
    localStorage.setItem(("messageId"),messageId +1);
this.message.pId = pId;
this.message.id = messageId;

localStorage.setItem('message', JSON.stringify(this.message));

  }

}
