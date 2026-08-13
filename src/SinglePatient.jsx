import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function SinglePatient() {
    const [patients, setpatients] = useState([])
    const { id } = useParams()

    async function fetchdata() {
        try {
            let res = await axios.get('https://doc-back.onrender.com/patients');
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
    useEffect(() => { fetchdata() }, [])
    return (
        <div>
            SinglePatient

            <h2>Patient name: {patients.name}</h2>
            <h3>Weight: {patients.weight}</h3>
            <h3>Gender: {patients.gender}</h3>
            <h3>Age: {patients.age}</h3>
            <h3>Disease: {patients.disease}</h3>
            <h3>Doctor name: {patients.doctor?.name}</h3>
        </div>
    )
}

export default SinglePatient