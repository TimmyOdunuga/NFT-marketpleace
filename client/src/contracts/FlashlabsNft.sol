
// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (token/ERC1155/IERC1155.sol)
// Flashlabs contracts (FlashlabsUpgradeable, FlashlabsNftMemoryLayout) 


import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Upgrade.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


pragma solidity ^0.8.0;


interface INotifyOwnerChange {
    function changeOwner(address nft_address, uint256 nft_id, address newOwner) external;
}

abstract contract FlashlabsUpgradeable is ERC1967Upgrade {
    bool initialized = false;

    function initializer(bytes calldata data) public {
        require(!initialized, "already initialized");
        _initializer(data);
        initialized = true;
    }

    function _initializer(bytes calldata data) virtual internal;
}

contract FlashlabsNftUpgradeableProxy is TransparentUpgradeableProxy {
    constructor(address logic, address admin) TransparentUpgradeableProxy(logic, admin, "") {
}}


struct Token {
    uint256 id;
    string name;
    uint256 supply;
    bool created;
    string uri;
}

struct LockedTokens {
    uint256 amount;
    address lockedFor;
}

contract FlashlabsNftMemoryLayout {
    //EquinoxToken part
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant TOKEN_PROPOSER_ROLE = keccak256("TOKEN_PROPOSER_ROLE");

    mapping(uint256 => Token) public tokens;
    uint256[] public tokenIds;

    mapping(uint256 => mapping(address => LockedTokens)) public locked;

    bytes32 public constant CONTRACT_METADATA = keccak256("CONTRACT_METADATA");

    address didRegistry;
}

contract FlashlabsNft is ERC1155, AccessControlEnumerable, FlashlabsUpgradeable, FlashlabsNftMemoryLayout {
    event TokenAdded(uint256 id, string name, address minter);

    constructor() ERC1155("") {
        initialized = true;
    }

    function _initializer(bytes calldata data) internal override {
        (address didRegistryAddress) = abi.decode(data, (address));
        didRegistry = didRegistryAddress;

        _setRoleAdmin(TOKEN_PROPOSER_ROLE, ADMIN_ROLE);
        _setRoleAdmin(ADMIN_ROLE, ADMIN_ROLE);
        _setupRole(ADMIN_ROLE, msg.sender);

        addToken(uint256(CONTRACT_METADATA), msg.sender, "CONTRACT_METADATA", "www.flashlabs.io");
        _mint(msg.sender, uint256(CONTRACT_METADATA), 1, "");
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC1155, AccessControlEnumerable) returns (bool) {
        return
            interfaceId == type(IERC1155).interfaceId ||
            interfaceId == type(IERC1155MetadataURI).interfaceId ||
            interfaceId == type(IAccessControlEnumerable).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function name() external pure returns (string memory) {
        return "FlashlabsNFT";
    }

    function uri(uint256 id) override public view returns (string memory) {
        return tokens[id].uri;
    }

    function setUri(string memory newUri, uint256 id) public {
        bytes32 MINTER_ROLE = keccak256(abi.encodePacked("MINTER_ROLE", id));
        require(hasRole(ADMIN_ROLE, _msgSender()) || hasRole(MINTER_ROLE, _msgSender()), "you cannot set this uri");
        tokens[id].uri = newUri;
        emit URI(newUri, id);
    }

    function updateTokenName(uint256 id, string memory tokenName) public {
        bytes32 MINTER_ROLE = keccak256(abi.encodePacked("MINTER_ROLE", id));
        require(hasRole(ADMIN_ROLE, _msgSender()) || hasRole(MINTER_ROLE, _msgSender()), "you cannot set this name");
        require(tokens[id].created, "Token does not exist");
        tokens[id].name = tokenName;
    }

    function mintToken(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyRole(keccak256(abi.encodePacked("MINTER_ROLE", id)))
    {
        require(tokens[id].created, "Token does not exist");
        _mint(account, id, amount, data);
    }

    function addToken(uint256 id, address minter, string memory tokenName, string memory tokenUri)
        public onlyRole(TOKEN_PROPOSER_ROLE) 
    {
        require(!tokens[id].created, "Token already exists");
        bytes32 MINTER_ROLE = keccak256(abi.encodePacked("MINTER_ROLE", id));

        _setRoleAdmin(MINTER_ROLE, ADMIN_ROLE);
        _setupRole(MINTER_ROLE, minter);

        tokens[id] = Token(id, tokenName, 0, true, tokenUri);
        tokenIds.push(id);

        INotifyOwnerChange(didRegistry).changeOwner(address(this), id, minter);

        emit TokenAdded(id, tokenName, minter);
    }

    function unlockedBalanceOf(address account, uint256 id) public view returns (uint256) {
        return balanceOf(account, id) - locked[id][account].amount;
    }

    function isLockedFor(address account, address operator, uint256 id, uint256 amount) public view returns (bool) {
        return (locked[id][account].lockedFor == operator) &&
               (locked[id][account].amount >= amount);
    }

    function lockFor(address operator, uint256 id, uint256 amount) public {
        require(tokens[id].created, "Token does not exist");
        require(balanceOf(_msgSender(), id) >= amount);
        locked[id][_msgSender()].lockedFor = operator;
        locked[id][_msgSender()].amount = amount;
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public override {
        require(tokens[id].created, "Token does not exist");

        bool isLockedForSender = isLockedFor(from, _msgSender(), id, amount);
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()) || isLockedForSender,
            "ERC1155: caller is not owner nor approved"
        );
        
        _safeTransferFrom(from, to, id, amount, data);
        if (isLockedForSender) {
            locked[id][from].amount -= amount;
        }
    }

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public override {
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
            "ERC1155: transfer caller is not owner nor approved"
        );

        _safeBatchTransferFrom(from, to, ids, amounts, data);
    }

    function burn(
        address account,
        uint256 id,
        uint256 value
    ) public onlyRole(keccak256(abi.encodePacked("MINTER_ROLE", id))) {
        require(unlockedBalanceOf(account, id) >= value);

        _burn(account, id, value);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);

        if (from == address(0)) {
            for (uint256 i = 0; i < ids.length; ++i) {
                tokens[ids[i]].supply += amounts[i];
            }
        }

        if (to == address(0)) {
            for (uint256 i = 0; i < ids.length; ++i) {
                tokens[ids[i]].supply -= amounts[i];
            }
        }
    }


}