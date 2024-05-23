import React from 'react'
import { Link } from 'react-router-dom';

function NotFound() {
  return (
   <>
   
   <div className='notfound-content'>
   <h2 className="notfound">
    خطأ 404 , الصفحة غير موجودة 
   </h2>
   <Link to="/home">اذهب الى الرئيسية </Link>
   </div>
   
   
   </>
  )
}

export default NotFound
