import { Contract } from "ethers"

export const FacetCutAction = { Add: 0, Replace: 1, Remove: 2 }

// get function selectors from ABI
export const getSelectors = (contract: Contract) => {
  const signatures = Object.keys(contract.interface.functions)
  const selectors = signatures.reduce((acc: string[], val) => {
    if (val !== 'init(bytes)') {
      acc.push(contract.interface.getSighash(val))
    }
    return acc
  }, [])
  return selectors
}