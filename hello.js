import React from 'react';
import ReactDOM from 'react-dom';

function Hi() {
    return <div>Hello World!</div>;
}
// function Hi() is a component because it returns something that React can render

ReactDOM.render(<Hi/>, document.querySelector('#root'));