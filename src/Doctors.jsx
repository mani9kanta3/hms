import React, { captureOwnerStack, use, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import './App.css'
import { Link } from 'react-router-dom'

function Doctors() {
    const [doctors, setDoctors] = useState([])
    const [search, setSearch] = useState('')
    const [deBouncing, setDebouncingSearch] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        salary: '',
        gender: '',
        age: '',
        specialization: ''
    })
    const [editId, setEditId] = useState(null)

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if (editId) {
                const res = await axios.put(`https://doc-back.onrender.com/doctors/${editId}`, formData)
                console.log(res.data);
            }
            else {
                const res = await axios.post('https://doc-back.onrender.com/doctors', formData)
                console.log(res.data);
            }
            setFormData({
                name: '',
                salary: '',
                gender: '',
                age: '',
                specialization: ''
            })
            setEditId(false)
            await fetchdata()

        }
        catch (error) {
            console.log(error);
        }
        finally {
            console.log('Doctor Added');
        }
    }

    useEffect(() => {
        let trigger = setTimeout(() => {
            setDebouncingSearch(search)
        }, 1000)
        return () => clearTimeout(trigger)
    })

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
    useEffect(() => { fetchdata() }, [])

    const filterDoctors = useMemo(() => {
        console.log('calling less number of times handling expensive calls');
        return doctors.filter((doctorinfo) => {
            let query = deBouncing.toLowerCase(search)
            return doctorinfo.name.toLowerCase().includes(query.toLowerCase()) ||
                doctorinfo.gender.toLowerCase().includes(query.toLowerCase()) ||
                doctorinfo.age.toLowerCase().includes(query.toLowerCase()) ||
                doctorinfo.specialization.toLowerCase().includes(query.toLowerCase()) ||
                doctorinfo.salary.includes(query)
        })
    }, [])

    async function handleDelete(id) {
        try {
            const res = await axios.delete(`https://doc-back.onrender.com/doctors/${id}`)
            console.log(res.data);
            await fetchdata()
        }
        catch (error) {
            console.log(error);
        }
        finally {
            console.log('Doctor deleted');
        }
    }

    function handleEdit(doctorinfo) {
        setFormData({
            name: doctorinfo.name,
            salary: doctorinfo.salary,
            gender: doctorinfo.gender,
            age: doctorinfo.age,
            specialization: doctorinfo.specialization
        })
        setEditId(doctorinfo.id)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" name='name' placeholder='Enter Doctor name'
                    value={formData.name} onChange={handleChange} />

                <input type="number" name='salary' placeholder='Enter Doctor Salary'
                    value={formData.salary} onChange={handleChange} />

                <input type="text" name='gender' placeholder='Enter Doctor Gender'
                    value={formData.gender} onChange={handleChange} />

                <input type="number" name='age' placeholder='Enter Doctor Age'
                    value={formData.age} onChange={handleChange} />

                <input type="text" name='specialization' placeholder='Enter Doctor specialization'
                    value={formData.specialization} onChange={handleChange} />

                <button>Add Doctor</button>
            </form><br />
            <div>
                <center>
                    <input type="text" placeholder='Search Doctors Details'
                        value={search}
                        onChange={(m) => setSearch(m.target.value)} />
                </center>
                {
                    doctors.length === 0 ?
                        (<><h1>Doctors Data not available</h1></>) :
                        (<><h1>Doctors Information</h1>
                            <div className='patient-card'>
                                {
                                    filterDoctors.map((v, i) => (
                                        <div key={v.id}>
                                            <h2>Name: {v.name}</h2>
                                            <h3>Salary: {v.salary}</h3>
                                            <h3>Gender: {v.gender}</h3>
                                            <h3>Age: {v.age}</h3>
                                            <h3>Specialization: {v.specialization}</h3>
                                            <Link to={`/doctors/${v.id}`}>View Doctors</Link><br />
                                            <button onClick={() => handleDelete(v.id)}>Delete</button>
                                            <button onClick={() => handleEdit(v)}>Edit</button>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                        )
                }
            </div>
        </>
    )
}

export default Doctors