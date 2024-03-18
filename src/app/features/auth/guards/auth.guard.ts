// import { Injectable, inject } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';
// import { Observable } from 'rxjs';
// import { AuthService } from '../services/auth.service';
// import * as jwt_decode from 'jwt-decode';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     const cookieService=inject(CookieService);
//     const authservice=inject(AuthService);
//     const router=inject(Router);
//     const user=authservice.getUser();
//     let token=cookieService.get('Authorization');
//     if(token){
//       token=token.replace('Bearer','');
//        const decodedtoken:any=jwt_decode(token);
//        const expiredate=decodedtoken.exp * 1000;
//        const currentTime=new Date().getTime();

//        if(expiredate < currentTime)
//        {
//         authservice.logout();
//         return router.createUrlTree(['/login'],{queryParams:{returnUrl:state.url}})
//        }else{
//         if(user?.roles.includes('Writer')){
//           return true;
//         }
//         else {
//           alert('unauthorised');
//           return false;
//         }
//        }

//     }
//     else
//     {
//       authservice.logout();
//       return router.createUrlTree(['/login'],{queryParams:{returnUrl:state.url}})
//     }
//   }

// }
