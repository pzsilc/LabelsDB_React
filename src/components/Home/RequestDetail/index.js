import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { editComment } from '../../../api';

const RequestDetail = ({ kinds, labelRequest, updateStatus, fetchLabelRequests }) => {

    const [editMode, setEditMode] = useState(false);
    const [comment, setComment] = useState(labelRequest.comment);

    const getKindNameById = id => {
        let found = kinds.find(k => k.id == id);
        return found ? found.name : "";
    }

    const saveComment = () => {
        editComment(comment, labelRequest.id)
        .then(res => {
            console.log(res);
            toast.success('Zapisano komentarz')
            fetchLabelRequests();
        })
        .catch(err => {
            toast.error('Coś poszło nie tak')
            console.log(err)
        })
    }

    return (
        <div
            className="modal fade text-left"
            id={`modal-${labelRequest.id}`}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div
                className="modal-dialog"
                role="document"
            >
                <form
                    onSubmit={updateStatus}
                    className="modal-content"
                >
                    <input
                        type="hidden"
                        value={labelRequest.id}
                        name="labelRequestId"
                    />
                    <input
                        type="hidden"
                        value={labelRequest.status.id}
                        name="statusId"
                    />
                    <div className="modal-header">
                        <h5
                            className="modal-title"
                            id="exampleModalLabel"
                        >
                            Zapotrzebowanie na zlecenie {labelRequest.number}
                        </h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <input
                            type="hidden"
                            value={labelRequest.id}
                            name="requestId"
                        />
                        <div>
                            <b className="mr-2">Nr zlecenia:</b>
                            {labelRequest.number}
                        </div>
                        <div>
                            <b className="mr-2">Nr pozycji:</b>
                            {labelRequest.index_nb}
                        </div>
                        <div>
                            <b className="mr-2">Powód:</b>
                            {labelRequest.reason.name}
                        </div>
                        <div>
                            <b className="mr-2">Nr stanowiska:</b>
                            {labelRequest.position_nb}
                        </div>
                        <div>
                            <b className="mr-2">Status:</b>
                            {labelRequest.status.name}
                        </div>
                        <div>
                            <b className="mr-2">Rodzaje</b>
                            {labelRequest.kinds.map((kind, key) => 
                                <div key={key}>
                                    <b>{getKindNameById(kind.kind)}</b>
                                    : {kind.quantity}
                                </div>
                            )}
                        </div>
                        <div>
                            <div className="d-flex justify-content-between">
                                <b className="mr-2">Komentarz:</b>
                                <button
                                    type="button"
                                    onClick={() => setEditMode(!editMode)}
                                    className="btn btn-default"
                                >
                                    Edit
                                </button>
                            </div>
                            {editMode ? <div>
                                <textarea
                                    className="form-control"
                                    onChange={e => setComment(e.target.value)}
                                    value={comment}
                                >
                                    {labelRequest.comment}
                                </textarea>
                                <button
                                    type="button"
                                    onClick={saveComment}
                                    className="btn btn-primary mt-2"
                                >
                                    Zapisz
                                </button>
                            </div> : <div>
                                {labelRequest.comment}    
                            </div>}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                        >
                            Anuluj
                        </button>
                        {labelRequest.status.id != 3 &&
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Przejdź do następnego etapu
                            </button>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RequestDetail;
