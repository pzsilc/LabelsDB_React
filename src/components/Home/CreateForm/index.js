import React, { useState } from 'react';

const CreateForm = props => {
    return(
        <React.Fragment>
            <button
                data-toggle="modal"
                data-target="#create-form"
                className="btn btn-primary my-5"
            >
                Dodaj zapotrzebowanie
            </button>
            <div
                className="modal fade"
                id="create-form"
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
                        onSubmit={props.createRequest}
                        className="modal-content"
                    >
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="exampleModalLabel"
                            >
                                Dodaj zapotrzebowanie
                            </h5>
                            <button
                                type="button"
                                id="closeButton"
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
                                    name="number"
                                    value={props.data.number}
                                    onChange={props.setField}
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
                                    value={props.data.index_nb}
                                    onChange={props.setField}
                                    required
                                />
                            </label>
                            <br/>
                            <label>
                                Powód
                                <select
                                    name="reason"
                                    className="form-control"
                                    required
                                    onChange={props.setField}
                                >
                                    <option value="" selected={props.data.reason === null}>...</option>
                                    {props.reasons.map((r, key) =>
                                        <option
                                            value={r.id}
                                            key={key}
                                            selected={props.data.reason === r.id}
                                        >{r.name}</option>
                                    )}
                                </select>
                            </label>
                            <br/>
                            <label>
                                Rodzaj
                                <select
                                    name="kind"
                                    className="form-control"
                                    required
                                    onChange={props.setField}
                                >
                                    <option value="">...</option>
                                    {props.kinds.map((k, key) =>
                                        <option
                                            value={k.id}
                                            key={key}
                                            selected={props.data.reason === k.id}
                                        >{k.name}</option>
                                    )}
                                </select>
                            </label>
                            <br/>
                            <label>
                                Ilość
                                <input
                                    type="number"
                                    min="1"
                                    max="10000"
                                    className="form-control"
                                    name="quantity"
                                    value={props.data.quantity}
                                    onChange={props.setField}
                                    required
                                />
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
                                    value={props.data.position_nb}
                                    onChange={props.setField}
                                    required
                                />
                            </label>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Prześlij
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default CreateForm;
