// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibDiamond} from "../libraries/LibDiamond.sol";
import { IDiamondCut } from "../interfaces/IDiamondCut.sol";
import { IERC173 } from "../interfaces/IERC173.sol";
import { IERC165 } from "../interfaces/IERC165.sol";

/**
 * @author Jason
 * @title DiamondInit
 * @dev It is exapected that this contract is customized if you want to deploy your diamond
 *      with data from a deployment script. Use the init function to initialize state variables
 *      of your diamond. Add parameters to the init funciton if you need to.
 */
contract DiamondInit {    

  /**
   * @dev You can add parameters to this function in order to pass in 
   *      data to set your own state variables
   */
  function init() external {
    // adding ERC165 data
    LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
    ds.supportedInterfaces[type(IERC165).interfaceId] = true;
    ds.supportedInterfaces[type(IDiamondCut).interfaceId] = true;
    ds.supportedInterfaces[type(IERC173).interfaceId] = true;
  }
}