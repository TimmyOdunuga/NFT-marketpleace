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
            "indexed": false,
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
    "bytecode": "60806040526000600560006101000a81548160ff0219169083151502179055503480156200002c57600080fd5b50604051806020016040528060008152506200004e816200007060201b60201c565b506001600560006101000a81548160ff021916908315150217905550620001a1565b8060029080519060200190620000889291906200008c565b5050565b8280546200009a906200013c565b90600052602060002090601f016020900481019282620000be57600085556200010a565b82601f10620000d957805160ff19168380011785556200010a565b828001600101855582156200010a579182015b8281111562000109578251825591602001919060010190620000ec565b5b5090506200011991906200011d565b5090565b5b80821115620001385760008160009055506001016200011e565b5090565b600060028204905060018216806200015557607f821691505b602082108114156200016c576200016b62000172565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b61593480620001b16000396000f3fe608060405234801561001057600080fd5b50600436106101ef5760003560e01c80636fdfa57d1161010f578063a217fddf116100a2578063d58778d611610071578063d58778d614610603578063e985e9c514610633578063f242432a14610663578063f5298aca1461067f576101ef565b8063a217fddf1461057d578063a22cb4651461059b578063ca15c873146105b7578063d547741f146105e7576101ef565b806383e25f8a116100de57806383e25f8a146104e55780639010d07c1461050157806391d1485414610531578063983d6b4f14610561576101ef565b80636fdfa57d1461045b57806375b238fc146104795780637a5c5f05146104975780637fac0ee7146104b5576101ef565b806332748fd0116101875780634e1273f4116101565780634e1273f4146103bf5780634f64b2be146103ef5780635e315f8b1461042357806367ca22981461043f576101ef565b806332748fd01461033b57806336568abe146103575780633ed1c4df14610373578063468b3b331461038f576101ef565b8063248a9ca3116101c3578063248a9ca3146102a257806324ef458a146102d25780632eb2c2d6146103035780632f2ff15d1461031f576101ef565b8062fdd58e146101f457806301ffc9a71461022457806306fdde03146102545780630e89341c14610272575b600080fd5b61020e60048036038101906102099190613dea565b61069b565b60405161021b9190614bd5565b60405180910390f35b61023e60048036038101906102399190614025565b610764565b60405161024b91906148fd565b60405180910390f35b61025c6108ae565b6040516102699190614933565b60405180910390f35b61028c60048036038101906102879190614128565b6108eb565b6040516102999190614933565b60405180910390f35b6102bc60048036038101906102b79190613f78565b610993565b6040516102c99190614918565b60405180910390f35b6102ec60048036038101906102e79190614155565b6109b3565b6040516102fa929190614bf0565b60405180910390f35b61031d60048036038101906103189190613bdd565b610a04565b005b61033960048036038101906103349190613fa5565b610aa5565b005b610355600480360381019061035091906140cc565b610ace565b005b610371600480360381019061036c9190613fa5565b610be9565b005b61038d60048036038101906103889190614195565b610c6c565b005b6103a960048036038101906103a49190613dea565b610f0d565b6040516103b69190614bd5565b60405180910390f35b6103d960048036038101906103d49190613f00565b610f7f565b6040516103e691906148a4565b60405180910390f35b61040960048036038101906104049190614128565b611098565b60405161041a959493929190614c57565b60405180910390f35b61043d60048036038101906104389190613e7d565b6111eb565b005b61045960048036038101906104549190614234565b611299565b005b6104636113df565b6040516104709190614918565b60405180910390f35b610481611403565b60405161048e9190614918565b60405180910390f35b61049f611427565b6040516104ac9190614918565b60405180910390f35b6104cf60048036038101906104ca9190613cac565b61144b565b6040516104dc91906148fd565b60405180910390f35b6104ff60048036038101906104fa9190613e2a565b611558565b005b61051b60048036038101906105169190613fe5565b6116d5565b6040516105289190614790565b60405180910390f35b61054b60048036038101906105469190613fa5565b611704565b60405161055891906148fd565b60405180910390f35b61057b6004803603810190610576919061407f565b61176f565b005b6105856117e8565b6040516105929190614918565b60405180910390f35b6105b560048036038101906105b09190613daa565b6117ef565b005b6105d160048036038101906105cc9190613f78565b611805565b6040516105de9190614bd5565b60405180910390f35b61060160048036038101906105fc9190613fa5565b611829565b005b61061d60048036038101906106189190614128565b611852565b60405161062a9190614bd5565b60405180910390f35b61064d60048036038101906106489190613b9d565b611876565b60405161065a91906148fd565b60405180910390f35b61067d60048036038101906106789190613d13565b61190a565b005b61069960048036038101906106949190613e2a565b611a9f565b005b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561070c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610703906149b5565b60405180910390fd5b60008083815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60007fd9b67a26000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061082f57507f0e89341c000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b8061089757507f5a05180f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806108a757506108a682611afe565b5b9050919050565b60606040518060400160405280600c81526020017f466c6173686c6162734e46540000000000000000000000000000000000000000815250905090565b606060066000838152602001908152602001600020600401805461090e9061501c565b80601f016020809104026020016040519081016040528092919081815260200182805461093a9061501c565b80156109875780601f1061095c57610100808354040283529160200191610987565b820191906000526020600020905b81548152906001019060200180831161096a57829003601f168201915b50505050509050919050565b600060036000838152602001908152602001600020600101549050919050565b6008602052816000526040600020602052806000526040600020600091509150508060000154908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905082565b610a0c611b78565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff161480610a525750610a5185610a4c611b78565b611876565b5b610a91576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a8890614ab5565b60405180910390fd5b610a9e8585858585611b80565b5050505050565b610aae82610993565b610abf81610aba611b78565b611e94565b610ac98383611f31565b505050565b600081604051602001610ae19190614730565b604051602081830303815290604052805190602001209050610b2a7fa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775610b25611b78565b611704565b80610b425750610b4181610b3c611b78565b611704565b5b610b81576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b7890614b15565b60405180910390fd5b82600660008481526020019081526020016000206004019080519060200190610bab9291906137c8565b50817f6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b84604051610bdc9190614933565b60405180910390a2505050565b610bf1611b78565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610c5e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c5590614bb5565b60405180910390fd5b610c688282611f65565b5050565b7fd184d270d36126b65b5add5e9d8915a1a5a0cf64da097a26d8905146386b5c41610c9e81610c99611b78565b611e94565b6006600086815260200190815260200160002060030160009054906101000a900460ff1615610d02576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cf990614a15565b60405180910390fd5b600085604051602001610d159190614730565b604051602081830303815290604052805190602001209050610d57817fa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775611f99565b610d618186611ff5565b6040518060a00160405280878152602001858152602001600081526020016001151581526020018481525060066000888152602001908152602001600020600082015181600001556020820151816001019080519060200190610dc59291906137c8565b506040820151816002015560608201518160030160006101000a81548160ff0219169083151502179055506080820151816004019080519060200190610e0c9291906137c8565b509050506007869080600181540180825580915050600190039060005260206000200160009091909190915055600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16639c5da9a03088886040518463ffffffff1660e01b8152600401610e989392919061486d565b600060405180830381600087803b158015610eb257600080fd5b505af1158015610ec6573d6000803e3d6000fd5b505050507f2eab06c71b5d61e6fb33d4dba458ca28c0bb88c10b08eae65797ca8579cdc714868587604051610efd93929190614c19565b60405180910390a1505050505050565b60006008600083815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154610f6d848461069b565b610f779190614eec565b905092915050565b60608151835114610fc5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fbc90614b55565b60405180910390fd5b6000835167ffffffffffffffff811115610fe257610fe161518e565b5b6040519080825280602002602001820160405280156110105781602001602082028036833780820191505090505b50905060005b845181101561108d5761105d8582815181106110355761103461515f565b5b60200260200101518583815181106110505761104f61515f565b5b602002602001015161069b565b8282815181106110705761106f61515f565b5b602002602001018181525050806110869061507f565b9050611016565b508091505092915050565b60066020528060005260406000206000915090508060000154908060010180546110c19061501c565b80601f01602080910402602001604051908101604052809291908181526020018280546110ed9061501c565b801561113a5780601f1061110f5761010080835404028352916020019161113a565b820191906000526020600020905b81548152906001019060200180831161111d57829003601f168201915b5050505050908060020154908060030160009054906101000a900460ff16908060040180546111689061501c565b80601f01602080910402602001604051908101604052809291908181526020018280546111949061501c565b80156111e15780601f106111b6576101008083540402835291602001916111e1565b820191906000526020600020905b8154815290600101906020018083116111c457829003601f168201915b5050505050905085565b826040516020016111fc9190614730565b604051602081830303815290604052805190602001206112238161121e611b78565b611e94565b6006600085815260200190815260200160002060030160009054906101000a900460ff16611286576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161127d90614a55565b60405180910390fd5b61129285858585612003565b5050505050565b6000826040516020016112ac9190614730565b6040516020818303038152906040528051906020012090506112f57fa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c217756112f0611b78565b611704565b8061130d575061130c81611307611b78565b611704565b5b61134c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611343906149f5565b60405180910390fd5b6006600084815260200190815260200160002060030160009054906101000a900460ff166113af576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113a690614a55565b60405180910390fd5b816006600085815260200190815260200160002060010190805190602001906113d99291906137c8565b50505050565b7fd184d270d36126b65b5add5e9d8915a1a5a0cf64da097a26d8905146386b5c4181565b7fa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c2177581565b7ffdf5c82005861c3269b38e332f0cfc3a07d26ea9a2edee645a92140f2904fd6981565b60008373ffffffffffffffffffffffffffffffffffffffff166008600085815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614801561154e5750816008600085815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015410155b9050949350505050565b6006600083815260200190815260200160002060030160009054906101000a900460ff166115bb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115b290614a55565b60405180910390fd5b806115cd6115c7611b78565b8461069b565b10156115d857600080fd5b826008600084815260200190815260200160002060006115f6611b78565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060086000848152602001908152602001600020600061168f611b78565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000181905550505050565b60006116fc826004600086815260200190815260200160002061219990919063ffffffff16565b905092915050565b60006003600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b600560009054906101000a900460ff16156117bf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117b690614a75565b60405180910390fd5b6117c982826121b3565b6001600560006101000a81548160ff0219169083151502179055505050565b6000801b81565b6118016117fa611b78565b83836123ac565b5050565b600061182260046000848152602001908152602001600020612519565b9050919050565b61183282610993565b6118438161183e611b78565b611e94565b61184d8383611f65565b505050565b6007818154811061186257600080fd5b906000526020600020016000915090505481565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b6006600084815260200190815260200160002060030160009054906101000a900460ff1661196d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161196490614a55565b60405180910390fd5b60006119828661197b611b78565b868661144b565b905061198c611b78565b73ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff1614806119d257506119d1866119cc611b78565b611876565b5b806119da5750805b611a19576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a1090614a35565b60405180910390fd5b611a26868686868661252e565b8015611a9757826008600086815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000016000828254611a8f9190614eec565b925050819055505b505050505050565b81604051602001611ab09190614730565b60405160208183030381529060405280519060200120611ad781611ad2611b78565b611e94565b81611ae28585610f0d565b1015611aed57600080fd5b611af88484846127b0565b50505050565b60007f5a05180f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480611b715750611b70826129cd565b5b9050919050565b600033905090565b8151835114611bc4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611bbb90614b75565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415611c34576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c2b90614a95565b60405180910390fd5b6000611c3e611b78565b9050611c4e818787878787612a47565b60005b8451811015611dff576000858281518110611c6f57611c6e61515f565b5b602002602001015190506000858381518110611c8e57611c8d61515f565b5b60200260200101519050600080600084815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015611d2f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d2690614af5565b60405180910390fd5b81810360008085815260200190815260200160002060008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508160008085815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611de49190614e3c565b9250508190555050505080611df89061507f565b9050611c51565b508473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051611e769291906148c6565b60405180910390a4611e8c818787878787612bc7565b505050505050565b611e9e8282611704565b611f2d57611ec38173ffffffffffffffffffffffffffffffffffffffff166014612dae565b611ed18360001c6020612dae565b604051602001611ee2929190614756565b6040516020818303038152906040526040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611f249190614933565b60405180910390fd5b5050565b611f3b8282612fea565b611f6081600460008581526020019081526020016000206130cb90919063ffffffff16565b505050565b611f6f82826130fb565b611f9481600460008581526020019081526020016000206131dd90919063ffffffff16565b505050565b6000611fa483610993565b90508160036000858152602001908152602001600020600101819055508181847fbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff60405160405180910390a4505050565b611fff8282611f31565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415612073576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161206a90614b95565b60405180910390fd5b600061207d611b78565b905061209e8160008761208f8861320d565b6120988861320d565b87612a47565b8260008086815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546120fd9190614e3c565b925050819055508473ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62878760405161217b929190614cb8565b60405180910390a461219281600087878787613287565b5050505050565b60006121a8836000018361346e565b60001c905092915050565b600082828101906121c49190613b70565b905080600960006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506122517fd184d270d36126b65b5add5e9d8915a1a5a0cf64da097a26d8905146386b5c417fa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775611f99565b61227b7fa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c2177580611f99565b6122a57fd184d270d36126b65b5add5e9d8915a1a5a0cf64da097a26d8905146386b5c4133611ff5565b6122cf7fa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c2177533611ff5565b6123687ffdf5c82005861c3269b38e332f0cfc3a07d26ea9a2edee645a92140f2904fd6960001c336040518060400160405280601181526020017f434f4e54524143545f4d455441444154410000000000000000000000000000008152506040518060400160405280601081526020017f7777772e666c6173686c6162732e696f00000000000000000000000000000000815250610c6c565b6123a7337ffdf5c82005861c3269b38e332f0cfc3a07d26ea9a2edee645a92140f2904fd6960001c600160405180602001604052806000815250612003565b505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561241b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161241290614b35565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c318360405161250c91906148fd565b60405180910390a3505050565b600061252782600001613499565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141561259e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161259590614a95565b60405180910390fd5b60006125a8611b78565b90506125c88187876125b98861320d565b6125c28861320d565b87612a47565b600080600086815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508381101561265f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161265690614af5565b60405180910390fd5b83810360008087815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508360008087815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546127149190614e3c565b925050819055508573ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628888604051612791929190614cb8565b60405180910390a46127a7828888888888613287565b50505050505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415612820576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161281790614ad5565b60405180910390fd5b600061282a611b78565b905061285a8185600061283c8761320d565b6128458761320d565b60405180602001604052806000815250612a47565b600080600085815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050828110156128f1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016128e8906149d5565b60405180910390fd5b82810360008086815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6287876040516129be929190614cb8565b60405180910390a45050505050565b60007f7965db0b000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480612a405750612a3f826134aa565b5b9050919050565b612a5586868686868661358c565b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff161415612b0a5760005b8351811015612b0857828181518110612aa957612aa861515f565b5b602002602001015160066000868481518110612ac857612ac761515f565b5b602002602001015181526020019081526020016000206002016000828254612af09190614e3c565b9250508190555080612b019061507f565b9050612a8d565b505b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415612bbf5760005b8351811015612bbd57828181518110612b5e57612b5d61515f565b5b602002602001015160066000868481518110612b7d57612b7c61515f565b5b602002602001015181526020019081526020016000206002016000828254612ba59190614eec565b9250508190555080612bb69061507f565b9050612b42565b505b505050505050565b612be68473ffffffffffffffffffffffffffffffffffffffff16613594565b15612da6578373ffffffffffffffffffffffffffffffffffffffff1663bc197c8187878686866040518663ffffffff1660e01b8152600401612c2c9594939291906147ab565b602060405180830381600087803b158015612c4657600080fd5b505af1925050508015612c7757506040513d601f19601f82011682018060405250810190612c749190614052565b60015b612d1d57612c836151bd565b806308c379a01415612ce05750612c986157de565b80612ca35750612ce2565b806040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612cd79190614933565b60405180910390fd5b505b6040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612d1490614955565b60405180910390fd5b63bc197c8160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614612da4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612d9b90614995565b60405180910390fd5b505b505050505050565b606060006002836002612dc19190614e92565b612dcb9190614e3c565b67ffffffffffffffff811115612de457612de361518e565b5b6040519080825280601f01601f191660200182016040528015612e165781602001600182028036833780820191505090505b5090507f300000000000000000000000000000000000000000000000000000000000000081600081518110612e4e57612e4d61515f565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f780000000000000000000000000000000000000000000000000000000000000081600181518110612eb257612eb161515f565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a90535060006001846002612ef29190614e92565b612efc9190614e3c565b90505b6001811115612f9c577f3031323334353637383961626364656600000000000000000000000000000000600f861660108110612f3e57612f3d61515f565b5b1a60f81b828281518110612f5557612f5461515f565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600485901c945080612f9590614ff2565b9050612eff565b5060008414612fe0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612fd790614975565b60405180910390fd5b8091505092915050565b612ff48282611704565b6130c75760016003600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555061306c611b78565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b60006130f3836000018373ffffffffffffffffffffffffffffffffffffffff1660001b6135b7565b905092915050565b6131058282611704565b156131d95760006003600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555061317e611b78565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45b5050565b6000613205836000018373ffffffffffffffffffffffffffffffffffffffff1660001b613627565b905092915050565b60606000600167ffffffffffffffff81111561322c5761322b61518e565b5b60405190808252806020026020018201604052801561325a5781602001602082028036833780820191505090505b50905082816000815181106132725761327161515f565b5b60200260200101818152505080915050919050565b6132a68473ffffffffffffffffffffffffffffffffffffffff16613594565b15613466578373ffffffffffffffffffffffffffffffffffffffff1663f23a6e6187878686866040518663ffffffff1660e01b81526004016132ec959493929190614813565b602060405180830381600087803b15801561330657600080fd5b505af192505050801561333757506040513d601f19601f820116820180604052508101906133349190614052565b60015b6133dd576133436151bd565b806308c379a014156133a057506133586157de565b8061336357506133a2565b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016133979190614933565b60405180910390fd5b505b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016133d490614955565b60405180910390fd5b63f23a6e6160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614613464576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161345b90614995565b60405180910390fd5b505b505050505050565b60008260000182815481106134865761348561515f565b5b9060005260206000200154905092915050565b600081600001805490509050919050565b60007fd9b67a26000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061357557507f0e89341c000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b8061358557506135848261373b565b5b9050919050565b505050505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b60006135c383836137a5565b61361c578260000182908060018154018082558091505060019003906000526020600020016000909190919091505582600001805490508360010160008481526020019081526020016000208190555060019050613621565b600090505b92915050565b6000808360010160008481526020019081526020016000205490506000811461372f5760006001826136599190614eec565b90506000600186600001805490506136719190614eec565b90508181146136e05760008660000182815481106136925761369161515f565b5b90600052602060002001549050808760000184815481106136b6576136b561515f565b5b90600052602060002001819055508387600101600083815260200190815260200160002081905550505b856000018054806136f4576136f3615130565b5b600190038181906000526020600020016000905590558560010160008681526020019081526020016000206000905560019350505050613735565b60009150505b92915050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600080836001016000848152602001908152602001600020541415905092915050565b8280546137d49061501c565b90600052602060002090601f0160209004810192826137f6576000855561383d565b82601f1061380f57805160ff191683800117855561383d565b8280016001018555821561383d579182015b8281111561383c578251825591602001919060010190613821565b5b50905061384a919061384e565b5090565b5b8082111561386757600081600090555060010161384f565b5090565b600061387e61387984614d06565b614ce1565b905080838252602082019050828560208602820111156138a1576138a06151e9565b5b60005b858110156138d157816138b788826139cf565b8452602084019350602083019250506001810190506138a4565b5050509392505050565b60006138ee6138e984614d32565b614ce1565b90508083825260208201905082856020860282011115613911576139106151e9565b5b60005b8581101561394157816139278882613b5b565b845260208401935060208301925050600181019050613914565b5050509392505050565b600061395e61395984614d5e565b614ce1565b90508281526020810184848401111561397a576139796151ee565b5b613985848285614fb0565b509392505050565b60006139a061399b84614d8f565b614ce1565b9050828152602081018484840111156139bc576139bb6151ee565b5b6139c7848285614fb0565b509392505050565b6000813590506139de81615874565b92915050565b6000813590506139f38161588b565b92915050565b600082601f830112613a0e57613a0d6151e4565b5b8135613a1e84826020860161386b565b91505092915050565b600082601f830112613a3c57613a3b6151e4565b5b8135613a4c8482602086016138db565b91505092915050565b600081359050613a64816158a2565b92915050565b600081359050613a79816158b9565b92915050565b600081359050613a8e816158d0565b92915050565b600081519050613aa3816158d0565b92915050565b60008083601f840112613abf57613abe6151e4565b5b8235905067ffffffffffffffff811115613adc57613adb6151df565b5b602083019150836001820283011115613af857613af76151e9565b5b9250929050565b600082601f830112613b1457613b136151e4565b5b8135613b2484826020860161394b565b91505092915050565b600082601f830112613b4257613b416151e4565b5b8135613b5284826020860161398d565b91505092915050565b600081359050613b6a816158e7565b92915050565b600060208284031215613b8657613b856151f8565b5b6000613b94848285016139e4565b91505092915050565b60008060408385031215613bb457613bb36151f8565b5b6000613bc2858286016139cf565b9250506020613bd3858286016139cf565b9150509250929050565b600080600080600060a08688031215613bf957613bf86151f8565b5b6000613c07888289016139cf565b9550506020613c18888289016139cf565b945050604086013567ffffffffffffffff811115613c3957613c386151f3565b5b613c4588828901613a27565b935050606086013567ffffffffffffffff811115613c6657613c656151f3565b5b613c7288828901613a27565b925050608086013567ffffffffffffffff811115613c9357613c926151f3565b5b613c9f88828901613aff565b9150509295509295909350565b60008060008060808587031215613cc657613cc56151f8565b5b6000613cd4878288016139cf565b9450506020613ce5878288016139cf565b9350506040613cf687828801613b5b565b9250506060613d0787828801613b5b565b91505092959194509250565b600080600080600060a08688031215613d2f57613d2e6151f8565b5b6000613d3d888289016139cf565b9550506020613d4e888289016139cf565b9450506040613d5f88828901613b5b565b9350506060613d7088828901613b5b565b925050608086013567ffffffffffffffff811115613d9157613d906151f3565b5b613d9d88828901613aff565b9150509295509295909350565b60008060408385031215613dc157613dc06151f8565b5b6000613dcf858286016139cf565b9250506020613de085828601613a55565b9150509250929050565b60008060408385031215613e0157613e006151f8565b5b6000613e0f858286016139cf565b9250506020613e2085828601613b5b565b9150509250929050565b600080600060608486031215613e4357613e426151f8565b5b6000613e51868287016139cf565b9350506020613e6286828701613b5b565b9250506040613e7386828701613b5b565b9150509250925092565b60008060008060808587031215613e9757613e966151f8565b5b6000613ea5878288016139cf565b9450506020613eb687828801613b5b565b9350506040613ec787828801613b5b565b925050606085013567ffffffffffffffff811115613ee857613ee76151f3565b5b613ef487828801613aff565b91505092959194509250565b60008060408385031215613f1757613f166151f8565b5b600083013567ffffffffffffffff811115613f3557613f346151f3565b5b613f41858286016139f9565b925050602083013567ffffffffffffffff811115613f6257613f616151f3565b5b613f6e85828601613a27565b9150509250929050565b600060208284031215613f8e57613f8d6151f8565b5b6000613f9c84828501613a6a565b91505092915050565b60008060408385031215613fbc57613fbb6151f8565b5b6000613fca85828601613a6a565b9250506020613fdb858286016139cf565b9150509250929050565b60008060408385031215613ffc57613ffb6151f8565b5b600061400a85828601613a6a565b925050602061401b85828601613b5b565b9150509250929050565b60006020828403121561403b5761403a6151f8565b5b600061404984828501613a7f565b91505092915050565b600060208284031215614068576140676151f8565b5b600061407684828501613a94565b91505092915050565b60008060208385031215614096576140956151f8565b5b600083013567ffffffffffffffff8111156140b4576140b36151f3565b5b6140c085828601613aa9565b92509250509250929050565b600080604083850312156140e3576140e26151f8565b5b600083013567ffffffffffffffff811115614101576141006151f3565b5b61410d85828601613b2d565b925050602061411e85828601613b5b565b9150509250929050565b60006020828403121561413e5761413d6151f8565b5b600061414c84828501613b5b565b91505092915050565b6000806040838503121561416c5761416b6151f8565b5b600061417a85828601613b5b565b925050602061418b858286016139cf565b9150509250929050565b600080600080608085870312156141af576141ae6151f8565b5b60006141bd87828801613b5b565b94505060206141ce878288016139cf565b935050604085013567ffffffffffffffff8111156141ef576141ee6151f3565b5b6141fb87828801613b2d565b925050606085013567ffffffffffffffff81111561421c5761421b6151f3565b5b61422887828801613b2d565b91505092959194509250565b6000806040838503121561424b5761424a6151f8565b5b600061425985828601613b5b565b925050602083013567ffffffffffffffff81111561427a576142796151f3565b5b61428685828601613b2d565b9150509250929050565b600061429c83836146fb565b60208301905092915050565b6142b181614f20565b82525050565b60006142c282614dd0565b6142cc8185614dfe565b93506142d783614dc0565b8060005b838110156143085781516142ef8882614290565b97506142fa83614df1565b9250506001810190506142db565b5085935050505092915050565b61431e81614f44565b82525050565b61432d81614f50565b82525050565b600061433e82614ddb565b6143488185614e0f565b9350614358818560208601614fbf565b614361816151fd565b840191505092915050565b600061437782614de6565b6143818185614e20565b9350614391818560208601614fbf565b61439a816151fd565b840191505092915050565b60006143b082614de6565b6143ba8185614e31565b93506143ca818560208601614fbf565b80840191505092915050565b60006143e3603483614e20565b91506143ee8261521b565b604082019050919050565b6000614406602083614e20565b91506144118261526a565b602082019050919050565b6000614429602883614e20565b915061443482615293565b604082019050919050565b600061444c602b83614e20565b9150614457826152e2565b604082019050919050565b600061446f602483614e20565b915061447a82615331565b604082019050919050565b6000614492601883614e20565b915061449d82615380565b602082019050919050565b60006144b5601483614e20565b91506144c0826153a9565b602082019050919050565b60006144d8602983614e20565b91506144e3826153d2565b604082019050919050565b60006144fb601483614e20565b915061450682615421565b602082019050919050565b600061451e601383614e20565b91506145298261544a565b602082019050919050565b6000614541602583614e20565b915061454c82615473565b604082019050919050565b6000614564603283614e20565b915061456f826154c2565b604082019050919050565b6000614587602383614e20565b915061459282615511565b604082019050919050565b60006145aa602a83614e20565b91506145b582615560565b604082019050919050565b60006145cd600b83614e31565b91506145d8826155af565b600b82019050919050565b60006145f0601783614e20565b91506145fb826155d8565b602082019050919050565b6000614613601783614e31565b915061461e82615601565b601782019050919050565b6000614636602983614e20565b91506146418261562a565b604082019050919050565b6000614659602983614e20565b915061466482615679565b604082019050919050565b600061467c602883614e20565b9150614687826156c8565b604082019050919050565b600061469f602183614e20565b91506146aa82615717565b604082019050919050565b60006146c2601183614e31565b91506146cd82615766565b601182019050919050565b60006146e5602f83614e20565b91506146f08261578f565b604082019050919050565b61470481614fa6565b82525050565b61471381614fa6565b82525050565b61472a61472582614fa6565b6150c8565b82525050565b600061473b826145c0565b91506147478284614719565b60208201915081905092915050565b600061476182614606565b915061476d82856143a5565b9150614778826146b5565b915061478482846143a5565b91508190509392505050565b60006020820190506147a560008301846142a8565b92915050565b600060a0820190506147c060008301886142a8565b6147cd60208301876142a8565b81810360408301526147df81866142b7565b905081810360608301526147f381856142b7565b905081810360808301526148078184614333565b90509695505050505050565b600060a08201905061482860008301886142a8565b61483560208301876142a8565b614842604083018661470a565b61484f606083018561470a565b81810360808301526148618184614333565b90509695505050505050565b600060608201905061488260008301866142a8565b61488f602083018561470a565b61489c60408301846142a8565b949350505050565b600060208201905081810360008301526148be81846142b7565b905092915050565b600060408201905081810360008301526148e081856142b7565b905081810360208301526148f481846142b7565b90509392505050565b60006020820190506149126000830184614315565b92915050565b600060208201905061492d6000830184614324565b92915050565b6000602082019050818103600083015261494d818461436c565b905092915050565b6000602082019050818103600083015261496e816143d6565b9050919050565b6000602082019050818103600083015261498e816143f9565b9050919050565b600060208201905081810360008301526149ae8161441c565b9050919050565b600060208201905081810360008301526149ce8161443f565b9050919050565b600060208201905081810360008301526149ee81614462565b9050919050565b60006020820190508181036000830152614a0e81614485565b9050919050565b60006020820190508181036000830152614a2e816144a8565b9050919050565b60006020820190508181036000830152614a4e816144cb565b9050919050565b60006020820190508181036000830152614a6e816144ee565b9050919050565b60006020820190508181036000830152614a8e81614511565b9050919050565b60006020820190508181036000830152614aae81614534565b9050919050565b60006020820190508181036000830152614ace81614557565b9050919050565b60006020820190508181036000830152614aee8161457a565b9050919050565b60006020820190508181036000830152614b0e8161459d565b9050919050565b60006020820190508181036000830152614b2e816145e3565b9050919050565b60006020820190508181036000830152614b4e81614629565b9050919050565b60006020820190508181036000830152614b6e8161464c565b9050919050565b60006020820190508181036000830152614b8e8161466f565b9050919050565b60006020820190508181036000830152614bae81614692565b9050919050565b60006020820190508181036000830152614bce816146d8565b9050919050565b6000602082019050614bea600083018461470a565b92915050565b6000604082019050614c05600083018561470a565b614c1260208301846142a8565b9392505050565b6000606082019050614c2e600083018661470a565b8181036020830152614c40818561436c565b9050614c4f60408301846142a8565b949350505050565b600060a082019050614c6c600083018861470a565b8181036020830152614c7e818761436c565b9050614c8d604083018661470a565b614c9a6060830185614315565b8181036080830152614cac818461436c565b90509695505050505050565b6000604082019050614ccd600083018561470a565b614cda602083018461470a565b9392505050565b6000614ceb614cfc565b9050614cf7828261504e565b919050565b6000604051905090565b600067ffffffffffffffff821115614d2157614d2061518e565b5b602082029050602081019050919050565b600067ffffffffffffffff821115614d4d57614d4c61518e565b5b602082029050602081019050919050565b600067ffffffffffffffff821115614d7957614d7861518e565b5b614d82826151fd565b9050602081019050919050565b600067ffffffffffffffff821115614daa57614da961518e565b5b614db3826151fd565b9050602081019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b6000614e4782614fa6565b9150614e5283614fa6565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115614e8757614e866150d2565b5b828201905092915050565b6000614e9d82614fa6565b9150614ea883614fa6565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615614ee157614ee06150d2565b5b828202905092915050565b6000614ef782614fa6565b9150614f0283614fa6565b925082821015614f1557614f146150d2565b5b828203905092915050565b6000614f2b82614f86565b9050919050565b6000614f3d82614f86565b9050919050565b60008115159050919050565b6000819050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b83811015614fdd578082015181840152602081019050614fc2565b83811115614fec576000848401525b50505050565b6000614ffd82614fa6565b91506000821415615011576150106150d2565b5b600182039050919050565b6000600282049050600182168061503457607f821691505b6020821081141561504857615047615101565b5b50919050565b615057826151fd565b810181811067ffffffffffffffff821117156150765761507561518e565b5b80604052505050565b600061508a82614fa6565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156150bd576150bc6150d2565b5b600182019050919050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600060033d11156151dc5760046000803e6151d960005161520e565b90505b90565b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b60008160e01c9050919050565b7f455243313135353a207472616e7366657220746f206e6f6e204552433131353560008201527f526563656976657220696d706c656d656e746572000000000000000000000000602082015250565b7f537472696e67733a20686578206c656e67746820696e73756666696369656e74600082015250565b7f455243313135353a204552433131353552656365697665722072656a6563746560008201527f6420746f6b656e73000000000000000000000000000000000000000000000000602082015250565b7f455243313135353a2062616c616e636520717565727920666f7220746865207a60008201527f65726f2061646472657373000000000000000000000000000000000000000000602082015250565b7f455243313135353a206275726e20616d6f756e7420657863656564732062616c60008201527f616e636500000000000000000000000000000000000000000000000000000000602082015250565b7f796f752063616e6e6f74207365742074686973206e616d650000000000000000600082015250565b7f546f6b656e20616c726561647920657869737473000000000000000000000000600082015250565b7f455243313135353a2063616c6c6572206973206e6f74206f776e6572206e6f7260008201527f20617070726f7665640000000000000000000000000000000000000000000000602082015250565b7f546f6b656e20646f6573206e6f74206578697374000000000000000000000000600082015250565b7f616c726561647920696e697469616c697a656400000000000000000000000000600082015250565b7f455243313135353a207472616e7366657220746f20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b7f455243313135353a207472616e736665722063616c6c6572206973206e6f742060008201527f6f776e6572206e6f7220617070726f7665640000000000000000000000000000602082015250565b7f455243313135353a206275726e2066726f6d20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b7f455243313135353a20696e73756666696369656e742062616c616e636520666f60008201527f72207472616e7366657200000000000000000000000000000000000000000000602082015250565b7f4d494e5445525f524f4c45000000000000000000000000000000000000000000600082015250565b7f796f752063616e6e6f7420736574207468697320757269000000000000000000600082015250565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000600082015250565b7f455243313135353a2073657474696e6720617070726f76616c2073746174757360008201527f20666f722073656c660000000000000000000000000000000000000000000000602082015250565b7f455243313135353a206163636f756e747320616e6420696473206c656e67746860008201527f206d69736d617463680000000000000000000000000000000000000000000000602082015250565b7f455243313135353a2069647320616e6420616d6f756e7473206c656e6774682060008201527f6d69736d61746368000000000000000000000000000000000000000000000000602082015250565b7f455243313135353a206d696e7420746f20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b7f206973206d697373696e6720726f6c6520000000000000000000000000000000600082015250565b7f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560008201527f20726f6c657320666f722073656c660000000000000000000000000000000000602082015250565b600060443d10156157ee57615871565b6157f6614cfc565b60043d036004823e80513d602482011167ffffffffffffffff8211171561581e575050615871565b808201805167ffffffffffffffff81111561583c5750505050615871565b80602083010160043d038501811115615859575050505050615871565b6158688260200185018661504e565b82955050505050505b90565b61587d81614f20565b811461588857600080fd5b50565b61589481614f32565b811461589f57600080fd5b50565b6158ab81614f44565b81146158b657600080fd5b50565b6158c281614f50565b81146158cd57600080fd5b50565b6158d981614f5a565b81146158e457600080fd5b50565b6158f081614fa6565b81146158fb57600080fd5b5056fea26469706673582212204a2e70c9431ada89c7afc7ce525f8284ffcaebf528ce7ab65a9eadcfd9cd6d0064736f6c63430008070033",
  }
}
}




