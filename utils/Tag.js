import React from 'react'
import Link from 'next/link'
import Cookies from 'universal-cookie'
import jwtDecode from 'jwt-decode'
import Adsense from '../components/ads/DisplayAds'


const Tag = () => {
  const cookie = new Cookies()
  const token = cookie.get("TOKEN")
  const [decoded, setDecoded] = React.useState({role: "basic"})


  React.useEffect(() => {
    let unmound = true
    if(token&&unmound){
        setDecoded(jwtDecode(token))
    }
    return ()=> (unmound = false)
},[])

  return (<>
    <div className="rounded border border-warning ps-3 pt-1 mb-2">
        <h4 className="text-main-b-dl pt-3 pb-2">Có thể bạn quan tâm</h4>
            <div style={{listStyle: "none"}} className='pb-2'>
            <li className='ps-2 pt-2 pb-2 mb-2 text-light me-3 rounded-3 bg-white'>
                <Link href="/Course/Chapter1"><a>Khóa học EPS-TOPK 1</a></Link>
            </li>
            <li className='ps-2 pt-2 pb-2 mb-2 text-light me-3 rounded-3 bg-white'>
            <Link href="/Course/Chapter2"><a>Khóa học EPS-TOPK 2</a></Link>
            </li>
            <li className='ps-2 pt-2 pb-2 mb-2 text-light me-3 rounded-3 bg-white'>
                <a href="/Exam">
                            Làm đề thi thử</a>
            </li>
            <li className='ps-2 pt-2 pb-2 mb-2 text-light me-3 rounded-3 bg-white'>
                <Link href="/Course/Practice-listen"><a>Ôn bộ đề 1000 câu nghe</a></Link>
            </li>
            <li className='ps-2 pt-2 pb-2 mb-2 text-light me-3 rounded-3 bg-white'>
            <Link href="/Course/Practice-read"><a>Ôn bộ đề 1000 câu đọc</a></Link>
            </li>
            </div>
    </div>
    {(!token||decoded.role==="basic")&&<div className='rounded border border-warning mt-3 mb-3'>
                            <Adsense slot='8882564828'/>
                        </div>}
    </>
  )
}

export default Tag