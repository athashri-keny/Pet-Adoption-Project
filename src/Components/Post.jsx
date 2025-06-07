import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import DatabaseServicee from '../appwrite/PicConfig'
import AuthService from '../appwrite/Auth'
import { useSelector } from 'react-redux'

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
  <div>
    {post.length === 0 && (
      <p>No posts yeet</p>
    )}
    <div>
    <img
    src= {DatabaseServicee.GetFilePreview(Imageid)}
    className='object-cover'
    />
    </div>
    <div>
      <h1>
        {`Meet ${post?.Petname}`}
      </h1>
      <p>Gender: {post?.Gender }</p>
     <p >Breed: {post?.Breed}</p>
       <p>Neutered: {post?.Neutered}</p>
       <p>Vaccinated: {post?.isVaccinated ? "True" : "false "}</p>
       <p>Age: {post?.AGE}</p>
       <p>Size: {post?.Size}</p>
       <p>Location: {post?.Location}</p>
       <div >
        <p>About: {post.About}</p>
        <Link className = "bg-red-400 rounded-2xl p-1 text-2xl"  >Apply here Today</Link>
       </div>
    </div>
      </div>
  </>
);


}

export default Post