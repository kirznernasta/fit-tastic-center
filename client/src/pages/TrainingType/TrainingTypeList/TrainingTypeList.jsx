import React, {Component} from 'react'
import api from '../../../api'
import "./TrainingTypeList.css";
import TrainingType from "../../../components/TrainingType/TrainingType";

class TrainingTypesList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            trainingTypes: [],
        }
    }

    componentDidMount = async () => {

        await api.getAllTrainingTypes().then(trainingTypes => {
            console.log(trainingTypes.data.data)
            this.setState({
                trainingTypes: trainingTypes.data.data,
            })
        })
    }

    render() {
        const {trainingTypes} = this.state

        return (
            <div className="types-wrap">
                {trainingTypes.map((trainingType) => (

                    <TrainingType image={trainingType.image} name={trainingType.name}
                                  description={trainingType.description}/>
                ))}
            </div>
        )
    }
}

export default TrainingTypesList