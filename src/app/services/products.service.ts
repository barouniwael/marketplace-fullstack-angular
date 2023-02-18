import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  url: string = "http://localhost:3000";
  constructor(private http: HttpClient,private activatedRoute:ActivatedRoute) {}

  addProduct(product:any,img:File) {
    console.log("product",product);

    let formData= new FormData();
formData.append("name",product.name);
formData.append("price",product.price);
formData.append("category",product.category);
formData.append("time",product.time);
formData.append("user",product.user);
formData.append("status",product.status);
formData.append("img",img);
console.log("img",img);


    return this.http.post<{ msg: string; product: any }>(this.url + "/addproduct",formData )
  }
  getProductsById(id) {
    return this.http.get<{ doc: any }>(`${this.url}/getproduct/${id}`);
  }
  getmyProducts(id) {
    return this.http.post<{ products: any }>(this.url + "/mesannonces", id);
  }

  deleteMyproduct(id) {
   return this.http.delete<{ msg: string}>(`${this.url}/deleteproduct/${id}`)
  }
allowProduct(obj){
  return this.http.put<{status:any}>(`${this.url}/allowproduct`,obj)
}
  getAllProducts() {
    return this.http.get<{ products: any }>(this.url + "/allproducts");
  }
  getAdminTabProduct(){
    return this.http.get<{ products: any }>(this.url + "/allproductsTab");
  }

  addCategory(category) {

    return this.http.post<{ msg: string; category: any }>( this.url + "/addcategory", category   );
  }
  getAllCategories() {
    return this.http.get<{ categories: any }>(this.url + "/getallcategories");
  }
  editProduct(newobj:any,img:File){
    let formData = new FormData();
    formData.append("name",newobj.name);
    formData.append("id",newobj._id);
formData.append("price",newobj.price);
formData.append("category",newobj.category);
formData.append("time",newobj.time);
formData.append("user",newobj.user);
formData.append("status",newobj.status);
formData.append("img",img);
let id = this.activatedRoute.snapshot.paramMap.get("id")
    return this.http.put<{ msg: string}>(`http://localhost:3000/editmyproduct`,formData);
  }

  homeProduct(){
   return this.http.get<{doc:any}>("http://localhost:3000/homeproducts")
  }
}
