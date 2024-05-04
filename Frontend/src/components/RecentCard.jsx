import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserShield } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons';

function RecentCard({data}) {
  return (
<div className='w-full m-3'>
    <div className="hero h-auto bg-base-200  rounded-2xl">
        <div className="hero-content flex-col lg:flex-row">
            <div className="avatar">
                <div className="w-36 rounded-full">
                    <img src={`${data.avathar_url}`} />
                </div>
            </div>
            <div>
                <h1 className="text-3xl font-bold">{data.repo_name}
                    {
                        data.language===null?"":
                        <div className='badge badge-accent text-slate-900'>{data.language}</div>    
                    }
                </h1>
                <div className='py-3'>
                    <div>
                        <FontAwesomeIcon icon={faUserShield} /> {data.owner_name}
                    </div>
                    <div>
                        <FontAwesomeIcon className='text-lg text-yellow-600' icon={faStar} /> {data.stars_count}
                    </div>
                </div>
                    <p className="py-6">{data.description}</p>
                <a href={`${data.html_url}`} target="_blank">
                    <button className="btn btn-primary link link-hover">Go to Repository</button>
                </a>
            </div>
        </div>
    </div>
</div>
  )
}

export default RecentCard
