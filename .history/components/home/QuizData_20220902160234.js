// youtube id of conversation
import React, {useEffect, useState} from 'react'
import Axios from '../apiRequest/Axios'

const LessonData = () => {
    let data
    useEffect(() => {
        let mounted = true;
        if(mounted)
        Axios({method: "GET", url: 'lessonsdata'})
        .then(res => res.data)
        return() => (mounted = false)
    },[])
   
  return {  }
}

export { LessonData }