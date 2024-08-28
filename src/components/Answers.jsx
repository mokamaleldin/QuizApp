import { useRef } from "react";

const Answers = ({ answers, slectedAnswer, answerState, onSelect }) => {
    const shuffledAnswers = useRef();

    // Shuffle the answers so they are not always in the same order

    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }
    return (
        <ul id="answers">
            { shuffledAnswers.current.map(answer => {
                const isSelected = slectedAnswer === answer;
                let cssClasses = '';
                if (answerState === 'answerd' && isSelected) {
                    cssClasses = 'selected';
                }
                if ((answerState === 'correct' || answerState === 'worng') && isSelected) {
                    cssClasses = answerState;
                }

                return (
                    <li className="answer" key={ answer }>
                        <button
                            className={ cssClasses }
                            onClick={ () => onSelect(answer) }
                        >
                            { answer }
                        </button>
                    </li>
                )
            }) }
        </ul>
    )
}
export default Answers