// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Tether {
    string public name = "Mock Tether Token";
    string public symbol = "mUSDT";
    uint256 public totalSupply = 1000000; // 1 million tokens
    uint8 public decimals = 18;

    event evenTransfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );
    event evenApprove(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance; // uang saku

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        require(balanceOf[msg.sender] >= _value, "Oh saldo Kurang");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit evenTransfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        allowance[msg.sender][_spender] = _value;

        emit evenApprove(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(balanceOf[_from] >= _value);
        require(allowance[_from][msg.sender] >= _value);

        balanceOf[_to] += _value;
        balanceOf[_from] -= _value;

        allowance[_from][msg.sender] -= _value;

        emit evenTransfer(_from, _to, _value);
        return true;
    }
}
