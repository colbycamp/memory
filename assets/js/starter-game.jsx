import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root) {
  ReactDOM.render(<Starter />, root);
}

class Starter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      cards: {},
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
        result.set((temp[i] + "0"), false);
      } else {
        result.set((temp[i] + "1"), false);
      }
    }
    return result;
  }

  createTable(input){
    let result = [];
    for (let i of input.keys()) {
      result.push(<td onClick={() => {this.click(i)}}>{i}</td>);
    }
    return result;
  }

  click(clicked) {
    let temp = this.state.clickedCards;
    if (temp.length < 1) {
      console.log("Added!");
      temp.push(clicked)
    } else {
      console.log("Added!");
      temp.push(clicked)
      
      if((temp[0].charAt(0)) == (temp[1].charAt(0))) {
        cards[temp[0]] = ["✓", true] 
        console.log("Yay!");
      }
      console.log("Reset!");
      temp = [];
    }
    this.setState({clickedCards: temp})
  }
  
  render() {
    let cards = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H'];
    let currentGameCards = this.shuffleAndMap(cards);

    let cardsForRender = this.createTable(currentGameCards);
  
    return(  
      <table>
        <tr>
          {cardsForRender}
        </tr>
      </table>
    );
  }
}