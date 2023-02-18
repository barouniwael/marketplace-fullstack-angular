import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token= localStorage.getItem('token');
    if (token) {
        const cloned = req.clone({
        setHeaders:{Authorization:`bearer ` +token}
       
        })
        
        return next.handle(cloned);
    } else {
        return next.handle(req)
    }
  
  }
  
}
