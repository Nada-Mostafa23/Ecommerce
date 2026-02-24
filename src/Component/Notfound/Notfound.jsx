import React from 'react'
import notFound from '../../Assets/images/Capture.jpeg'

export default function Notfound() {
  return (
    <div>
        <div className="contaier d-flex justify-content-center align-items-center my-5 py-5" >
            <img src={notFound} className='w-50'  alt="notFound" />
        </div>
    </div>
  )
}
