import { Artifact } from "hardhat/types"


/*************************************************************

Purpose is to set standard for multiple querying methods.

Generally expect ArtifactFetchMethod(s) to be more static, 
so it's likely that multiple QueryMethod(s) will share
the same ArtifactFetchMethod. 

*************************************************************/


export type ArtifactMapping = {
    [name: string]: Artifact
}


export interface ArtifactFetchMethod {
    //returns compatible artifacts for a given queryMethod
    getCompatibleArtifacts(queryMethod: QueryMethod): Promise<ArtifactMapping>
}


export interface QueryMethod {
    //to check compatibility of an artifact with a particular method
    artifactIsCompatible(queryArtifact: Artifact): boolean
    executeQuery(queryArtifact: Artifact): Promise<any>
}








