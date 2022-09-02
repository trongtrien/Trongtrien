import React from 'react'
import { EpsCard } from '../../utils/Card'
import Axios from '../apiRequest/Axios'

const Courses = () => {
    const [list, setList] = React.useState([]);
    React.useEffect(() => {
        Axios({method: "GET", url: "/courseviews"})
        .then(res => setList(res.data.filter(d => d.id<18)))
    })
  return (
    <div className='row'>
        {list.map((l,i) => <div key={i}
        className="col-md-6 p-2">
        <EpsCard data={l}/>
    </div>
    )}
    </div>
  )
}

export default Courses