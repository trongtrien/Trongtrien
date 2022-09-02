import React from 'react'
import jwt_decode from 'jwt-decode'
import Axios from '../apiRequest/Axios'
import Player from '../../utils/youtube/Player'
import LessonMenu from './LessonMenu'
import Note from '../notes/Note'
import SeachDic from '../seachDic/SeachDic'
import useMediaQuery from '../../utils/isMobile'
import ShareSocial from '../../utils/share/ShareSocial'
import { TimeCalculator } from "../../utils/duration"
import Practice from '../practice/Prac1'

const Lesson = ({
  link,
  lesson_ssr,
  listLesson,
  showMenu,
  token,
  partParam,
  idParam,
  progresses,
  dataDic,
  questions
}) => {
  const isMobile800 = useMediaQuery('800')
  const lesson = lesson_ssr[0]
      // cookie
      const [userId, setuserId] = React.useState(null)
      const [idprogress, setidprogress] = React.useState(0)
      const [progress, setprogress] = React.useState(0)

      React.useEffect(() => {
        let componentUnmount = true;
        if(progresses&&componentUnmount){
          setidprogress(progresses.id)
          setprogress(progresses.progress)
      }
      return () => (componentUnmount = false)
      },[progresses])
      
      React.useEffect(() => {
          let componentUnmount = true;
          if(token&&componentUnmount){
              setuserId(jwt_decode(token).userId)
        }
        return () => (componentUnmount = false)
        },[token])
  
  
      // get data
      const [newData, setNewData] = React.useState();
      const isMobile = useMediaQuery('1200')
      const [videoUrl, setVideoUrl] = React.useState()
      const [btnId, setBtnId] = React.useState('1')
      // params
      const  part = partParam
      const  id = idParam

      // get progress
      const [idApi, setIdApi] = React.useState(null)
  
      const disableClick = (lesson_id) => {
          if(progress!==''&&token)
          var finished = (lesson_id>30?lesson_id-30:lesson_id)*2 <= Number(progress)
          var progressing = (lesson_id>30?lesson_id-30:lesson_id)*2 === (Number(progress)+2)
          var disabledProgress = (lesson_id>30?lesson_id-30:lesson_id)*2 > (Number(progress)+2)
          return {progressing,finished,disabledProgress}
      }
      
      // checkElapsedTime of youtube Frame
      const [pause, setpause] = React.useState(false)
      const [duration, setDuration] = React.useState("")
      const [currentTime, setCurrentTime] = React.useState("")
      const [playingSeconds, setPlayingSeconds] = React.useState("")
      
      // % Played of video
      const percentPlayed = playingSeconds/duration
  
      // 
      const {mm, ss} = TimeCalculator(Number(playingSeconds))
      const {mm:mmdura, ss:ssdura} = TimeCalculator(Number(duration))
  
      // setStartAt props
      const [startAt,setStartAt] = React.useState('')
  
      // updateProgress
        const updateProgress = () => {
          if(idprogress!=0)
          Axios({
              method: 'PUT',
              url: `/progress/${idprogress}`,
              data: {
                  progress: progress+2
              }
          })
      }
      // share social
      const [showShare, setShowShare] = React.useState(false);
  return (
    <div className='row m-0'>
        {lesson?<>
          <div className='col-xl-9 p-0 m-0 border-1 border-end border-warning'>
                    <div className='ratio ratio-16x9'>
                    {token?(idprogress===0?(<h4 className='text-logo-b text-center pt-5'>
                            Bạn chưa ghi danh vào khóa học ạ. Nếu muốn học mà không cần ghi danh bạn có chỉ cần đăng xuất khỏi hệ thống</h4>):(
                            disableClick(lesson.id).disabledProgress?
                            <h4 className='text-logo-b text-center pt-5'>Bạn phải hoàn thành bài học trước rồi quay lại bài học này nhé! Sorry</h4>:
                            <Player 
                                videoId={videoUrl?videoUrl:lesson.videoURL1}
                                startAt={startAt}
                                playing={pause}
                                setplaying={setpause}
                                setDuration={setDuration}
                                setPlayedSeconds={setCurrentTime}
                                setPlayingSeconds={setPlayingSeconds}/>)
                            ):(
                                <Player 
                                videoId={videoUrl?videoUrl:lesson.videoURL1}
                                startAt={startAt}
                                playing={pause}
                                setplaying={setpause}
                                setDuration={setDuration}
                                setPlayedSeconds={setCurrentTime}
                                setPlayingSeconds={setPlayingSeconds}/>
                        )}
                    </div>
                    {/* Menu */}
                    <ul className={`nav nav-tabs pt-1 pb-1 justify-content-center player-control ${!isMobile800&&'ps-5'}`}>
                        <li className='me-3'>
                            <button className='btn' onClick={() => setpause(!pause)}>
                                {pause?<i className="fa fa-pause text-light" aria-hidden="true"></i>:<i className="fa fa-play text-light" aria-hidden="true"></i>}
                            </button>
                        </li>
                        <li className='btn text-light'>Thời gian <span>{mm} : {ss}</span> / <span>{mmdura} : {ssdura}</span></li>
                    </ul>
                    <ul className={`nav nav-tabs pt-2 ${!isMobile800&&'ps-5'}`} style={{fontSize: "15px"}}>
                        <li className="nav-item item-action m-0 p-0">
                            <button id='btn1' onClick={()=>setBtnId('1')} className={`nav-link p-2 ${btnId==="1"&&"active"}`}>Hỏi đáp</button>
                        </li>
                        <li className="nav-item item-action">
                            <button id='btn2' onClick={()=>setBtnId('2')}  className={`nav-link p-2 ${btnId==="2"&&"active"}`}>Từ vựng</button>
                        </li>
                        <li className="nav-item item-action">
                            <button id='btn3'
                                    onClick={()=>setBtnId('3')} 
                                    className={`nav-link p-2 ${btnId==="3"&&"active"}`}
                                    disabled={token&&progress<Number(id)*2?percentPlayed<0.90:false}
                                    >Bài tập</button>
                        </li>
                        <li className="nav-item item-action ms-0">
                            <span id='btn4' onClick={()=>setBtnId('gc')}  className={`nav-link p-2 ${btnId==="gc"&&"active"}`}>Ghi chú</span>
                        </li>
                        <li className={`nav-item item-action pt-2 ms-auto dasd`} onClick={() => setShowShare(!showShare)}>
                            <span className='pe-3' style={{cursor: 'pointer'}}>
                                 {!isMobile800&&'Share'}&nbsp;<i className="fa fa-share-alt text-logo-b" aria-hidden="true"></i>
                            </span>
                        </li>
                    </ul>
                    {showShare&&<div className={isMobile800?'m-0 ps-0 pe-0':'ps-5 pe-5'}>
                                        <div className='p-3 m-0 mt-2'>
                                            <div className='m-0 bg-secondary bg-opacity-25 rounded pt-3 pb-3 text-center'>
                                                <ShareSocial shareUrl={link} title='Khóa học - '/>
                                            </div>
                                        </div>
                                        </div>}
                    <div className='p-3 mt-1'>
                        {/* {btnId==="1"&&<Comment urlApi="/lesson_comments" />} */}
                        {btnId==="2"&&<div className={isMobile800?'m-0 ps-0 pe-0':'ps-5 pe-5'}><SeachDic datas={dataDic} /></div>}
                        {btnId==="3"&&(token?(
                            (!disableClick(lesson.id).disabledProgress&&idprogress!==null)&&
                            <Practice questions={questions}/>
                            ):(
                            <Practice questions={questions}/>)
                            )}
                        {(token&&btnId==="4")&&< Note 
                                                    urlApi="notes"
                                                    userId={userId}
                                                    lessonId={lesson.id}
                                                    currentTime={currentTime}
                                                    setStartAt={setStartAt}
                                                    setplaying={setpause}
                                                    />}
                    </div>
            </div>
          {lesson?<LessonMenu 
                                title = {lesson.title}
                                link = {link}
                                lessonId={lesson.id}
                                showMenu={showMenu}
                                token={token}
                                listLesson={listLesson}
                                partParam={partParam}
                                progress={progress}
                            />:<h4>Notfoud</h4>}</>:<>
          <h4>Notfoud</h4>
          </>}
    </div>
  )
}

export default Lesson