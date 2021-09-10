import axios from 'axios';
import FormData from 'form-data';
const BACKEND_URL = 'http://localhost/labelsdb/backend/api';

const getLabelRequests = (page, status) => new Promise((resolve, reject) => {
    axios.get(BACKEND_URL + '/label-requests?page=' + page + '&status=' + status).then(res => resolve(res.data)).catch(err => reject(err))
})

const getReasons = () => new Promise((resolve, reject) => {
    axios.get(BACKEND_URL + '/reasons').then(res => resolve(res.data.data)).catch(err => reject(err))
})

const getKinds = () => new Promise((resolve, reject) => {
    axios.get(BACKEND_URL + '/kinds').then(res => resolve(res.data.data)).catch(err => reject(err))
})

const getStatuses = () => new Promise((resolve, reject) => {
    axios.get(BACKEND_URL + '/statuses').then(res => resolve(res.data.data)).catch(err => reject(err))
})

const createLabelRequest = data => new Promise((resolve, reject) => {
    let f = new FormData();
    for(const [key, val] of Object.entries(data)){
        f.append(key, val);
    }
    console.log(data)
    axios.post(BACKEND_URL + '/label-requests', f, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(res => resolve(res.data))
    .catch(err => reject(err))
})

const updateStatusForLabelRequest = (labelRequestId, newStatusId) => new Promise((resolve, reject) => {
    let f = new FormData();
    f.append('status', newStatusId);
    axios.patch(BACKEND_URL + `/label-requests/${labelRequestId}/`, f, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(res => resolve(res.data))
    .catch(err => reject(err))
})

export {
    getLabelRequests,
    getReasons,
    getKinds,
    getStatuses,
    createLabelRequest,
    updateStatusForLabelRequest
}
