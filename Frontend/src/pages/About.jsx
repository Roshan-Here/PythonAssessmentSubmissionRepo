import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios';
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import toast, { Toaster } from 'react-hot-toast';
import { faUserShield } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons';

function About() {
    const [repodata, setrepodata] = useState([])
    const { link } = useParams()
    let decodedlink = decodeURIComponent(link)
    console.log(decodedlink)

    const getRepoData = async() =>{
        try{
            let data = {
                "userquery": decodedlink
              }
            let resp = await axios.post(`/api/repo/`,data)
            console.log(resp.data)
            setrepodata(resp.data)
        }
        catch(error){
            toast.error(`Err : ${error}`)
        }
    }

    useEffect(()=>{
        if(decodedlink){
            getRepoData()
        }
    },[decodedlink])

    console.log(repodata)

  return (
    <div className='bg-gradient-to-r from-slate-500 to-stone-400 overflow-y-auto'>
      <Header/>
      <Toaster/>
        <div className='flex flex-col items-center w-full h-screen'>
            <div className='mt-16'>
                <div className="hero h-auto bg-base-200  rounded-2xl">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="avatar">
                        <div className="w-36 rounded-full">
                            <img src={`${repodata.avathar_url}`} />
                        </div>
                    </div>
                    <div>
                    <h1 className="text-3xl font-bold">{repodata.repo_name}
                    </h1>
                    {
                        repodata.language===null?"":
                        <div className='badge badge-accent text-slate-900'>{repodata.language}</div>    
                    }
                    <div className='py-3'>
                        <div>
                            <FontAwesomeIcon icon={faUserShield} /> {repodata.owner_name}
                        </div>
                        <div>
                            <FontAwesomeIcon className='text-lg text-yellow-600' icon={faStar} /> {repodata.stars_count}
                        </div>
                        <div>
                        <div className="badge badge-outline">Fork {repodata.forks_count}</div> 
                        </div>
                    </div>
                    <p className="py-6">{repodata.description}</p>
                    <a href={`${repodata.html_url}`} target='_blank'>
                        <button className="btn btn-primary link link-hover">Go to Repository</button>
                    </a>
                    </div>
                </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default About

