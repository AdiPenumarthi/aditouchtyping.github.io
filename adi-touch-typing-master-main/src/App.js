import { Component } from "react";
import Settings from "./Components/Settings";
import TypingCard from "./Components/TypingCard";
import "./App.css";

class App extends Component {
  state = { inputText: "", recall: false };

  getSentence = (sentence) => {
    this.setState({ inputText: sentence, recall: false });
  };

  changeSentence = () => {
    this.setState({ recall: true });
  };

  render() {
    const { inputText, recall } = this.state;
    return (
      <div className="app-container">
        <div className="header-container">
          <h1 className="header-text">Touch Typing Master</h1>
        </div>
        <div className="typing-container">
          <Settings getSentence={this.getSentence} recall={recall} />
          <TypingCard
            inputText={inputText}
            changeSentence={this.changeSentence}
          />
        </div>
        <div className="footer-container">
          <h1 className="footer-text">Touch Typing</h1>
        </div>
        <div className="footer-info"></div>
        <p className="credits">
          Powered by
          <span className="sign"> A</span>
        </p>
      </div>
    );
  }
}
export default App;
