import { useState, useCallback } from "react"
import QUESTIONS from "../questions"
import QuizComplete from "./QuizComplete";
import QuestionTimer from "./QuestionTimer";


const Quiz = () => {
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;

    // Check if the quiz is complete
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSlelectAnswer = useCallback((selectedAnswer) => {
        setUserAnswers((prevUserAnswers) => {
            return [
                ...prevUserAnswers,
                selectedAnswer
            ]
        })
    }, [])

    // Skip the question if the timer runs out
    const handleSkipAnswer = useCallback(() => handleSlelectAnswer(null), [handleSlelectAnswer])

    if (quizIsComplete) {
        return <QuizComplete />
    }

    // Shuffle the answers so they are not always in the same order
    const shuffledAnswers = QUESTIONS[activeQuestionIndex].answers.sort(() => Math.random() - 0.5);

    return (
        <div id="quiz">
            <div id='question'>
                <QuestionTimer key={ activeQuestionIndex } timeout={ 10000 } onTimeout={ handleSkipAnswer } />
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