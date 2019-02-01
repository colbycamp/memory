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
      score: 0,
      clickCount: 0
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

  createTable(input){
    let result = [];
    for (let [key, value] of input) {
      result.push(<td onClick={() => {this.click(key)}}>{value}</td>);
    }
    return result;
  }

  click(clicked) {
    let temp = this.state.clickedCards;
    let tempCards = this.state.cards;

    if (temp.length < 1) {
      console.log("Added!");
      temp.push(clicked)
    } else {
      console.log("Added!");
      temp.push(clicked)
      
      if((temp[0].charAt(0)) == (temp[1].charAt(0))) {
        tempCards.set(temp[0], ["✓", true]);
        tempCards.set(temp[1], ["✓", true]);
        console.log("Yay!");
      }
      console.log("Reset!");
      temp = [];
    }
    this.setState({clickedCards: temp});
    this.setState({cards: tempCards});
    console.log(this.state.cards);
  }
  
  render() {  
    return(  
      <table>
        <tr>
          {this.createTable(this.state.cards)}
        </tr>
      </table>
    );
  }
}