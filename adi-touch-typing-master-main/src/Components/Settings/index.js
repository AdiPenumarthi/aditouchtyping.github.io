import { Component } from "react";
import randomWords from "random-words";

import "./index.css";

const source = [
  {
    sourceId: 1,
    source: "Bigrams",
    length: 2,
  },
  {
    sourceId: 2,
    source: "Trigrams",
    length: 3,
  },
  {
    sourceId: 3,
    source: "Tetragrams",
    length: 4,
  },
  {
    sourceId: 4,
    source: "Words",
  },
];

const characterSet = "abcdefghijklmnopqrstuvwxyz";

class Settings extends Component {
  state = { activeSource: source[0].sourceId, combination: 2, repetition: 2 };

  componentDidMount() {
    const { activeSource, combination, repetition } = this.state;
    this.setState({ activeSource, combination, repetition }, this.dataSource);
  }

  onChangeSource = (event) => {
    this.setState(
      { activeSource: parseInt(event.target.value) },
      this.dataSource
    );
  };

  onChangeCombo = (event) => {
    this.setState({ combination: event.target.value }, this.dataSource);
  };

  onChangeRepetition = (event) => {
    this.setState({ repetition: event.target.value }, this.dataSource);
  };

  dataSource = () => {
    const { getSentence } = this.props;
    const { activeSource, combination, repetition } = this.state;
    let sentence = "";
    let stringSet = "";
    for (let i = 0; i < combination; i++) {
      let word = "";
      for (let item of source) {
        if (activeSource === item.sourceId && activeSource !== 4) {
          for (let j = 0; j <= activeSource; j++) {
            const index = Math.floor(Math.random() * 26);
            word += characterSet[index];
          }
        }
      }
      stringSet += word + " ";
    }
    sentence = stringSet.repeat(repetition);

    if (activeSource === 4) {
      let strings = "";
      for (let words of randomWords(5)) {
        strings += words + " ";
      }
      sentence = strings;
    }
    getSentence(sentence);
  };

  render() {
    const { activeSource, combination, repetition } = this.state;
    const { recall } = this.props;
    const recallComponent = recall ? this.dataSource() : "";

    return (
      <div className="settings-container">
        <div className="settings">
          <h1 className="heading">Source</h1>
          <ul className="source">
            {source.map((item) => (
              <li key={item.sourceId} className="custom-control">
                <input
                  type="radio"
                  name="radio"
                  value={item.sourceId}
                  checked={item.sourceId === activeSource ? true : false}
                  onChange={this.onChangeSource}
                  className="radio-btn"
                />
                <label className="label">{item.source}</label>
              </li>
            ))}
          </ul>
          <div className="generator-container">
            <h1 className="heading">Generator</h1>
            <div className="combination-container">
              <label htmlFor="combination" className="combination">
                Combination
              </label>
              <input
                type="number"
                name="combination"
                value={combination}
                className="text-box"
                onChange={this.onChangeCombo}
                className="field"
              />
            </div>
            <div className="combination-container">
              <label htmlFor="repetition" className="combination">
                Repetition
              </label>
              <input
                type="number"
                name="repetition"
                value={repetition}
                className="text-box"
                onChange={this.onChangeRepetition}
                className="field"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
