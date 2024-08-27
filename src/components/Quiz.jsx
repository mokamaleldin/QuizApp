import { useState, useCallback } from "react"
import QUESTIONS from "../questions"
import QuizComplete from "./QuizComplete";
import QuestionTimer from "./QuestionTimer";


const Quiz = () => {
    const [userAnswers, setUserAnswers] = useState([]);
    const [answerState, setAnswerState] = useState('');

    const activeQuestionIndex =
        answerState === '' ? userAnswers.length : userAnswers.length - 1;

    // Check if the quiz is complete
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSlelectAnswer = useCallback((selectedAnswer) => {

        setAnswerState('answerd');
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer]
        })

        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct');
            } else {
                setAnswerState('incorrect');
            }

            setTimeout(() => {
                setAnswerState('');
            }, 2000)

        }, 1000);

    }, [activeQuestionIndex])

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
                            const isSelectedAnswer = userAnswers[userAnswers.length - 1] === answers;
                            let cssClasses = '';
                            if (answerState === 'answerd' && isSelectedAnswer) {
                                cssClasses = 'selected';
                            }
                            if ((answerState === 'correct' || answerState === 'incorrect') && isSelectedAnswer) {
                                cssClasses = answerState;
                            }

                            return (
                                <li className="answer" key={ answers }>
                                    <button className={ cssClasses } onClick={ () => handleSlelectAnswer(answers) }>
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