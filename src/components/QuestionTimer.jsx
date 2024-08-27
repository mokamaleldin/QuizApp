const QuestionTimer = ({ timeout, onTimeout }) => {
    setTimeout(onTimeout, timeout)
    return (
        <progress id="question-timer" value="0" max="100" />
    )
}
export default QuestionTimer