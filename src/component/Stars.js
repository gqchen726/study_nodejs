import React from "react";

export class Stars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            starMap: this.props.starMap,
            stars: null,
        };
    }
    componentWillMount() {

        let starMap = this.state.starMap;

        let stars = new Array();


        starMap.forEach( (value,key,map) => {
            stars.push(this.toString(value));
        })
        stars = stars.map( (items) => <li>{items}</li>);
        this.setState({stars:stars});

    }

    toString(star) {
        return`${star.name}(age:${star.age},country:${star.country})`;
    }

    render() {
        return (
            <li>{this.state.stars}</li>
        );
    }
}
