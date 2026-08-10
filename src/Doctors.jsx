import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Doctors() {
    const [doctors,setDoctors]=useState([])
    const [search,setSearch]=useState('')
    const [deBouncing,setDebouncingSearch]=useState('')

    useEffect(()=>{
        let trigger=setTimeout(()=>{
            setDebouncingSearch(search)
        },1000)
        return ()=>clearTimeout(trigger)
    })

    async function fetchdata() {
        try{
            let res = await axios.get('https://doc-back.onrender.com/doctors');
            console.log(res);
            setDoctors(res.data);
        }
        catch(error){
            console.log(error);
        }
        finally{
            console.log('Last');
        }
    }
    useEffect(()=>{fetchdata()},[])

    const filterDoctors = doctors.filter((doctorinfo)=>{
        let query=deBouncing.toLowerCase(search)
        return doctorinfo.name.toLowerCase().includes(query.toLowerCase()) ||
        doctorinfo.gender.toLowerCase().includes(query.toLowerCase()) ||
        doctorinfo.age.toLowerCase().includes(query.toLowerCase()) ||
        doctorinfo.specialization.toLowerCase().includes(query.toLowerCase()) ||
        doctorinfo.salary.includes(query)
    })

  return (
    <div>
        <center>
            <input type="text" placeholder='Search Doctors Details' 
            value={search}
            onChange={(m)=>setSearch(m.target.value)}/>
        </center>
        {
            doctors.length===0?
            (<><h1>Doctors Data not available</h1></>):
            (<><h1>Doctors Information</h1>
                <div className='patient-card'>
                    {
                        filterDoctors.map((v,i)=>(
                            <div key={v.id}>
                                <h2>Name: {v.name}</h2>
                                <h3>Salary: {v.salary}</h3>
                                <h3>Gender: {v.gender}</h3>
                                <h3>Age: {v.age}</h3>
                                <h3>Specialization: {v.specialization}</h3>
                            </div>
                        ))
                    }
                </div>
                </>
            )
        }
    </div>
  )
}

export default Doctors