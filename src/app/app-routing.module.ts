import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthguardGuard } from "./authguard.guard";
import { AddCategoryComponent } from "./components/add-category/add-category.component";
import { AddProductComponent } from "./components/add-product/add-product.component";
import { AdminproductsComponent } from "./components/adminproducts/adminproducts.component";
import { AdminusersComponent } from "./components/adminusers/adminusers.component";
import { AllproductsComponent } from "./components/allproducts/allproducts.component";
import { AllusersComponent } from "./components/allusers/allusers.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { MesannoncesComponent } from "./components/mesannonces/mesannonces.component";
import { MessagesComponent } from "./components/messages/messages.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { SignupComponent } from "./components/signup/signup.component";
import { SingleproductComponent } from "./components/singleproduct/singleproduct.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "signup", component: SignupComponent },
  { path: "addadmin", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "orders", component: OrdersComponent },
  {
    path: "add-product",
    component: AddProductComponent,
    canActivate: [AuthguardGuard],
  },
  {
    path: "annonces",
    component: MesannoncesComponent,
    canActivate: [AuthguardGuard],
  },
  { path: "allproducts", component: AllproductsComponent },
  { path: "single-product/:id", component: SingleproductComponent },
  { path: "myproduct/:id", component: SingleproductComponent },
  { path: "addproduct/:id", component: AddProductComponent },
  { path: "msg", component: MessagesComponent },
  { path: "adminmsg", component: MessagesComponent },
  { path: "add-category", component: AddCategoryComponent },
  { path: "allusers", component: AllusersComponent },
  { path: "adminproducts", component: AdminproductsComponent },
  { path: "test", component: AdminusersComponent },
  { path: "addproduct", component: AddProductComponent },
  { path: "mesannonces", component: MesannoncesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
