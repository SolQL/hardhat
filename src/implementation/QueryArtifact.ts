import { Artifact } from "hardhat/types";
import { ethers } from "ethers";
import { QueryMethod } from "../bases/Abstract";


/********************************************************

- need "main()" abi
- need encoded deployment bytecode

********************************************************/


// use ethers.utils.Fragment instead of own Fragment.
ethers.utils.Fragment

type AbiFragment = {
    name: string
    inputs: any[]
    stateMutability: string
    type: string
    outputs?: any[]
}


/// @dev representation of query data pre-build time. 
/// @dev store bytecode instead of arg encoded bytecode since args not available yet
/// 
export type QueryArtifact = {
    bytecode: string
    mainOutput: any[]
    constructorFragment: AbiFragment
}




export class Query implements QueryMethod {

    // encoded string containing deployment bytecode and constructor args. 
    bytecodeEncodedArgs?: string;
    mainAbiFragment: AbiFragment | undefined;

    constructor(hardhatArtifact: Artifact, constructorArgs?: any[]) {
        const queryBytecode = hardhatArtifact.bytecode;
        const queryInterface = new ethers.utils.Interface(hardhatArtifact.abi);

        this.bytecodeEncodedArgs = this.encodeConstructorArgs(
            queryInterface,
            queryBytecode,
            constructorArgs
        )

        const abiFragments: AbiFragment[] = hardhatArtifact.abi;
        this.mainAbiFragment = this.getMainAbi(abiFragments);
    }


    artifactIsCompatible(queryArtifact: Artifact): boolean {
        
    }

    executeQuery(queryArtifact: Artifact): Promise<any> {
        
    }

    /********************************** PRIVATE **********************************/

    private encodeConstructorArgs(
        queryInterface: ethers.utils.Interface,
        queryBytecode: string,
        constructorArgs?: any[]) {

        // throws an error in case of type mismatch of args 
        const encodedArgs = queryInterface.encodeDeploy(constructorArgs);
        return ethers.utils.hexConcat([queryBytecode, encodedArgs]);
    }

    private getMainAbi(queryAbi: AbiFragment[]) {
        return queryAbi.find(
                (fragment: AbiFragment) => fragment.name == MAIN_NAME
        )
    }

}
