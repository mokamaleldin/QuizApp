import { useEffect, useState } from "react"

// timeout: هي الزمن المحدد للمؤقت بالمللي ثانية.
// onTimeout: هي دالة يتم استدعاؤها عندما ينتهي الوقت.
const QuestionTimer = ({ timeout, onTimeout }) => {
    const [remainingTime, setRemaingingTime] = useState(timeout)

    useEffect(() => {
        const timer = setTimeout(onTimeout, timeout)

        return () => {
            clearTimeout(timer)
        }
    }, [timeout, onTimeout])

    useEffect(() => {
        const interval = setInterval(() => {
            setRemaingingTime(prevRemining => prevRemining - 100)
        }, 100)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <progress id="question-timer" value={ remainingTime } max={ timeout } />
    )
}
export default QuestionTimer