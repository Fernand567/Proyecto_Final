export class usuarios{
    _id?: number;
    nombre:string;
    correo:string;
    contrasenia: string;
    cargo:string;

    constructor(nombre:string,correo:string,contrasenia:string,cargo:string){
        this.nombre=nombre;
        this.cargo=cargo;
        this.correo=correo;
        this.contrasenia=contrasenia;
    }
}