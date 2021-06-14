import React, { Component } from "react";
import axios from "axios"

class ProductVariables extends Component {
  state = {
    variables: [],
    createN : false ,
    variableName : "",
    variableValue : "",
    message : ""
  };

  componentDidMount=()=>{
if (this.props.varr === "N/A") {
this.setState({variables : []})
} else {
  console.log(this.props.varr)
  this.setState({
    variables : this.props.varr
  })
}}

  onCh = e =>{
    this.setState({
     [ e.target.name] : e.target.value
    })
  }

  sendVariable = () => {
  

    let currentVariables = this.state.variableValue;
    let varriableArray = currentVariables.split(",")
    let objectVar = {}
    
    
    varriableArray.map((x,index)=>{
      var key=index;
      objectVar[key] = x;
    })
 
    let variable = { 
      productId : this.props.PID,
      variableName : this.state.variableName,
      variableValue : varriableArray
    }

    console.log(variable)


    axios.post("/dash/product/add/variable",variable)
    .then(res=>{
      console.log(res.data)
    })
    .catch(err=>{
      console.log(err.data)
    })
  }


  createVar=()=>{
      this.setState({
          
          createN : true
      })
  }


  createVarr =()=>{
      if (this.state.createN) {
      return (
        <div className="card  my-2">
        <div className="card-body">
          <div className="d-flex col-12 align-items-center">
            <div>
                <div className="text-secondary">
                    Variable Name
                </div>
              <input
                className="form-control"
               onChange={this.onCh}
                name="variableName"
                type="text"
              />
            </div>
            <div>
            </div>
            <div className="px-2">=</div>
            <div>
            <div className="text-secondary">
                    Variants
                </div>
              <input
                onChange={this.onCh}
                className="form-control"
                name="variableValue"
                type="text"
              />
            </div>
            <div>
                <div>
                    .
                </div>
            <button
            onClick={this.sendVariable}
            className="button button-primary ml-2 btn btn-primary ">Add</button>
            </div>
            <div>
                <div>
                    .
                </div>
            <button onClick={this.cancelC} className=" button ml-2 btn btn-danger ">Cancel</button>
            </div>
          </div>
        </div> 
      </div>
      )}
  }

  cancelC=()=>{
      this.setState({
          createN : false
      })
  }

  deleteVariable=(e)=>{
    axios.get(`/dash/product/delete/variable/${e.target.name}`)
    .then(res=>{
      this.setState({
        message : res.data.message
      })
    })
    .catch(err=>{
      this.setState({
        message : err.data.message
      })
    })
  }

  variables=()=>{
 
    if (this.state.variables.length > 0) {
      return (
        this.state.variables.map((vr, index) => (
          
          <div key={index} className="card mt-2">
            
            <div className="card-body">
              <div className="d-flex col-12 align-items-center">
                <div>
                    <div className="text-secondary">
                        Variable Name
                    </div>
                  <input
                    className="form-control"
                    defaultValue={vr.variableName}
                    name="variableName"
                    type="text"
                  />
                </div>
                <div>
                    
                </div>
                <div className="px-2">=</div>
                <div>
                <div className="text-secondary">
                        Variants
                    </div>
                  <input
                    className="form-control"
                    defaultValue={vr.variableValue}
                    name="variableValue"
                    type="text"
                  />
                </div>
                <div>
                    <div>
                        .
                    </div>
                <button
                
                onClick={this.editVar} className=" button button-primary  ml-2 btn btn-primary ">Update</button>
                </div>
                <div>
                    <div>
                        .
                    </div>
                <button name={vr.id} onClick={this.deleteVariable} className="ml-2 btn btn-danger ">Remove</button>
                </div>
              </div>
            </div> 
          </div>
        ))
      )
    } else { 
      return (
      <div>
      </div>
      )
  
    }

//    if (this.state.variables.length > 0) {
//        return (
       
//        )
//    }  else {
//     return (
//         <div>
            
//         </div>
//     )
// }
  }


  clearMessage = () => {
    this.setState({ message: "" });
  };

  messageShow = () => {
    if (this.state.message) {
      return (
        <div className="mt-3 sufee-alert alert with-close alert-success alert-dismissible fade show">
          <span className="badge badge-pill badge-success">
            success
          </span>{" "}
          {this.state.message}
          <span
            onClick={this.clearMessage}
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </span>
        </div>
      );
    }
  };

  // editVar=()=>[
    // ndapererwa
  // ]

  render() {
    return (
      <div className="card-body">
       {this.messageShow()}
       {this.variables()}
        <div className="w-100 mt-2">
        {this.createVarr()}
        <button onClick={this.createVar} className="button button-primary  btn btn-primary">
            Create New Variable
        </button>
        </div>
      </div>
    );
  }
}

export default ProductVariables;
