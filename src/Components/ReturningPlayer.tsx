import { useState, useEffect } from "react";
import ButtonMenu from "./Actions/ButtonMenu";
import MissionDashboard from "./Actions/MissionDashboard";
import FleetManagement from "./Actions/FleetManagement";
import {fetchReturningPlayer} from "./ApiCalls"

export default function ReturningPlayer(apiToken: { agentToken: string; }) {
    const agentToken = apiToken.agentToken;
    const [userData, setUserData] = useState({ symbol: "", faction: "", agentToken: agentToken});
    const [userHeadquarters, setUserHeadquarters] = useState("");
    const [userCredits, setUserCredits] = useState(0);
    const [userShips, setUserShips] = useState(0);
    const [currentView, setCurrentView] = useState("Mission Dashboard");

    // fetch data for the logged in agent using api
    useEffect(() => {
        fetchReturningPlayer({agentToken, setUserData, setUserHeadquarters, setUserCredits, setUserShips});
    }, [agentToken, setUserData, setUserHeadquarters, setUserCredits, setUserShips]);


    return (
        <>
            <h2>Welcome Back, {userData.symbol}</h2>
            <span>You are currently based at {userHeadquarters}</span>
            <span>You have {userShips} ships and {userCredits} credits.</span><br/>
            <ButtonMenu currentView={currentView} setCurrentView={setCurrentView}/>
            {currentView == "Mission Dashboard" ? <MissionDashboard agentToken={agentToken} /> : null}
            {currentView == "Fleet Management" ? <FleetManagement agentToken={agentToken} /> : null}
            {currentView == "Nothing" ? null : null}
            {currentView == "Nothing" ? null : null}
            
        </>
    )
}