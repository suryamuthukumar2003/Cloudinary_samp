
import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className='App'>
      <h1>Upload files Cloudinary Service using MERN stack</h1>
      <Link to="/">Home</Link> | <Link to="upload">Upload</Link> | <Link to="secure-upload">Secure Upload</Link>
      <br />
      <br />
      <Outlet/>
    </div>
  )
}

export default App
