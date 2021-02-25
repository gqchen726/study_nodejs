import React from 'react'
// import '../public/css/App.css'
import {CarouselMap} from "./CarouselMap";
import {SearchBar} from "../component/SearchBar";
import {DataShowCard} from "./DataShowCard";


const localContext = require('../cache/LocalContext');
export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
        }
    }

    onSearch = value => console.log(value);


    getUser = (here,user) => {
        this.props.getUser(here,user)
        this.setState({
            user: user
        })
    }

    render() {
        const style = { background: '#0092ff', padding: '8px 0' };
        return (
            <div id='root' className="App">
                {/*<header className="App-header">*/}
                {/*    <StateBar user={this.state.user} getUser={this.getUser}/>*/}
                {/*</header>*/}

                <div style={{width:'100%'}} >
                    <SearchBar saveSearchKeyWords={this.props.saveSearchKeyWords} />
                    <br /><br />
                    <CarouselMap autoPlay={true} />
                    <br /><br />
                    {/*<DataShowGrid />*/}
                    <DataShowCard style={{width:'20%',height:'10%'}} imageSrc='http://avatars1.githubusercontent.com/u/8186664?s=460&v=4' />
                </div>




            </div>
        );
    }
}