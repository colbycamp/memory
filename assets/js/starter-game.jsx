import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root) {
  ReactDOM.render(<Starter />, root);
}

class Starter extends React.Component {
  constructor(props) {
    super(props);
    let cards = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'];

    this.state = { 
      cards: this.shuffleAndMap(cards),
      clickedCards: [],
      clickCount: 0,
      matched: false
    };
  }

  shuffleAndMap(input) {
    let result = new Map();
    let temp = _.shuffle(input);
    for (let i = 0; i < temp.length; i++){
      // Card Letter, Match has been Completed
      if(!result.has(temp[i] + "0")){
        result.set((temp[i] + "0"), [temp[i], false]);
      } else {
        result.set((temp[i] + "1"), [temp[i], false]);
      }
    }
    return result;
  }

  createTableHelper(input){
    let result = [];
    for (let [key, value] of input) {
      if(value[1]){
        result.push(<td onClick={() => {this.click(key)}}>{value}</td>);
      } else {
        result.push(<td className="hide" onClick={() => {this.click(key)}}>{value}</td>);
      }
    }
    return result;
  }

  createTable(input){
    let result = [];
    let temp = this.splitArray(this.createTableHelper(input), 4);
    for(let i of temp) {
      result.push(<tr>{i}</tr>);
    }
    return result;
  }

  splitArray(arr, n) {
    let result = [];
    while (arr.length) {
      result.push(arr.splice(0, n));
    }
    return result;
  }

  reset() {
    let cards = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'];
    this.setState({
      cards: this.shuffleAndMap(cards),
      clickedCards: [],
      clickCount: 0,
      matched: false
    });
  }

  click(clicked) {
    let tempCards = this.state.cards;
    let temp = this.state.clickedCards;

    if (tempCards.get(clicked)[0] != "✓") {
      this.setState({clickCount: (this.state.clickCount + 1)});
      tempCards.set(clicked, [clicked.charAt(0), true]);

      if(temp.length >= 2) {
        if (!this.state.matched) {
          tempCards.set(temp[0], [temp[0].charAt(0), false]);
          tempCards.set(temp[1], [temp[1].charAt(0), false]);
        }
        console.log("Reset!");
        temp = [];
      } 

      if (temp.length < 1) {
        console.log("Added!");
        temp.push(clicked)

      } else {
        console.log("Added!");
        temp.push(clicked)
        
        if((temp[0] != temp[1]) && (temp[0].charAt(0)) == (temp[1].charAt(0))) {
          tempCards.set(temp[0], ["✓", true]);
          tempCards.set(temp[1], ["✓", true]);
          this.setState({matched: true});
          console.log("Yay!");
        } else {
          this.setState({matched: false});
        }
      }
      this.setState({clickedCards: temp});
      this.setState({cards: tempCards});
      console.log(this.state.cards);
    }
  }
  
  render() {  
    return(  
      <>
        <div>Score: {this.state.clickCount}</div>
        <br />
        <table>
          <tbody>
           {this.createTable(this.state.cards)}
          </tbody>
        </table>
        <br />
        <button onClick={() => {this.reset()}}> RESET </button>
      </>
    );
  }
}