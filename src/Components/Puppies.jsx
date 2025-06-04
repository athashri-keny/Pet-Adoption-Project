import  { useEffect, useState } from 'react'
import DatabaseServicee from '../appwrite/PicConfig'
import PuppiesPlaying from '../assets/Pics/PuppiesPlaying.jpg'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
// things to do
// fetch the gets posts from databaseservicee
// display them here 
// when you click the  single post it should redirect to the it with post.id  
// add link of the post 


function Puppies() {
const [posts , setposts] = useState([])
const [loading , setloading ] = useState(false)


  useEffect(() => {
    const fetchpost = async() => {
        setloading(true)
        try {
            const response = await DatabaseServicee.getPosts()
            setposts(response.documents)
             console.log("Fetched sucessfully" , response)  
        } catch (error) {
            console.error("error while fetching the data from bacckend" , error)
        }
    }
        fetchpost()
  } , [])


const dogs = () => {
  const result = posts.filter((post) => post.AnimalType === "Dog" )
console.log( "Dogs = " , result)
}
const cats = () => {
  const result = posts.filter((post) => post.AnimalType === "Cat")
  console.log( "Cats" ,result)
}
const other = () => {
  posts.filter((post) => post.AnimalType === "Other")
}




  return (
   <div className='bg-white'>
  <img
    src={PuppiesPlaying}
    className="w-full h-auto object-cover"
    alt="Puppies"
  />
<div className="absolute inset-0 p-35 text-white bg-black/30 pointer-events-none ">
    <h2 className="text-6xl font-rubik">Puppies</h2>
    <p className="text-lg pt-2">Dog Training & Breeding Professionals</p>
  </div>
  <div className=' m-15  flex justify-center gap-12 text-sm font-rubik'>
  <button className='bg-[#ef233c] rounded-4xl p-4 text-white' onClick={cats()} >Cats</button>
  <button className='bg-[#ef233c] rounded-4xl p-4 text-white' onClick={dogs()}>Dogs</button>
  <button className='bg-[#ef233c] rounded-4xl p-4 text-white' onClick={other()}>Others</button>
  </div>
  <div>
   <div>
  {posts.map((post) => ( 
    <Link key={post.PostId} to={`post/${post.PostId}`}>
      <img
        src={DatabaseServicee.GetFilePreview(post.PetImage)}
        alt={post.Petname}
        className="object-cover w-64 h-64"
      />
    </Link>
  )
)}


   </div>
  </div>
</div>

  )
}

export default Puppies