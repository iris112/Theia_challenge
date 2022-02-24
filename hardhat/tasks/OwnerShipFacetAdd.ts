import { BigNumber, ContractTransaction } from "ethers";
import { FacetCutAction, getSelectors } from "../../src/libraries";
import { DiamondInit__factory, IDiamondCut__factory } from "../../typechain";
import { task } from "hardhat/config";

export const OwnerShipFacetAdd = task(
  "ownerShipFacetAdd",
  "upgrade with ownership feature"
)
  .setAction(
    async ({}, { ethers, deployments }
    ) => {
      try {
        const [signer] = await ethers.getSigners();
        const { chainId } = await ethers.provider.getNetwork();
        const FacetName = 'OwnershipFacet';
        const diamondAddress = (await deployments.get("Diamond")).address;
        const diamondInitAddress = (await deployments.get("DiamondInit")).address;

        const Facet = await ethers.getContractFactory(FacetName)
        const facet = await Facet.deploy()
        await facet.deployed()
        console.log(`${FacetName} deployed: ${facet.address}`)

        const cut = []
        cut.push({
          facetAddress: facet.address,
          action: FacetCutAction.Add,
          functionSelectors: getSelectors(facet)
        })
        console.log('')
        console.log('Diamond Cut:', cut)

        const diamondCut = IDiamondCut__factory.connect(diamondAddress, signer);
        const diamondInit = DiamondInit__factory.connect(diamondInitAddress, signer);

        // call to init function
        const functionCall = diamondInit.interface.encodeFunctionData('init')
        const tx = await diamondCut.diamondCut(cut, diamondInit.address, functionCall)
        console.log('Diamond cut tx: ', tx.hash)

        const receipt = await tx.wait()
        if (!receipt.status) {
          throw Error(`Diamond upgrade failed: ${tx.hash}`)
        }
        console.log('Completed diamond cut')
      } catch (error) {
        console.error(error, "\n");
        process.exit(1);
      }
    }
  );
