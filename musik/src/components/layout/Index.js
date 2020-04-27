import React from 'react';
import Tracks from '../tracks/Tracks';
import Search from '../tracks/Search';

const Index = () => {
    return (
        //empty tags <> can also be used as React.Fragment syntax
        //but React.Fragment is necessary to support keys
        //key is the only attribute that can be passed to Fragment
        <React.Fragment>
            <Search />
            <Tracks />
        </React.Fragment>
    )
}

export default Index;