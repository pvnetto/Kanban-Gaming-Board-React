import React from 'react';

const MetricsItem = (props) => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <p className="font-weight-bold">{props.label}</p>
            <p>{props.count}</p>
        </div>
    );
}

const UserMetrics = () => {
    return (
        <div>
            <img src="" alt="" />
            <div className="d-flex flex-row justify-content-around align-items-center">
                <MetricsItem label={"Projects"} count={0} />
                <MetricsItem label={"Total Tasks"} count={0} />
                <MetricsItem label={"Pending Tasks"} count={0} />
                <MetricsItem label={"Closed Tasks"} count={0} />
            </div>
        </div>
    );
};

export default UserMetrics;