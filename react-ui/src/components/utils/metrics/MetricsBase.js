import React from 'react';
import PropTypes from 'prop-types';
import ReactMinimalPieChart from 'react-minimal-pie-chart';

export const MetricsItem = (props) => {
    return (
        <div className={`d-flex flex-column align-items-center justify-content-center p-2`}>
            <p className="font-weight-bold">{props.label}</p>
            <p>{props.count}</p>
        </div>
    );
}

const MetricsBase = ({ data, children }) => {

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
                label={!isEmpty}
                labelPosition={60}
                labelStyle={{
                    fontFamily: 'sans-serif',
                    fontSize: '10px'
                }}
            />

            <div className="d-flex flex-row flex-wrap justify-content-between align-items-start mt-4">
                {children}
            </div>
        </div>
    );
};

MetricsBase.Item = MetricsItem;
MetricsBase.propTypes = {
    data: PropTypes.array.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.element,
    ]).isRequired,
}

export default MetricsBase;