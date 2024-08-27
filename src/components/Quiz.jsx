import { useState } from "react"
import QUESTIONS from "../questions"
import QuizComplete from "./QuizComplete";


const Quiz = () => {
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;


    // Check if the quiz is complete
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSlelectAnswer = (selectedAnswer) => {
        setUserAnswers((prevUserAnswers) => {
            return [
                ...prevUserAnswers,
                selectedAnswer
            ]
        })
    }

    if (quizIsComplete) {
        return <QuizComplete />
    }

    // Shuffle the answers so they are not always in the same order
    const shuffledAnswers = QUESTIONS[activeQuestionIndex].answers.sort(() => Math.random() - 0.5);

    return (
        <div id="quiz">
            <div id='question'>
                <h2>
                    { QUESTIONS[activeQuestionIndex].text }
                    <ul id="answers">
                        { shuffledAnswers.map(answers => {

                            return (
                                <li className="answer" key={ answers }>
                                    <button onClick={ () => handleSlelectAnswer(answers) }>
                                        { answers }
                                    </button>
                                </li>
                            )
                        }) }
                    </ul>
                </h2>
            </div>
        </div>
  )
}
export default Quiz