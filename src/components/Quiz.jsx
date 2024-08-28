import { useState, useCallback } from "react"
import QUESTIONS from "../questions"
import QuizComplete from "./QuizComplete";
import Question from "./Question";


const Quiz = () => {
    const [userAnswers, setUserAnswers] = useState([]);
    const [answerState, setAnswerState] = useState('');

    const activeQuestionIndex =
        answerState === '' ? userAnswers.length : userAnswers.length - 1;

    // Check if the quiz is complete
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSlelectAnswer = useCallback(
        function handleSkipAnswer(selectedAnswer) {
        setAnswerState('answerd');
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer]
        })

        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct');
            } else {
                setAnswerState('worng');
            }

            setTimeout(() => {
                setAnswerState('');
            }, 2000)

        }, 1000);
        })

    // Skip the question if the timer runs out
    const handleSkipAnswer = useCallback(() => handleSlelectAnswer(null), [handleSlelectAnswer])

    if (quizIsComplete) {
        return <QuizComplete />
    }

    return (
        <div id="quiz">
            <Question
                key={ activeQuestionIndex }
                questionText={ QUESTIONS[activeQuestionIndex].text }
                answers={ QUESTIONS[activeQuestionIndex].answers }
                selectedAnswer={ userAnswers[userAnswers.length - 1] }
                answerState={ answerState }
                onvSelectAnswer={ handleSlelectAnswer }
                onSkipAnswer={ handleSkipAnswer }
            />
        </div>
  )
}
export default Quiz