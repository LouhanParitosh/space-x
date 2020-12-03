import React, { Component } from 'react';

class FilterButton extends Component {

    constructor () {
        super()        
        this.handleClick = this.handleClick.bind(this);
        this.state = ({
            className : ''
        })
    }

    handleClick () {
        this.props.parentCallBack(this.props.actualValue)        
        let className = this.state.className;
        className =  'selected' + Math.random()
        this.setState({className})
    }

    render() {
        return (
            <div className={this.props.className}>
                <button className={this.state.className} onClick = {this.handleClick}>{this.props.value}</button>
            </div>
        );
    }
}

export default FilterButton;