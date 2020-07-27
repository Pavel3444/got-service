import React, {Component} from 'react';
import styled from 'styled-components';
import GotService from "../../services/GotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

const CharMain = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4{
        margin-bottom: 20px;
        text-align: center;
        }
`;

const SelectError = styled.div`
    color: #fff;
    text-align: center;
    font-size: 26px;
`;


export default class CharDetails extends Component {

    gotService = new GotService();
    state = {
        char: null,
        loading: true,
        error: false
    };

    componentDidMount() {
        this.updateChar();
    }
componentDidUpdate(prevProps) {
        if(this.props.charId !== prevProps.charId){
            this.updateChar();
        }
}
    onCharDetailsLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    };
    updateChar() {
        const {charId} = this.props;
        if (!charId) {
            return
        }
        this.setState({
           loading: true
        });
        this.gotService.getCharacter(charId)
            .then(this.onCharDetailsLoaded )
            .catch(()=> this.onError)
    }
    onError(){
        this.setState({
            char: null,
            error: true
        })
    }

    render() {

        if (!this.state.char && this.state.error) {
            return <ErrorMessage/>
        } else if (!this.state.char) {
            return <span className="select-error">Please select a character</span>
        }

        let {name, gender, born, died, culture} = this.state.char;

        name = name ? name : 'no data =(';
        gender = gender ? gender : 'no data =(';
        born = born ? born : 'no data =(';
        died = died ? died : 'no data =(';
        culture = culture ? culture : 'no data =(';

        if (this.state.loading) {
            return (
                <div className="char-details rounded">
                    <Spinner/>
                </div>
            )
        }

        return (
            <CharMain className="rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </li>
                </ul>
            </CharMain>
        );
    }
}