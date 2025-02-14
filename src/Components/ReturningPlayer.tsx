import { useState, useEffect } from "react";
import ButtonMenu from "./Actions/ButtonMenu";
import MissionDashboard from "./Actions/MissionDashboard";
import FleetManagement from "./Actions/FleetManagement";

export default function ReturningPlayer(agentToken: { agentToken: string; }) {
    const [userData, setUserData] = useState({ symbol: "", faction: "", agentToken: agentToken});
    const [userHeadquarters, setUserHeadquarters] = useState("");
    const [userCredits, setUserCredits] = useState(0);
    const [userShips, setUserShips] = useState(0);
    const [currentView, setCurrentView] = useState("Mission Dashboard");

    // fetch data for the logged in agent using api
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

            if (resp.ok) {

            setUserData({ symbol: JSON.stringify(json.data.symbol), faction: JSON.stringify(json.data.startingFaction), agentToken: agentToken}
            )
            setUserHeadquarters(JSON.stringify(json.data.headquarters));
            setUserCredits(JSON.parse(json.data.credits));
            setUserShips(JSON.parse(json.data.shipCount));

        }

        };

        fetchData();
    }, [agentToken]);


    return (
        <>
            <h2>Welcome Back, {userData.symbol}</h2>
            <span>You are currently based at {userHeadquarters}</span>
            <span>You have {userShips} ships and {userCredits} credits.</span><br/>
            <ButtonMenu currentView={currentView} setCurrentView={setCurrentView}/>
            {currentView == "Mission Dashboard" ? <MissionDashboard agentToken={agentToken.agentToken} /> : null}
            {currentView == "Fleet Management" ? <FleetManagement agentToken={agentToken.agentToken} /> : null}
            {currentView == "Nothing" ? null : null}
            {currentView == "Nothing" ? null : null}
            
        </>
    )
}