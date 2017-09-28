
import React, { Component } from 'react';
import "./Box.scss";

class Box extends Component {

  idToIndex(id){
  return id.split('-');


  }
  reply_click(clicked_id)
  {

    const arr = this.idToIndex(clicked_id.target.id);
    console.log(arr);
      // console.log(clicked_id.target.id);
      // document.getElementById(clicked_id.target.id).className=document.getElementById(clicked_id.target.id).className==="one"?"zero":"one";
      this.props.toggleCell(parseInt(arr[1]),parseInt(arr[2]));
  }
  render() {
    return (
      <div>
        {this.props.box.map((row,index)=>{
        return(
          <div key={index} className="row-box">
            {row.map((itm,ind)=><div  onClick={this.reply_click.bind(this)} key={'key-'+index+'-'+ind} className={this.props.box[index][ind]===0?'zero':'one'} id={'id-'+index+'-'+ind}></div>)}
        </div>
        )
      })
      }
      </div>
    );
  }

}

export default Box;
