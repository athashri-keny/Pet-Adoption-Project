import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import DatabaseServicee from '../appwrite/PicConfig'
import AuthService from '../appwrite/Auth'
import { useSelector } from 'react-redux'
import About from '../Footer/About'

function Post() {
const [post , setpost] = useState([])
const [Imageid , setImageId] = useState("")
// gets posts and display them using get posts
// 
const userdata = useSelector((state) => state.Auth.userdata)
console.log(userdata)

const {PostId} = useParams()



useEffect(() => {

const fetchpost = async() => {
try {
  const response = await DatabaseServicee.GetPostById(PostId)
  console.log(response)
  setpost(response)

  for (const key in response) {
  if (key === "PetImage") {
    setImageId(response[key])
    break  
  }
  }
} catch (error) {
  console.error("Error while fetching the posts" , error)
}
}
fetchpost()
} , [PostId])



return (
  <>
 
 <div className="flex flex-col md:flex-row bg-gray-100 rounded-xl shadow-md p-6 md:p-12 gap-10 items-center">

   <div className="md:w-1/2 w-full flex justify-center">
    <img
      src={DatabaseServicee.GetFilePreview(Imageid)}
      alt={post?.Petname}
      className="rounded-xl object-cover w-full h-[400px] max-w-md"
    />
  </div>
  <div className="md:w-1/2 w-full">
    <h1 className="text-4xl font-extrabold font-rubik text-gray-800 mb-4">
      Meet {post?.Petname}
      <span className="block w-20 h-1 bg-yellow-500 mt-2 rounded-full"></span>
    </h1>

    <div className="grid grid-cols-2 gap-y-2 text-gray-700 text-md font-rubik">
      <p><strong>Gender:</strong> {post?.Gender}</p>
      <p><strong>Breed:</strong> {post?.Breed}</p>
      <p><strong>Neutered:</strong> {post?.Neutered}</p>
      <p><strong>Vaccinated:</strong> {post?.isVaccinated ? "Yes" : "No"}</p>
      <p><strong>Age:</strong> {post?.AGE}</p>
      <p><strong>Size:</strong> {post?.Size}</p>
      <p><strong>Location:</strong> {post?.Location}</p>
    </div>

    <p className="mt-6 text-gray-600 leading-relaxed">
      {post?.About || "This pet is looking for a loving home. Give them a chance to be your next best friend!"}
    </p>
    <div>
      <p className='p-3 font-rubik text-xl'>User Contact Details</p>
       <p className='font-rubik '><strong>Email:</strong > {post?.Email}</p>
    </div>
    <Link
      to="/apply"
      className="inline-block mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold transition-all duration-200"
    >
      Apply Today →
    </Link>
  </div>

  {/* Image - Right Side */}
  
</div>
<About/>

  </>
);


}

export default Post