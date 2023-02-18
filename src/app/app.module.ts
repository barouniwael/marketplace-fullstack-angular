import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './components/cart/cart.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { OrdersComponent } from './components/orders/orders.component';
import { MesannoncesComponent } from './components/mesannonces/mesannonces.component';
import { AllproductsComponent } from './components/allproducts/allproducts.component';
import { SingleproductComponent } from './components/singleproduct/singleproduct.component';

import { AddReviewComponent } from './components/add-review/add-review.component';
import { ReviewComponent } from './components/review/review.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AdminusersComponent } from './components/adminusers/adminusers.component';
import { AdminproductsComponent } from './components/adminproducts/adminproducts.component';
import { AdminordersComponent } from './components/adminorders/adminorders.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { FiltrePipe } from './pipes/filtre.pipe';
import { CategoryPipe } from './pipes/category.pipe';
import { AllusersComponent } from './components/allusers/allusers.component';

import { JwPaginationModule } from 'jw-angular-pagination';
import { ProductcardComponent } from './components/productcard/productcard.component';

import {NgxPaginationModule} from 'ngx-pagination';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
  MatSortModule, MatTableModule } from "@angular/material";
  import {MatIconModule} from '@angular/material/icon';
  import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HeaderInterceptor } from './services/auth.interceptor';
import { errorInterceptor } from './services/error.interceptor';

@NgModule({
  declarations: [
    
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CartComponent,
    SignupComponent,
    LoginComponent,
    AddProductComponent,
    OrdersComponent,
    MesannoncesComponent,
    AllproductsComponent,
    SingleproductComponent,
 
    AddReviewComponent,
 
    ReviewComponent,
 
    MessagesComponent,
 
    AdminusersComponent,
 
    AdminproductsComponent,
 
    AdminordersComponent,
 
    AddCategoryComponent,
 
    FiltrePipe,
 
    CategoryPipe,
 
    AllusersComponent,
 
    ProductcardComponent,
   
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    JwPaginationModule ,
    NgxPaginationModule,
    NgbModule,
    BrowserAnimationsModule,

    MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
    MatIconModule,
    HttpClientModule,
  

   
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass:  HeaderInterceptor , multi: true },
    { provide: HTTP_INTERCEPTORS, useClass:  errorInterceptor , multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
