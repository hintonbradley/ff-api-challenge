import React from 'react';
import api from '../api/api';

class ApiHealth extends React.Component {
    state = {
        apiList : ['accounts', 'assets'],
        accounts: {
            success: null,
            message: null,
            hostname: null,
            time: null
        },
        assets: {
            success: null,
            message: null,
            hostname: null,
            time: null
        }
    }

    componentDidMount () {
        setInterval( this.getApiHealth, 15000);
    }


    getApiHealth = async (name) => {
        // testing getting health data from a particular api from a list of api names and then updating state
        const resp = await api.get(`https://api.factoryfour.com/${this.state.apiList[0]}/health/status`)
        this.setState({ accounts: resp.data})
        console.log('new state is', this.state)
    }



    render () {
        return (
            <div>
                <p>Success: {this.state.accounts.success}</p>
                <p>Message: {this.state.accounts.message}</p>
                <p>Hostname: {this.state.accounts.hostname}</p>
                <p>Time: {this.state.accounts.time}</p>
            </div>
        )
    }
}

export default ApiHealth;