/* eslint-disable @next/next/no-img-element */
import React, { Component} from 'react'
import Scoresheet from './Scoresheet'
import Axios from '../apiRequest/Axios'
import useMediaQuery from '../../utils/isMobile'
import Swal from 'sweetalert2'
import Cookies from 'universal-cookie'
import Router from 'next/router'



class Pracrice extends Component {
    constructor(props) {
        super(props)   
        this.state = {
            questionBank: [],
            idParam: "",
            titleParam:"",
            userAnswerList: [],
            isCorrectList:[],
            currentIndex: 0,
            userAnswer: null,
            score:0,
            disabled: true, //Enable or disable Next Button
            disabledOptions: false, //Enable or disable Answer Options
            option1: false, //Radio button all initially not checked, so set to false initially
            option2: false,
            option3: false,
            option4: false,
            endQuiz: false,
            dnTitle: 1, //Checks if the quiz have ended (Current index gotten to the last)
            disabledCheck:true, //Enable or disable Check Answer button
        }

        //Bind this keyword
        this.checkAnswer = this.checkAnswer.bind(this)
        this.answerIsCorrect = this.answerIsCorrect.bind(this)
    }
    //Load the question from indexedDB when component mounts
    componentDidMount(){
        this.fetchBooks()
        this.loadQuestions()
    }
    
    // componentWillUnmount() {
    // }

    //Reads the question from IndexedDB and load them into the questionBank
    loadQuestions = () => {
        let id = this.props.idParam;
        let title = this.props.titleParam;
        this.setState({idParam: id, titleParam: title})
    }

    fetchBooks = () => {
        let id = this.props.idParam;
        Axios({method: "get", url: `${this.props.lessonApi}/${id}`})
          .then(
            (result) => {
              this.setState({questionBank: result.data})
            //   console.log(result.data)
            },
            (error) => {
              console.log(error)
            }
          )
    }
    // componentDidUpdate(prevProps, prevState) {
    //   }
    //Increment the currentIndex when next button is clicked
    nextQuestionHander = () => {
            if(this.state.dnTitle <= 2){
                this.setState({
                    dnTitle: this.state.dnTitle + 1
                })
            } else {
                this.setState({
                    dnTitle: 1
            })
        }
        this.setState({
            currentIndex:  this.state.currentIndex + 1,
            disabled:true,
            disabledOptions: false,
            disabledCheck: true,
            option1: false,
            option2: false,
            option3: false,
            option4: false,
            correctAnswer: '',
            userAnswer: ''
        })
    }

    //Check if UserAnser is correct 
    answerIsCorrect(userAnswer){
        const {currentIndex, questionBank} = this.state
        if(userAnswer === questionBank[currentIndex].answer) {
            return true
        } else {return false}
    }

    //Increment score if answer is correct and enable Next Button
    checkAnswer = () =>{
        const {score, userAnswer, questionBank, currentIndex} = this.state
            if(this.answerIsCorrect(userAnswer)){
                this.setState({
                    score: score + 5
                })
            }
            if(!this.answerIsCorrect(userAnswer)){
                this.setState(prevState => ({
                    isCorrectList: [...prevState.isCorrectList, `Câu ${currentIndex+1}: Bạn chọn ${userAnswer} || Đáp án đúng là ${questionBank[currentIndex].answer}`]
                  }))
            }
            this.setState({
                disabledOptions:true,
                disabled: false,
                disabledCheck: true,
                correctAnswer: questionBank[currentIndex].answer
            })

            this.setState(prevState => ({
                userAnswerList: [...prevState.userAnswerList, userAnswer]
              }))
              
    }
    //Set the User answer depending on which option the user clicked
    setUserAnswer = (event) => {
        if(event.target.id === "1") { 
            this.setState({
                option1: event.target.checked,
                option2: false,
                option3: false,
                option4: false, 
                userAnswer: event.target.value 
            })       
        }
        else if(event.target.id ==="2") {
            this.setState({
                option2: event.target.checked,
                option1: false,
                option3: false,
                option4: false, 
                userAnswer: event.target.value 
            })
        }
        else if(event.target.id ==="3") {
            this.setState({
                option3: event.target.checked,
                option2: false,
                option1: false,
                option4: false, 
                userAnswer: event.target.value 
            })
        }
        else if(event.target.id ==="4") {
            this.setState({
                option4: event.target.checked,
                option2: false,
                option3: false,
                option1: false, 
                userAnswer: event.target.value 
            })
        }
        this.setState({disabledCheck:false})
    }


    // updateProgress
    

    render() {
        const {currentIndex,  endQuiz, questionBank, score, userAnswer,titleParam,userAnswerList,idParam} = this.state
        const total = questionBank.length
        var answerList = this.state.isCorrectList.map((result, key) =>{
            return ( <li key={key}>{result}</li>
            )
        })
        const isMobi = this.props.isMobile
        const list = window.listExamsVideo;
        const progress = this.props.progress;
        const link = this.props.link;
        const disableClick = (Number(idParam)>30?(Number(idParam)-30)*2:Number(idParam)*2) <= Number(progress)

        const cookie = new Cookies()
        const token = cookie.get("TOKEN")
        if((currentIndex <= total -1) && (endQuiz === false)) {
            return (
                <div className={!isMobi?"ps-5 pe-5":"ps-0 pe-0"}>
                    {idParam>5?                <div className="container-exam mt-3">                    
                    <div className="row m-0">
                        <h4 className='p-0'>EPS - TOPIK {titleParam?`${this.props.dn}: (${titleParam})`:`Bài: ${idParam}`}</h4>
                        <div className='ratio ratio-21x9 p-0 border rounded'>
                            <iframe
                                src={`https://www.youtube.com/embed/${list[idParam-1]}?rel=0&amp;showinfo=0`}
                                controls="0"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="fullscreen;accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>
                            </iframe>
                        </div>
                    </div>
                    <h4 className='mb-0 pb-2'>Check Answer Zone - Tích đáp án</h4>
                    <div className='row border m-0 rounded p-0'>
                        <button className='m-0 pt-2' disabled><h3>Câu: {currentIndex+1}</h3></button>
                    <fieldset className='border bg-info m-0 p-0' disabled={this.state.disabledOptions}>
                        <ul className='m-2 p-0 pt-2 pb-2'>
                            <li>
                                <div className='inputbtn'>
                                <input id="1" onChange={this.setUserAnswer} type="radio" name="option" value="1" checked={this.state.option1}/>
                                <label htmlFor="1" className='inputBtn'>1</label>
                                <div className='checkmark'></div>
                                </div>
                            </li>
                            <li>
                            <div className='inputbtn'>
                                <input id="2" onChange={this.setUserAnswer} type="radio" name="option" value="2" checked={this.state.option2}/>
                                <label htmlFor="2" className='inputBtn'>2</label>
                                <div className='checkmark'></div>
                                </div>
                            </li>
                            <li>
                                <div className='inputbtn'>
                                <input id="3" onChange={this.setUserAnswer} type="radio" name="option" value="3" checked={this.state.option3}/>
                                <label htmlFor="3" className='inputBtn'>3</label>
                                <div className='checkmark'></div>
                                </div>
                            </li>
                            <li>
                                <div className='inputbtn'>
                                <input id="4" onChange={this.setUserAnswer} type="radio" name="option" value="4" checked={this.state.option4}/>
                                <label htmlFor="4" className='inputBtn'>4</label>
                                <div className='checkmark'></div>
                                </div>
                            </li>
                        </ul>
                    </fieldset> 
                    </div>
                    <div className='d-flex mt-2'>
                        <span className='m-0'>Bạn đã chọn đáp án:</span> {userAnswer&&<><span className='checkmark-answer m-0 ms-2 me-2'>{userAnswer}</span></>}
                    </div>
                    <div className='d-flex mt-2 mb-2'>
                        <button className="btn button btn-exam me-auto" onClick={this.checkAnswer} disabled={this.state.disabledCheck}>{isMobi?"Confirm":"Confirm answer"}</button>
                        {/* <button className="btn button btn-exam me-auto" onClick={()=>{this.setState({endQuiz:true})}} >Hủy bài</button> */}
                        <button className="btn button btn-exam" onClick={this.nextQuestionHander} disabled = {this.state.disabled}>{userAnswerList.length >=total?'Kết quả':'Next'}</button>
                    </div>
                                              
                </div >:<div className="row m-0">
                        <h4 className='p-0'>Ôn tập bài: {idParam}</h4>
                        <div className='p-0 border rounded'>
                            <h5 className='p-2 pt-4 text-center'>Đây là phần tự luyện tập các bạn cố gắng tự hoàn thiện nhé. Đừng nhấn xác nhận luôn để qua bài đó nha</h5>
                            {list[idParam-1].map(item => <img className='mt-5' key={item} style={{width: "100%"}} src={`/media/img/courses/eps-topik/1/${item}.png`} alt=''/>)}
                        </div>
                        {(!disableClick&&token)&&<button className='btn btn-main-y fs-5 ps-3 pe-3 mt-2 mb-3'
                        onClick={() => {
                            this.props.updateProgress()
                            setTimeout(() => Swal.fire({
                                title: 'Bạn đã hoàn thành bài học',
                                text: 'Chúc mừng bạn đã hoàn thành bài học, hãy nghỉ ngơi thư giãn đầu óc để lấy tinh thần cho các bài học sau!',
                                icon: 'success'
                            }).then(() => Router.reload()), 200)
                        }}
                >Xác nhận hoàn thành bài học</button>}
                    </div>}
                <div>
                </div>
                </div>
            )
        }
        else { //Quiz have ended so, we load the Scoresheet component
            return (
                <div>
                    <Scoresheet 
                                score={score}
                                totalQuestions={total}
                                bntitle={questionBank.dntitle}
                                answerList={answerList}
                                updateProgress={this.props.updateProgress}
                                progress={this.props.progress}
                                idParam={idParam}
                                link={link}
                    />             
                </div>
            )
        }
    }
}

export const HangeulPractice = (props) => (<Pracrice {...props}
                                                lessonApi='/hangeulPractice'
                                                isMobile={useMediaQuery("800")}
                                                idParam={props.idParam}
                                                updateProgress={props.updateProgress}
                                                progress={props.progress}
                                                link={props.link}
                                                 />)
export const ChapterPractice = (props) => (<Pracrice {...props}
                                                lessonApi='/lessonPracrice'
                                                isMobile={useMediaQuery("800")}
                                                idParam={props.idParam}
                                                updateProgress={props.updateProgress}
                                                progress={props.progress}
                                                link={props.link} />)
export const PracticeRead = (props) => (<Pracrice {...props}
                                                lessonApi='/Qbank_read'
                                                isMobile={useMediaQuery("800")}
                                                dn="Đọc"
                                                idParam={props.idParam}
                                                titleParam={props.titleParam}
                                                updateProgress={props.updateProgress}
                                                progress={props.progress}
                                                link={props.link} />)
export const PracticeListen = (props) => (<Pracrice {...props}
                                                lessonApi='/Qbank_listen'
                                                isMobile={useMediaQuery("800")}
                                                dn="Nghe"
                                                idParam={props.idParam}
                                                titleParam={props.titleParam}
                                                updateProgress={props.updateProgress}
                                                progress={props.progress}
                                                link={props.link} />)











