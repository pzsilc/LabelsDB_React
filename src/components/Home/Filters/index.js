import React from 'react';

const Filters = props => {
    return(
        <div className="mb-5">
            <h3>Filtry</h3>
            <label>
                Status
                <select
                    name="status"
                    className="form-control"
                    style={{ width: '200px' }}
                    onChange={props.setFilters}
                >
                    <option value="" selected={!props.filters.status}>Wszystkie</option>
                    {props.statuses.map((status, key) =>
                        <option
                            value={status.id}
                            key={key}
                            selected={status.id == props.filters.status}
                        >
                            {status.name}
                        </option>
                    )}
                </select>
            </label>
            <br/>
            <label>
                Sortuj wg
                <select
                    onChange={props.setSorts}
                    className="form-control"
                >
                    <option
                        value=""
                        selected={true}
                    >...</option>
                    <option 
                        value="id" 
                        selected={props.sorts === 'id'}
                    >ID rosnąco</option>
                    <option 
                        value="-id" 
                        selected={props.sorts === '-id'}
                    >ID malejąco</option>
                    <option 
                        value="created_at" 
                        selected={props.sorts === 'created_at'}
                    >Data utworzenia rosnąco</option>
                    <option 
                        value="-created_at" 
                        selected={props.sorts === '-created_at'}
                    >Data utworzenia malejąco</option>
                </select>
            </label>
            <br/>
            <button 
                onClick={props.resetFiltersAndSorts}
                className="btn btn-danger fa fa-times float-right"
            ></button>
        </div>
    )
}

export default Filters;