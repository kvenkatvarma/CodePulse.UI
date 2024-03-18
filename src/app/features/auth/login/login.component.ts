import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
model:LoginRequest;
constructor( private loginservice:AuthService,private cookieService:CookieService,private router:Router){
 this.model={
  email:'',
  password:''
 };
}

onFormSubmit():void{

 this.loginservice.login(this.model).subscribe({
  next:(response)=>{
  this.cookieService.set('Authorization',`Bearer ${response.token}`,undefined,'/',undefined,true,'Strict');

  this.loginservice.setUser({
    email:response.email,
    roles:response.roles
  });

 this.router.navigateByUrl('/');
  }
 });
}
}
