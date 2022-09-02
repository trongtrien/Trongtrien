// youtube id of conversation
import React, {useEffect, useState} from 'react'
import Axios from '../apiRequest/Axios'

const ata = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        let mounted = true;
        if(mounted)
        Axios({method: "GET", url: 'lessonsdata'})
        .then(res => setData(res.data))
        return() => (mounted = false)
    },[])
   
  return { data }
}

export { ata }