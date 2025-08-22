import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

export const TokenInterceptor : HttpInterceptorFn=(req,next)=>{

    const token = localStorage.getItem('token');
    req=req.clone({
        setHeaders:{
             'Authorization': `Bearer ${token}`
        }
    })
    return next(req);
}
   

