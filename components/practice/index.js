import React from 'react'
import {HangeulPractice,ChapterPractice,PracticeRead,PracticeListen} from './Practice'

const Practice = ({
  idParam,
  titleParam,
  updateProgress,
  progress,
  link
}) => {
  let chapter = link
  if(chapter==="Hangeul")
  return <HangeulPractice updateProgress={updateProgress} progress={progress} idParam={idParam}/>
  if(chapter==="Chapter1" || chapter==="Chapter2")
  return <ChapterPractice updateProgress={updateProgress} progress={progress} idParam={idParam}/>
  if(chapter==="Practice-read")
  return <PracticeRead updateProgress={updateProgress} progress={progress} idParam={idParam} titleParam={titleParam}/>
  if(chapter==="Practice-listen")
  return <PracticeListen updateProgress={updateProgress} progress={progress} idParam={idParam} titleParam={titleParam}/>
}

export default Practice