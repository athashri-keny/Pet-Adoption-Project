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
   

async CreatePost({Petname  , About , Location , UserId , PetImage, PostId , Gender , isVaccinated , AGE , Breed , Size , AnimalType , Neutered , Email , number}){
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
           isVaccinated , 
           AGE,
           Breed,
           Size,
           AnimalType,
           Neutered,
           Email,
           number
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

async GetPostLandingPage() {
    try {
        const response = await this.Database.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            [Query.limit(3)]
        )
        return response
    } catch (error) {
        console.error("Error while fetching the landing posts " , error)
    }
}


async GetPostsbyuser(UserId) {
    try {
        const respones = await this.Database.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
           [
                Query.equal('UserId', UserId) 
            ]
            )
        return respones
    } catch (error) {
        console.error("Error while fetching the user posts")
    }
}

async GetPostById (PostId) {
    try {
        const respone = await this.Database.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            PostId
        ) 
        return respone
    } catch (error) {
        console.log("Error while fetching the post by id" , error)
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

 GetFilePreview (FileId) {
     return     this.storage.getFileView(conf.appwriteBucketId, FileId)
  
        } catch (error) {
        console.error("error While PreViwing the File" , error)
    }
}





const DatabaseServicee = new DatabaseService()

export default DatabaseServicee 