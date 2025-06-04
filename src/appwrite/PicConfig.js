import conf from "../Conf/Conf";
import { Client , ID , Databases , Storage , Query } from "appwrite";


class DatabaseService{
    Client = new Client()
    Database;
    storage

    constructor() {
        this.Client
        .setEndpoint(conf.appwriteurl)
        .setProject(conf.appwriteProjectId)
         this.Database = new Databases(this.Client)
        this.storage = new Storage(this.Client)
    }
   

async CreatePost({Petname  , About , Location , UserId , PetImage, PostId , Gender , Vaccinated , AGE , Breed , Size , AnimalType}){
  try {
     return await this.Database.createDocument(conf.appwriteDatabaseId , conf.appwriteCollectionId , PostId,
        {
         Petname,
         About,
        Location,
        UserId,
           PetImage,
           PostId,
           Gender,
           Vaccinated , 
           AGE,
           Breed,
           Size,
           AnimalType
         }
     )
  } catch (error) {
    console.error("Error while creating post " , error)
  }
}


async DeletePost(PostId) {
    try {
        return await this.Database.deleteDocument(conf.appwriteDatabaseId , conf.appwriteCollectionId , PostId)
    } catch (error) {
        console.error("Error While Deleting the post ")
    }
}

async UpdatePost(PostId , {Petname , About , Location , UserId }) {
    try {
        return await this.Database.updateDocument(conf.appwriteCollectionId , conf.appwriteDatabaseId , PostId,
            {
                Petname,
                About,
                Location,
                UserId
            }
         )
    } catch (error) {
        console.error("Error while Updating Post")
    }
}

async getPosts() {
    try {
       const respone = await this.Database.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
       ) 
       return respone
    } catch (error) {
        console.error("error fetching post" , error)
    }
}

// For database Storge
async uploadFile(File) {
    try {
        return await this.storage.createFile(conf.appwriteBucketId , ID.unique() , File)
    } catch (error) {
        console.error("Error while Uploading File" , error)
    }
}


async DeleteFile(FileId) {
    try {
        await this.storage.deleteFile(conf.appwriteBucketId , FileId)
    } catch (error) {
        console.error("Error While Deleting the File ")
    }
}

async GetFilePreview (FileId) {
    try {
           if (!FileId) {
  throw new Error("FileId is required");
}
     return    await this.storage.getFilePreview(conf.appwriteBucketId, FileId)
  
        } catch (error) {
        console.error("error While PreViwing the File" , error)
    }
}

}



const DatabaseServicee = new DatabaseService()

export default DatabaseServicee 