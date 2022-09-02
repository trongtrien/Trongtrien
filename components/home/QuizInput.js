import React, { useState, useRef, useEffect} from "react"
import swal from 'sweetalert'
   
const QuizInput = ({ data, id, setCurrentQuestion,currentQuestion,score,setScore}) => {
        const [query, setQuery] = useState('');
        const [result, setResult] = useState([]);
        const [newData, setnewData] = useState(false);

        const [disablekiemtra, setdisablekiemtra] = useState(true)
        const nextQues = () => {
          setQuery('')
          setdisablekiemtra(true)
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
          if(data.length&&componentDidMount) setnewData(data[currentQuestion].answer==query);
          return ()=>(componentDidMount = false)
        },[data,query])

        

        // This function is triggered when the Search buttion is clicked
        const checkAnswer = () => {
            if(!newData){
                swal({
                    title: "Oh! No",
                    text: "Bạn làm sai rồi",
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
                    text: "Bạn làm đúng rồi",
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
        const search = () => {
          setResult(
            <div>
              <h5 className="align-middle m-0 p-0 mt-2">Đáp án: {data[currentQuestion].answer}
              <span className="text-warning fs-6 ps-3">( Cố gắng làm bài tốt hạn chế xem đáp án bạn nhé!!! )</span></h5>
            </div>)
            }

        return (
          <div className="mb-4 p-0 m-0">
            {data.length?            
              <div className="row">
                <div className="d-flex p-1 m-0">
                  <div className="border border-warning rounded p-2 form-control fs-4" style={{fontFamily: "batangche"}}>
                  {data[currentQuestion].text&&<div>
                              <span className="btn fs-4 ps-2 pe-2 align-middle">{data[currentQuestion].text}</span>
                              </div>}
                      <span className="btn fs-4 ps-2 pe-2 align-middle">{data[currentQuestion].text1}</span>
                      <input
                          ref={ref}
                          value={query}
                          style={{width: "200px"}}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="............."
                          className="btn text-dark bg-light bg-opacity-25 p-0 border fs-4"
                          onKeyDown={(e) => {
                          if(e.code==='Enter'||e.code==='NumpadEnter'){
                              search()
                              checkAnswer()
                              if(newData){
                              setTimeout(()=>setQuery(''),10)
                              }
                          }
                          }}
                      />
                      <span className="btn fs-4 ps-2 pe-2 p-1 align-middle">{data[currentQuestion].text2}</span>
                      {data[currentQuestion].text3&&<div>
                              <span className="btn fs-4 ps-2 pe-2 align-middle">{data[currentQuestion].text3}</span>
                              </div>}
                  </div>
                </div>
                <div className="d-flex pt-2 p-1 m-0">
                  <button className="btn btn-main-y rounded-pill ps-3 p-1 pe-3" type="submit" onClick={()=>{
                  checkAnswer()
                  ref.current.focus()
                  setdisablekiemtra(false)
                  }}>Kiểm tra</button>
                  <button className="btn btn-main-y rounded-pill ps-3 p-1 pe-3 ms-auto" disabled={disablekiemtra} type="submit" onClick={()=>{
                  search()
                  ref.current.focus()
                  }}>Xem đáp án</button>
                  <button className="btn btn-main-y rounded-pill ps-3 p-1 pe-3 ms-auto" type="submit" onClick={()=>{
                  nextQues()
                  ref.current.focus()
                  }}>Next</button>
                  </div>
                <div className="m-0 p-1">{result}</div>
              </div>:"Bài học chưa được hoàn thiện quay lại sau bạn nhé"}
          </div>
        );
      };
      
export default QuizInput
