// eslint-disable-next-line import/no-anonymous-default-export
import TestEPS from "./TestEPS"
import QuizVoc from "./QuizVoc"
import QuizGrammar from "./QuizGrammar"
import Conversation from "./Conversation"
import Courses from "./Courses"
import Exams from "./Exams"
import { quizGrammar_data } from "./QuizData"

const quizData = [
    {   id: "03",
        title: "교실 한국어",
        youtubeId: "cMGoS5TfO00"
    },
    {   id: "04",
        title: "안녕하세요",
        youtubeId: "nPxee1Kth3o"
    },
    {   id: "05",
        title: "주말 잘 보내세요",
        youtubeId: "nPxee1Kth3o?start=61"
    }
  ]
const newData=[...quizData,...quizGrammar_data]
export default [
    {
        title: "Khóa Học",
        childElement: <Courses />,
        link: "Course"
    },
    {
        title: "Làm đề - Exam experience",
        childElement: <Exams />,
        link: "Course"
    },
    {
        title: "Từ mới - Vocabulary Quiz",
        childElement: <QuizVoc data={newData.filter((d) => d.id <= 15)}/>,
        link: "Vocabulary/Unit03-word"
    },
    {
        title: "Trắc nghiệm ngữ pháp - Grammar",
        childElement: <QuizGrammar data={quizGrammar_data.filter((d) => d.id <= 15)}/>,
        link: "Grammar-Quiz/Unit06"
    },
    {
        title: "Hội thoại 60 bài - Conversation",
        childElement: <Conversation data={quizGrammar_data.filter((d) => d.id <= 15)}/>,
        link: "Conversation/Unit05"
    },
    {
        title: "EPS-TOPIK",
        childElement: <TestEPS data={quizGrammar_data.filter((d) => d.id <= 15)}/>,
        link: "/Epstopik-Test/Unit06"
    }
]
  