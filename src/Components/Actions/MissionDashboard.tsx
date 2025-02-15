import { useState, useEffect } from "react";
import {fetchContractDetails} from "../ApiCalls"

export default function MissionDashboard(agentToken: { agentToken: string; }) {
    const [contractDetails, setContractDetails] = useState("");

    //api request to fetch details of current missions 
    useEffect(() => {
        fetchContractDetails(agentToken.agentToken, setContractDetails);
    }, [agentToken, setContractDetails]);

return(
<>
<h2>Mission Dashboard</h2>
<h3>Current Contract:</h3>
<span>{contractDetails}</span>
</>
)

}