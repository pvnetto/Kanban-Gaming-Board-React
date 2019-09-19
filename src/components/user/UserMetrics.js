import React from 'react';
import PieChart from 'react-minimal-pie-chart';

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
            <PieChart
                className="w-50 mx-auto my-2"
                data={[
                    { title: 'Pending', value: 10, color: '#E38627' },
                    { title: 'Closed', value: 15, color: '#C13C37' }
                ]}
            />
            <div className="d-flex flex-row justify-content-around align-items-center mt-4">
                <MetricsItem label={"Projects"} count={0} />
                <MetricsItem label={"Total Tasks"} count={0} />
                <MetricsItem label={"Pending Tasks"} count={0} />
                <MetricsItem label={"Closed Tasks"} count={0} />
            </div>
        </div>
    );
};

export default UserMetrics;