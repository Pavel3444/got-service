import React, {Component} from 'react';
import styled from "styled-components";
import GotService from "../../services/GotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

const RandomBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4{
        margin-bottom: 20px;
        text-align: center;
    }
`;

const TextBold = styled.span`
    font-weidth: bold;
`;


export default class RandomChar extends Component {


    gotService = new GotService();
    state = {
        char: {},
        loading: true
    };

    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, 1500);

    }
    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false
        })
    };
onError = (err) => {
    this.setState({
        error: true,
        loading: false
    })
};
    updateChar = () => {
        const id = Math.floor(Math.random() * 140 + 25);  // 25-140
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    };

    render() {
        const {char, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null ;
        return (
            <RandomBlock className="rounded">
                {errorMessage}
                {spinner}
                {content}
            </RandomBlock>
        );
    }
}

const View = ({char}) => {
    let {name, gender, born, died, culture} = char;
    name = name ? name : 'no data =(';
    gender = gender ? gender : 'no data =(';
    born = born ? born : 'no data =(';
    died = died ? died : 'no data =(';
    culture = culture ? culture : 'no data =(';

    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <TextBold>Gender </TextBold>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <TextBold>Born </TextBold>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <TextBold>Died </TextBold>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <TextBold>Culture </TextBold>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
};
