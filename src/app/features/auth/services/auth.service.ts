import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { user } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
constructor(private http:HttpClient,private cookieService:CookieService){

}

$user=new BehaviorSubject<user | undefined>(undefined);
  login(request:LoginRequest):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`,{
      email:request.email,password:request.password
    });
  }

  setUser(userreq:user){
    this.$user.next(userreq);
    localStorage.setItem('user-email',userreq.email);
    localStorage.setItem('user-roles',userreq.roles.join(','));
  }
  userStatus():Observable<user | undefined>{
  return this.$user.asObservable();
  }
getUser():user | undefined{
  const email=localStorage.getItem('user-email');
  const roles=localStorage.getItem('user-roles');
  if(email && roles){
    const users:user={
      email:email,
      roles:roles.split(',')
    };
    return users;
  }
return undefined;
}
  logout(){
    localStorage.clear();
    this.cookieService.delete('Authorization','/');
    this.$user.next(undefined);
  }
}
