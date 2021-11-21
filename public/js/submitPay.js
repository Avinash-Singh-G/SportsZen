var contract;

$(document).ready(async function() {
    web3 = new Web3(web3.currentProvider);
    
    var address = "0xddDf78546d4964Fdb04ABdcDbA8cfc5EeC25aAEb";

    var abi = [
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
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "Sent",
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
            "name": "balances",
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
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "data",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getData",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "mint",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "minter",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "secretIds",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "secret",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "sendData",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "verification",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "verifyData",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
    
    ;
    var accounts = await web3.eth.requestAccounts()
    var userAcc = accounts[0];
    var recAcc = "0xA62EDE996E17FA4315dc7D6E8cd2ef010524340d";
    contract = new web3.eth.Contract(abi,address);

    
    var balances = await contract.methods.balances(userAcc).call();
    $('.balance').text(balances);

    
    $(".submitPay").click(async function(event) {
        $('.submitPayTitle').text('Kindly wait while we confirm the transaction')
        event.preventDefault();
        contract = new web3.eth.Contract(abi,address);
        var msg = $('.informationProvided').val();
        var send = await contract.methods.sendData(recAcc,msg,50).send({from : userAcc}).then( function () {
            contract.methods.balances(userAcc).call().then( function(bal) {
                $('.balance').text(balances);
            });
        })
        var data = await contract.methods.getData().call().then( async function(data) {
            var xd = await $('.balance').text(balances);
            console.log(data);
            return data;
        })
        var str = 'http://localhost:3000/product/purchase/successUser/:' + data[0] +'/:' + data[1]; 
        window.location.href = str;
    })
