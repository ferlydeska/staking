import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Web3 from 'web3';
// import detectEthereumProvider from '@metamask/detect-provider';
import Tether from '../truffle_abis/Tether.json';
import RWD from '../truffle_abis/RWD.json';
import DecentralBank from '../truffle_abis/DecentralBank.json';
import Main from './Main'

class App extends Component {
    async componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    async loadWeb3() {
        // const provider = await detectEthereumProvider();
        const provider = window.ethereum;

        // console.log(window.web3, 'Load Web3');
        if (provider) {
            window.web3 = new Web3(provider);// window.web3 = new Web3(window.ethereum);
            await provider.enable();
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

        // load Tether Contract
        const decentralBankData = DecentralBank.networks[networkID];
        if (decentralBankData) {
            // console.log('ADDR RWD', rwdData.address)
            const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address);
            this.setState({ decentralBank });
            let stakingBalance = await decentralBank.methods.stakingBalance(this.state.akun).call();
            this.setState({ stakingBalance: stakingBalance.toString() });

            let akunOwner = await decentralBank.methods.owner().call();
            this.setState({ akunOwner: akunOwner });
        } else {
            window.alert('Error: Decentral Bank contract not deployed');
        }
        console.log(this.state);
        this.setState({ loading: false });
    }

    // function staking
    stakeTokens = (amount) => {
        this.setState({ loading: true });
        this.state.tether.methods.approve(this.state.decentralBank._address, amount).send({ from: this.state.akun })
            .on('transactionHash', (hash) => {
                this.state.decentralBank.methods.depositTokens(amount)
                    .send({ from: this.state.akun })
                    .on('transactionHash', (hash) => {
                        this.setState({ loading: false });
                    })
            });
    }
    // function unstaking
    unstakeTokens = () => {
        this.setState({ loading: true });
        this.state.decentralBank.methods.unstakeTokens()
            .send({ from: this.state.akun })
            .on('transactionHash', (hash) => {
                this.setState({ loading: false });
            })
    }
    //function reward
    rewardTokens = () => {
        if (this.state.akunOwner != this.state.akun) {
            window.alert('Akun Aktif Harus Owner');
        } else {
            this.setState({ loading: true });
            this.state.decentralBank.methods.issueTokens()
                .send({ from: this.state.akun })
                .on('transactionHash', (hash) => {
                    this.setState({ loading: false });
                })
        }
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
            loading: true,
            akunOwner: '0x00'
        }
    }
    // react code in here
    render() {
        let content;
        {
            this.state.loading ? content = <p id='loader' className='text-center'>LOADING PLEASE</p> :
                content = <Main
                    tetherBalance={this.state.tetherBalance}
                    rwdBalance={this.state.rwdBalance}
                    stakingBalance={this.state.stakingBalance}
                    stakeTokens={this.stakeTokens}
                    unstakeTokens={this.unstakeTokens}
                    rewardTokens={this.rewardTokens}
                />
        };
        return (
            <div>
                <Navbar
                    akun={this.state.akun}
                    akunOwner={this.state.akunOwner}
                />
                <div className='container-fluid mt-5'>
                    <div className='row'>
                        <main role='main' className='col-lg-12'>
                            <div>
                                {content}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;