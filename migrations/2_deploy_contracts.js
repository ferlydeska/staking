const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");
// const Payable = artifacts.require("Payable");

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
    await rwd.transfer(dbank.address, '1000000');
    // console.log("BANK address = "+dbank.address);

    // distribute 100 mock tether ke investor
    await tther.transfer(accounts[1], '10000');
    // console.log("AKUN = "+accounts[1]);
    // let blance = await rwd.balanceOf(dbank.address);
    // console.log('Saldo Bank = '+blance);

    // await deployer.deploy(Payable);
    // const pay = await Payable.deployed();
};
