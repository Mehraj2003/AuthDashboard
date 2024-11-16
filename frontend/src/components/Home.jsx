import React ,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState('')


  const token = JSON.parse(localStorage.getItem('token'))

  const fetchData = () => {

      const header = {
          headers: {
              Authorization: `Bearer ${token}`
          }
      }

      axios.post('http://localhost:5000/user/profile', {}, header)
          .then((res) => {
              setLoading(false)
              setData(res.data.data)
              console.log("User data fetched", res);
          })
          .catch((err) => {
              console.log("Error while fetch data", err)
              setLoading(false)
          })
  }

  console.log("data", data)

  useEffect(() => {
      fetchData()
  }, [])

  
  return (
    <div className='flex flex-col space-y-5 h-screen items-center justify-center bg-green-200'>
     <div className='flex space-x-5 font-serif font-bold text-3xl'>Welcome to my Dashboard {data.name}</div>
      <div className='flex space-x-5 '>
      <Link  className="flex  justify-center w-fit py-2 disabled:opacity-70 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50" to='/login'>Login</Link>
      <Link  className="flex  justify-center w-fit py-2 disabled:opacity-70 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50" to='/register'>Sign up</Link>
      </div>

      
      </div>
  )
}

export default Home