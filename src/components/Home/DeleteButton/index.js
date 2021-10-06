import React from 'react';
import { toast } from 'react-toastify';
import { deleteBetween2Dates } from '../../../api';

const DeleteButton = ({ auth, fetchLabelRequests }) => {

    const submit = e => {
        e.preventDefault();
        let { fromDate, toDate } = e.target;
        deleteBetween2Dates(fromDate.value, toDate.value)
        .then(res => {
            console.log(res);
            toast.success('Usunięto');
            fetchLabelRequests();
        })
        .catch(err => {
            console.log(err);
            toast.error('Nie udało się usunąć');
        });
    }

    return(
        <div>
            {auth &&
                <form onSubmit={submit} className="mt-5">
                    <h4>Usuń zapotrzebowania</h4>
                    <label>
                        Od
                        <input 
                            type="date"
                            name="fromDate"
                            className="form-control"
                        />
                    </label>
                    <br/>
                    <label>
                        Do
                        <input 
                            type="date"
                            name="toDate"
                            className="form-control"
                        />
                    </label>
                    <br/>
                    <input
                        type="submit"
                        className="btn btn-primary"
                    />
                </form>
            }
        </div>
    )
}

export default DeleteButton;