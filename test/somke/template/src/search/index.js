import husa from "../../common"
import {a} from "./tree-shaking"
import React from "react"
import ReactDOM from "react-dom"

class Husa extends React.Component{
  constructor(){
    super(...arguments);
    this.loadComponent = this.loadComponent.bind(this)
    this.state = {
      Text:null
    }
  }

  loadComponent(){
    import("./Test").then(Text=>{
      this.setState({
        Text:Text.default
      }) 
    })
  }

  render(){
    const {Text} = this.state;
    return (
      <div>
        <h1>kaka</h1>
        {Text ? <Text /> : null}
        <button onClick={this.loadComponent}>====</button>
      </div>
    )
  }
}

ReactDOM.render(
  <Husa />,
  document.getElementById("root")
)