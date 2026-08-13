import React, { useState, useEffect, use } from 'react'
import axios from 'axios'

function useFetch(url) {
    const [data, setData] = useState([])
    const [load, setLoad] = useState(true)
    const [error, setError] = useState(null)

    async function fetchData() {
        try {
            setLoad(true)
            let response = await axios.get(url)
            console.log(response.data);
            setData(response.data);
        }
        catch (error) {
            setError(error);
        }
        finally {
            setLoad(false);
        }
    }

    useEffect(() => { fetchData() }, [])
    return {data, load, error}
}

export default useFetch