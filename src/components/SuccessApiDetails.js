import React from 'react';

const SuccessApiDetails = function (props) {

    return (
        <li className="flex-row apihealth-success">
            <p className="api-name">{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</p>
            <p className="success api-status">OK</p>
            <p className="api-message">{props.api.message}</p>
            <p className="api-hostname">{props.api.hostname}</p>
            <p className="api-time">{props.time}</p>
        </li>
    )
}

export default SuccessApiDetails;