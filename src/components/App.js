import React, { Component } from 'react';
import styled from 'styled-components';
import Synthesizer from './Synthesizer';

const NotificationWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgb(52, 70, 122);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(247, 182, 136);
    font-family: 'Rubik Regular', sans-serif;

    p {
        width: 80%;
        text-align: center;
        line-height: 2em;
        font-size: 1.8em;
    }
`;

const ShouldUseDesktopNotification = () => (
    <NotificationWrapper>
        <p>
            I'm sorry, you're going to need a bigger screen to use this app :(
        </p>
    </NotificationWrapper>
);

class App extends Component {
    state = {
        isMobileDevice: false
    };

    checkForScreenWidth() {
        const matches = window.matchMedia('(max-width: 1056px)').matches;

        if (!this.state.isMobileDevice && matches)
            this.setState({ isMobileDevice: true });
        if (this.state.isMobileDevice && !matches)
            this.setState({ isMobileDevice: false });
    }

    componentDidMount() {
        this.checkForScreenWidth();
        window.addEventListener('resize', () => {
            this.checkForScreenWidth();
        });
    }

    render() {
        const { isMobileDevice } = this.state;
        return (
            <div>
                {isMobileDevice ? (
                    <ShouldUseDesktopNotification />
                ) : (
                    <Synthesizer />
                )}
            </div>
        );
    }
}

export default App;
