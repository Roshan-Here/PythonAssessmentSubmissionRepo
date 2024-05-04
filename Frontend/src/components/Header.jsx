import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faClockRotateLeft} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='flex justify-between bg-gradient-to-t from-neutral-700 to-slate-200 w-full h-16 items-center overflow-hidden rounded-b-2xl'>
        <div className='p-3 text-3xl text-black'>
            <Link to="/">
              <FontAwesomeIcon className='' icon={faGithub} /> Github
            </Link>
          </div>
        <div className='text-xl text-black p-3'>
          <Link to="/">
            Recent Search <FontAwesomeIcon icon={faClockRotateLeft} />
          </Link>
        </div>
    </div>
  )
}
