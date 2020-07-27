import React, {Component} from 'react';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from "../errorMessage";
import CharacterPage from "../characterPage";

export default class App extends Component {

    state = {
        showRandomChar: true,
        selectedChar: null,
        error: false

    };

    componentDidCatch(error, errorInfo) {
        console.log('error');
        this.setState({
            error: true
        })
    }


    toggleVisable = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    };


    render() {
        const {showRandomChar} = this.state;
        const visibility = showRandomChar ? <RandomChar/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }
        return (
            <>
                <div className="container">
                    <Header/>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 offset-0">
                            {visibility}
                            <button onClick={this.toggleVisable} className="mt-1 btn-primary mb-5 btn">Toggle random
                                character
                            </button>
                        </div>
                    </div>

                    <CharacterPage/>

                </div>
            </>
        );
    }

};

