const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function (deployer, network, accounts) {
    function tokens(number) {
        return web3.utils.toWei(number, 'ether');
    }
    // deploy
    await deployer.deploy(Tether);
    const tther = await Tether.deployed();

    await deployer.deploy(RWD);
    const rwd = await RWD.deployed();

    await deployer.deploy(DecentralBank, rwd.address, tther.address);
    const dbank = await DecentralBank.deployed();

    // transfer RWD ke Bank
    // await rwd.transfer(dbank.address, tokens('1000000'));
    // console.log("BANK address = "+dbank.address);

    // distribute 100 mock tether ke investor
    // await tther.transfer(accounts[1], tokens('100'));
    // console.log("AKUN = "+accounts[1]);
    // let blance = await rwd.balanceOf(dbank.address);
    // console.log('Saldo Bank = '+blance);
};
