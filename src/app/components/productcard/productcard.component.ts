import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productcard',
  templateUrl: './productcard.component.html',
  styleUrls: ['./productcard.component.css']
})
export class ProductcardComponent implements OnInit {
@Input() public item: {}; 
  constructor(private router:Router) { }

  ngOnInit() {
  }
  goToSingleProduct(id){
    this.router.navigate([`single-product/${id}`])
    }
}
