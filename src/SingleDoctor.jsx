import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function SingleDoctor() {
    const [doctors, setdoctors] = useState([])
    const { id } = useParams()

    async function fetchdata() {
        try {
            let res = await axios.get('https://doc-back.onrender.com/doctors');
            console.log(res);
            setDoctors(res.data);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            console.log('Last');
        }
    }
    useEffect(()=>{fetchdata()},[])
    return (
        <div>
            SingleDoctor

            <h2>Doctor Name: {doctors.name}</h2>
            <h3>Salary: {doctors.salary}</h3>
            <h3>Gender: {doctors.gender}</h3>
            <h3>Doctor Age: {doctors.age}</h3>
            <h3>Specialization: {doctors.specialization}</h3>
            <h4>{doctors.email}</h4>
        </div>
    )
}

export default SingleDoctor