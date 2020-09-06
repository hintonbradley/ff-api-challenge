import React from 'react';
import api from '../api/api';
import './ApiHealth.css';

class ApiHealth extends React.Component {
    state = {
        checkApiTimer: 15,
        apiList : ['accounts', 'assets','customers','datapoints','devices','documents','forms','invites','media','messages','namespaces','orders','patients','relationships','rules','templates','users','workflows'],
        accounts: {success:null},
        assets: {success:null},
        customers: {success:null},
        datapoints: {success:null},
        devices: {success:null},
        documents: {success:null},
        forms: {success:null},
        invites: {success:null},
        media: {success:null},
        messages: {success:null},
        namespaces: {success:null},
        orders: {success:null},
        patients: {success:null},
        relationships: {success:null},
        rules: {success:null},
        templates: {success:null},
        users: {success:null},
        workflows: {success:null}
    }

    componentDidMount () {
        this.state.apiList.forEach(name => {
            this.getApiHealth(name)
            // setInterval( async () => this.getApiHealth(name), this.state.checkApiTimer*1000)
        })
    }

    async getApiHealth (name) {
        try {
            const resp = await api.get(`https://api.factoryfour.com/${name}/health/status`) 
            this.setState({ [name]: resp.data})
        } catch (e) {
            this.setState({[name]: {success: false}})
        }
    }

    addApiListItems () {
        return this.state.apiList.map( (name, i) => {
            if(this.state[name].success){
                return (
                    <li className="flex-row">
                        <p className="api-name">{name}</p>
                        <p className="success">Success</p>
                        <p>{this.state[name].message}</p>
                        <p>{this.state[name].hostname}</p>
                        <p>{this.state[name].time}</p>
                    </li>
                )
            } else if (this.state[name].success===null) {
                return (
                    <li>
                        <p>Loading...</p>
                    </li>
                )
            } else {
                return (
                    <li className="flex-row">
                        <p className="api-name">{name}</p>
                        < p className="fetch-error failed">Error 503 Service Unavailable</p>
                    </li>
                )
            }
        })
    }

    render () {
        return (
            <div>
                <ul>
                    <li className="flex-row row-titles rows">
                        <h3 className="api-name">API</h3>
                        <h3>Status</h3>
                        <h3>Message</h3>
                        <h3>Hostname</h3>
                        <h3>Time</h3>
                    </li>
                    {this.addApiListItems()}
                </ul>
            </div>
        )
    }
}

export default ApiHealth;