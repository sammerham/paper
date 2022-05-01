import React, { useMemo, useState } from 'react';
import rock from './images/rock.png'
import paper from './images/paper.png';
import scissors from './images/scissors.png';
import './App.css';

function App() {

  const inittialState = {
    playerName: "",
    roundsNum:""
  }

  const choices = ['rock', 'paper', 'scissors'];
  const [userSelectet, setUserSelected] = useState('');
  const [computerSelected, setComputerSelected] = useState('');
  const [disable, setDisable] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [reset, setReset] = useState(false)
  const [msg, setMsg] = useState('');
  const [formData, setFormData] = useState(inittialState)

  const [data, setData] = useState({});
  

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }))
  };

  const handleSubmit = e => {
    e.preventDefault();
    setData(formData);
    setFormData(inittialState);
  }


  const restart = () => window.location.reload();

  
  const computerPlay = () => {
    if (!userSelectet) return;
    const computerChoiceIdx = Math.floor(Math.random() * choices.length);
    setComputerSelected(choices[computerChoiceIdx]);
    setDisable(false);
  };

  useMemo(() => {
    if (userSelectet === computerSelected) {
      setMsg(`It's a tie`)
    }
    if (
        (computerSelected === 'rock' && userSelectet === 'scissors') ||
        (computerSelected === 'scissors' && userSelectet === 'paper') ||
        (computerSelected === 'paper' && userSelectet === 'rock')
      ) {
      setComputerScore(score => score + 1);
      setMsg(`Computer Wins!!`)
      
    }
    if (
        (userSelectet === 'rock' && computerSelected === 'scissors') ||
        (userSelectet === 'scissors' && computerSelected === 'paper') ||
        (userSelectet === 'paper' && computerSelected === 'rock')
      ) { 
        setUserScore(score => score + 1);
        return setMsg(`${data.playerName} Wins!!`);
    }
  
  }, [userSelectet, computerSelected, data.playerName]);


  useMemo(() => {
    if (computerScore === (+data.roundsNum)) {
      setMsg(`Final winner is Computer!!`)
      setReset(true)
    }
  
    if (userScore === (+data.roundsNum)) {
      setMsg(`Final winner is ${data.playerName}!!`)
      setReset(true)
    }
  }, [userScore, computerScore, data.playerName, data.roundsNum])
console.log(data)
  const handleRock = (e)=> {
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
  

  
  return (
    <div className="App">
      <h1>Rock Paper Scissors</h1>
      {
        !(data.playerName && data.roundsNum)
          ?
      
            <form onSubmit={handleSubmit}>
               <label htmlFor="RoundsNum">Winning Score</label> &nbsp;
              <input
                type="number"
                name="roundsNum"
                id="roundsNum"
                value={formData.roundsNum}
                onChange={handleChange}
              min={1}
            /> &nbsp;&nbsp;
              <label htmlFor="playerName">Player Name </label>&nbsp;
              <input
                type="text"
                name="playerName"
                id="playerName"
                value={formData.playerName}
                onChange={handleChange}
            /> &nbsp;&nbsp;
              <button type='submit'>Choose</button>
          </form>
          
          :
<>
        {reset ?
        <>
          <div>{msg}</div>
          <button onClick={restart}>Play again</button>
        </>
        :
      
        <>
          <div>
            <span>Player Name : {data.playerName}</span> <br />

            <span>Winning Score : {data.roundsNum}</span><br />
                  <h4>{data.playerName}'s choice: {userSelectet} </h4>
                  <h4>{data.playerName}'s score is :{userScore}</h4>
          </div>
          <div>
            <button onClick={handleRock} disabled={disable} style={{borderColor:userSelectet === 'rock' ? 'black' : 'white'}}><img src={rock} alt="rock" /></button>
            <span>  </span>
                  <button onClick={handlePaper} disabled={disable} style={{ borderColor: userSelectet === 'paper' ? 'black' : 'white' }}><img src={paper} alt="paper"/></button>
            <span>  </span>
                  <button onClick={handleScissors} disabled={disable} style={{ borderColor: userSelectet === 'scissors' ? 'black' : 'white' }}><img src={scissors} alt="scissors" /></button>
                </div>
                <div>
                  <h4>Computer's choice: {computerSelected}</h4>
                  <h4>Computer's score is: {computerScore}</h4>
            </div>
          <div>
            <br />
            <button onClick={computerPlay} disabled={!disable}>Computer Play</button>
          </div>
          <div>
            {userSelectet && computerSelected && <div>{msg}</div>}
          </div>
        </>
      }
      </>

        }
      
      
    </div>
  );
}

export default App;

