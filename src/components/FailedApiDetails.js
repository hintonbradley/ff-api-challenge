import React from 'react';

const FailedApiDetails = function (props) {
    return (
        <li key={`failed${props.index}`} className="flex-row api-failed error">
            <p className="api-name">{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</p>
            <p className="failed api-status">Error</p>
            <p className="error-msg">Error 503 : Service Unavailable - no data available</p>
        </li>
    )
}

export default FailedApiDetails;