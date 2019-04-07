import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";

class App extends Component {
  // Setting this.state.cards to the cards json array
  state = {
    friends,
    clickedArray: [],
    topScore: 0,
    score: 0,
    message: "",
    shuffle: false
  };
  clickPicture = id => {
    // Arrange the pictures in a random manner
    const shuffledArray = this.shuffleArray(friends);
    this.setState({ friends: shuffledArray });
    // if clicked an image already clicked set this.state.score = 0; empty clickeadArray, end of if block
    if (this.state.clickedArray.includes(id)) {
      this.setState({ score: 0, clickedArray: [], message: "Incorrect!! Game Over ☹️ Click an image to start again!", shuffle: true});
    }
    else {
      this.setState({
        clickedArray: this.state.clickedArray.concat([id]),
        score: this.state.score + 1,
        message: "You guessed Correctly!! 🙂😀",
        shuffle: false
      });
    }
    // set topscore = score if score>topscore.
    if (this.state.score > this.state.topScore) {
      this.setState({ topScore: this.state.score });
    }
    // shuffle the wrapper if shuffle is set to true
  }
  shuffleArray = (picturesArray) => {
    for (let i = picturesArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [picturesArray[i], picturesArray[j]] = [picturesArray[j], picturesArray[i]];
    }
    return picturesArray;
  }

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (

      <div className="App">
        <Title>CLICKY GAME</Title>
        <h3 className="App-intro">
          <strong>Click on an image to earn points, but don't click on any, more than once!</strong>
          <p className="score"><strong>Score: {this.state.score} | TopScore: {this.state.topScore}</strong></p>
          <p className="message"><strong>{this.state.message}</strong></p>
        </h3>
        <Wrapper>
          {this.state.friends.map(friend => (
            <FriendCard
              clickPicture={this.clickPicture}
              id={friend.id}
              key={friend.id} // to get rid of unique key prop warning
              name={friend.name}
              image={friend.image}
            />
          ))}
        </Wrapper>
      </div>

    );
  }
}

export default App;
