import React, { useState, useRef, useEffect} from "react"
import swal from 'sweetalert'
   
const VocInput = ({ data, id, setCurrentQuestion,currentQuestion,score,setScore}) => {
        const [query, setQuery] = useState('');
        const [newData, setnewData] = useState(false);

        const [disablekiemtra, setDisableKiemtra] = useState(true)
        const [disableNext, setDisableNext] = useState(true)
        const nextQues = () => {
          setQuery('')
          setDisableKiemtra(true)
          if(currentQuestion<data.length-1){
          ref.current.focus()
          setCurrentQuestion(prev => prev +1)
          }else{
            setCurrentQuestion(currentQuestion)
          }
        }
        const ref = useRef()
        useEffect(() => {
          let componentDidMount = true
          if(data.length&&componentDidMount) setnewData(data[currentQuestion].question==query);
          return ()=>(componentDidMount = false)
        },[data,query])

        

        // This function is triggered when the Search buttion is clicked
        const checkAnswer = () => {
            if(!newData){
                swal({
                    title: "Oh! No",
                    text: "Chưa đúng rồi",
                    buttons: {"confirm": "Làm lại"},
                    dangerMode: true,
                    icon: "warning"
                }).then((willconfirm)=>{
                  if(willconfirm){
                    setQuery('')
                    ref.current.focus()
                  }
                })
            } else {
                setScore(score + 1)
                swal({
                    title: "Yes!",
                    text: "Tuyệt vời",
                    buttons: {"confirm": "Next"},
                    dangerMode: true,
                    icon: "success"
                }).then((willconfirm)=>{
                  if(willconfirm){
                    nextQues()
                  }
                })
            }
        }

        return (
          <div className="mb-4 p-0 m-0">
            {data.length?            
              <div className="row">
                  {currentQuestion==0&&<div className="p-0 pb-2">
                    <h5 className="m-0 p-0 mb-2 ps-1 text-dl">Khởi động khó một chút bạn nha!</h5>
                    <span className="m-0 p-0 ps-1 text-logo-y"><i>Hãy nhập thật chính xác từ tiếng Hàn vào ô và nhấn kiểm tra nhé</i></span>
                    </div>}
                <div className="d-flex p-1 m-0">
                  <div className="border border-warning rounded p-2 form-control fs-4" style={{fontFamily: "batangche"}}>
                      <input
                          ref={ref}
                          value={query}
                          style={{width: "200px"}}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="............."
                          className="btn text-dark bg-light bg-opacity-25 p-0 border fs-4"
                          onKeyDown={(e) => {
                          if(e.code==='Enter'||e.code==='NumpadEnter'){
                              checkAnswer()
                              if(newData){
                              setTimeout(()=>setQuery(''),10)
                              }
                          }
                          }}
                      />
                      <span className="btn fs-4 ps-2 pe-2 p-1 align-middle">{data[currentQuestion].answer}</span>
                  </div>
                </div>
                <div className="d-flex pt-2 p-1 m-0">
                  <button className="btn btn-main-y rounded-pill ps-3 p-1 pe-3" type="submit" onClick={()=>{
                  checkAnswer()
                  ref.current.focus()
                  setDisableKiemtra(false)
                  }}>Kiểm tra</button>
                  <button className="btn btn-main-y rounded-pill ps-3 p-1 pe-3 ms-auto" type="submit" onClick={()=>{
                  nextQues()
                  ref.current.focus()
                  }}>Next</button>
                  </div>
              </div>:"Bài học chưa được hoàn thiện quay lại sau bạn nhé"}
          </div>
        );
      };
      
export default VocInput
