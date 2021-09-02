import React, { Component } from "react";

class CircularProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // Size of the enclosing square
    const sqSize = this.props.sqSize;
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (this.props.sqSize - this.props.strokeWidth) / 2;
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2;
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - (dashArray * this.props.percentage) / 100;

    return (
      <svg
        width={this.props.sqSize}
        height={this.props.sqSize}
        viewBox={viewBox}
      >
        <circle
          className="circle-background"
          cx={this.props.sqSize / 2}
          cy={this.props.sqSize / 2}
          r={radius}
          strokeWidth={`${this.props.strokeWidth}px`}
        />
        <circle
          className="circle-progress"
          cx={this.props.sqSize / 2}
          cy={this.props.sqSize / 2}
          r={radius}
          strokeWidth={`${this.props.strokeWidth}px`}
          // Start progress marker at 12 O'Clock
          transform={`rotate(-90 ${this.props.sqSize / 2} ${
            this.props.sqSize / 2
          })`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
        />

        {this.props.hpl && (
          <foreignObject x="17" y="28" width="100" height="80">
            <div className="text-center" xmlns="http://www.w3.org/1999/xhtml">
              <div className="h1 bold c-blue-- mb-0">{this.props.progress}</div>
              <div className="text-secondary h6">out of {this.props.limit}</div>
            </div>
          </foreignObject>
        )}

        {this.props.dt && (
          <foreignObject x="17" y="28" width="100" height="80">
            <div className="text-center" xmlns="http://www.w3.org/1999/xhtml">
              <div className="h1 bold c-blue-- mb-0">{this.props.text}</div>
              <div className="text-secondary h6">Visits</div>
            </div>
          </foreignObject>
        )}
      </svg>
    );
  }
}

CircularProgressBar.defaultProps = {
  sqSize: 200,
  percentage: 25,
  strokeWidth: 10,
};

class ReturnProgress extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      percentage: this.props.progress ? this.props.progress : 25,
    };

    this.handleChangeEvent = this.handleChangeEvent.bind(this);
  }

  handleChangeEvent(event) {
    this.setState({
      percentage: event.target.value,
    });
  }

  render() {
    if (this.props.hpl) {
      let percentage = (this.props.progress / this.props.limit) * 100;
      return (
        <div>
          <CircularProgressBar
            strokeWidth="10"
            sqSize="130"
            hpl={true}
            limit={this.props.limit}
            progress={this.props.progress}
            percentage={percentage}
          />
        </div>
      );
    }

    if (this.props.dt) {
      return (
        <div>
          <CircularProgressBar
            dt={true}
            text={this.props.text}
            strokeWidth="10"
            sqSize="130"
            percentage={this.state.percentage}
          />
        </div>
      );
    }
    return (
      <div>
        <CircularProgressBar
          strokeWidth="10"
          sqSize="130"
          percentage={this.state.percentage}
        />
      </div>
    );
  }
}

export default ReturnProgress;
