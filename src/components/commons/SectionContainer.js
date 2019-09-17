import React from 'react';

const SectionContainer = (props) => {
    return (
        <div className="bg-dark border-2 border-light mb-2">
            <div className="m-3">
                <i>{props.titleIcon}</i>
                <h4 className="emphasized">{props.title}</h4>
                <hr className="border-top-1 border-light" />
            </div>

            <div className="m-3">
                {props.items.length > 0 ?
                    props.items :
                    <p className="text-center">
                        {props.noItemsMsg}
                    </p>
                }
                <hr className="border-top-1 border-light" />
            </div>

            <div className="p-3"></div>
        </div>
    );
};

export default SectionContainer;