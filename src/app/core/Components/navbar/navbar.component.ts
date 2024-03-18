import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/features/auth/models/user.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user1?:user;
  constructor(private auth:AuthService,private router:Router){}
  ngOnInit(): void {
      this.auth.userStatus().subscribe({
        next:(response)=>{
         this.user1=response;
        }
      });
      this.user1=this.auth.getUser();
  }

  onLogout(){
    this.auth.logout();
  this.router.navigateByUrl('/');
  }
}
