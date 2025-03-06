import { useState, useEffect } from "react"

export default function ReturningPlayer(agentToken: { agentToken: string; }) {
    const [userData, setUserData] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch("https://api.spacetraders.io/v2/my/agent", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + agentToken.agentToken,
                    "Content-Type": "application/json",
                },
            });
            const json = await resp.json();

            setUserData(JSON.stringify(json, null, 2))

        };

        fetchData();
    }, [agentToken]);


    return (
        <>
            <span>Welcome Back.</span>
            <pre>Response: {userData}</pre>
        </>
    )
}