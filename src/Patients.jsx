import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import { Link } from 'react-router-dom'

function Patients() {
    const [patients, setPatients] = useState([])
    const [search, setSearch]=useState('')
    const [deBouncing,setDebouncingSearch]=useState('')
    //setTimeout(500-search to get),cleartimeout(function clear) -time -no.of API
    // Calls
    useEffect(()=>{
        let trigger=setTimeout(()=>{
            setDebouncingSearch(search)
        },500)
        return ()=>clearTimeout(trigger)
    },[search])

    async function fetchData() {
        try {
            let response = await axios.get('https://doc-back.onrender.com/patients')
            // console.log(response.data);
            setPatients(response.data);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            console.log('At end');
        }
    }
    useEffect(() => { fetchData() }, [])

    const filterPatients = patients.filter((patientinfo) => {
        let query=deBouncing.toLowerCase(search)
        return patientinfo.name.toLowerCase().includes(query.toLowerCase()) ||
        patientinfo.doctor?.name.toLowerCase().includes(query.toLowerCase()) ||
        patientinfo.disease.toLowerCase().includes(query.toLowerCase()) ||
        patientinfo.gender.toLowerCase().includes(query.toLowerCase()) ||
        patientinfo.age.toLowerCase().includes(query.toLowerCase()) ||
        patientinfo.weight.includes(query)
    })
    return (
        <>
        <div>
            <center>
                <input type="text" placeholder='Search Patients Details'
                value={search}
                onChange={(e)=>setSearch(e.target.value)} />
            </center>
            {
                patients.length === 0 ?
                    (<>
                        <h1>Patients Data not available</h1></>) :
                    (<>
                        <h1>Patient Information</h1>
                        <div className='patient-card'>
                            {
                            filterPatients.map((v, i) => (
                                <div key={v.id}>
                                    <h2>Patient name: {v.name}</h2>
                                    <h3>Weight: {v.weight}</h3>
                                    <h3>Gender: {v.gender}</h3>
                                    <h3>Age: {v.age}</h3>
                                    <h3>Disease: {v.disease}</h3>
                                    <h3>Doctor name: {v.doctor?.name}</h3>
                                    <Link to={`/patients/${v.id}`}>View Patients</Link>
                                </div>
                            ))
                        }
                        </div>
                        </>)
            }
        </div>
        </>
    )
}

export default Patients