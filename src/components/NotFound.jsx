import React from 'react'
import { Link } from 'react-router-dom';

function NotFound() {
  return (
   <>
   
   <div className='notfound-content'>
   <h2 className="notfound">
   Error 404  Not found 

   </h2>
   <Link to="/home">Go to home </Link>
   </div>
   
   
   </>
  )
}

export default NotFound
