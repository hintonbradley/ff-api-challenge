import React from 'react';
import api from '../api/api';
import SuccessApiDetails from './SuccessApiDetails';
import FailedApiDetails from './FailedApiDetails';
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
            setInterval( async () => this.getApiHealth(name), this.state.checkApiTimer*1000)
        })
    }

    async getApiHealth (name) {
        const config = {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET"
            }
        };
        try {
            const resp = await api.get(`/${name}/health/status`, config) 
            this.setState({ [name]: resp.data})
            console.log('success', name, resp)
        } catch (e) {
            this.setState({[name]: {success: false}})
            console.log('fail', name, e.status)
        }
    }

    convertUnixTo24Hour (n) {
        const newDate = new Date(n);
        var hours = newDate.getHours();
        var minutes = newDate.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    addApiListItems () {
        return this.state.apiList.map( (name, i) => {
            if(this.state[name].success){
                return (
                    <SuccessApiDetails key={`${name}-s-${i}`} name={name} api={this.state[name]} time={this.convertUnixTo24Hour(this.state[name].time)}/>
                )    
            } else if (this.state[name].success===null) {
                return (
                    <li key={`loading${i}`}>
                        <p>Loading...</p>
                    </li>
                )
            } else {
                return (
                    < FailedApiDetails key={`${name}-f-${i}`} name={name} index={i}/>
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
                        <h3 className="api-status">Status</h3>
                        <h3 className="api-message">Message</h3>
                        <h3 className="api-hostname">Hostname</h3>
                        <h3 className="api-time">Time</h3>
                    </li>
                    {this.addApiListItems()}
                </ul>
            </div>
        )
    }
}

export default ApiHealth;