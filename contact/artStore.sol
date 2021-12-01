


pragma solidity 0.8.7;
//declaring the version of solidity

contract ArtStore{
    event changeBalance(uint value, address add);
    mapping(address => uint) public balance;
    //mapping is like a javascript object in soilidity
    address owner;
    struct BasicInfo {
        string name;
        string  symbol;
        address owner;
    }
     BasicInfo basicInfo;
    constructor() {
         owner = msg.sender;
         basicInfo = BasicInfo("Art Store", "ATSE", msg.sender);
    }
    function getInformation()    
    public
    returns(BasicInfo memory){
        return basicInfo;
    }
   
    function getBalance(address ad) 
    public
    view
    returns(uint) {
        return balance[ad];
    }
    function increaseBalance(address ad, uint amount) 
    public 
    returns(string memory, uint, address)
    {
        if(msg.sender != owner){
            return("Only the owner can increase someone's balance", amount, ad);
        }
        else{
             balance[ad] += amount;
             emit changeBalance(balance[ad], ad);
             return("successfully done!", balance[ad], ad);
        }
    }
}


