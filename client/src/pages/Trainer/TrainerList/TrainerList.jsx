import React, {Component} from 'react'
import api from '../../../api'
import "./TrainerList.css";

class TrainersList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            trainers: [],
        }
    }

    componentDidMount = async () => {

        await api.getAllTrainers().then(trainers => {
            console.log(trainers.data.data)
            this.setState({
                trainers: trainers.data.data,
            })
        })
    }

    render() {
        const {trainers} = this.state

        return (
            <div className="trainers-wrap">
                <h1>Meet our trainers!</h1>
                <h2>Our team of trainers is not just experienced; they are passionate about helping you reach your
                    fitness
                    goals. Each trainer brings a unique approach, expertise, and dedication to the table, ensuring that
                    you
                    receive personalized guidance and support throughout your fitness journey.</h2>
                {trainers.map((trainer) => (

                    <a className="trainer" href={`http://localhost:8000/trainers/${trainer._id}`}>
                        <div>
                            <img src={`http://localhost:3000/${trainer.image}`} alt="trainer"/>
                            <h4 className="aquamarine button">{trainer.fullName}</h4>
                        </div>
                    </a>
                ))}
            </div>
        )
    }
}

export default TrainersList