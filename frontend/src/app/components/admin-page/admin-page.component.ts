import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/auth/user.service';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit{
  users?: any[];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    );
  }

  editUser(userId: string): void {

    this.router.navigateByUrl(`/auth/edit-user/${userId}`);
    
  }
  
  deleteUser(user: any): void {
    this.userService.deleteUser(user._id).subscribe(
      (response) => {
        // Usuario eliminado exitosamente, actualiza la lista de usuarios
        this.getUsers();
      },
      (error) => {
        console.error('Error al eliminar el usuario:', error);
      }
    );
  }

  deleteUserConfirmation(user: any): void {
    const confirmation = window.confirm('¿Estás seguro de eliminar el usuario?');
    if (confirmation) {
      this.deleteUser(user);
    }
  }

}
