import React from 'react';

const RequestDetail = ({ labelRequest, updateStatus }) => {
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
                            <b className="mr-2">Rodzaj etykiety:</b>
                            {labelRequest.kind.name}
                        </div>
                        <div>
                            <b className="mr-2">Ilość:</b>
                            {labelRequest.quantity}
                        </div>
                        <div>
                            <b className="mr-2">Nr stanowiska:</b>
                            {labelRequest.position_nb}
                        </div>
                        <div>
                            <b className="mr-2">Status:</b>
                            {labelRequest.status.name}
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
