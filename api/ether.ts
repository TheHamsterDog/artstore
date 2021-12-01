const Router = require('express').Router();
const we3 = require('web3')
const web3 = new we3(process.env.RPCServerAddress);
import User from '../models/user';
import auth from '../middleware/auth'
// I commented out the contract's deployment...
// const Tx = require('ethereumjs-tx').Transaction;
const privateKey = Buffer.from(process.env.EtherPrivateKey, 'hex');
// console.log(privateKey)
// const data = "0x608060405234801561001057600080fd5b5033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060405180606001604052806040518060400160405280600981526020017f4172742053746f7265000000000000000000000000000000000000000000000081525081526020016040518060400160405280600481526020017f415453450000000000000000000000000000000000000000000000000000000081525081526020013373ffffffffffffffffffffffffffffffffffffffff168152506002600082015181600001908051906020019061010b929190610178565b506020820151816001019080519060200190610128929190610178565b5060408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555090505061027c565b8280546101849061021b565b90600052602060002090601f0160209004810192826101a657600085556101ed565b82601f106101bf57805160ff19168380011785556101ed565b828001600101855582156101ed579182015b828111156101ec5782518255916020019190600101906101d1565b5b5090506101fa91906101fe565b5090565b5b808211156102175760008160009055506001016101ff565b5090565b6000600282049050600182168061023357607f821691505b602082108114156102475761024661024d565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b61095a8061028b6000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80635b86f59914610051578063c0da1e6814610083578063e3d670d7146100a1578063f8b2cb4f146100d1575b600080fd5b61006b60048036038101906100669190610557565b610101565b60405161007a9392919061068d565b60405180910390f35b61008b6102d5565b60405161009891906106cb565b60405180910390f35b6100bb60048036038101906100b6919061052a565b610469565b6040516100c891906106ed565b60405180910390f35b6100eb60048036038101906100e6919061052a565b610481565b6040516100f891906106ed565b60405180910390f35b6060600080600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146101835783856040518060600160405280602d81526020016108f8602d913991909250925092506102ce565b836000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546101d1919061075e565b925050819055507f571594dd5cf66fd582d908b1dcc2d29fa72b103fd6193563ed354b770eccf9a26000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205486604051610247929190610708565b60405180910390a16000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054856040518060400160405280601281526020017f7375636365737366756c6c7920646f6e6521000000000000000000000000000081525091909250925092505b9250925092565b6102dd6104c9565b60026040518060600160405290816000820180546102fa90610823565b80601f016020809104026020016040519081016040528092919081815260200182805461032690610823565b80156103735780601f1061034857610100808354040283529160200191610373565b820191906000526020600020905b81548152906001019060200180831161035657829003601f168201915b5050505050815260200160018201805461038c90610823565b80601f01602080910402602001604051908101604052809291908181526020018280546103b890610823565b80156104055780601f106103da57610100808354040283529160200191610405565b820191906000526020600020905b8154815290600101906020018083116103e857829003601f168201915b505050505081526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681525050905090565b60006020528060005260406000206000915090505481565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60405180606001604052806060815260200160608152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b60008135905061050f816108c9565b92915050565b600081359050610524816108e0565b92915050565b6000602082840312156105405761053f6108b3565b5b600061054e84828501610500565b91505092915050565b6000806040838503121561056e5761056d6108b3565b5b600061057c85828601610500565b925050602061058d85828601610515565b9150509250929050565b6105a0816107b4565b82525050565b6105af816107b4565b82525050565b60006105c082610731565b6105ca818561073c565b93506105da8185602086016107f0565b6105e3816108b8565b840191505092915050565b60006105f982610731565b610603818561074d565b93506106138185602086016107f0565b61061c816108b8565b840191505092915050565b6000606083016000830151848203600086015261064482826105b5565b9150506020830151848203602086015261065e82826105b5565b91505060408301516106736040860182610597565b508091505092915050565b610687816107e6565b82525050565b600060608201905081810360008301526106a781866105ee565b90506106b6602083018561067e565b6106c360408301846105a6565b949350505050565b600060208201905081810360008301526106e58184610627565b905092915050565b6000602082019050610702600083018461067e565b92915050565b600060408201905061071d600083018561067e565b61072a60208301846105a6565b9392505050565b600081519050919050565b600082825260208201905092915050565b600082825260208201905092915050565b6000610769826107e6565b9150610774836107e6565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156107a9576107a8610855565b5b828201905092915050565b60006107bf826107c6565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60005b8381101561080e5780820151818401526020810190506107f3565b8381111561081d576000848401525b50505050565b6000600282049050600182168061083b57607f821691505b6020821081141561084f5761084e610884565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600080fd5b6000601f19601f8301169050919050565b6108d2816107b4565b81146108dd57600080fd5b50565b6108e9816107e6565b81146108f457600080fd5b5056fe4f6e6c7920746865206f776e65722063616e20696e63726561736520736f6d656f6e6527732062616c616e6365a2646970667358221220bbce5c7282ed790a80e0d19bc668a21aeba8b94af6932edba9ae58ce8e26830164736f6c63430008070033";
// web3.eth.getTransactionCount(config.get('EtherAddress'), ((err, txCount) => {
//     console.log(web3.utils.toHex(txCount))
//     console.log(err)
//     const TxObject = {
//         nance: web3.utils.toHex(txCount),
//         gasLimit: web3.utils.toHex(1000000),
//         gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
//         data: data
//     }
//     const tx = new Tx(TxObject, {
//         chain: "ropsten"
//     })
//     tx.sign(privateKey);
//     const serializedTx = tx.serialize();
//     const raw = '0x' + serializedTx.toString('hex');
//     web3.eth.sendSignedTransaction(raw, (err, txHash) => {
//         console.log(err)
//         console.log(txHash)
//     });
// }))
const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "add",
                "type": "address"
            }
        ],
        "name": "changeBalance",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "balance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "ad",
                "type": "address"
            }
        ],
        "name": "getBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getInformation",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "symbol",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "internalType": "struct ArtStore.BasicInfo",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "ad",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "increaseBalance",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]


Router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        const contract = new web3.eth.Contract(abi, process.env.smartContractAddress);
        const transaction = contract.methods.getBalance(user.ethAddress).call(async (err, results) => {
            console.log(results)
            return res.json({
                etherBalance: results, accountBalance: user.balance
            });
        });

        // })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            error: "Our services are unavailable at this moment, please try again later!"
        })
    }
})
Router.post('/withdraw', auth, async (req, res) => {
    try {

        const user = await User.findById(req.user);
        const value = user.balance;

        const contract = new web3.eth.Contract(abi, process.env.smartContractAddress);
        const transaction = contract.methods.increaseBalance(user.ethAddress, user.balance);

        const encoded_transaction = transaction.encodeABI();
        const transactionObject = {
            gas: 100000,
            data: encoded_transaction,
            from: process.env.EtherAddress,
            to: "0x48267DF33c15F398e0c576da2D1D1D4539e77826"
        }
        web3.eth.accounts.signTransaction(transactionObject, process.env.EtherPrivateKey, function (error, signedTx) {
            if (error) {
                console.log(error);
            } else {
                web3.eth.sendSignedTransaction(signedTx.rawTransaction)
                    .on('receipt', async (receipt) => {
                        console.log(receipt)

                    });
            }
        })
        user.balance = 0;
        await user.save()

        return res.json({
            msg: `${value} withdrawn successfully`
        })
    }
    catch (err) {
        return res.status(500).json({
            error: "Our services are unavailable at this moment, please try again later!"
        })
    }

})

export default Router;