import Answers from "./Answers"
import QuestionTimer from "./QuestionTimer"

const Question = ({ questionText, answers, onSelectAnswer, selectedAnswer, answerState, onSkipAnswer }) => {
    return (
        <div id='question'>
            <QuestionTimer
                timeout={ 10000 }
                onTimeout={ onSkipAnswer }
            />
            <h2>
                { questionText }
                <Answers
                    answers={ answers }
                    selectedAnswer={ selectedAnswer }
                    answerState={ answerState }
                    onSelect={ onSelectAnswer }
                />
            </h2>
        </div>
    )
}
export default Question