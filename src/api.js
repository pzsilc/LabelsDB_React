import axios from 'axios';
import FormData from 'form-data';
const BACKEND_URL = 'http://192.168.0.234/labelsdb/backend/api';

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
        if(key === 'kinds') f.append('kinds', JSON.stringify(val));
        else f.append(key, val);
    }
    axios.post(BACKEND_URL + '/label-requests', f, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(res => resolve(res.data))
    .catch(err => reject(err))
})

const updateLabelRequest = (id, data) => new Promise((resolve, reject) => {
    let f = new FormData();
    for(const [key, val] of Object.entries(data)){
        if(key === 'kinds') f.append('kinds', JSON.stringify(val));
        else f.append(key, val);
    }
    axios.patch(BACKEND_URL + '/label-requests/' + id + '/', f, {
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
    axios.patch(BACKEND_URL + `/label-requests/${labelRequestId}/status/`, f, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(res => resolve(res.data))
    .catch(err => reject(err))
})

const editComment = (comment, labelRequestId) => new Promise((resolve, reject) => {
    let f = new FormData();
    f.append('comment', comment);
    axios.patch(BACKEND_URL + `/label-requests/${labelRequestId}/comment/`, f, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(res => resolve(res.data))
    .catch(err => reject(err))
})

const downloadStats = () => new Promise((resolve, reject) => {
    axios.get(BACKEND_URL + '/statistics')
    .then(res => resolve(res.data.base64))
    .catch(reject)
})

const deleteBetween2Dates = (from, to) => new Promise((resolve, reject) => {
    let fD = new FormData();
    fD.append('from', from);
    fD.append('to', to);
    axios.post(BACKEND_URL + '/label-requests/delete-between/', fD, {
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
    updateLabelRequest,
    updateStatusForLabelRequest,
    editComment,
    downloadStats,
    deleteBetween2Dates
}
