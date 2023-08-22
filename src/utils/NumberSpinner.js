import React, { Component } from 'react';

class NumberSpinner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDragging: false,
      startY: 0,
      startValue: 0,
    };
  }

  handleMouseDown = e => {
    e.preventDefault(); // Prevent text cursor line on desktop
    this.setState({
      isDragging: true,
      startY: e.clientY,
      startValue: parseFloat(this.props.value),
    });
  };

  handleMouseMove = e => {
    if (!this.state.isDragging) return;

    const deltaY = this.state.startY - e.clientY;

    let step;
    if (this.state.startValue < 3) {
      step = 0.1;
    } else {
      step = 1;
    }

    const newValue = this.state.startValue + (step * deltaY) / 10;

    this.props.onChange(newValue.toFixed(1));
  };

  handleMouseUp = () => {
    this.setState({ isDragging: false });
  };

  render() {
    return (
      <div className="number-spinner">
        <input
          type="number"
          value={this.props.value}
          onChange={e => this.props.onChange(e.target.value)}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          onTouchStart={this.handleMouseDown} // For mobile
          onTouchMove={this.handleMouseMove} // For mobile
          onTouchEnd={this.handleMouseUp} // For mobile
          step={this.state.startValue < 3 ? 0 : 1}
        />
      </div>
    );
  }
}

export default NumberSpinner;
