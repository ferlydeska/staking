// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Payable {
    address payable public owner;

    constructor() payable {
        owner = payable(msg.sender);
    }

    function deposit() public payable {}

    function getAmount() public view returns (uint256) {
        uint256 jml = address(this).balance;

        return jml;
    }

    function withdraw() public {
        uint256 amount = address(this).balance;

        (bool sukses, ) = owner.call{value: amount}("");
        require(sukses, "Gagal Withdraw/Kirim ke Owner");
    }

    function transfer(address payable _addTo, uint256 _jml) public {
        (bool sukses, ) = _addTo.call{value: _jml}("");
        require(sukses, "Gagal Kirim ke Tujuan");
    }
}
