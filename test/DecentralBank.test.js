const Tether = artifacts.require("Tether");
const RWD = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");


require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('DecentralBank', ([owner, customer, cust2]) => {
    console.log('OWNER = ' + owner);
    console.log('cKUSTOMER = ' + customer);
    console.log('cKUSTOMER 2 = ' + cust2);

    let tther, rward, dbank;

    function tokens(number) {
        return web3.utils.toWei(number, 'ether');
    }

    before(async () => {
        //load kontrak
        tther = await Tether.new();
        rward = await RWD.new();
        dbank = await DecentralBank.new(rward.address, tther.address);

        // transfr token ke DBANK 1 milion
        await rward.transfer(dbank.address, tokens('1000000'));

        // transfer 100 mock tether to customer/investor
        await tther.transfer(customer, tokens('100'), { from: owner })
    })

    describe('Mock Tether deploy', async () => {
        it('matches name sukses', async () => {
            const name = await tther.name();
            assert.equal(name, 'Mock Tether Token');
        })
    })

    describe('Reward Token deploy', async () => {
        it('matches name sukses', async () => {
            const name = await rward.name();
            assert.equal(name, 'Reward Token');
        })
    })

    describe('Decentral Bank deploy', async () => {
        it('matches name sukses', async () => {
            const name = await dbank.name();
            assert.equal(name, 'Decentral Bank');
        })

        it('contract has tokens', async () => {
            let blance = await rward.balanceOf(dbank.address);
            assert.equal(blance, tokens('1000000'));
        })
    })

    describe('Yield Farming / Hasil tani', async () => {
        it('reward token for staking', async () => {
            let result

            // check saldo investor
            result = await tther.balanceOf(customer);
            assert.equal(result.toString(), tokens('100'), 'saldo investor befoore staking');

            // cek staking for customer
            await tther.approve(dbank.address, tokens('100'), { from: customer });
            await dbank.depositTokens(tokens('100'), { from: customer });

            // check saldo investor
            result = await tther.balanceOf(customer);
            assert.equal(result.toString(), tokens('0'), 'saldo investor after staking');

            // check saldo bank
            result = await tther.balanceOf(dbank.address);
            assert.equal(result.toString(), tokens('100'), 'saldo Bank after staking');

            // is staking status
            result = await dbank.isStaking(customer);
            assert.equal(result.toString(), 'true', 'status investor after staking');
            
            // pemberian reward
            await dbank.issueTokens({from: owner});
            await dbank.issueTokens({from: customer}).should.be.rejected;
            
            // unstaking token
            await dbank.unstakeTokens({from: customer});
            
            // check unstaking balance
            result = await tther.balanceOf(customer);
            assert.equal(result.toString(), tokens('100'), 'saldo investor after Unstaking');
    
            // check saldo bank
            result = await tther.balanceOf(dbank.address);
            assert.equal(result.toString(), tokens('0'), 'saldo Bank after Unstaking');
    
            // is staking status
            result = await dbank.isStaking(customer);
            assert.equal(result.toString(), 'false', 'status investor after Unstaking');
            
        })


    })


})