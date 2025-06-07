import  { useEffect, useState } from 'react'
import DatabaseServicee from '../appwrite/PicConfig'
import PuppiesPlaying from '../assets/Pics/PuppiesPlaying.jpg'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
// things to do
// fetch the gets posts from databaseservicee
// display them here 
// when you click the  single post it should redirect to the it with post.id  
// add link of the post 


function Puppies() {
const [Allposts , setAllposts] = useState([])
const [loading , setloading ] = useState(false)
const navigate = useNavigate()
const [filteredposts , setfilteredpost] = useState([])


  useEffect(() => {
    const fetchpost = async() => {
        setloading(true)
        try {
            const response = await DatabaseServicee.getPosts()
             setAllposts(response.documents)
            setfilteredpost(response.documents)
             console.log("Fetched sucessfully" , response)  
        } catch (error) {
            console.error("error while fetching the data from bacckend" , error)
        }
    }
   
    
        fetchpost()
  } , [])

 const dogs = () => {
  const result = Allposts.filter((post) => post.AnimalType === "Dog"  )
  setfilteredpost(result)
}

const cats = () => {
  const result = Allposts.filter((post) => post.AnimalType === "Cat")
 setfilteredpost(result)
}
const other = () => {
 const result =  Allposts.filter((post) => post.AnimalType === "Other")
 setfilteredpost(result)
}

const all = () => {
  const result = Allposts
  setfilteredpost(result)
}



  return (
   <div className='bg-white'>
  <img
    src={PuppiesPlaying}
    className="  object-cover"
    alt="Puppies"
  />
<div className="absolute inset-0 p-35 text-white pointer-events-none ">
    <h2 className="text-6xl font-rubik">Puppies</h2>
    <p className="text-lg pt-2">Dog Training & Breeding Professionals</p>
  </div>
  <div className="my-10 flex flex-wrap justify-center gap-6 text-sm font-rubik">
  <button
    className="bg-[#ef233c] hover:bg-[#d90429] transition-all duration-300 text-white rounded-full px-6 py-3 shadow-md hover:scale-105"
    onClick={() => all()}
  >
    ALL
  </button>
  <button
    className="bg-[#ef233c] hover:bg-[#d90429] transition-all duration-300 text-white rounded-full px-6 py-3 shadow-md hover:scale-105"
    onClick={() => cats()}
  >
    Cats
  </button>
  <button
    className="bg-[#ef233c] hover:bg-[#d90429] transition-all duration-300 text-white rounded-full px-6 py-3 shadow-md hover:scale-105"
    onClick={() => dogs()}
  >
    Dogs
  </button>
  <button
    className="bg-[#ef233c] hover:bg-[#d90429] transition-all duration-300 text-white rounded-full px-6 py-3 shadow-md hover:scale-105"
    onClick={() => other()}
  >
    Others
  </button>
</div>

  
  <div className='pl-16 '>
   <div className='p-3.5 flex content-evenly gap-29 l '>
  {filteredposts.map((post) => ( 
    <Link key={post.PostId} to={`/puppies/post/${post.PostId}` }>
         <img
        src={DatabaseServicee.GetFilePreview(post.PetImage)}
        className="object-cover w-64 h-64 rounded-3xl"
      />
      <div>
 <h1 className='font-rubik  text-2xl p-3 mb-1 '>{post.Petname}</h1>
 <p className='font-rubik  p-3 mb-9'>{post.About}</p>
      <button onClick={() => (navigate(`/post/${post.PostId} `))} className='bg-yellow-400 hover:bg-yellow-600 transition-all duration-300 text-white rounded-full px-4 py-2 shadow-md hover:scale-105"'>Learn More </button>
      </div>
    </Link>
  )
)}
   </div>
  </div>
</div>

  )
}

export default Puppies