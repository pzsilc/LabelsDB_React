import React from 'react';
import CreateForm from './CreateForm';
import RequestDetail from './RequestDetail';
import * as api from '../../api';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';


export default class Home extends React.Component {

    state = {
        requests: [],
        kinds: [],
        reasons: [],
        statuses: [],
        page: 1,
        pagesNum: 0,
        filters: {
            status: ""
        },
        data: {
            number: "",
            index_nb: 1,
            position_nb: 1,
            quantity: 1,
            kind: null,
            reason: null,
            status: null
        }
    }

    componentDidMount = () => {
      this.fetchLabelRequests();
        api.getReasons().then(reasons => this.setState({ reasons })).catch(console.log);
        api.getKinds().then(kinds => this.setState({ kinds })).catch(console.log);
        api.getStatuses().then(statuses => this.setState({ statuses })).catch(console.log);
    }

    fetchLabelRequests = () => {
        api.getLabelRequests(this.state.page, this.state.filters.status).then(data => {
            this.setState({
                requests: data.requests,
                pagesNum: data.pagesNum
            })
        }).catch(console.log);
    }

    setPage = e => {
        this.setState({
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

    setFilters = async(e) => {
        await this.setState({
            ...this.state,
            filters: { status: e.target.value }
        })
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
        })
    }

    createRequest = e => {
        e.preventDefault();
        api.createLabelRequest({
            number: e.target.number.value,
            index_nb: parseInt(e.target.index_nb.value),
            kind: parseInt(e.target.kind.value),
            reason: parseInt(e.target.reason.value),
            quantity: parseInt(e.target.quantity.value),
            position_nb: parseInt(e.target.position_nb.value),
            status: 1
        })
        .then(res => {
            console.log(res);
            toast.success('Dodano zapotrzebowanie');
            document.getElementById('closeButton').click();
            this.fetchLabelRequests();
            this.setState({
                ...this.state,
                data: {
                    number: "",
                    index_nb: 1,
                    position_nb: 1,
                    quantity: 1,
                    kind: null,
                    reason: null,
                    status: null
                }
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
                        kinds={this.state.kinds}
                        reasons={this.state.reasons}
                        data={this.state.data}
                        setField={this.setField}
                    />
                    <select
                        name="status"
                        className="form-control mt-5"
                        style={{ width: '200px' }}
                        onChange={this.setFilters}
                    >
                        <option value="" selected={!this.state.filters.status}>Wszystkie</option>
                        {this.state.statuses.map((status, key) =>
                            <option
                                value={status.id}
                                key={key}
                                selected={status.id == this.state.filters.status}
                            >
                                {status.name}
                            </option>
                        )}
                    </select>
                </div>
                <table className="table table text-center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nr zlecenia</th>
                            <th>Status</th>
                            <th>Więcej informacji</th>
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
                                <td>
                                    <button
                                        type="button"
                                        className="fa fa-eye btn btn primary"
                                        data-toggle="modal"
                                        data-target={`#modal-${req.id}`}
                                    >
                                    </button>
                                    <RequestDetail
                                        labelRequest={req}
                                        updateStatus={this.updateStatus}
                                    />
                                </td>
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
            </div>
        )
    }
}
