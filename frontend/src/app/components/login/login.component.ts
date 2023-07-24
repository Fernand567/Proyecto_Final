import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserI } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  constructor(private authService:AuthService,private router:Router) {
   
  }

  
  ngOnInit() {
    
  }


   onLogin(form: NgForm): void {
    this.authService.login(form.value).subscribe(res => {
      // Verificamos el campo "cargo" en la respuesta
      const cargo = res.dataUser.role;

      // Redirigimos a la ruta correspondiente según el tipo de usuario
      if (cargo === 'admin') {
        this.router.navigateByUrl('admin-page');
        console.log("entro admin");
      } else if (cargo === 'operator') {
        this.router.navigateByUrl('operator-page');
        console.log("entro operador");
      } else {
        // En caso de que el tipo de usuario no esté definido o sea otro valor, redirigimos a una página de error o algún otro comportamiento adecuado.
        // Puedes manejar esto de acuerdo a tus necesidades.
        this.router.navigateByUrl('/error');
      }
    });

  }
}

