
import React, { Component } from 'react';
import Box from './Box';
  import './App.scss';

const BOARD_WIDTH=30;
const BOARD_HEIGHT=30;
class App extends Component {
  constructor(props) {
    super(props);
    let arr=[];
    for (let i =0; i < BOARD_WIDTH; i++) {
      let array=[];
      for (let i = 0; i < BOARD_HEIGHT; i++) {
        array.push(0);
      }
      arr.push(array);

    }
    this.state = {box:arr,
      start:'stop',
      pause:false,
      boardSize:{width:BOARD_WIDTH,height:BOARD_HEIGHT},
      generation:0
    };

  }
componentDidMount() {

}

clearBox(){
  let arr=[];
  for (let i =0; i < BOARD_WIDTH; i++) {
    let array=[];
    for (let i = 0; i < BOARD_HEIGHT; i++) {
      array.push(0);
    }
    arr.push(array);

  }
  this.setState({
  box:arr,
  start:'stop',
  pause:false,
  boardSize:{width:BOARD_WIDTH,height:BOARD_HEIGHT},
  generation:0
  });

}
toggleCell(i,j){

  let left=[...this.state.box[i].slice(0,(j)),(this.state.box[i][j]===1?0:1)];
  let row=[...left,...this.state.box[i].slice(j+1)];
  let lrow=[...this.state.box.slice(0,(i)),row];
  let updatedState=[...lrow,...this.state.box.slice(i+1)];
  // let updatedState=this.state.box;
  //     updatedState[i][j]=updatedState[i][j]===1?0:1;
  this.setState({
    box: updatedState,
    start:this.state.start,
    pause:this.state.pause,
    boardSize:this.state.boardSize,
    generation:this.state.generation
  });
}

setCell(i,j,box,state){
console.log("Box state 1 -->");
  let left=[...box[i].slice(0,(j)),state];
  let row=[...left,...box[i].slice(j+1)];
  let lrow=[...box.slice(0,(i)),row];
  let updatedState=[...lrow,...box.slice(i+1)];
  // let updatedState=this.state.box;
  //     updatedState[i][j]=updatedState[i][j]===1?0:1;
  console.log(updatedState);
  return updatedState;
}
resetCell(i,j){

  let left=[...this.state.box[i].slice(0,(j)),0];
  let row=[...left,...this.state.box[i].slice(j+1)];
  // console.log(row);
  let lrow=[...this.state.box.slice(0,(i)),row];
  let updatedState=[...lrow,...this.state.box.slice(i+1)];
  // let updatedState=this.state.box;
  //     updatedState[i][j]=updatedState[i][j]===1?0:1;
  this.setState({
    box: updatedState,
    start:this.state.start,
    pause:this.state.pause,
    boardSize:this.state.boardSize,
    generation:this.state.generation
  });
}


checkRules(i,j,state){
   const total =this.calcAdjacentCellsSetState(i,j);
   if(state===1&&total<2)
      return 0;
   else if(state===1&&total>3)
      return 0;
   else if(state===0,total===3)
      return 1;
   else
      return state;

}
calcAdjacentCellsSetState(i,j){
const iLimi=this.state.box.length-1;
const jLimi=this.state.box[0].length-1;

  if(i!==0&&j!==0&&i<(iLimi)&&j<(jLimi)){
    const im1jm1=this.state.box[i-1][j-1];
    const im1j=this.state.box[i-1][j];
    const im1jp1=this.state.box[i-1][j+1];
    const ijp1=this.state.box[i][j+1];
    const ip1jp1=this.state.box[i+1][j+1];
    const ip1j=this.state.box[i+1][j];
    const ip1jm1=this.state.box[i+1][j-1];
    const ijm1=this.state.box[i][j-1];
    return im1jm1+im1j+im1jp1+ijp1+ip1jp1+ip1j+ip1jm1+ijm1;
  }
  else if(i===0&&j!==0&&i<(iLimi)&&j<(jLimi))
  {
    const im1jm1=this.state.box[iLimi][j-1];
    const im1j=this.state.box[iLimi][j];
    const im1jp1=this.state.box[iLimi][j+1];
    const ijp1=this.state.box[i][j+1];
    const ip1jp1=this.state.box[i+1][j+1];
    const ip1j=this.state.box[i+1][j];
    const ip1jm1=this.state.box[i+1][j-1];
    const ijm1=this.state.box[i][j-1];
    return im1jm1+im1j+im1jp1+ijp1+ip1jp1+ip1j+ip1jm1+ijm1;
  }
  else if(i!==0&&j===0&&i<(iLimi)&&j<(jLimi))
  {
    const im1jm1=this.state.box[i-1][jLimi];
    const im1j=this.state.box[i-1][j];
    const im1jp1=this.state.box[i-1][j+1];
    const ijp1=this.state.box[i][j+1];
    const ip1jp1=this.state.box[i+1][j+1];
    const ip1j=this.state.box[i+1][j];
    const ip1jm1=this.state.box[i+1][jLimi];
    const ijm1=this.state.box[i][jLimi];
    return im1jm1+im1j+im1jp1+ijp1+ip1jp1+ip1j+ip1jm1+ijm1;
  }else if(i!==0&&j!==0&&i===(iLimi)&&j<(jLimi))
  {
    const im1jm1=this.state.box[i-1][j-1];
    const im1j=this.state.box[i-1][j];
    const im1jp1=this.state.box[i-1][j+1];
    const ijp1=this.state.box[i][j+1];
    const ip1jp1=this.state.box[0][j+1];
    const ip1j=this.state.box[0][j];
    const ip1jm1=this.state.box[0][j-1];
    const ijm1=this.state.box[i][j-1];
    return im1jm1+im1j+im1jp1+ijp1+ip1jp1+ip1j+ip1jm1+ijm1;
  }else if(i!==0&&j!==0&&i<(iLimi)&&j===(jLimi))
  {
    const im1jm1=this.state.box[i-1][j-1];
    const im1j=this.state.box[i-1][j];
    const im1jp1=this.state.box[i-1][0];
    const ijp1=this.state.box[i][0];
    const ip1jp1=this.state.box[0][0];
    const ip1j=this.state.box[i+1][j];
    const ip1jm1=this.state.box[0][j-1];
    const ijm1=this.state.box[i][j-1];
    return im1jm1+im1j+im1jp1+ijp1+ip1jp1+ip1j+ip1jm1+ijm1;
  }
}



generateLife(){
  if(!this.state.pause){
let box=this.state.box.map((row,index)=>{
let lrow=row.map((cell,ind)=>this.checkRules(parseInt(index),parseInt(ind),cell));
 return (lrow
)
});

this.setState({
  box:box,
  start:this.state.start,
  pause:this.state.pause,
  boardSize:this.state.boardSize,
  generation:(this.state.generation+1)
});
}
}

startSimulation(){
  if(!this.state.pause){
    let start;
    if(this.state.start==='stop'){
      start=setInterval(this.generateLife.bind(this),200);
      console.log('start');
      console.log(start);
  this.setState({
    box:this.state.box,
    start:start,
    pause:false,
    boardSize:this.state.boardSize,
    generation:this.state.generation
  });
}
}
else{
  this.setState({
    box:this.state.box,
    start:this.state.start,
    pause:false,
    boardSize:this.state.boardSize,
    generation:this.state.generation
  });
}
}
stopSimutation(){
clearInterval(this.state.start);
this.clearBox();
}
boardResize(width,height){
  let arr=[];
  for (let i =0; i < width; i++) {
    let array=[];
    for (let i = 0; i < height; i++) {
      array.push(0);
    }
    arr.push(array);

  }
  this.setState({
    box: arr,
    start:this.state.start,
    pause:this.state.pause,
    boardSize:{width,height},
    generation:this.state.generation
  });
}
pauseSimutation(){
  this.setState({
    box:this.state.box,
    start:this.state.start,
    pause:true,
    boardSize:this.state.boardSize,
    generation:this.state.generation
  });
}
  render() {
    return (
      <div>
      <div className="game-box">
      <button onClick={this.startSimulation.bind(this)}>Run</button>
      <button onClick={this.pauseSimutation.bind(this)}>Pause</button>
      <button onClick={this.stopSimutation.bind(this)}>Clear</button>
      <span>Generation {this.state.generation}</span>
      <Box toggleCell={this.toggleCell.bind(this)}box={this.state.box}/>
      <button onClick={this.boardResize.bind(this,20,20)}>20X20</button>
      <button onClick={this.boardResize.bind(this,30,30)} >30X30</button>
      <button onClick={this.boardResize.bind(this,50,50)}>50X50</button>
      </div>
      </div>

    );
  }

}

export default App;
