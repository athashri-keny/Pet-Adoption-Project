import conf from "../Conf/Conf";
import { Client , Account , ID } from "appwrite";


class Auth {
    client = new Client()
   account;

   constructor() {
   this.client
      .setEndpoint(conf.appwriteurl)
   .setProject(conf.appwriteProjectId)
  
   this.account = new Account(this.client)
  
   }

async CreateAccount({email , password , name }) {
    try {
         const respone =  await this.account.create(ID.unique() , email , password, name)
                   await this.account.createEmailPasswordSession(email, password);
    return respone , this.account.get() 
    } catch (error) {
        console.log("Error occured While signing in contact Developer" , error)
    }
}

async LoginUser({email , password}){
    try {
        return await this.account.createEmailPasswordSession(email , password)
    } catch (error) {
        console.error("Error occured while login")
    }
}

async GetCurrentUser() {
    try {
        return this.account.get()
    } catch (error) {
        console.error("Error while getting the current User" , error)
    }
}

async LogoutUser() {
   try {
     await this.account.deleteSessions()
   } catch (error) {
    console.error("Error while Logging out" , error)
   }
}

}

const AuthService = new Auth()

export default AuthService

