import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShareFromSquare, faStar } from '@fortawesome/free-regular-svg-icons'
import { Link, useNavigate } from 'react-router-dom';

function Card({name,desc,forks,stars,full_name,language,updated}) {
    const navigate = useNavigate()
    const formatDate=(dateString)=> {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
    
        const date = new Date(dateString);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
    
        const monthName = months[monthIndex];
    
        return `${day} ${monthName} ${year}`;
    }

    const redirctbutton =()=>{
        navigate(`/about/${encodeURIComponent(full_name)}`)
    }

  return (
    <div className='m-2'>
        <div className='card w-full bg-base-100 shadow-2xl'>
            <div className='card-body'>
                <h1 className='card-title'>
                    <button onClick={redirctbutton}>
                        <FontAwesomeIcon icon={faShareFromSquare} />
                        {name}
                    </button>
                    {
                        language===null?"":
                        <div className='badge badge-accent text-slate-900'>{language}</div>    
                    }
                </h1>
                <p >{desc}</p>
                <div className='card-actions justify-between'>
                    <div>
                        <FontAwesomeIcon className='text-lg text-yellow-600' icon={faStar} /> {stars}
                    </div>
                    <div className="badge badge-outline">Fork {forks}</div> 
                    <div className="badge badge-outline">updated at : {formatDate(updated)}</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card
