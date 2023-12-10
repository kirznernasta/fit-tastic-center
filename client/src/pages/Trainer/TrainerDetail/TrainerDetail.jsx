import React, {useState, useEffect} from 'react';
import api from '../../../api';
import './TrainerDetail.css';
import {useParams} from 'react-router-dom';

const TrainerDetail = () => {
    const [trainer, setTrainer] = useState(null);
    const [groupTrainings, setGroupTrainings] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        console.log('useEffect');
        const fetchTrainerById = async () => {
            try {
                const response = await api.getTrainerById(id);
                console.log('response');
                console.log(response);
                setTrainer(response.data);

                const trainingPromises = response.data.groupTrainings.map(async trainingId => {
                    const trainingResponse = await api.getTrainingById(trainingId);
                    const trainingTypeResponse = await api.getTrainingTypeById(trainingResponse.data.trainingType);

                    return {
                        ...trainingResponse.data,
                        trainingType: trainingTypeResponse.data,
                    };
                });

                const resolvedTrainings = await Promise.all(trainingPromises);

                setGroupTrainings(resolvedTrainings);
            } catch (error) {
                console.error('Error fetching trainer:', error);
            }
        };

        fetchTrainerById();
    }, [id]);

    return (
        <React.Fragment>
            <div><h1 className="trainer-name">{trainer?.fullName}</h1></div>
            <div>
                <img className="trainer-img" src={`http://localhost:3000/${trainer?.image}`} alt="trainer"/>
            </div>
            <div className="trainer-info">
                <div>
                    <b>Education:</b> {trainer?.education}<br/>
                    <b>Coaching experience:</b> {trainer?.coachingExperience}
                </div>
                <div>
                    <h4>Group trainings:</h4>
                    <ul>
                        {
                            groupTrainings.length > 0 ?
                                groupTrainings.map((t) => (
                                    <li>
                                        {t.trainingType.name} ({t.start} - {t.end})
                                        Days: {t.days.join(", ")}
                                    </li>
                                )) : <h2>No trainings yet</h2>
                        }
                    </ul>
                </div>
            </div>


        </React.Fragment>
    );
};

export default TrainerDetail;
