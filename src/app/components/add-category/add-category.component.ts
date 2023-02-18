import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
category:any={};
  constructor(private productService:ProductsService) { }


catForm :FormGroup;
  ngOnInit() {
  }
  addCategory(){

this.productService.addCategory(this.category).subscribe(data => alert("category added"));

  }
}
