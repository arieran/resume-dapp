// Solidity example
pragma solidity ^0.8.0;

contract ResumeVerification {
  mapping(string => bool) public resumeHashes;

  function storeHash(string memory hash) public {
    resumeHashes[hash] = true;
  }

  function verifyHash(string memory hash) public view returns (bool) {
    return resumeHashes[hash];
  }
}
