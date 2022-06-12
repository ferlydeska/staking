const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function (deployer, network, accounts) {
    //variabel
    const tther = await Tether.deployed();
    const rwd = await RWD.deployed();
    const dbank = await DecentralBank.deployed();

    // deploy
    await deployer.deploy(Tether);
    await deployer.deploy(RWD);
    await deployer.deploy(DecentralBank,rwd.address,tther.address);    

    // transfer RWD ke Bank
    await rwd.transfer(dbank.address,'1000000000000000000000000');

    // distribute theter ke investor
    await tther.transfer(accounts[1],'1000000000000000000')
};
