import React from 'react';
import CreateForm from './CreateForm';
import RequestDetail from './RequestDetail';
import RequestUpdate from './RequestUpdate';
import * as api from '../../api';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import XLSX from './XLSX';
import Filters from './Filters';
import DeleteButton from './DeleteButton';
const PASSWORD = 'silcare2021!!'


const initFilters = { status: null };
const initSorts = "";
const initData = {
    number: "",
    index_nb: 1,
    reason: null,
    kinds: [],
    status: null,
    comment: ""
}


export default class Home extends React.Component {

    state = {
        requests: [],
        reasons: [],
        kinds: [],
        statuses: [],
        page: 1,
        pagesNum: 0,
        auth: false,
        filters: initFilters,
        sorts: initSorts,
        data: initData
    }

    componentDidMount = () => {
        this.fetchLabelRequests();
        api.getReasons().then(reasons => this.setState({ reasons })).catch(console.log);
        api.getKinds()
        .then(kinds => {
            this.setState({ kinds });
            return kinds;
        })
        .then(kinds => {
            this.setState({
                ...this.state,
                data: {
                    ...this.state.data,
                    kinds: kinds.map(kind => {
                        kind.quantity = 0;
                        return kind;
                    })
                }
            })
        }).catch(console.log);
        api.getStatuses().then(statuses => this.setState({ statuses })).catch(console.log);
    }

    fetchLabelRequests = () => {
        api.getLabelRequests(this.state.page, this.state.filters.status, this.state.sorts).then(data => {
            this.setState({
                requests: data.requests,
                pagesNum: data.pagesNum
            })
        }).catch(console.log);
    }

    setPage = async e => {
        await this.setState({
            ...this.state,
            page: e.selected + 1
        });
        this.fetchLabelRequests();
    }

    setField = e => {
        const { name, value } = e.target;
        this.setState({
            ...this.state,
            data: {
                ...this.state.data,
                [name]: value
            }
        })
    }

    setKindQuantity = (kindId, quantity) => {
        this.setState({
            ...this.state,
            data: {
                ...this.state.data,
                kinds: this.state.data.kinds.map(kind => {
                    if(kind.id == kindId){
                        kind.quantity = quantity;
                    }
                    return kind;
                })
            }
        })
    }

    setFilters = async e => {
        await this.setState({
            ...this.state,
            filters: { 
                status: e.target.value 
            }
        })
        this.fetchLabelRequests();
    }

    setSorts = async e => {
        await this.setState({
            ...this.state,
            sorts: e.target.value
        });
        this.fetchLabelRequests();
    }

    resetFiltersAndSorts = async () => {
        await this.setState({
            ...this.state,
            filters: initFilters,
            sorts: initSorts
        });
        this.fetchLabelRequests();
    }

    updateStatus = e => {
        e.preventDefault();
        const { labelRequestId, statusId } = e.target;
        api.updateStatusForLabelRequest(labelRequestId.value, parseInt(statusId.value) + 1)
        .then(res => {
            console.log(res);
            toast.success('Zaktualizowano status');
            document.getElementById('closeButton').click();
            this.fetchLabelRequests();
        })
        .catch(err => {
            console.log(err);
            toast.error('Coś poszło nie tak');
            if(err.response){
                err.response.data.data.forEach(n => toast.error(n))
            }
        })
    }

    checkAuth = e => {
        e.preventDefault();
        const { value } = e.target.auth;
        if(value === PASSWORD){
            this.setState({ auth: true });
        } else {
            toast.error('Błędne hasło');
        }
    }

    deleteLabel = id => {
        api.destroyLabelRequest(id)
        .then(res => {
            console.log(res);
            toast.success('Usunięto zapotrzebowanie');
            this.fetchLabelRequests();
        })
        .catch(err => {
            console.log(err);
            toast.error('Nie udało się usunąć zapotrzebowania');
        })
    }

    createRequest = e => {
        e.preventDefault();
        api.createLabelRequest({ ...this.state.data, status: 1 })
        .then(res => {
            console.log(res);
            toast.success('Dodano zapotrzebowanie');
            document.getElementById('closeButton').click();
            this.fetchLabelRequests();
            this.setState({
                ...this.state,
                data: initData
            })
        })
        .catch(err => {
            console.log(err);
            toast.error('Coś poszło nie tak');
            if(err.response){
                err.response.data.data.forEach(n => toast.error(n))
            }
        })
    }

    render = () => {
        return (
            <div>
                <div className="d-flex justify-content-between">
                    <CreateForm
                        createRequest={this.createRequest}
                        kinds={this.state.data.kinds}
                        reasons={this.state.reasons}
                        data={this.state.data}
                        setField={this.setField}
                        setKindQuantity={this.setKindQuantity}
                    />
                    <Filters
                        filters={this.state.filters}
                        sorts={this.state.sorts}
                        setFilters={this.setFilters}
                        setSorts={this.setSorts}
                        statuses={this.state.statuses}
                        reasons={this.state.reasons}
                        resetFiltersAndSorts={this.resetFiltersAndSorts}
                    />
                </div>
                <table className="table table text-center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nr zlecenia</th>
                            <th>Status</th>
                            <th>Komentarz</th>
                            <th>Więcej informacji</th>
                            {this.state.auth && <th>Edycja</th>}
                            {this.state.auth && <th>Usuń</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.requests.map((req, key) =>
                            <tr
                                style={{ backgroundColor: req.status.hex_color }}
                                key={key}
                            >
                                <td>{req.id}</td>
                                <td>{req.number}</td>
                                <td>{req.status.name}</td>
                                <td>{req.comment}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="fa fa-eye btn btn primary"
                                        data-toggle="modal"
                                        data-target={`#modal-${req.id}`}
                                    >
                                    </button>
                                    <RequestDetail
                                        kinds={this.state.kinds}
                                        labelRequest={req}
                                        updateStatus={this.updateStatus}
                                        fetchLabelRequests={this.fetchLabelRequests}
                                    />
                                </td>
                                {this.state.auth &&
                                    <React.Fragment>
                                        <td>
                                            <button
                                                type="button"
                                                className="fa fa-edit btn btn primary"
                                                data-toggle="modal"
                                                data-target={`#update-modal-${req.id}`}
                                            >
                                            </button>
                                            <RequestUpdate
                                                labelRequest={req}
                                                reasons={this.state.reasons}
                                                kinds={this.state.data.kinds}
                                                fetchLabelRequests={this.fetchLabelRequests}
                                            />
                                        </td>
                                        <td>
                                            <button
                                                className="fa fa-trash btn btn-danger"
                                                onClick={() => this.deleteLabel(req.id)}
                                            >    
                                            </button>
                                        </td>
                                    </React.Fragment>
                                }
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="mt-3">
                    <ReactPaginate
                        pageCount={this.state.pagesNum}
                        pageRangeDisplayed="5"
                        marginPagesDisplayed="5"
                        onPageChange={this.setPage}
                        pageClassName="py-1 px-2 border d-inline-block"
                        previousClassName="py-1 px-2 border d-inline-block"
                        nextClassName="py-1 px-2 border d-inline-block"
                        previousLabel="<<"
                        nextLabel=">>"
                        activeClassName="bg-primary border-primary"
                        activeLinkClassName="text-white cursor-pointer"
                    />
                </div>
                <div className="mt-5 pt-5">
                    {!this.state.auth &&
                        <div>
                            <h1 className="my-5">Zaloguj się</h1>
                            <form onSubmit={this.checkAuth}>
                                <label>
                                    Hasło:
                                    <input
                                        type="password"
                                        name="auth"
                                        className="form-control"
                                    />
                                </label>
                                <br/>
                                <input
                                    type="submit"
                                    className="btn btn-primary"
                                />
                            </form>
                        </div>
                    }
                    {this.state.auth &&
                        <div>
                            Jesteś zalogowany
                        </div>
                    }
                </div>
                <div className="m-3">
                    <XLSX
                        auth={this.state.auth}
                    />
                    <DeleteButton
                        auth={this.state.auth}
                        fetchLabelRequests={this.fetchLabelRequests}
                    />
                </div>
            </div>
        )
    }
}
