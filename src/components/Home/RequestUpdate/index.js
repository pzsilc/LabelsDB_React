import React, { useState } from 'react';
import { updateLabelRequest } from '../../../api';
import { toast } from 'react-toastify';

const RequestUpdate = ({ labelRequest, reasons, kinds, fetchLabelRequests }) => {

    const initData = {
        number: labelRequest.number,
        index_nb: labelRequest.index_nb,
        reason: labelRequest.reason,
        kinds: labelRequest.kinds,
        position_nb: labelRequest.position_nb,
        status: labelRequest.status,
        comment: labelRequest.comment
    }

    const [data, setData] = useState(initData);

    const setField = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    const setKind = e => {
        const { value } = e.target;
        const { kind_id } = e.target.dataset;
        let _kinds = [...data.kinds];
        let kind = _kinds.find(k => k.id == kind_id);
        kind.quantity = value;
        setData({ ...data, kinds: _kinds });
    }

    const getKindNameById = id => {
        let found = kinds.find(k => k.id == id);
        return found ? found.name : "";
    }

    const update = (e, data, id) => {
        e.preventDefault();
        console.log(data)
        updateLabelRequest(id, {
            ...data,
            status: data.status.id,
            reason: data.reason.id
        })
        .then(res => {
            console.log(res);
            toast.success('Zaktualizowano zapotrzebowanie');
            fetchLabelRequests();

        })
        .catch(err => {
            console.log(err);
            toast.error('Error')
        })
    }

    return (
        <div
            className="modal fade text-left"
            id={`update-modal-${labelRequest.id}`}
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
                    onSubmit={e => update(e, data, labelRequest.id)}
                    className="modal-content"
                >
                    <div className="modal-header">
                        <h5
                            className="modal-title"
                            id="exampleModalLabel"
                        >
                            Aktualizuj zapotrzebowanie na zlecenie {labelRequest.number}
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
                        <label>
                            Nr zlecenia
                            <input
                                type="text"
                                className="form-control"
                                maxLength="16"
                                name="number"
                                defaultValue={data.number}
                                onChange={setField}
                                required
                            />
                        </label>
                        <br/>
                        <label>
                            Nr pozycji
                            <input
                                type="number"
                                min="1"
                                max="999"
                                className="form-control"
                                name="index_nb"
                                defaultValue={data.index_nb}
                                onChange={setField}
                                required
                            />
                        </label>
                        <br/>
                        <label>
                            Powód
                            <select
                                name="reason"
                                className="form-control"
                                onChange={setField}
                                required
                            >
                                {reasons.map((r, key) =>
                                    <option
                                        value={r.id}
                                        key={key}
                                        selected={data.reason.id == r.id}
                                    >{r.name}</option>
                                )}
                            </select>
                        </label>
                        <br/>
                        <label>
                            Rodzaje:
                            <br/>
                            {data.kinds.map((kind, key) => 
                                <div 
                                    key={key}
                                    className="d-inline-block m-2"
                                >
                                    <b>{getKindNameById(kind.id)}</b>
                                    <input
                                        type="number"
                                        data-kind_id={kind.id}
                                        defaultValue={kind.quantity}
                                        onChange={setKind}
                                        min="0"
                                        max="10000"
                                        className="form-control"
                                    />
                                </div>
                            )}
                        </label>
                        <br/>
                        <label>
                            Nr stanowiska
                            <input
                                type="number"
                                min="1"
                                max="60"
                                className="form-control"
                                name="position_nb"
                                defaultValue={data.position_nb}
                                onChange={setField}
                                required
                            />
                        </label>
                        <br/>
                        <label>
                            Komentarz
                            <textarea
                                max="255"
                                className="form-control"
                                name="comment"
                                defaultValue={data.comment}
                                onChange={setField}
                            ></textarea>
                        </label>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                        >
                            Anuluj
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Zapisz
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RequestUpdate;
