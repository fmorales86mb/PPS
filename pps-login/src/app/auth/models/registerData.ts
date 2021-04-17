import { LoginData } from "./loginData";

export class RegisterData{
    
    public genero: string;
    public nombre:string;
    public rol:string;
    public loginData:LoginData;
    
    constructor(){
        this.loginData = new LoginData();
    }
}
