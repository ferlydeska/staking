import React, { Component } from 'react';

class Main extends Component {
    render() {

        return (
            <div id='content' className='mt-3'>
                <table className='table text-muted text-center'>
                    <thead>
                        <tr>
                            <th scope='col'>Staking Balance</th>
                            <th scope='col'>Reward Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.props.stakingBalance} USDT</td>
                            <td>{this.props.rwdBalance} RWD</td>
                        </tr>
                    </tbody>
                </table>
                <div className='card mb-2'>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        let amount = this.elmToken.value.toString();
                        this.props.stakeTokens(amount);
                    }}
                        className='mb-3'>
                        <div>
                            <label className='float-left'>Stake Tokens</label>
                            <span className='float-right'>
                                Balance: {this.props.tetherBalance}
                            </span>
                            <div className='input-group mb-4'>
                                <input
                                    ref={(inp) => { this.elmToken = inp }}
                                    type='text'
                                    placeholder='0' required />
                                <div className='input-group-open'>
                                    <div className='input-group-text'>
                                        USDT
                                    </div>
                                </div>
                            </div>
                            <button type='submit'>DEPOSIT</button>
                        </div>
                    </form>
                    <button className='btn btn-sm btn-primary' onClick={evt => this.updateTokens(evt)} >WITHDRAW</button>
                    <div className='card-body text-center'>
                        <button onClick={evt => this.stakeReward(evt)}>Reward Tokens</button>
                    </div>
                </div>
            </div>
        )
    }

    updateTokens(evt) {
        evt.preventDefault();
        this.props.unstakeTokens()
    }

    stakeReward(evt) {
        evt.preventDefault();
        let saldo = this.props.stakingBalance;
        this.props.rewardTokens()
    }
}

export default Main;