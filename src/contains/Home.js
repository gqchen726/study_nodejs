import React from 'react'
// import '../public/css/App.css'
import {CarouselMap} from "./CarouselMap";
import {SearchBar} from "./SearchBar";
import {DataShowCard} from "./DataShowCard";
import Card from "antd/es/card";
import Meta from "antd/es/card/Meta";
// import Route from "react-router/modules/Route";
// import {useRouteMatch} from "react-router";
import {SearchResultShow} from "./SearchResultShow";
import {Switch} from "antd";


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
        console.log(this)
        const style = { background: '#0092ff', padding: '8px 0' };
        // let {path,url} = useRouteMatch();

        return (
            <div id='root' className="App">
                {/*<header className="App-header">*/}
                {/*    <StateBar user={this.state.user} getUser={this.getUser}/>*/}
                {/*</header>*/}

                <div style={{width:'100%'}} >
                    <SearchBar saveSearchKeyWords={this.props.saveSearchKeyWords} saveAny={this.props.saveAny} />
                    <br /><br />
                    <CarouselMap autoPlay={true} />
                    <br /><br />



                    {/*<Switch>*/}
                    {/*    <Route path={`${path}/searchResultShow`} component={SearchResultShow} children={datas} />*/}
                    {/*</Switch>*/}
                </div>




            </div>
        );
    }
}