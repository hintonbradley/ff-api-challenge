import React from 'react';

class ApiHealth extends React.Component {
    state = {
        list : ['accounts', 'assets'],
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

    render () {
        return (
            <div>
                <h1>Api Health Component</h1>
            </div>
        )
    }
}

export default ApiHealth;