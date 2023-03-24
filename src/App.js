import './App.css';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const WALL_HEIGHT = 600;
const WALL_WIDTH = 400;
const BIRD_WIDTH = 33;
const BIRD_HEIGHT = 28;
const obj_Width = 52;

function App() {
  
  const [score, setScore] = useState(0);
  const [birdpos, setBirdpos] = useState(300);
  const [isStart, setisStart] = useState(false);
  const [obj_Height, setObjheight] = useState(200);
  const [objPos, setObjpos] = useState(WALL_WIDTH);
  const bottomOBjHeight = WALL_HEIGHT - 200 - obj_Height;
 

  useEffect(()=>{
    let birdval;
      if(isStart && birdpos <= WALL_HEIGHT - BIRD_HEIGHT){
          birdval = setInterval(() => {
            setBirdpos((birdpos) => birdpos+5);
          }, 25);
      }

      return (()=> clearInterval(birdval));
    });

    useEffect(()=>{
      let objVal;
      if(isStart && objPos >= -obj_Width){
        objVal = setInterval(()=>{
          setObjpos((objPos) => objPos - 6);
        },25)
      }
      else{
          setObjpos(WALL_WIDTH);
          setObjheight(Math.floor(Math.random() * 400));
          if(isStart)
              setScore(score+1);
          else
              setScore(0);
      }

      return (()=> clearInterval(objVal));
    },[isStart,objPos])

    useEffect(()=>{
      let topObj = birdpos >= 0 && birdpos < obj_Height;
      let bottomObj = birdpos <= WALL_HEIGHT && birdpos >= WALL_HEIGHT - bottomOBjHeight - BIRD_HEIGHT;

      if(objPos >= obj_Width && objPos <= 130 && (topObj || bottomObj)){
          setisStart(false);
          setBirdpos(300);
      }
    },[birdpos, obj_Height, bottomOBjHeight, objPos]);

const handler = () => {
  if(birdpos > 40){
  setBirdpos((birdpos) => birdpos - 50);
  } 
  else setBirdpos(0);
}

const startHandler = () => {
  setisStart(true);
  
}
  
  return (
    <Home>
        <div className='score'>Score : {score} </div>
        <Background width={WALL_WIDTH} height={WALL_HEIGHT} onClick={isStart && handler}>
        {!isStart && <StartGmae onClick={startHandler} >Click to Start</StartGmae>}
          <Obj height={obj_Height} width={obj_Width} left={objPos} top={0} deg={180}/>
            <Bird 
              height={BIRD_HEIGHT}
              width={BIRD_WIDTH}
              top={birdpos}
              left={100}
            />
          <Obj height={bottomOBjHeight} width={obj_Width} left={objPos} top={200} deg={0}/>
        </Background>
    </Home>
  );
}

export default App;


const Home = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Background = styled.div`
  background-image: url('https://user-images.githubusercontent.com/18351809/46888871-624a3900-ce7f-11e8-808e-99fd90c8a3f4.png');
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border: 2px solid black;
  position: relative;
  overflow: hidden;
`;
const Bird = styled.div`
  position: absolute;
  background-image: url('https://raw.githubusercontent.com/krishnenduroy52/Flappy-bird/main/public/images/yellowbird-upflap.png');
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

const StartGmae = styled.div`
text-align: center;
position: relative;
top: 49%;
background: black;
color: white;
width: 100px;
margin: auto;
font-size: 20px;
border-radius: 4px;
display: block;
`;

const Obj = styled.div`
  position: relative;
  background-image: url('https://raw.githubusercontent.com/krishnenduroy52/Flappy-bird/main/public/images/pipe-green.png');
  width: ${(props) => props.width}px;
  height: ${(props)=> props.height}px;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  transform: rotate(${props=>props.deg}deg);
`;