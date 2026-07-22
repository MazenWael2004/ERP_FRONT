export interface LoginFormData { // to define the shape of  loginData sent by user.....
                                
  username: string;
  password: string;
  remember: boolean;
}


export interface LoginRequest { // for the api.... 
  username: string;
  password: string;
}
