import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChangePasswordService } from 'src/app/auth/change-password.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  userIdFromToken: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private changePasswordService: ChangePasswordService,
    private route: ActivatedRoute,
    private router:Router
  ) {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Obtiene el token almacenado en el localStorage
    const token = localStorage.getItem('ACCESS_TOKEN');
    console.log(token);

    // Decodifica el token para obtener los datos del usuario
    const decodedToken: any = jwt_decode(token || '');
    console.log(decodedToken);


    // Extrae el ID del usuario desde el token
    this.userIdFromToken = decodedToken.id;
    console.log(this.userIdFromToken);
  }

  cancelEdit(): void {
    // Redirigir a la página anterior
    this.router.navigate(['/auth/operator-page']);
  }
  
  onSubmit(): void {
    if (this.changePasswordForm.invalid) {
      console.log('sadasodas');
      return;
    }

    const userId = this.userIdFromToken;
    const newPassword = this.changePasswordForm.get('newPassword')?.value;
    

    if (newPassword !== this.changePasswordForm.get('confirmPassword')?.value) {
      // Las contraseñas nuevas no coinciden
      return;
    }

    this.changePasswordService.updatePassword(userId!, newPassword).subscribe(
      () => {
        // Contraseña actualizada exitosamente
        // Puedes mostrar una notificación o redirigir a otra página
        console.log('gola')
      },
      (error) => {
        // Ocurrió un error al cambiar la contraseña
        // Puedes mostrar un mensaje de error al usuario
      }
    );
  }
}
