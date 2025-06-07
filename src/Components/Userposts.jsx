import React, { useEffect, useState } from 'react'
import DatabaseServicee from '../appwrite/PicConfig'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AuthService from '../appwrite/Auth'


function Userposts() {
const [post , setposts] = useState([])
const navigate = useNavigate()



useEffect(() => {
 const fetchPost =  async() => {
    try {
           const userdata = await AuthService.GetCurrentUser()
        console.log(userdata)
        const UserId = userdata.$id
         const response = await DatabaseServicee.GetPostsbyuser(UserId)
         console.log(response)
        setposts(response.documents)
        console.log("User post fetched Sucesfully" , response)
       
    } catch (error) {
        console.error("Error while fetching the posts " , error)
    }
 }
    fetchPost()   
} , [])

const deletePost = async(ImageId) => {
    try {
        await DatabaseServicee.DeletePost(ImageId)
        console.log("Image deleted Sucessfully")
    } catch (error) {
        console.error("Error while deleteing the post" , error)
    }
}

  return (
    <div>
  {post.length === 0 ? (
    <p className="text-center mt-6 text-lg font-semibold">You haven't posted anything yet.</p>
  ) : (
    <div className="pl-16">
      <div className="p-3.5 flex flex-wrap gap-10">
        {post.map((post, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={DatabaseServicee.GetFilePreview(post.PetImage)}
              className="object-cover w-64 h-64 rounded-3xl"
              alt="Pet"
            />
            <div className="mt-2 text-center">
              <h1 className="font-rubik text-2xl p-3 mb-1">{post.Petname}</h1>
              <p className="font-rubik p-3 mb-9">{post.About}</p>
              <button
                onClick={() => deletePost(post.PostId)}
                className="bg-red-500 rounded-2xl p-2 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
</div>

)
}

export default Userposts