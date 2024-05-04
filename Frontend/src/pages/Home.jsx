import React, { useState } from 'react'
import Header from '../components/Header'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Card from './../components/Card';

function Home() {
  const [searchval,setserachval] = useState('')
  const [incomming, setincomming] = useState([])

  const [currpage, setcurrpage] = useState(1)
  const Recordsperpage = 3
  const lastIndex = currpage * Recordsperpage
  const firstIndex = lastIndex - Recordsperpage
  const currentpost = incomming.slice(firstIndex,lastIndex)
  const Npages = Math.ceil(incomming.length / Recordsperpage)
  const numbers = [...Array(Npages+1).keys()].slice(1)

  const prevPage=()=>{
    if(currpage!==firstIndex){
      setcurrpage(currpage-1)
    }
  }

  const changePage=(id)=>{
    setcurrpage(id)
  }

  const nextPage=()=>{
    if(currpage!==lastIndex){
      setcurrpage(currpage+1)
    }
  }

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
      console.log(resp.data["repositories"])
      setincomming(resp.data["repositories"])
      toast.success("Successfully fetched data!")
    }
    catch(error){
      toast.error(`Err: ${error}`)
    }
  }

  console.log(incomming)

  return (
    <div className='bg-gradient-to-r from-slate-500 to-stone-400 overflow-y-auto'>
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
        <div>
          {
            currentpost.map((val)=>(
              // <p>{val.name}</p>
              <Card
                key={val.id}
                name={val.name}
                desc={val.description}
                forks={val.forks}
                stars={val.stars}
                full_name={val.full_name}
                language={val.language}
                updated = {val.updated_at}
              />
            ))
          }
        </div>

      </div>

      {/* pagination part */}
          <div className='flex justify-center items-center'>
            <div className="join">
              <button onClick={prevPage} className="join-item btn">«</button>
              {
                numbers.map((n,i)=>(
                  <button onClick={()=>changePage(n)} key={i} className={`join-item btn btn-md ${currpage===n?'btn-active':""}`}>{n}</button>
                ))
              }
              <button onClick={nextPage} className="join-item btn">»</button>
            </div>
          </div>
    </div>
  )
}

export default Home
