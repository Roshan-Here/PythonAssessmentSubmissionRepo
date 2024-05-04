import React, { useState } from 'react'
import Header from '../components/Header'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

function Home() {
  const [searchval,setserachval] = useState('')
  const [incomming, setincomming] = useState('')

  const handlechange = (e)=>{
    let val = e.target.value
    setserachval(val)
  }
  console.log(searchval)

  const handleOnclick = async()=>{
    try{
      let data = {
        "userquery": searchval
      }
      const resp = await axios.post(`/api/listrepo/`, data)
      console.log(resp.data)
    }
    catch(error){
      toast.error(`Err: ${error}`)
    }
  }

  return (
    <div className='bg-gradient-to-r from-slate-500 to-stone-400 overflow-hidden'>
      <Header/>
      <Toaster/>
      <div className='flex flex-col items-center w-full h-screen'>
        <div className="flex flex-row p-3 form-control">
            <input 
              onChange={handlechange}
              type="text" 
              placeholder="Search Repository Name"
               className="input input-bordered w-56 md:w-auto" />
            <button 
                onClick={handleOnclick}
                className='p-3 bg-primary rounded-lg text-black'
                type="submit">Submit
            </button>
        </div>
        <div>Heloo</div>
        <div>Heloo</div>

      </div>
    </div>
  )
}

export default Home
