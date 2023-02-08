import React from 'react';

function TransferForm({form, onChange, onSubmit}) {
    return (
        <form 
            className="form-inline"
            onSubmit={onSubmit}
            >
            <div className="row">
                <div className="col-sm-6">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        name="description"
                        value={form.description}
                        onChange={onChange}
                    />
                </div>
                <div className="col-sm-6">
                    <div className="input-group mb-2">
                        <span className="input-group-text">$</span>
                        <input
                            type="text"
                            className="form-control"
                            name="amount"
                            value={form.amount}
                            onChange={onChange}
                        />
                    </div>
                </div>
            </div>
            <button
                type="submit"
                className="w-100 btn btn-primary btn-lg mb-2"
            >Add</button>
        </form>
    );
}

export default TransferForm;