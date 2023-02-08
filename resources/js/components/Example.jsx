import React from 'react';
import ReactDOM from 'react-dom/client';
import TransferForm from './TransferForm';
import TransferList from './TransferList';
import url from '../url';

export class Example extends React.Component {

    constructor(props){
        super(props)
        this.state = { 
            money: 0.0,
            transfers: [],
            error: null,
            form: {
                description: '',
                amount: 0,
                wallet_id: 1
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault()
        try {
            const config = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer my-token',
                    'My-Custom-Header': 'foobar'
                },
                body: JSON.stringify(this.state.form)
            };
                const res = await fetch(`${url}/api/transfer`, config);
                const data = await res.json();

            this.setState(state=> ({
                transfers: state.transfers.concat(data),
                money: state.money + (parseInt(data.amount))
            }));
            
        } catch (error) {
            this.setState({
                error
            })
        }
    }

    handleChange(e){
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    async componentDidMount(){
        try {
            let res = await fetch(`${url}/api/wallet`)
            let data = await res.json()
            this.setState({
                money: data.money,
                transfers: data.transfers
            })
        } catch (error) {
            this.setState({
                error
            })
        }
    }

    render() {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3 col-xl-3 col-xs-4 mx-auto">
                        <p className="display-4">$ {this.state.money}</p>
                    </div>
                </div>
                <div className="col-md-4 col-xl-4 col-xs-6 mx-auto">
                    <TransferForm
                        form={this.state.form}
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit}
                    />
                </div>
                <div className="col-md-6 col-xl-4 col-xs-6 mx-auto">
                    <TransferList
                        transfers={this.state.transfers}
                    />
                </div>
            </div>
        );
    }
     
}

export default Example;

if (document.getElementById('example')) {
    const Index = ReactDOM.createRoot(document.getElementById("example"));

    Index.render(
        <React.StrictMode>
            <Example/>
        </React.StrictMode>
    )
};
