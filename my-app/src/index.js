import React from "react";
import ReactDOM from 'react-dom';
import './index.css';


class Block extends React.Component{
    render() {
        return (
            <td className="">

            </td>
        );
    }
}


class String extends React.Component{
    render() {
        return (
            <tr>
                <Block/>
            </tr>
        );
    }
}

class Table extends React.Component{
    render() {
        return (
            <table>

            </table>
        );
    }
}

ReactDOM.render(<Table/>, document.getElementById('root'));