import React from 'react';
import Tracks from '../tracks/Tracks';

const Index = () => {
    return (
        //empty tags <> can also be used as React.Fragment syntax
        //but React.Fragment is necessary to support keys
        //key is the only attribute that can be passed to Fragment
        <React.Fragment>
            <Tracks />
        </React.Fragment>
    )
}

export default Index;