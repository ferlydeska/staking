import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Web3 from 'web3';

class App extends Component {
    async UNSAFE_componentWillMount() {
        await this.loadWeb3();
    }

    async loadWeb3() {
        if (window.ethereuem) {
            window.web3 = new Web3(window.ethereuem);
            await window.ethereuem.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert('No Eth browser detect! you can check out Metamask');
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            account: '0x0xxxx'
        }
    }
    // react code in here
    render() {
        return (
            <diV>
                <Navbar account={this.state.account} />
                <div className='text-center' style={{ color: 'green', fontSize: '30px' }}>
                    <h4>Helllo Worddddd</h4>
                </div>
            </diV>
        )
    }
}

export default App;