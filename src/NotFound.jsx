import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
    const navigate=useNavigate()
  return (
    <div>
        <center>
            <img src="https://static.vecteezy.com/system/resources/previews/011/314/460/non_2x/illustrations-frustrated-expression-business-man-for-oops-404-error-design-concept-landing-page-vector.jpg"
             alt="error" width='500px'/>
             <button onClick={()=>navigate('/')}>Go to HomePage</button>
        </center>
    </div>
  )
}
export default NotFound