import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './Store/Store.js'
import { Provider } from 'react-redux' 
import { createBrowserRouter  , RouterProvider} from 'react-router-dom'
import Home from './Components/Home.jsx'
import Login from './Components/Login.jsx'
import SignUp from './Components/SignUp.jsx'
import AuthLayout from './AuthLayout.jsx'
import Addpost from './Components/Addpost.jsx'
import Puppies from './Components/Puppies.jsx'
import Post from './Components/Post.jsx'
import Userposts from './Components/Userposts.jsx'


const Router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
           <Login/> 
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication = {false}> 
            <SignUp/>
          </AuthLayout>
        )
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication = {true}>
           <Addpost/>
          </AuthLayout>
        )
      },
      {
        path: "/puppies",
        element: (
          <AuthLayout authentication = {true}>
            <Puppies/>
          </AuthLayout>
         
        )
      },
      {
        path: "/puppies/post/:PostId",
        element: (
          <AuthLayout>
            <Post/>
          </AuthLayout>
        )
      },
      {
        path: "/your-posts",
        element: (
          <AuthLayout authentication = {true}>
            <Userposts/>
          </AuthLayout>
        )
      }
    ]
  }

])




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
<RouterProvider router={Router}>
</RouterProvider>
    </Provider>
  </StrictMode>,
)
