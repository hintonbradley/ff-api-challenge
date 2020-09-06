import React from 'react';
import api from '../api/api';

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
        })
    }

    getApiHealth (name) {
        setInterval(async () => {
            try {
                const resp = await api.get(`https://api.factoryfour.com/${name}/health/status`) 
                this.setState({ [name]: resp.data})
            } catch (e) {
                this.setState({[name]: {success: false}})
            }
        }, this.state.checkApiTimer*1000);
    }

    renderResponses () {
        return this.state.apiList.map( (name, i) => {
            if(this.state[name].success) {
                return (
                    <div key={this.state[name].hostname}>
                        <h1>{name}</h1>
                        <p>Success: {this.state[name].success}</p>
                        <p>Message: {this.state[name].message}</p>
                        <p>Hostname: {this.state[name].hostname}</p>
                        <p>Time: {this.state[name].time}</p>
                    </div>
                )
            } else if(this.state[name].success === null){
                return (
                    <div key={i}>
                        <h1>{name}</h1>
                        <p>Loading...</p>
                    </div>
                )
            } else {
                return (
                    <div key={i}>
                        <h1>{name}</h1>
                        <p>Error 503!</p>
                    </div>
                )
            }
        })
    }

    render () {
        return (
            <div>
                <div>{this.renderResponses()}</div>
            </div>
        )
    }
}

export default ApiHealth;