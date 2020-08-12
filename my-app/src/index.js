import React from "react";
import ReactDOM from 'react-dom';
import DataTable from './Data/dataTable';
import './index.css';

window.onload = function () {
    let gif = document.getElementsByClassName('imageLoad')[0];
    gif.style.display = 'none';
    let root = document.getElementById('root');
    root.style.display = 'flex';
    let html = document.querySelector('html');
    html.style.height = '';
    let body = document.querySelector('body');
    body.style = null;
    body.style.width = 'none';
    body.style.height = 'none';
    body.style.display = 'block';
}

try{

    (async function() {






        const Data = new DataTable();
        let dataJSON = await Data.getDataJSON('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}');
        console.log(dataJSON)








        class Map extends React.Component {
            static BaseUserInfo = [];
            static objAddressKeys = [];
            static lengthStrings = dataJSON.length;
            constructor(props) {
                super(props);
                for(let key in dataJSON[0]) {
                    Map.BaseUserInfo.push(key);
                }

                for (let key in dataJSON[0].address) {
                    Map.objAddressKeys.push(key);
                }
            }

            render() {
                return (
                    <div>
                        <CountStrings/>
                        <Add/>
                        <Sort/>
                        <Table lengthStrings={Map.lengthStrings}/>
                        <View data={String.onClickDataElements}/>
                    </div>
                );
            }
        }



        class CountStrings extends React.Component {
            click(event) {
                Map.lengthStrings = +event.target.parentElement.childNodes[0].value;



                ReactDOM.render(<Map/>, document.getElementById('root'));
            }
            render() {
                return (
                    <div>
                        <input type="text" placeholder={'number'}></input>
                        <button onClick={this.click}>CountStrings</button>
                    </div>
                );
            }
        }



        class Add extends React.Component {
            click(event) {
                dataJSON.push(Inputs.valueInput);





                ReactDOM.render(<Map/>, document.getElementById('root'));
            }
            render() {
                return (
                    <div>
                        <button className={'ADD_STRING'} onClick={this.click}>
                            ADD STRING
                        </button>
                        <Inputs/>
                    </div>
                )
            }
        }



        class Inputs extends React.Component {
            BaseUserInfo = Map.BaseUserInfo;
            static elements = [];
            static valueInput = {
                id: null,
                firstName: null,
                lastName: null,
                email: null,
                phone: null,
                address: {
                    streetAddress: null,
                    city: null,
                    state: null,
                    zip: null
                },
                description: null
            };


            static Change(event, key = '', type = '') {
                if (type === 'address') {
                    Inputs.valueInput['address'][key] = event.target.value;
                }else {
                    Inputs.valueInput[key] = event.target.value;
                }
            }


            ChangeId(event) {
                Inputs.Change(event, 'id');
            }

            ChangeFirstName(event) {
                Inputs.Change(event, 'firstName');
            }

            ChangeLastName(event) {
                Inputs.Change(event, 'lastName');
            }

            ChangeEmail(event) {
                Inputs.Change(event, 'email');
            }

            ChangePhone(event) {
                Inputs.Change(event, 'phone');
            }

            ChangeDescription(event) {
                Inputs.Change(event, 'description');
            }

            functions = [this.ChangeId, this.ChangeFirstName, this.ChangeLastName, this.ChangeEmail, this.ChangePhone, null, this.ChangeDescription];

            ChangeStreetAddress(event) {
                Inputs.Change(event, 'streetAddress', 'address');
            }

            ChangeCity(event) {
                Inputs.Change(event, 'city', 'address');
            }

            ChangeState(event) {
                Inputs.Change(event, 'state', 'address');
            }

            ChangeZip(event) {
                Inputs.Change(event, 'zip', 'address');
            }

            functionsAddress = [this.ChangeStreetAddress, this.ChangeCity, this.ChangeState, this.ChangeZip];

            render() {
                Inputs.elements = [];



                for (let i = 0, current = 0; i < this.BaseUserInfo.length; i++, current++) {
                    if (this.BaseUserInfo[i] === 'address') {
                        for (let j = 0; j < Map.objAddressKeys.length; j++, current++) {
                            Inputs.elements.push(
                                <input key={current} type="text" placeholder={Map.objAddressKeys[j]} onChange={this.functionsAddress[j]}>
                                </input>
                            );
                        }
                        current--
                    }else {
                        Inputs.elements.push(
                            <input key={current} type="text" placeholder={this.BaseUserInfo[i]} onChange={this.functions[i]}>
                            </input>
                        );
                    }
                }

                return (
                    <div className={'inputs'}>
                        {Inputs.elements}
                    </div>
                )
            }
        }



        class Sort extends React.Component   {
            static elements = [];
            BaseUserInfo = Map.BaseUserInfo;
            static AscDescFunctions(event, callBackAscending, callBackDescending ) {
                let elem = event.target;
                if (elem.value === 'Ascending') {
                    elem.value = 'Descending';
                    elem.innerHTML = '&and;';// up
                    callBackDescending(event);
                } else {
                    elem.value = 'Ascending';
                    elem.innerHTML = '&or;';// down
                    callBackAscending(event)
                }
            }
            static sortById(event) {
                Sort.AscDescFunctions(event,function(event) {
                    dataJSON.sort(function(a, b) {
                        if (a.id < b.id) {
                            return -1;
                        }
                        if (a.id > b.id) {
                            return 1;
                        }
                        // a должно быть равным b
                        return 0;
                        // return a.id - b.id;
                    });
                    dataJSON.reverse();
                },function(event) {
                    dataJSON.sort(function(a, b) {
                        // if (a.id < b.id) {
                        //     return -1;
                        // }
                        // if (a.id > b.id) {
                        //     return 1;
                        // }
                        // return 0;
                        return a.id - b.id;
                    });
                })
                ReactDOM.render(<Map/>, document.getElementById('root'));
            }
            static sortByFirstName(event) {
                Sort.AscDescFunctions(event, function (event) {
                    dataJSON.sort(function (a, b) {



                        return a.firstName.localeCompare(b.firstName);
                    })
                    dataJSON.reverse();
                },function (event){
                    dataJSON.sort(function(a, b){


                        return a.firstName.localeCompare(b.firstName);
                    })
                })
                ReactDOM.render(<Map/>, document.getElementById('root'));
            }
            static sortByLastName(event) {
                Sort.AscDescFunctions(event, function (event) {
                    dataJSON.sort(function (a, b) {



                        return a.lastName.localeCompare(b.lastName);
                    })
                    dataJSON.reverse();
                },function (event){
                    dataJSON.sort(function(a, b){



                        return a.lastName.localeCompare(b.lastName);
                    })
                })
                ReactDOM.render(<Map/>, document.getElementById('root'));
            }
            static sortByEmail(event)  {
                Sort.AscDescFunctions(event, function (event) {
                    dataJSON.sort(function (a, b) {



                        return a.email.localeCompare(b.email);
                    })
                    dataJSON.reverse();
                },function (event){
                    dataJSON.sort(function(a, b){



                        return a.email.localeCompare(b.email);
                    })
                })
                ReactDOM.render(<Map/>, document.getElementById('root'));
            }
            static sortByPhone(event) {
                Sort.AscDescFunctions(event, function (event) {
                    dataJSON.sort(function (a, b) {
                        let strA = a.phone, strB = b.phone;
                        strA = +strA.split('(').join('').split(')').join('').split('-').join('');
                        strB = +strB.split('(').join('').split(')').join('').split('-').join('');
                        return strA - strB;
                    })
                    dataJSON.reverse();
                },function (event){
                    dataJSON.sort(function(a, b){
                        let strA = a.phone, strB = b.phone;
                        strA = +strA.split('(').join('').split(')').join('').split('-').join('');
                        strB = +strB.split('(').join('').split(')').join('').split('-').join('');
                        return strA - strB;
                    })
                })
                ReactDOM.render(<Map/>, document.getElementById('root'));
            }
            static sortByAddress(event) {
                Sort.AscDescFunctions(event, function (event) {
                    dataJSON.sort(function (a, b) {
                        return a.address.zip - b.address.zip
                    })
                    dataJSON.reverse();

                },function (event){
                    dataJSON.sort(function(a, b){
                        return a.address.zip - b.address.zip
                    })
                })
                ReactDOM.render(<Map/>, document.getElementById('root'));
            }
            static sortByDescription(event) {
                Sort.AscDescFunctions(event, function (event) {
                    dataJSON.sort(function (a, b) {



                        return a.description.localeCompare(b.description);
                    })
                    dataJSON.reverse();
                },function (event){
                    dataJSON.sort(function(a, b){



                        return a.description.localeCompare(b.description);
                    })
                })
                ReactDOM.render(<Map/>, document.getElementById('root'));
            }
            functions = [Sort.sortById, Sort.sortByFirstName, Sort.sortByLastName, Sort.sortByEmail, Sort.sortByPhone, Sort.sortByAddress, Sort.sortByDescription];

            render() {
                Sort.elements = [];
                let BaseUserInfo = this.BaseUserInfo;
                for (let i = 0; i < BaseUserInfo.length ; i++) {
                    Sort.elements.push(
                        <button key={i} name={BaseUserInfo[i]} value={'Ascending'} onClick={this.functions[i]}></button>
                    )
                }
                return (
                    <div className={'Sort'}>
                        {Sort.elements}
                    </div>
                );
            }
        }




        class Table extends React.Component {
            static currentObj = 0;


            tableStrings(count, type = '') {
                this.strings = [];
                let iterates = this.props.lengthStrings;
                if(type === 'head') {
                    iterates = 1;
                }




                for(let i = 0; i < iterates; i++) {
                    this.strings.push(
                        <String key={i} lengthBlocks={count} typeComponent={type}/>
                    );
                }

                return (this.strings);
            }

            render() {
                return (

                    <table>
                        <thead>
                        {this.tableStrings(7, 'head')}
                        </thead>
                        <tbody>
                            {this.tableStrings(7)}
                        </tbody>
                        <tfoot>

                        </tfoot>
                    </table>
                );
            }
        }



        class String extends React.Component {
            static elements = [];
            static onClickDataElements = [];
            headTable() {
                String.elements = [];
                let BaseUserInfo = Map.BaseUserInfo;


                for (let i = 0; i < this.props.lengthBlocks; i++) {
                    String.elements.push(
                        <Block key={i} content={BaseUserInfo[i]}/>
                    );
                }


                return (String.elements);
            }

            tableBloks() {
                String.elements = [];
                let lengthBlocks = this.props.lengthBlocks;
                let BaseUserInfo = Map.BaseUserInfo;


//---------------------------------------
                Table.currentObj++;
                if ((Table.currentObj) === (dataJSON.length + 1)) {
                    Table.currentObj = 1;
                }
//---------------------------------------


                for (let obj = 0, key = 0; obj < lengthBlocks; obj++, key++) {
                    let keyObj = BaseUserInfo[key];
                    if(key === 8) {
                        key = 0;
                    }


                    String.elements.push(
                            <Block key={obj} content={dataJSON[Table.currentObj - 1][keyObj]}/>
                    );
                }


                return (String.elements);
            }

            Click(event) {
                String.onClickDataElements = [];
                let stringElement = event.target.parentElement;



                for (let i = 0; i < stringElement.childNodes.length; i++) {
                    if (i === 5) {
                        let element = stringElement.childNodes[5];
                        for (let j = 0; j < element.childNodes.length; j++) {
                            String.onClickDataElements.push(
                                element.childNodes[j].innerHTML
                            )
                        }
                    }else {
                        String.onClickDataElements.push(
                            stringElement.childNodes[i].innerHTML
                        )
                    }
                }


                if (document.documentElement.clientHeight - event.clientY < 500) {
                    View.style = {
                        display: 'flex',
                        top: window.pageYOffset + event.clientY - 500 + 'px',
                        left: window.pageXOffset + event.clientX + 'px'
                    }
                }else {
                    View.style = {
                        display: 'flex',
                        top: window.pageYOffset + event.clientY + 'px',
                        left: window.pageXOffset + event.clientX + 'px'
                    }
                }




                ReactDOM.render(<Map/>, document.getElementById('root'));
            }

            render() {
                if (this.props.typeComponent === 'head') {
                    return (
                        <tr>
                            {this.headTable()}
                        </tr>
                    );
                }


                return (
                    <tr onClick={this.Click}>
                        {this.tableBloks()}
                    </tr>
                );
            }
        }



        class Block extends React.Component {
            render() {
                if ((typeof this.props.content) === 'object') {
                    return (
                        <td>
                            <Address address={this.props.content}/>
                        </td>
                    );
                }else {
                    return (
                        <td>
                            {this.props.content}
                        </td>
                    );
                }
            }
        }



        class Address extends React.Component {
            render() {
                let bloksAddress = [];
                let id = 0;
                let objAddress = this.props.address;



                for (let key in objAddress) {
                    bloksAddress.push(
                        <div key={id}>
                            {objAddress[key]}
                        </div>
                    )
                    id++;
                }



                return (bloksAddress);
            }
        }




        class View extends React.Component {
            static elements = [];
            static keys = [];
            static style = {}
            constructor(props) {
                super(props);
                this.data = props.data;



                for (let i = 0; i < Map.BaseUserInfo.length; i++) {
                    if (Map.BaseUserInfo[i] === 'address') {
                        for (let j = 0; j < Map.objAddressKeys.length; j++) {
                            View.keys.push(
                                Map.objAddressKeys[j]
                            );
                        }
                    }else {
                        View.keys.push(
                            Map.BaseUserInfo[i]
                        );
                    }
                }
            }

            render() {
                View.elements = [];
                for (let i = 0; i < this.props.data.length; i++) {
                    View.elements.push(
                        <div key={i} className={'view__block'}>
                            <div className={'view__block__content'}>
                                {View.keys[i]}
                            </div>
                            <div className={'view__block__content'}>
                                {this.props.data[i]}
                            </div>
                        </div>
                    );
                }



                return (
                    <div className={'view'} style={View.style}>
                        {View.elements}
                    </div>
                );
            }
        }















        ReactDOM.render(<Map style={Map.style}/>, document.getElementById('root'));
    })()
}catch(error) {
    console.log(error);
}