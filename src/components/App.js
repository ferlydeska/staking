import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import Tether from '../truffle_abis/Tether.json';
import RWD from '../truffle_abis/RWD.json';
// import DecentralBank from '../truffle_abis/DecentralBank.json';

class App extends Component {
    async UNSAFE_componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    async loadWeb3() {
        const provider = await detectEthereumProvider();
        // const provider = window.ethereum;

        // console.log(window.web3, 'Load Web3');
        if (provider) {
            window.web3 = new Web3(provider);// window.web3 = new Web3(window.ethereum);
            // await provider.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert('No Eth browser detect! trying connect to Ganache');
            window.web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
        }
        // console.log(window.web3, 'Load Web3');
    }

    async loadBlockchainData() {
        const web3 = window.web3;
        const account = await web3.eth.getAccounts();
        const networkID = await web3.eth.net.getId();

        this.setState({ akun: account[0] })
        // console.log({ "Network ID": networkID, "Account ID": account });

        // load Tether Contract
        const tetherData = Tether.networks[networkID];
        if (tetherData) {
            // console.log('ADDR THTER', tetherData.address);
            const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
            this.setState({ tether });
            let tetherBalance = await tether.methods.balanceOf(this.state.akun).call();
            this.setState({ tetherBalance: tetherBalance.toString() });
        } else {
            window.alert('Error: tether contract not deployed');
        }

        // load Tether Contract
        const rwdData = RWD.networks[networkID];
        if (rwdData) {
            // console.log('ADDR RWD', rwdData.address)
            const rwd = new web3.eth.Contract(RWD.abi, rwdData.address);
            this.setState({ rwd });
            let rwdBalance = await rwd.methods.balanceOf(this.state.akun).call();
            this.setState({ rwdBalance: rwdBalance.toString() });
        } else {
            window.alert('Error: RWD contract not deployed');
        }
        console.log(this.state);
    }

    constructor(props) {
        super(props);
        this.state = {
            akun: '0x0xxxx',
            tether: {},
            rwd: {},
            decentralBank: {},
            tetherBalance: '0',
            rwdBalance: '0',
            stakingBalance: '0',
            loading: true
        }
    }
    // react code in here
    render() {
        return (
            <div>
                <Navbar akun={this.state.akun} />
                <div className='text-center' style={{ color: 'green', fontSize: '30px' }}>
                    <h4>Helllo Worddddd</h4>
                </div>
            </div>
        )
    }
}

export default App;