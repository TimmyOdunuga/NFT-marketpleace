import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FlashlabsCardsNft is ERC1155, Ownable {

    mapping (uint256 => string) uris;
    constructor() ERC1155("") Ownable() {
        
    }

    function name() external pure returns (string memory) {
        return "FlashlabsBusinessCardNFT";
    }

    function uri(uint256 id) override public view returns (string memory) {
        return uris[id];
    }

    function setUri(string memory newUri, uint256 id) public onlyOwner {
        uris[id] = newUri;
        emit URI(newUri, id);
    }

    function mintToken(address account, uint256 id, uint256 amount, bytes memory data)
        public onlyOwner
    {
        _mint(account, id, amount, data);
    }

}