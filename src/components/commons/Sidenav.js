import React from 'react';

const Sidenav = (props) => {
    return (
        <div>
            <ul>
                {props.buttons}

                <hr />

                {props.options}

                <li>
                    <i>Lout</i>
                    <button>Logout</button>
                </li>
                <hr />
                <li>
                    <i>Min</i>
                </li>
            </ul>
        </div>
    );
};

export default Sidenav;