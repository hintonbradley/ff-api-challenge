import React from 'react';

const SuccessApiDetails = function (props) {

    return (
        <li className="flex-row apihealth-success">
            <p className="api-name">{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</p>
            <p className="success api-status">OK</p>
            <p className="api-message"><span className="sm-label">Message:</span> <span>{props.api.message}</span></p>
            <p className="api-hostname"><span className="sm-label">Hostname:</span> <span>{props.api.hostname}</span></p>
            <p className="api-time">{props.time}</p>
        </li>
    )
}

export default SuccessApiDetails;