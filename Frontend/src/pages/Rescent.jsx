import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Header from '../components/Header';
import axios from 'axios';
import RecentCard from '../components/RecentCard';

function Rescent() {
    const [incomming, setincomming] = useState([])

    const [currpage, setcurrpage] = useState(1)
    const Recordsperpage = 3
    const lastIndex = currpage * Recordsperpage
    const firstIndex = lastIndex - Recordsperpage
    const currentpost = incomming.slice(firstIndex,lastIndex)
    const Npages = Math.ceil(incomming.length / Recordsperpage)
    const numbers = [...Array(Npages+1).keys()].slice(1)
  

    const grabSavedRepos = async()=>{
        try{
            const resp = await axios.get('/api/savedrepo/')
            console.log(resp.data["results"])
            setincomming(resp.data["results"]) 
        }
        catch(error){
            toast.error(`Err : ${error}`)
        }
    }

    console.log(incomming)

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

    useEffect(()=>{
        grabSavedRepos()
    },[])

  return (
    <div className='bg-gradient-to-r from-slate-500 to-stone-400 overflow-y-auto'>
      <Header/>
      <Toaster/>
        <div className='flex flex-col md:flex-row items-center w-full h-screen'>
            {
                currentpost.map((val)=>(
                    <RecentCard
                    key={val.id}
                    data = {val}
                    />
                ))
            }

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

export default Rescent
