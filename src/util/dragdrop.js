import React, { Component } from "react";
class DragAndDrop extends Component {
  state = {
    drag: false,
    draggingInside: false,
  };

  dropRef = React.createRef();
  handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      draggingInside: true,
    });
    this.dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ drag: true });
    }
  };
  handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter === 0) {
      this.setState({ drag: false });
    }
  };
  handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ drag: false });
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      console.log("dropped");
      if (e.dataTransfer.files[0].type === "application/pdf") {
        this.props.handleDrop(e.dataTransfer.files[0]);
      }

      e.dataTransfer.clearData();
      this.dragCounter = 0;
    }
  };
  componentDidMount() {
    let div = this.dropRef.current;
    div.addEventListener("dragenter", this.handleDragIn);
    div.addEventListener("dragleave", this.handleDragOut);
    div.addEventListener("dragover", this.handleDrag);
    div.addEventListener("drop", this.handleDrop);
  }
  componentWillUnmount() {
    let div = this.dropRef.current;
    div.removeEventListener("dragenter", this.handleDragIn);
    div.removeEventListener("dragleave", this.handleDragOut);
    div.removeEventListener("dragover", this.handleDrag);
    div.removeEventListener("drop", this.handleDrop);
  }

  clicktoupload = () => {
    let input = document.createElement("input");
    document.body.appendChild(input);
    input.type = "file";
    input.hidden = true;
    input.accept = "application/pdf";
    input.onchange = this.selectedChange;
    input.click();
  };

  selectedChange = (e) => {
    let files = e.target.files[0];
    this.props.handleDrop(files);
  };

  render() {
    return (
      <div
        onDragLeave={() => this.setState({ drag: false })}
        onMouseLeave={() => this.setState({ drag: false })}
        onClick={this.clicktoupload}
        className={this.props.set ? "ml-g-bo-upload" : "ml-drag-plain"}
        style={{ position: "relative" }}
        ref={this.dropRef}
      >
        {this.props.children}
      </div>
    );
  }
}
export default DragAndDrop;
