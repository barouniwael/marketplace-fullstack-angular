import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FiltreService } from 'src/app/services/filtre.service';


// import { EventEmitter } from 'events';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { ProductsService } from 'src/app/services/products.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
isloggedIn$: Observable<boolean>;
// isAdmin:boolean;
// loggedId:any;
// connectedId:any;
user:any;
usersuscription: Subscription;
search:string
categoryValue:any ;
category:any=[];
private authListenerSubs: Subscription;  
public userIsAuthenticated:boolean  ; 
 private adminListenerSubs: Subscription;  
public authisadmin:boolean ;  
  constructor(private router:Router,private auth:AuthService, private filtreservice:FiltreService, private searchservice:SearchService,private productService:ProductsService) {
 this.userIsAuthenticated 
//  =  !!localStorage.getItem('user');
// this.userIsAdmin =  !!localStorage.getItem('userId');

}

  ngOnInit() {
    this.authListenerSubs = this.auth.getAuthStatusListener().subscribe(isAuthenticated=>{  
      this.userIsAuthenticated = isAuthenticated}  );  
      this.adminListenerSubs = this.auth.getAdminStatusListener().subscribe(isAdmin=>{ 
        this.authisadmin = isAdmin} )
        this.user = this.auth.getUserObjListener().subscribe(user=>{ 
        this.user = user} )


this.productService.getAllCategories().subscribe((data)=>{
  this.category= data.categories});
 

  let user = JSON.parse (localStorage.getItem("user"));
  if (user) {
    this.user=user;
    this.userIsAuthenticated = true;
      if (user.isAdmin) {
        this.authisadmin=true;
      }
    
     
  }

// this.isAdmin = user.isAdmin


}

onKey(event) {
this.search= event.target.value;

this.searchservice.search.next(this.search);
  // this.filtreservice.setdata(inputValue )
}

 

logout(){
this.auth.logout();
// this.islogged= false;

this.router.navigate(['']);

}
selectOption(value){
 this.searchservice.category.next(value);

}
ngOnDestroy(){  
  this.authListenerSubs.unsubscribe();  
  this.adminListenerSubs.unsubscribe();  
}  
}