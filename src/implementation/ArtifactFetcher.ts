import { Artifact } from "hardhat/types";
import hre from "hardhat";
import { ArtifactMapping, ArtifactFetchMethod, QueryMethod } from "../bases/Abstract";




/********************************************************

Gets all artifact names, and returns a dict mapping
the name to the artifact.

********************************************************/




export class ArtifactFetcher implements ArtifactFetchMethod {

    async getCompatibleArtifacts(queryMethod: QueryMethod): Promise<ArtifactMapping> {

        const artifactNames = await hre.artifacts.getAllFullyQualifiedNames();
        const artifactMapping: ArtifactMapping = {};

        const artifactPromises: Promise<Artifact>[] = artifactNames.map(
            async (name: string) => {
                let artifact = await hre.artifacts.readArtifact(name)

                // only retain compatible artifacts
                if(queryMethod.artifactIsCompatible(artifact)) {
                    artifactMapping[name] = artifact;
                }
                
                return artifact
            }
        )
        
        // wait for all artifacts to be read
        await Promise.all(artifactPromises);
    
        return artifactMapping;
    }

}


