module.exports = { FlashlabsNft : {
  "compiler": {
		"version": "0.8.13+commit.abaa5c0e"
	},
  "language": "Solidity",
  "output": {
    "abi": [
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
            "name": "previousAdmin",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "newAdmin",
            "type": "address"
          }
        ],
        "name": "AdminChanged",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "account",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "operator",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
          }
        ],
        "name": "ApprovalForAll",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "beacon",
            "type": "address"
          }
        ],
        "name": "BeaconUpgraded",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
          },
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "previousAdminRole",
            "type": "bytes32"
          },
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "newAdminRole",
            "type": "bytes32"
          }
        ],
        "name": "RoleAdminChanged",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "account",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          }
        ],
        "name": "RoleGranted",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "account",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          }
        ],
        "name": "RoleRevoked",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "minter",
            "type": "address"
          }
        ],
        "name": "TokenAdded",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "lockedFor",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "TokenLocked",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "operator",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256[]",
            "name": "ids",
            "type": "uint256[]"
          },
          {
            "indexed": false,
            "internalType": "uint256[]",
            "name": "values",
            "type": "uint256[]"
          }
        ],
        "name": "TransferBatch",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "operator",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "TransferSingle",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "string",
            "name": "value",
            "type": "string"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          }
        ],
        "name": "URI",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "implementation",
            "type": "address"
          }
        ],
        "name": "Upgraded",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "ADMIN_ROLE",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "CONTRACT_METADATA",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "DEFAULT_ADMIN_ROLE",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "TOKEN_PROPOSER_ROLE",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
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
            "internalType": "address",
            "name": "minter",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "tokenName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "tokenUri",
            "type": "string"
          }
        ],
        "name": "addToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          }
        ],
        "name": "balanceOf",
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
            "internalType": "address[]",
            "name": "accounts",
            "type": "address[]"
          },
          {
            "internalType": "uint256[]",
            "name": "ids",
            "type": "uint256[]"
          }
        ],
        "name": "balanceOfBatch",
        "outputs": [
          {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "burn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
          }
        ],
        "name": "getRoleAdmin",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "getRoleMember",
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
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
          }
        ],
        "name": "getRoleMemberCount",
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
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "grantRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "hasRole",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          }
        ],
        "name": "initializer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "operator",
            "type": "address"
          }
        ],
        "name": "isApprovedForAll",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "operator",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "isLockedFor",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "operator",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "lockFor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
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
        "name": "locked",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "lockedFor",
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
            "name": "account",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          }
        ],
        "name": "mintToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "pure",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "renounceRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
          },
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "revokeRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256[]",
            "name": "ids",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256[]",
            "name": "amounts",
            "type": "uint256[]"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          }
        ],
        "name": "safeBatchTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "operator",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
          }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "newUri",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          }
        ],
        "name": "setUri",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes4",
            "name": "interfaceId",
            "type": "bytes4"
          }
        ],
        "name": "supportsInterface",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
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
        "name": "tokenIds",
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
        "name": "tokens",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "supply",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "created",
            "type": "bool"
          },
          {
            "internalType": "string",
            "name": "uri",
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
            "name": "account",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          }
        ],
        "name": "unlockedBalanceOf",
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
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "tokenName",
            "type": "string"
          }
        ],
        "name": "updateTokenName",
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
          }
        ],
        "name": "uri",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    "bytecode": "60806040526005805460ff191690553480156200001b57600080fd5b5060408051602081019091526000815262000036816200004a565b506005805460ff1916600117905562000146565b80516200005f90600290602084019062000063565b5050565b828054620000719062000109565b90600052602060002090601f016020900481019282620000955760008555620000e0565b82601f10620000b057805160ff1916838001178555620000e0565b82800160010185558215620000e0579182015b82811115620000e0578251825591602001919060010190620000c3565b50620000ee929150620000f2565b5090565b5b80821115620000ee5760008155600101620000f3565b600181811c908216806200011e57607f821691505b602082108114156200014057634e487b7160e01b600052602260045260246000fd5b50919050565b61316c80620001566000396000f3fe608060405234801561001057600080fd5b50600436106101ef5760003560e01c80636fdfa57d1161010f578063a217fddf116100a2578063d58778d611610071578063d58778d6146104e3578063e985e9c5146104f6578063f242432a14610532578063f5298aca1461054557600080fd5b8063a217fddf146104a2578063a22cb465146104aa578063ca15c873146104bd578063d547741f146104d057600080fd5b806383e25f8a116100de57806383e25f8a1461043e5780639010d07c1461045157806391d148541461047c578063983d6b4f1461048f57600080fd5b80636fdfa57d146103da57806375b238fc146103ef5780637a5c5f05146104045780637fac0ee71461042b57600080fd5b806332748fd0116101875780634e1273f4116101565780634e1273f4146103705780634f64b2be146103905780635e315f8b146103b457806367ca2298146103c757600080fd5b806332748fd01461032457806336568abe146103375780633ed1c4df1461034a578063468b3b331461035d57600080fd5b8063248a9ca3116101c3578063248a9ca31461028157806324ef458a146102a45780632eb2c2d6146102fc5780632f2ff15d1461031157600080fd5b8062fdd58e146101f457806301ffc9a71461021a57806306fdde031461023d5780630e89341c1461026e575b600080fd5b6102076102023660046127b1565b610558565b6040519081526020015b60405180910390f35b61022d6102283660046129a6565b6105f2565b6040519015158152602001610211565b60408051808201909152600c81526b119b185cda1b18589cd3919560a21b60208201525b6040516102119190612d1a565b61026161027c366004612946565b61064d565b61020761028f366004612946565b60009081526003602052604090206001015490565b6102df6102b236600461295f565b6008602090815260009283526040808420909152908252902080546001909101546001600160a01b031682565b604080519283526001600160a01b03909116602083015201610211565b61030f61030a366004612623565b6106f2565b005b61030f61031f36600461295f565b610789565b61030f610332366004612a51565b6107b9565b61030f61034536600461295f565b6108bc565b61030f610358366004612a95565b61093a565b61020761036b3660046127b1565b610b72565b61038361037e366004612874565b610bb0565b6040516102119190612ce2565b6103a361039e366004612946565b610cd9565b604051610211959493929190612e5c565b61030f6103c2366004612812565b610e20565b61030f6103d5366004612b08565b610e8f565b6102076000805160206130f783398151915281565b61020760008051602061311783398151915281565b6102077ffdf5c82005861c3269b38e332f0cfc3a07d26ea9a2edee645a92140f2904fd6981565b61022d6104393660046126d0565b610f8b565b61030f61044c3660046127dd565b610fee565b61046461045f366004612984565b6110b2565b6040516001600160a01b039091168152602001610211565b61022d61048a36600461295f565b6110ca565b61030f61049d3660046129e0565b6110f5565b610207600081565b61030f6104b836600461277e565b611159565b6102076104cb366004612946565b611164565b61030f6104de36600461295f565b61117b565b6102076104f1366004612946565b6111a1565b61022d6105043660046125ea565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205460ff1690565b61030f610540366004612716565b6111c2565b61030f6105533660046127dd565b6112d8565b60006001600160a01b0383166105c95760405162461bcd60e51b815260206004820152602b60248201527f455243313135353a2062616c616e636520717565727920666f7220746865207a60448201526a65726f206164647265737360a81b60648201526084015b60405180910390fd5b506000818152602081815260408083206001600160a01b03861684529091529020545b92915050565b60006001600160e01b03198216636cdb3d1360e11b148061062357506001600160e01b031982166303a24d0760e21b145b8061063e57506001600160e01b03198216635a05180f60e01b145b806105ec57506105ec8261132b565b600081815260066020526040902060040180546060919061066d90612f49565b80601f016020809104026020016040519081016040528092919081815260200182805461069990612f49565b80156106e65780601f106106bb576101008083540402835291602001916106e6565b820191906000526020600020905b8154815290600101906020018083116106c957829003601f168201915b50505050509050919050565b6001600160a01b03851633148061070e575061070e8533610504565b6107755760405162461bcd60e51b815260206004820152603260248201527f455243313135353a207472616e736665722063616c6c6572206973206e6f74206044820152711bdddb995c881b9bdc88185c1c1c9bdd995960721b60648201526084016105c0565b6107828585858585611350565b5050505050565b6000828152600360205260409020600101546107aa8133611533565b611533565b6107b48383611597565b505050565b6000816040516020016107cc9190612bab565b6040516020818303038152906040528051906020012090506107fd60008051602061311783398151915261048a3390565b8061080d575061080d81336110ca565b6108595760405162461bcd60e51b815260206004820152601760248201527f796f752063616e6e6f742073657420746869732075726900000000000000000060448201526064016105c0565b6000828152600660209081526040909120845161087e9260049092019186019061244a565b50817f6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b846040516108af9190612d1a565b60405180910390a2505050565b6001600160a01b038116331461092c5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084016105c0565b61093682826115b9565b5050565b6000805160206130f78339815191526109538133611533565b60008581526006602052604090206003015460ff16156109ac5760405162461bcd60e51b8152602060048201526014602482015273546f6b656e20616c72656164792065786973747360601b60448201526064016105c0565b6000856040516020016109bf9190612bab565b6040516020818303038152906040528051906020012090506109ef816000805160206131178339815191526115db565b6109f98186611626565b6040805160a08101825287815260208082018781526000838501819052600160608501819052608085018990528b825260068452949020835181559051805193949193610a4e9392850192919091019061244a565b5060408201516002820155606082015160038201805460ff191691151591909117905560808201518051610a8c91600484019160209091019061244a565b5050600780546001810182556000919091527fa66cc928b5edb82af9bd49922954155ab7b0942694bea4ce44661d9a8736c68801879055506009546040516304e2ed4d60e51b8152306004820152602481018890526001600160a01b03878116604483015290911690639c5da9a090606401600060405180830381600087803b158015610b1857600080fd5b505af1158015610b2c573d6000803e3d6000fd5b50505050857f2eab06c71b5d61e6fb33d4dba458ca28c0bb88c10b08eae65797ca8579cdc7148587604051610b62929190612d2d565b60405180910390a2505050505050565b60008181526008602090815260408083206001600160a01b0386168452909152812054610b9f8484610558565b610ba99190612eef565b9392505050565b60608151835114610c155760405162461bcd60e51b815260206004820152602960248201527f455243313135353a206163636f756e747320616e6420696473206c656e677468604482015268040dad2e6dac2e8c6d60bb1b60648201526084016105c0565b600083516001600160401b03811115610c3057610c3061300d565b604051908082528060200260200182016040528015610c59578160200160208202803683370190505b50905060005b8451811015610cd157610ca4858281518110610c7d57610c7d612ff7565b6020026020010151858381518110610c9757610c97612ff7565b6020026020010151610558565b828281518110610cb657610cb6612ff7565b6020908102919091010152610cca81612fb0565b9050610c5f565b509392505050565b60066020526000908152604090208054600182018054919291610cfb90612f49565b80601f0160208091040260200160405190810160405280929190818152602001828054610d2790612f49565b8015610d745780601f10610d4957610100808354040283529160200191610d74565b820191906000526020600020905b815481529060010190602001808311610d5757829003601f168201915b50505050600283015460038401546004850180549495929460ff909216935090610d9d90612f49565b80601f0160208091040260200160405190810160405280929190818152602001828054610dc990612f49565b8015610e165780601f10610deb57610100808354040283529160200191610e16565b820191906000526020600020905b815481529060010190602001808311610df957829003601f168201915b5050505050905085565b82604051602001610e319190612bab565b60405160208183030381529060405280519060200120610e52816107a53390565b60008481526006602052604090206003015460ff16610e835760405162461bcd60e51b81526004016105c090612d9f565b61078285858585611630565b600082604051602001610ea29190612bab565b604051602081830303815290604052805190602001209050610ed360008051602061311783398151915261048a3390565b80610ee35750610ee381336110ca565b610f2f5760405162461bcd60e51b815260206004820152601860248201527f796f752063616e6e6f74207365742074686973206e616d65000000000000000060448201526064016105c0565b60008381526006602052604090206003015460ff16610f605760405162461bcd60e51b81526004016105c090612d9f565b60008381526006602090815260409091208351610f859260019092019185019061244a565b50505050565b60008281526008602090815260408083206001600160a01b03888116855292528220600101548116908516148015610fe5575060008381526008602090815260408083206001600160a01b03891684529091529020548211155b95945050505050565b60008281526006602052604090206003015460ff1661101f5760405162461bcd60e51b81526004016105c090612d9f565b8061102a3384610558565b101561103557600080fd5b600082815260086020908152604080832033808552908352928190206001810180546001600160a01b0319166001600160a01b03891690811790915590859055815193845291830191909152810182905282907f9b94a54ff0905d7c83f655ba8a718feacf00e2048041fb5e7ca3cdc59fd6e790906060016108af565b6000828152600460205260408120610ba99083611740565b60009182526003602090815260408084206001600160a01b0393909316845291905290205460ff1690565b60055460ff161561113e5760405162461bcd60e51b8152602060048201526013602482015272185b1c9958591e481a5b9a5d1a585b1a5e9959606a1b60448201526064016105c0565b611148828261174c565b50506005805460ff19166001179055565b6109363383836118a4565b60008181526004602052604081206105ec90611985565b6000828152600360205260409020600101546111978133611533565b6107b483836115b9565b600781815481106111b157600080fd5b600091825260209091200154905081565b60008381526006602052604090206003015460ff166111f35760405162461bcd60e51b81526004016105c090612d9f565b600061120186338686610f8b565b90506001600160a01b03861633148061121f575061121f8633610504565b806112275750805b6112855760405162461bcd60e51b815260206004820152602960248201527f455243313135353a2063616c6c6572206973206e6f74206f776e6572206e6f7260448201526808185c1c1c9bdd995960ba1b60648201526084016105c0565b611292868686868661198f565b80156112d05760008481526008602090815260408083206001600160a01b038a168452909152812080548592906112ca908490612eef565b90915550505b505050505050565b816040516020016112e99190612bab565b6040516020818303038152906040528051906020012061130a816107a53390565b816113158585610b72565b101561132057600080fd5b610f85848484611aac565b60006001600160e01b03198216635a05180f60e01b14806105ec57506105ec82611c25565b81518351146113b25760405162461bcd60e51b815260206004820152602860248201527f455243313135353a2069647320616e6420616d6f756e7473206c656e677468206044820152670dad2e6dac2e8c6d60c31b60648201526084016105c0565b6001600160a01b0384166113d85760405162461bcd60e51b81526004016105c090612dcd565b336113e7818787878787611c4a565b60005b84518110156114cd57600085828151811061140757611407612ff7565b60200260200101519050600085838151811061142557611425612ff7565b602090810291909101810151600084815280835260408082206001600160a01b038e1683529093529190912054909150818110156114755760405162461bcd60e51b81526004016105c090612e12565b6000838152602081815260408083206001600160a01b038e8116855292528083208585039055908b168252812080548492906114b2908490612eb8565b92505081905550505050806114c690612fb0565b90506113ea565b50846001600160a01b0316866001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb878760405161151d929190612cf5565b60405180910390a46112d0818787878787611d5c565b61153d82826110ca565b61093657611555816001600160a01b03166014611ec7565b611560836020611ec7565b604051602001611571929190612bca565b60408051601f198184030181529082905262461bcd60e51b82526105c091600401612d1a565b6115a18282612062565b60008281526004602052604090206107b490826120e8565b6115c382826120fd565b60008281526004602052604090206107b49082612164565b600082815260036020526040808220600101805490849055905190918391839186917fbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff9190a4505050565b6109368282611597565b6001600160a01b0384166116905760405162461bcd60e51b815260206004820152602160248201527f455243313135353a206d696e7420746f20746865207a65726f206164647265736044820152607360f81b60648201526084016105c0565b336116b0816000876116a188612179565b6116aa88612179565b87611c4a565b6000848152602081815260408083206001600160a01b0389168452909152812080548592906116e0908490612eb8565b909155505060408051858152602081018590526001600160a01b0380881692600092918516917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a4610782816000878787876121c4565b6000610ba9838361228e565b600061175a828401846125cd565b600980546001600160a01b0319166001600160a01b038316179055905061179d6000805160206130f78339815191526000805160206131178339815191526115db565b6117b5600080516020613117833981519152806115db565b6117cd6000805160206130f783398151915233611626565b6117e560008051602061311783398151915233611626565b6118657ffdf5c82005861c3269b38e332f0cfc3a07d26ea9a2edee645a92140f2904fd6960001c3360405180604001604052806011815260200170434f4e54524143545f4d4554414441544160781b8152506040518060400160405280601081526020016f7777772e666c6173686c6162732e696f60801b81525061093a565b6107b4337ffdf5c82005861c3269b38e332f0cfc3a07d26ea9a2edee645a92140f2904fd6960001c600160405180602001604052806000815250611630565b816001600160a01b0316836001600160a01b031614156119185760405162461bcd60e51b815260206004820152602960248201527f455243313135353a2073657474696e6720617070726f76616c20737461747573604482015268103337b91039b2b63360b91b60648201526084016105c0565b6001600160a01b03838116600081815260016020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b60006105ec825490565b6001600160a01b0384166119b55760405162461bcd60e51b81526004016105c090612dcd565b336119c58187876116a188612179565b6000848152602081815260408083206001600160a01b038a16845290915290205483811015611a065760405162461bcd60e51b81526004016105c090612e12565b6000858152602081815260408083206001600160a01b038b8116855292528083208785039055908816825281208054869290611a43908490612eb8565b909155505060408051868152602081018690526001600160a01b03808916928a821692918616917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a4611aa38288888888886121c4565b50505050505050565b6001600160a01b038316611b0e5760405162461bcd60e51b815260206004820152602360248201527f455243313135353a206275726e2066726f6d20746865207a65726f206164647260448201526265737360e81b60648201526084016105c0565b33611b3d81856000611b1f87612179565b611b2887612179565b60405180602001604052806000815250611c4a565b6000838152602081815260408083206001600160a01b038816845290915290205482811015611bba5760405162461bcd60e51b8152602060048201526024808201527f455243313135353a206275726e20616d6f756e7420657863656564732062616c604482015263616e636560e01b60648201526084016105c0565b6000848152602081815260408083206001600160a01b03898116808652918452828520888703905582518981529384018890529092908616917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a45050505050565b60006001600160e01b03198216637965db0b60e01b14806105ec57506105ec826122b8565b6001600160a01b038516611cd45760005b8351811015611cd257828181518110611c7657611c76612ff7565b602002602001015160066000868481518110611c9457611c94612ff7565b602002602001015181526020019081526020016000206002016000828254611cbc9190612eb8565b90915550611ccb905081612fb0565b9050611c5b565b505b6001600160a01b0384166112d05760005b8351811015611aa357828181518110611d0057611d00612ff7565b602002602001015160066000868481518110611d1e57611d1e612ff7565b602002602001015181526020019081526020016000206002016000828254611d469190612eef565b90915550611d55905081612fb0565b9050611ce5565b6001600160a01b0384163b156112d05760405163bc197c8160e01b81526001600160a01b0385169063bc197c8190611da09089908990889088908890600401612c3f565b602060405180830381600087803b158015611dba57600080fd5b505af1925050508015611dea575060408051601f3d908101601f19168201909252611de7918101906129c3565b60015b611e9757611df6613023565b806308c379a01415611e305750611e0b61303f565b80611e165750611e32565b8060405162461bcd60e51b81526004016105c09190612d1a565b505b60405162461bcd60e51b815260206004820152603460248201527f455243313135353a207472616e7366657220746f206e6f6e20455243313135356044820152732932b1b2b4bb32b91034b6b83632b6b2b73a32b960611b60648201526084016105c0565b6001600160e01b0319811663bc197c8160e01b14611aa35760405162461bcd60e51b81526004016105c090612d57565b60606000611ed6836002612ed0565b611ee1906002612eb8565b6001600160401b03811115611ef857611ef861300d565b6040519080825280601f01601f191660200182016040528015611f22576020820181803683370190505b509050600360fc1b81600081518110611f3d57611f3d612ff7565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110611f6c57611f6c612ff7565b60200101906001600160f81b031916908160001a9053506000611f90846002612ed0565b611f9b906001612eb8565b90505b6001811115612013576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110611fcf57611fcf612ff7565b1a60f81b828281518110611fe557611fe5612ff7565b60200101906001600160f81b031916908160001a90535060049490941c9361200c81612f32565b9050611f9e565b508315610ba95760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016105c0565b61206c82826110ca565b6109365760008281526003602090815260408083206001600160a01b03851684529091529020805460ff191660011790556120a43390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000610ba9836001600160a01b038416612308565b61210782826110ca565b156109365760008281526003602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6000610ba9836001600160a01b038416612357565b604080516001808252818301909252606091600091906020808301908036833701905050905082816000815181106121b3576121b3612ff7565b602090810291909101015292915050565b6001600160a01b0384163b156112d05760405163f23a6e6160e01b81526001600160a01b0385169063f23a6e61906122089089908990889088908890600401612c9d565b602060405180830381600087803b15801561222257600080fd5b505af1925050508015612252575060408051601f3d908101601f1916820190925261224f918101906129c3565b60015b61225e57611df6613023565b6001600160e01b0319811663f23a6e6160e01b14611aa35760405162461bcd60e51b81526004016105c090612d57565b60008260000182815481106122a5576122a5612ff7565b9060005260206000200154905092915050565b60006001600160e01b03198216636cdb3d1360e11b14806122e957506001600160e01b031982166303a24d0760e21b145b806105ec57506301ffc9a760e01b6001600160e01b03198316146105ec565b600081815260018301602052604081205461234f575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556105ec565b5060006105ec565b6000818152600183016020526040812054801561244057600061237b600183612eef565b855490915060009061238f90600190612eef565b90508181146123f45760008660000182815481106123af576123af612ff7565b90600052602060002001549050808760000184815481106123d2576123d2612ff7565b6000918252602080832090910192909255918252600188019052604090208390555b855486908061240557612405612fe1565b6001900381819060005260206000200160009055905585600101600086815260200190815260200160002060009055600193505050506105ec565b60009150506105ec565b82805461245690612f49565b90600052602060002090601f01602090048101928261247857600085556124be565b82601f1061249157805160ff19168380011785556124be565b828001600101855582156124be579182015b828111156124be5782518255916020019190600101906124a3565b506124ca9291506124ce565b5090565b5b808211156124ca57600081556001016124cf565b600082601f8301126124f457600080fd5b8135602061250182612e95565b60405161250e8282612f84565b8381528281019150858301600585901b8701840188101561252e57600080fd5b60005b8581101561254d57813584529284019290840190600101612531565b5090979650505050505050565b600082601f83011261256b57600080fd5b81356001600160401b038111156125845761258461300d565b60405161259b601f8301601f191660200182612f84565b8181528460208386010111156125b057600080fd5b816020850160208301376000918101602001919091529392505050565b6000602082840312156125df57600080fd5b8135610ba9816130c8565b600080604083850312156125fd57600080fd5b8235612608816130c8565b91506020830135612618816130c8565b809150509250929050565b600080600080600060a0868803121561263b57600080fd5b8535612646816130c8565b94506020860135612656816130c8565b935060408601356001600160401b038082111561267257600080fd5b61267e89838a016124e3565b9450606088013591508082111561269457600080fd5b6126a089838a016124e3565b935060808801359150808211156126b657600080fd5b506126c38882890161255a565b9150509295509295909350565b600080600080608085870312156126e657600080fd5b84356126f1816130c8565b93506020850135612701816130c8565b93969395505050506040820135916060013590565b600080600080600060a0868803121561272e57600080fd5b8535612739816130c8565b94506020860135612749816130c8565b9350604086013592506060860135915060808601356001600160401b0381111561277257600080fd5b6126c38882890161255a565b6000806040838503121561279157600080fd5b823561279c816130c8565b91506020830135801515811461261857600080fd5b600080604083850312156127c457600080fd5b82356127cf816130c8565b946020939093013593505050565b6000806000606084860312156127f257600080fd5b83356127fd816130c8565b95602085013595506040909401359392505050565b6000806000806080858703121561282857600080fd5b8435612833816130c8565b9350602085013592506040850135915060608501356001600160401b0381111561285c57600080fd5b6128688782880161255a565b91505092959194509250565b6000806040838503121561288757600080fd5b82356001600160401b038082111561289e57600080fd5b818501915085601f8301126128b257600080fd5b813560206128bf82612e95565b6040516128cc8282612f84565b8381528281019150858301600585901b870184018b10156128ec57600080fd5b600096505b84871015612918578035612904816130c8565b8352600196909601959183019183016128f1565b509650508601359250508082111561292f57600080fd5b5061293c858286016124e3565b9150509250929050565b60006020828403121561295857600080fd5b5035919050565b6000806040838503121561297257600080fd5b823591506020830135612618816130c8565b6000806040838503121561299757600080fd5b50508035926020909101359150565b6000602082840312156129b857600080fd5b8135610ba9816130e0565b6000602082840312156129d557600080fd5b8151610ba9816130e0565b600080602083850312156129f357600080fd5b82356001600160401b0380821115612a0a57600080fd5b818501915085601f830112612a1e57600080fd5b813581811115612a2d57600080fd5b866020828501011115612a3f57600080fd5b60209290920196919550909350505050565b60008060408385031215612a6457600080fd5b82356001600160401b03811115612a7a57600080fd5b612a868582860161255a565b95602094909401359450505050565b60008060008060808587031215612aab57600080fd5b843593506020850135612abd816130c8565b925060408501356001600160401b0380821115612ad957600080fd5b612ae58883890161255a565b93506060870135915080821115612afb57600080fd5b506128688782880161255a565b60008060408385031215612b1b57600080fd5b8235915060208301356001600160401b03811115612b3857600080fd5b61293c8582860161255a565b600081518084526020808501945080840160005b83811015612b7457815187529582019590820190600101612b58565b509495945050505050565b60008151808452612b97816020860160208601612f06565b601f01601f19169290920160200192915050565b6a4d494e5445525f524f4c4560a81b8152600b810191909152602b0190565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351612c02816017850160208801612f06565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351612c33816028840160208801612f06565b01602801949350505050565b6001600160a01b0386811682528516602082015260a060408201819052600090612c6b90830186612b44565b8281036060840152612c7d8186612b44565b90508281036080840152612c918185612b7f565b98975050505050505050565b6001600160a01b03868116825285166020820152604081018490526060810183905260a060808201819052600090612cd790830184612b7f565b979650505050505050565b602081526000610ba96020830184612b44565b604081526000612d086040830185612b44565b8281036020840152610fe58185612b44565b602081526000610ba96020830184612b7f565b604081526000612d406040830185612b7f565b905060018060a01b03831660208301529392505050565b60208082526028908201527f455243313135353a204552433131353552656365697665722072656a656374656040820152676420746f6b656e7360c01b606082015260800190565b602080825260149082015273151bdad95b88191bd95cc81b9bdd08195e1a5cdd60621b604082015260600190565b60208082526025908201527f455243313135353a207472616e7366657220746f20746865207a65726f206164604082015264647265737360d81b606082015260800190565b6020808252602a908201527f455243313135353a20696e73756666696369656e742062616c616e636520666f60408201526939103a3930b739b332b960b11b606082015260800190565b85815260a060208201526000612e7560a0830187612b7f565b85604084015284151560608401528281036080840152612c918185612b7f565b60006001600160401b03821115612eae57612eae61300d565b5060051b60200190565b60008219821115612ecb57612ecb612fcb565b500190565b6000816000190483118215151615612eea57612eea612fcb565b500290565b600082821015612f0157612f01612fcb565b500390565b60005b83811015612f21578181015183820152602001612f09565b83811115610f855750506000910152565b600081612f4157612f41612fcb565b506000190190565b600181811c90821680612f5d57607f821691505b60208210811415612f7e57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8201601f191681016001600160401b0381118282101715612fa957612fa961300d565b6040525050565b6000600019821415612fc457612fc4612fcb565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b600060033d111561303c5760046000803e5060005160e01c5b90565b600060443d101561304d5790565b6040516003193d81016004833e81513d6001600160401b03816024840111818411171561307c57505050505090565b82850191508151818111156130945750505050505090565b843d87010160208285010111156130ae5750505050505090565b6130bd60208286010187612f84565b509095945050505050565b6001600160a01b03811681146130dd57600080fd5b50565b6001600160e01b0319811681146130dd57600080fdfed184d270d36126b65b5add5e9d8915a1a5a0cf64da097a26d8905146386b5c41a49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775a2646970667358221220f87b5dd3b8bc3c8e7b8f2692308d47003184d0af5c849c28a3356134e5b3b6ab64736f6c63430008070033",
  }
}
}


