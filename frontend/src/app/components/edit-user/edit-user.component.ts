import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserI } from 'src/app/models/user';
import { UserService } from 'src/app/auth/user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  user: UserI | undefined;
  editForm: FormGroup; // Agrega una propiedad para el formulario

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder // Agrega el FormBuilder
  ) {
    // Inicializa el formulario en el constructor
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      // Agrega más campos según los datos que desees editar
    });
  }

  ngOnInit(): void {
    // Obtenemos el userId desde la URL
    const userId = this.route.snapshot.paramMap.get('userId');

    // Utilizamos el userId para obtener la información del usuario a editar
    if (userId !== null) {
      this.userService.getUserById(userId).subscribe(
        (user) => {
          this.user = user;
          // Asignamos los datos del usuario al formulario de edición aquí
          this.editForm.patchValue({
            name: user.name,
            email: user.email,
            role:user.role
            // Asigna más campos según los datos del usuario que desees editar
          });
        },
        (error) => {
          console.error('Error al obtener los datos del usuario:', error);
        }
      );
    } else {
      console.log('no funcoo');
    }
  }

  // Método onSubmit para guardar los cambios
  onSubmit(): void {
    // Verificar si el formulario es válido
    if (this.editForm.valid) {
      // Obtener los valores del formulario
      const formData = this.editForm.value;
  
      // Obtener el ID del usuario actual
      const userId = this.route.snapshot.paramMap.get('userId');
  
      // Verificar si se obtuvo el ID del usuario correctamente
      if (userId !== null) {
        // Enviar los cambios al servidor utilizando el servicio UserService
        this.userService.updateUser(userId, formData).subscribe(
          (updatedUser) => {
            // Si la actualización es exitosa, redirigir a la página de administración
            console.log('Usuario actualizado exitosamente:', updatedUser);
            this.router.navigateByUrl('auth/admin-page');
          },
          (error) => {
            // Si ocurre un error, mostrar el mensaje de error
            console.error('Error al actualizar el usuario:', error);
          }
        );
      } else {
        console.log('No se proporcionó un ID de usuario.');
      }
    }
  }

  // Método para cancelar la edición y redirigir a la página anterior
  cancelEdit(): void {
    // Redirigir a la página anterior
    this.router.navigate(['/auth/admin-page']);
  }
}
