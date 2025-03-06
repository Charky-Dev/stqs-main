import { useState, useEffect } from "react";

export default function MissionDashboard(agentToken: { agentToken: string; }) {
    const [contractDetails, setContractDetails] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch("https://api.spacetraders.io/v2/my/contracts", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + agentToken.agentToken,
                    "Content-Type": "application/json",
                },
            });
            const json = await resp.json();

            setContractDetails(JSON.stringify(json, null, 2));

        };

        fetchData();
    }, [agentToken]);

return(
<>
<h2>Mission Dashboard</h2>
<h3>Current Contract:</h3>
<span>{contractDetails}</span>
</>
)

}