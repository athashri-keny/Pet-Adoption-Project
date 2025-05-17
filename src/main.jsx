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
           <Login/> {/*children*/}
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
