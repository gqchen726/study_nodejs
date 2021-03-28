import React from 'react'
// import '../public/css/App.css'
import {CarouselMap} from "./CarouselMap";
import {SearchBar} from "./SearchBar";
// import Route from "react-router/modules/Route";
// import {useRouteMatch} from "react-router";


const localContext = require('../cache/LocalContext');
export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
        }
    }




    getUser = (here,user) => {
        this.props.getUser(here,user)
        this.setState({
            user: user
        })
    }

    render() {
        let {keywords} = this.props;
        let {saveAny} = this.props;
        const style = { background: '#0092ff', padding: '8px 0' };
        // let {path,url} = useRouteMatch();

        return (
            <div id='root' className="App">
                {/*<header className="App-header">*/}
                {/*    <StateBar user={this.state.user} getUser={this.getUser}/>*/}
                {/*</header>*/}

                <div style={{width:'100%'}} >
                    <SearchBar keywords={keywords} saveAny={saveAny} />
                    {/*<Link to={'/searchResult'} >数据检索</Link>*/}
                    <br /><br />
                    <CarouselMap autoPlay={true} />
                    <br /><br />

                    {/*<Link to={'/login'}>*/}
                    {/*    登录*/}
                    {/*</Link>*/}

                    {/*<Switch>*/}
                    {/*    <Route path={`${path}/searchResultShow`} component={SearchResultShow} children={datas} />*/}
                    {/*</Switch>*/}
                </div>




            </div>
        );
    }
}