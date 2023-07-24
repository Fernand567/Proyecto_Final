export interface JwtResponseI {

    dataUser:{
        id:number,
        name:string,
        email:string,
        role:string,
        accessToken:string,
        expiresIn:string
    }
}
