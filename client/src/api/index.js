import axios from 'axios'
import {getTokenFromCookie} from "../cookies/cookies";

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertArticle = async (payload, image) => {
    console.log(payload)
    const formData = new FormData();
    formData.append('image', image);
    Object.keys(payload).forEach((key) => {
        formData.append(key, payload[key]);
    });
    let response = await fetch('http://localhost:3000/api/article', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${getTokenFromCookie("TOKEN")}`,
        },
        body: formData,
    })
    console.log(response)
    return response
}
export const getAllArticles = () => api.get(`/articles`)
export const updateArticleById = (id, payload, image) => {
    const formData = new FormData();

    Object.keys(payload).forEach((key) => {
        formData.append(key, payload[key]);
    });

    formData.append('image', image);

    fetch(`http://localhost:3000/api/article/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${getTokenFromCookie("TOKEN")}`,
        },
        body: formData,
    })
}
export const deleteArticleById = id => {
    fetch(`http://localhost:3000/api/article/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${getTokenFromCookie("TOKEN")}`,
        }
    })
}
export const getArticleById = id => api.get(`/article/${id}`)

export const insertTrainer = payload => {
    console.log(payload)
    return api.post(`/trainer`, payload)
}
export const getAllTrainers = () => api.get(`/trainers`)
export const updateTrainerById = (id, payload) => api.put(`/trainer/${id}`, payload)
export const deleteTrainerById = id => api.delete(`/trainer/${id}`)
export const getTrainerById = id => api.get(`/trainer/${id}`)

export const insertTraining = payload => {
    console.log(payload)
    return api.post(`/training`, payload)
}
export const getAllTrainings = () => api.get(`/trainings`)
export const updateTrainingById = (id, payload) => api.put(`/training/${id}`, payload)
export const deleteTrainingById = id => api.delete(`/training/${id}`)
export const getTrainingById = id => api.get(`/training/${id}`)

export const insertTrainingType = payload => {
    console.log(payload)
    return api.post(`/training-type`, payload)
}
export const getAllTrainingTypes = () => api.get(`/training-types`)
export const updateTrainingTypeById = (id, payload) => api.put(`/training-type/${id}`, payload)
export const deleteTrainingTypeById = id => api.delete(`/training-type/${id}`)
export const getTrainingTypeById = id => api.get(`/training-type/${id}`)

export const login = (payload) => api.post('/login', payload)

const apis = {
    insertArticle,
    getAllArticles,
    updateArticleById,
    deleteArticleById,
    getArticleById,
    insertTrainer,
    getAllTrainers,
    updateTrainerById,
    deleteTrainerById,
    getTrainerById,
    insertTraining,
    getAllTrainings,
    updateTrainingById,
    deleteTrainingById,
    getTrainingById,
    insertTrainingType,
    getAllTrainingTypes,
    updateTrainingTypeById,
    deleteTrainingTypeById,
    getTrainingTypeById,
    login
}

export default apis