const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function issueRewards(callback){
    let dbank = await DecentralBank.deployed();
    await dbank.issueTokens();
    console.log('sukses memberi hadiah');
    callback();
}