import React, {useState, useEffect} from 'react'
import swal from 'sweetalert'
import Axios from '../apiRequest/Axios'
import { updateNoteWhenCreated,  updateNoteWhenDeleted } from './api'

const Note = ({
    urlApi,
    userId,
    lessonId,
    currentTime,
    setStartAt,
    setplaying
}) => {
    const [data, setData] = useState([])
    const [message, setmessage] = useState([])
    const [title, setTitle] = useState([])
    const [noteState, setNoteState] = useState(false)
    
    useEffect(() => {
        Axios({
            method: "GET",
            url: `/${urlApi}/${lessonId}`
        })
        .then(res => res.data.filter(data => Number(data.userId) === userId))
        .then(res => setData(res.sort((a,b) => a.id - b.id)))
    },[lessonId,userId,urlApi])

    const createNote = (e) => {
        e.preventDefault()
        updateNoteWhenCreated({title:title,message:message,startAt:currentTime})
        .then((note) => {
            setData([note,...data])
        })
        // startAt nho cap nhat
        Axios({
            method: "POST",
            url: `/${urlApi}`,
            data: {
                lesson_id: lessonId,
                userId: userId,
                title: title.replace(/[^\p{L}\s0-9]/gu, ''),
                message: message.replace(/[^\p{L}\s0-9]/gu, ''),
                startAt: currentTime
            }
        })
        setNoteState(false)
        setmessage("")
        setTitle("")
        setplaying(true)
    }


    const deleteNote = (noteId) => {
        swal({
            title: "Bạn muốn xóa ghi chú?",
            buttons: true,
            dangerMode: true,
            icon: "warning"
        })
        .then((willDelete) => {
            if(willDelete){
                swal({
                    text: "Ghi chú đã bị xóa",
                    icon: "success"
                });
                updateNoteWhenDeleted().then(() => {
                    Axios({
                        method: "DELETE",
                        url: `/${urlApi}/${noteId}`
                    })
                    const updatednotes = data.filter(
                      (notes) => notes.id !== noteId
                    );
                    setData(updatednotes);
                  })
            }
        })
    }
  return (
    <div className='pb-3'>
        <div className='mb-4'>
            <button className='mb-3 rounded border-info' style={{background: "transparent"}} onClick={() => {
                setNoteState(!noteState)
                setplaying(false)
            }}>Thêm ghi chú <i className="fa fa-plus ms-2 text-logo-b" aria-hidden="true"></i></button>
            {noteState&&<form onSubmit={createNote}>
            <label htmlFor="Title" className="mt-3">
                    Tiêu đề:</label>
                    <input
                      name="Title"
                      id="Title"
                      type="text"
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      />
                  
                  <label htmlFor="message" className="mt-3">
                        Nội dung:</label>
                        <textarea
                            id="message"
                            className='form-control'
                            name='message'
                            value={message}
                            onChange={(e) => setmessage(e.target.value)}
                            rows={5}>
                        </textarea>
                <button className='btn btn-main-y mt-2' type='submit'>Submit</button>
            </form>}
        </div>
        <div className='border border-warning rounded'>
            {data.length?data.map(newdata => 
            <div key={newdata.id} className="border-bottom pb-3 pt-2" style={{borderBottom: "1px dashed rgb(86, 86, 86)"}}>
                <div className='ps-3 m-0'>
                    <h5 className='text-logo-b'>{newdata.title}</h5>
                    <p>{newdata.message}</p>
                </div>
                <div className='d-flex'>
                <button className='btn btn-main-y ms-3' onClick={() => {
                    setStartAt(newdata.startAt)
                    setplaying(true)
                }}><i className="fa fa-hand-o-right" aria-hidden="true"></i> Video Play</button>
                <button className='btn btn-danger ms-2' onClick={() => deleteNote(newdata.id)}>
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                </button>
                </div>
            </div>):<div className='p-0 m-0'><h6 className='text-logo-b pt-1 ps-3'>Chưa có ghi chú nào</h6></div>}
        </div>
    </div>
  )
}

export default Note