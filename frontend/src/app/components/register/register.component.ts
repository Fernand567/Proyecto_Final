import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserI } from 'src/app/models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  constructor(private authService: AuthService, private router:Router){

  }

  ngOnInit(){

  }

  onRegister(form:NgForm):void{
    this.authService.register(form.value).subscribe(res=>{
      this.router.navigateByUrl('/auth');
    })
    console.log('Register',form.value)
  }
  cancelEdit(): void {
    // Redirigir a la página anterior
    this.router.navigate(['/auth/admin-page']);
  }
}
