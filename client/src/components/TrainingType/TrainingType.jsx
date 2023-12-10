import React, {Component} from 'react'
import "./TrainingType.css";

class TrainingType extends Component {
    render() {
        return (
            <div>
                <img className="type-img" src={`http://localhost:3000/${this.props.image}`} alt="training type"/>
                <h4 className="type-name">{this.props.name}</h4>
                <h5>{this.props.description}</h5>
            </div>
        )
    }
}

export default TrainingType