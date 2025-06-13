import { useEffect, useState } from 'react'
import DatabaseServicee from '../appwrite/PicConfig'
import AuthService from '../appwrite/Auth'


function Userposts() {
const [post , setposts] = useState([])
const [deletemsg , setdeletemsg] = useState(false)


useEffect(() => {
 const fetchPost =  async() => {
    try {
           const userdata = await AuthService.GetCurrentUser()
        const UserId = userdata.$id
         const response = await DatabaseServicee.GetPostsbyuser(UserId)
        setposts(response.documents)
    } catch (error) {
        console.error("Error while fetching the posts " , error)
    }
 }
    fetchPost()   
} , [])

const deletePost = async(ImageId) => {
  setdeletemsg(false)
    try {
        await DatabaseServicee.DeletePost(ImageId)
        console.log("Image deleted Sucessfully")
        setTimeout(() => {
          setdeletemsg(true)
        }, 3000);
    } catch (error) {
        console.error("Error while deleteing the post" , error)
        setdeletemsg(false)
    }
}

  return (
    <div>
  {post.length === 0 ? (
    <p className="text-center mt-6 text-lg font-semibold">You haven't posted anything yet.</p>
  ) : (
    <div className="pl-16">
      <div className="p-3.5 flex flex-wrap gap-16">
        {post.map((post, index) => (
          <div key={index} className="flex ">
            <img
              src={DatabaseServicee.GetFilePreview(post.PetImage)}
              className="object-cover w-88 h-70 rounded-t-xl hover:transition-all duration-300 rounded-2xl"
              alt="Pet"
            />
            <div className="p-6">
              <h1 className="font-rubik text-xl font-semibold mb-2">{post.Petname}</h1>
              <p className="font-rubik text-sm text-gray-700 whitespace-pre-line mb-4">{post.About}</p>
              {deletemsg ? (
               <div>
                <p className='font-rubik text-2xl text-green-600'> Post Deleted Sucessfully</p>
                 </div>
              ) : (
                <div> 
  <button
  onClick={() => deletePost(post.PostId)}
  className="bg-red-500 rounded-2xl p-2 text-white"
>
  Delete
</button>
                </div>
              )}
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