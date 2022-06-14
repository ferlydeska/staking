// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./RWD.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stakers;

    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(RWD _rwd, Tether _tether) {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
    }

    // staking function
    function depositTokens(uint256 _amount) public {
        require(_amount > 0, "Jumlah harus lebih dari 0");

        // transfer tether token to this contract address for staking
        tether.transferFrom(msg.sender, address(this), _amount);

        // update staking balance
        stakingBalance[msg.sender] += _amount;

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        //update staking balance boolean
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // unstaking function
    function unstakeTokens() public {
        uint256 balance = stakingBalance[msg.sender];
        require(balance > 0, "saldo tidak boleh kurang dari 0");

        // transfer token to specified contract address from bank
        tether.transfer(msg.sender, balance);

        //update staking balance
        stakingBalance[msg.sender] = 0;

        //update staking status
        isStaking[msg.sender] = false;
    }

    //pemberian rewards
    function issueTokens() public {
        require(
            msg.sender == owner,
            "Harus Pemilik yg dapat memberikan hadiah"
        );
        for (uint256 i = 0; i < stakers.length; i++) {
            address recepient = stakers[i];
            uint256 balance = stakingBalance[recepient] / 9;
            if (balance > 0) {
                rwd.transfer(recepient, balance);
            }
        }
    }
}
