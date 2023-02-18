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
  constructor(private productservice:ProductsService,private router:Router,private productService:ProductsService) { }

  ngOnInit() {
    let user =JSON.parse (localStorage.getItem('user'));
   this.productservice.getmyProducts(user).subscribe((data)=>{
this.myproducts=data.products;
// console.log((data.products));

    
   });
      

  
  }


  goToSingleProduct(id){
    this.router.navigate([`myproduct/${id}`])
}
deleteMyproduct(id){
this.productService.deleteMyproduct(id).subscribe((message=>{
  alert(message.msg)
  const item = this.myproducts.find(item => item._id === id);
   this.myproducts.splice(this.myproducts.indexOf(item),1);

}))
}
editProduct(id){
this.router.navigate([`addproduct/${id}`])
}
}