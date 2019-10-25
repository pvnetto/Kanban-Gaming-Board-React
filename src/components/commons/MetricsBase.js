import React from 'react';
import ReactMinimalPieChart from 'react-minimal-pie-chart';

export const MetricsItem = (props) => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <p className="font-weight-bold">{props.label}</p>
            <p>{props.count}</p>
        </div>
    );
}

const MetricsBase = ({ data, total, children }) => {

    let isEmpty = true;

    if (data) {
        data.forEach(data => {
            if (data.value != 0) {
                isEmpty = false;
            }
        })
    }

    let emptyData = [{ title: 'You have no tasks!', value: 1, color: '#696969' }]

    return (
        <div>
            <ReactMinimalPieChart className="w-50 mx-auto my-2"
                data={isEmpty ? emptyData : data}
                lineWidth={15}
                paddingAngle={isEmpty ? 0 : 5}
            />
            <div className="d-flex flex-row justify-content-around align-items-center mt-4">
                {children}
            </div>
        </div>
    );
};

MetricsBase.Item = MetricsItem;

export default MetricsBase;