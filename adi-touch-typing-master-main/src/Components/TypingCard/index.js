import { Component } from "react";

import "./index.css";

class TypingCard extends Component {
  state = {
    correct: 0,
    incorrect: 0,
    testCount: 1,
    textInput: "",
    bgColor: true,
    timeCount: 0,
    wordCount: 0,
    accuracy: 0,
  };

  onChangeInput = (event) => {
    this.setState({ textInput: event.target.value }, this.checkInput);
  };

  onClickInput = () => {
    const { timeCount } = this.state;
    if (timeCount >= 300) {
      clearInterval(this.timerId);
      this.resetCounter();
    }
    this.timerId = setInterval(this.incrementTime, 1000);
  };

  onKeyDownSpace = (event) => {
    const { correct, timeCount, incorrect } = this.state;
    if (event.key === " ") {
      if (timeCount < 60) {
        this.setState({
          wordCount: Math.ceil(correct * (60 / timeCount)),
          accuracy: Math.floor((correct / (correct + incorrect)) * 100),
        });
      } else {
        this.setState({
          wordCount: Math.ceil(correct / (timeCount / 60)),
          accuracy: Math.floor((correct / (correct + incorrect)) * 100),
        });
      }
    } else if (event.key === "Escape") {
      this.setState({
        wordCount: 0,
        accuracy: 0,
        correct: 0,
        incorrect: 0,
        textInput: "",
        bgColor: true,
        timeCount: 0,
      });
    }
  };

  resetCounter = () => {
    this.setState({
      correct: 0,
      incorrect: 0,
      textInput: "",
      bgColor: true,
      timeCount: 0,
    });
  };

  incrementTime = () => {
    this.setState((preState) => ({ timeCount: preState.timeCount + 1 }));
  };

  checkInput = () => {
    const { inputText, changeSentence } = this.props;
    const { textInput, testCount } = this.state;
    if (
      (textInput === inputText[textInput.length - 1] ||
        textInput === inputText.slice(0, textInput.length)) &&
      inputText.length === textInput.length
    ) {
      this.setState({ bgColor: true, textInput: "" });
      this.setState((preState) => ({
        testCount: preState.testCount + 1,
      }));
      changeSentence();
      if (testCount === 25) {
        this.setState({ testCount: 0 });
      }
    } else if (
      (textInput === inputText[textInput.length - 1] ||
        textInput === inputText.slice(0, textInput.length)) &&
      inputText[textInput.length - 1] === " "
    ) {
      this.setState({ bgColor: true });
      this.setState((preState) => ({ correct: preState.correct + 1 }));
    } else if (
      textInput === inputText[textInput.length - 1] ||
      textInput === inputText.slice(0, textInput.length)
    ) {
      this.setState({ bgColor: true });
    } else if (textInput !== inputText[textInput.length - 1]) {
      this.setState({ bgColor: false });
      this.setState((preState) => ({ incorrect: preState.incorrect + 1 }));
    } else if (textInput !== inputText.slice(0, textInput.length)) {
      this.setState({ bgColor: false });
      this.setState((preState) => ({ incorrect: preState.incorrect + 1 }));
    }
  };

  render() {
    const {
      correct,
      testCount,
      textInput,
      bgColor,
      wordCount,
      accuracy,
    } = this.state;
    const { inputText } = this.props;
    const bgClr = bgColor ? "text-style" : "failed-style";
    const indexing = textInput.length;

    return (
      <div className="typing-test-container">
        <div className="result-container">
          <p className="wpm">
            WPM: <span className="result">{wordCount}</span>
          </p>
          {correct !== 0 ? (
            <p className="wpm">
              Accuracy:
              <span className="result">{`${accuracy} %`}</span>
            </p>
          ) : (
            <p className="wpm">
              Accuracy: <span className="result">0 %</span>
            </p>
          )}
        </div>
        <div className="lesson-container">
          <h1 className="lesson">
            Lesson <span>{testCount}/25</span>
          </h1>
        </div>
        <div className="text-container">
          <p className="text-style">
            {indexing === 0 ? (
              <>
                <span className="highlight">{inputText[indexing]}</span>
                <span>{inputText.slice(indexing + 1)}</span>
              </>
            ) : (
              <>
                <span>{inputText.slice(0, indexing)}</span>
                <span className="highlight">{inputText[indexing]}</span>
                <span>{inputText.slice(indexing + 1)}</span>
              </>
            )}
          </p>
        </div>
        <div className="input-container">
          <input
            type="text"
            value={textInput}
            placeholder="Press Esc to reset Counters"
            onChange={this.onChangeInput}
            onClick={this.onClickInput}
            onKeyDown={this.onKeyDownSpace}
            className={`${bgClr} entry`}
          />
        </div>
        <button type="button" onClick={this.resetCounter} className="reset-btn">
          Reset
        </button>
      </div>
    );
  }
}

export default TypingCard;
