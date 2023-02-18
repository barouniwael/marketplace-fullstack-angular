import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort,Sort } from '@angular/material/sort';

import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-adminproducts',
  templateUrl: './adminproducts.component.html',
  styleUrls: ['./adminproducts.component.css']
})
export class AdminproductsComponent implements OnInit {
products:any;
term:any;
displayedColumns = ["name", "category", "price","date","status", "action"];
@ViewChild(MatSort,{static: true})sort:MatSort;
  constructor(private productservice:ProductsService) { }

  ngOnInit() {
  
    this.getAllProducts();

  }
  // ngAfterViewInit(): void {
   
  //   this.products.sort= this.sort;
  // }
  getAllProducts(){
    this.productservice.getAdminTabProduct().subscribe((products)=>{
      this.products = products.products.reverse();
      console.log(products);
      
    
    })
  }
  deleteproduct(id){
    this.productservice.deleteMyproduct(id).subscribe((res)=>{
      // this.getAllProducts();
      let item = this.products.find(item => item._id === id);
    this.products.splice(this.products.indexOf(item),1);
      
      alert(res.msg)});
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.term = filterValue.toLocaleLowerCase();
    console.log(this.term)
}
allowProduct(id){
  let newobj = {id:id}
  this.productservice.allowProduct(newobj).subscribe((status)=>{
    this.getAllProducts();
    alert(status)
  });

    

}
}