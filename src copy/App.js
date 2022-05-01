import React, { useMemo, useState } from 'react';
import rock from './images/rock.png'
import paper from './images/paper.png';
import scissors from './images/scissors.png';
import './App.css';

function App() {
  const choices = ['rock', 'paper', 'scissors'];
  const [userSelectet, setUserSelected] = useState('');
  const [computerSelected, setComputerSelected] = useState('');
  const [disable, setDisable] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [reset, setReset] = useState(false)
  const [msg, setMsg] = useState('');


  const restart = () => window.location.reload();

  const style = {
    width:'100px',
    height:'100px'
  }
  
  const computerPlay = () => {
    if (!userSelectet) return;
    const computerChoiceIdx = Math.floor(Math.random() * choices.length);
    setComputerSelected(choices[computerChoiceIdx]);
    setDisable(false);
  };

  const result = useMemo(() => { 
    if (userSelectet === computerSelected) { 
      return `It's a tie`
    } else {
      if (
        (computerSelected === 'rock' && userSelectet === 'scissors') ||
        (computerSelected === 'scissors' && userSelectet === 'paper') ||
        (computerSelected === 'paper' && userSelectet === 'rock')
      ) {
        setComputerScore(score => score + 1);
        return `Computer Wins!!`
      } 
      if(computerSelected) setUserScore(score => score + 1);
      return `Player Wins!!`
    }
  }, [userSelectet, computerSelected]);


  const handleRock = ()=> {
    setDisable(true)
    setUserSelected('rock');
    setComputerSelected('')
  }
    const handleScissors = ()=> {
    setUserSelected('scissors');
      setDisable(true)
       setComputerSelected('')
    }
    const handlePaper = ()=> {
      setUserSelected('paper');
      setDisable(true)
      setComputerSelected('')
    }
  
  const checkForWin = () => {
    if (userScore === 5) {

      return `Final winner is Player!!`
    } else if (computerScore === 5) {
   
      return `Final winner is Computer!!`
    }
  }
  console.log('player ---->>',userSelectet, "computer --->>",computerSelected)
  
  return (
    <div className="App">
      <h1>Rock Paper Scissors</h1>
      <div>
        <h4>Player choice: {userSelectet}, score is :{userScore}</h4>
        <h4>Computer choice: {computerSelected}, score is {computerScore}</h4>
        
      </div>
      <div>
        <button onClick={handleRock} disabled={disable}><img src={rock} alt="rock" style={style}/></button>
        <span>  </span>
        <button onClick={handlePaper} disabled={disable}><img src={paper} alt="paper" style={style}/></button>
        <span>  </span>
        <button onClick={handleScissors} disabled={disable}><img src={scissors} alt="scissors" style={style}/></button>
      </div>
      <div>
        <br />
        <button onClick={computerPlay} disabled={!disable}>Computer Play</button>
      </div>
      <br />
      {userSelectet && computerSelected && userScore < 5 && computerScore <5 &&
        <div>This rounds result is:{result}</div>
      }
      {(userScore === 5 || computerScore === 5) && <div>CONGRATS!!{checkForWin()}</div>}
    </div>
  );
}

export default App;
