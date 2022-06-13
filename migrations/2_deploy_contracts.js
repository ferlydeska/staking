const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function (deployer, network, accounts) {
    //variabel
    // deploy
    await deployer.deploy(Tether);
    const tther = await Tether.deployed();

    await deployer.deploy(RWD);
    const rwd = await RWD.deployed();

    await deployer.deploy(DecentralBank,rwd.address,tther.address);    
    const dbank = await DecentralBank.deployed();

    // transfer RWD ke Bank
    await rwd.transfer(dbank.address,'1000000000000000000000000');
    console.log("BANK address = "+dbank.address);

    // distribute theter ke investor
    await tther.transfer(accounts[3],'1000000000000000000');
    console.log("AKUN = "+accounts[3]);
};
