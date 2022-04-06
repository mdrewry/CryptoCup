// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
contract TestCup {
    address public owner;
    uint256 public buyIn;
    uint256 public pool;
    uint16[] public split;
    string public state;
    address[] public players;
    //modifier ensuring only owner can call functions
    modifier onlyowner {
        assert(owner == msg.sender);
        _;
    }

    //Constructor of smart contract
    constructor(uint256 _buyIn, uint16[] memory _split, address _owner){
        owner = _owner;
        buyIn = _buyIn;
        split = _split;
        state = "registration";
    }

    //helper string compare function
    function strcmp(string memory a, string memory b) internal pure returns(bool){
        return keccak256(bytes(a)) == keccak256(bytes(b));
    }

    //returns whether player exists in players array or not
    function checkPlayerExists(address player) public view
    returns(bool){
        for(uint256 i = 0; i < players.length; i++)
            if(players[i] == player) return true;
        return false;
    }

    //allows user to join the cup and add bet to pool
    function joinCup() public payable{
        //verifies correct state
        require(strcmp(state, "registration"));
        //verifies user is not already in cup and has bet enough
        // require(!checkPlayerExists(msg.sender));
        require(msg.value >= buyIn);

        pool += msg.value;
        players.push(msg.sender);
    }

    //starts cup when owner is ready
    function startCup() public onlyowner{
        //verifies cup has not started and has not ended
        require(strcmp(state, "registration"));
        state = "active";
    }

    function endCup(address[] memory ranks) public onlyowner{
        //verifies cup has begun and has not ended
        require(strcmp(state, "active"));
        distributePrizes(ranks);

        //ends cup
        state = "complete";
    }

    function distributePrizes(address[] memory ranks) private{
        uint256 ethRemaining = pool;
        
        if(ranks.length > 0){
            uint256 prize = pool/split[0];
            ethRemaining = ethRemaining - prize;
            payable(ranks[0]).transfer(prize);
        }
        if(ranks.length > 1){
            uint256 prize = pool/split[1];
            ethRemaining = ethRemaining - prize;
            payable(ranks[1]).transfer(prize);
        }
        if(ranks.length > 2){
            uint256 prize = pool/split[2];
            ethRemaining = ethRemaining - prize;
            payable(ranks[2]).transfer(prize);
        }
        pool = ethRemaining;
        
        payable(owner).transfer(ethRemaining);
    }
}