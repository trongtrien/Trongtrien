import React, { useEffect, useState} from 'react'
import { isMobile} from 'react-device-detect'
import Link from 'next/link'
import Axios from '../../components/apiRequest/Axios'

export async function getServerSideProps() {
    try {
     const resp = await Axios({method: "get", url: '/question/1'})
     return {
       props: {
        questions: await resp.data
       }
     }
    } catch (error) {
      return {
        props: {
          err: ""
        }
      }
    }
  }

const CheckMatch = ({

}) => {
    const [answers, setAnswers] = useState([])

    useEffect(() => {
        Axios({
            method: 'GET',
            url: '/gamesA'
        })
        .then(res=> setAnswers(Math.max(...res.data.map(data => data.game_id))-2))
    },[])
    
  return (
    <div className={`${!isMobile&&'g-pc-bg'}`}>
      <div className={`${isMobile?'g-mobile g-bg':'g-pc'}`}>
          <div className='g-h'>
              <div className={`d-flex g-h-nav ${!isMobile&&'g-h-nav-pc'} pe-1`}>
                  <div className='m-0 p-0 ms-2' style={{cursor: "pointer"}} onClick={() => window.location.href='/'}>
                      <img className='m-0 p-0' src='/media/img/button-home.png' alt='home' />
                  </div>
                  <div className='m-0 p-0 ms-2'>
                      <img className='mt-2 p-0' style={{height: "45%"}} src='/media/img/games/choosegame.png' alt='choosegame' />
                  </div>
              </div>
          </div>
          <div className={`g-body ${!isMobile&&'g-body-pc'}`}>
            <div className='g-body-content' style={{minHeight: "500px", padding: "2%"}}>
                <div className='d-flex'>
                  {answers&&Array.from(Array(answers).keys()).map(item =>
                      <Link key={item} href={`/Vocabulary-game/${item+3}`}><a style={{minWidth: "18%", margin: "1%"}} className='btn btn-games'>{item+3}</a></Link>)}
                </div>
            </div>
          </div>
      </div>
    </div>

  )
}

export default CheckMatch