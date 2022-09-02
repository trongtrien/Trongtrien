/* eslint-disable @next/next/no-img-element */
import React from 'react'
import ProgressBar from './ProgressBar'

const LessonMenu = ({
    title,
    link,
    lessonId,
    showMenu,
    token,
    listLesson,
    partParam,
    progress
}) => {
    const [progressed, setProgressed] = React.useState('')
    React.useEffect(() => {
        if(progress!=0){
            setProgressed(progress)
        }
    },[progress])
    const disableClick = (lesson_id) => {
        if(progressed!==''&&token)
        var finished = (lesson_id>30?lesson_id-30:lesson_id)*2 <= Number(progressed)
        var progressing = (lesson_id>30?lesson_id-30:lesson_id)*2 === (Number(progressed)+2)
        var disabledProgress = (lesson_id>30?lesson_id-30:lesson_id)*2 > (Number(progressed)+2)
        return {progressing,finished,disabledProgress}
    }
  return (
        <div className={`col-xl-3 p-0 accordion-col ${showMenu?"show_col":"hide_col"}`}>
        <div style={{paddingLeft: "2px"}}>
            <h4 className="mb-2 border-bottom pt-2 pb-2 ps-3 text-logo-b font-monospace">{title}</h4>
            {token&&<div className='pb-3 ps-3 pe-3'>
                <h6 className='text-logo-y'>Tiến trình học</h6>
                <ProgressBar bgcolor="#ff8c00" progress={progressed!==''?progressed:'0'}  height={18} />
            </div>}
        </div>
        <div className="accordion accordion-flush bg-light" id="accordionFlushExample">
            {listLesson&&listLesson.map(item =>
            <div className="accordion-item" key={item.id}>
                <h2 className="accordion-header" id={`flush-heading${item.id}`}>
                    <button className={`accordion-button ${(item.id!=lessonId)&&'collapsed'} ${token&&(disableClick(item.id).progressing||disableClick(item.id).finished)?(disableClick(item.id).finished?'text-success':'text-info'):('text-secondary')}`}
                            disabled={token?disableClick(item.id).disabledProgress:false}
                            type="button" data-bs-toggle="collapse"
                            data-bs-target={`#flush-collapse${item.id}`}
                            aria-expanded="false"
                            aria-controls={`flush-collapse${item.id}`}
                    >    
                        {item.title}
                    </button>
                </h2>
                <div id={`flush-collapse${item.id}`}
                    className={`accordion-collapse collapse ${(lessonId===item.id)&&'show'}`}
                    aria-labelledby={`flush-heading${item.id}`}
                    data-bs-parent="#accordionFlushExample"
                >
                    <div className="accordion-body list-unstyled">
                        {/* tiết 1 */}
                        <a className='d-flex' href={`/Course/${link}/Lesson=${item.id}-1`}>
                            <img className='ms-3 me-3 mb-1' width={50} src='/media/img/mui_ten_r.png' alt=''/>
                            <h5 className={`${(lessonId===item.id&&partParam==='1')&&'text-light'}`}>
                                Tiết 1 {(lessonId===item.id&&partParam==='1')&&<img className='ms-3 mb-1' width={20} src='/media/img/loadding1.svg' alt='' />}</h5>
                        </a>
                        <h5 className='m-0 p-0 pb-2 mt-3 ms-3 me-3 border-bottom'><i>Nội dung tiết học</i></h5>
                        <div className='border rounded-3 m-3 p-3'>
                            <ul className='m-0 p-0 list-unstyled' dangerouslySetInnerHTML={{__html:item.part1}} />
                        </div>
                        {/* tiết 2 */}
                        <a className='d-flex' href={`/Course/${link}/Lesson=${item.id}-2`}>
                            <img className='ms-3 me-3' width={50} src='/media/img/mui_ten_r.png' alt=''/>
                            <h5 className={`${(lessonId===item.id&&partParam==='2')&&'text-light'}`}>
                                Tiết 2 {(lessonId===item.id&&partParam==='2')&&<img className='ms-3 mb-1' width={20} src='/media/img/loadding1.svg' alt='' />}</h5>
                        </a>
                        <h5 className='m-0 p-0 pb-2 mt-3 ms-3 me-3 border-bottom'><i>Nội dung tiết học</i></h5>
                        <div className='border rounded-3 m-3 p-3'>
                            <ul className='m-0 p-0 list-unstyled' dangerouslySetInnerHTML={{__html:item.part2}} />
                        </div>
                    </div>
                </div>
            </div>
                )}
        </div>
        </div>
  )
}

export default LessonMenu