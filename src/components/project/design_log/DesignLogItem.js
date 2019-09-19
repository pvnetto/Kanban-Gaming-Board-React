import React from 'react';

const DesignLogItem = (props) => {
    return (
        <div>
            <div>
                <p>{props.title}</p>
                <p>{props.description}</p>
            </div>
            <div>
                {props.content}
            </div>
        </div>
    );
};

export default DesignLogItem;