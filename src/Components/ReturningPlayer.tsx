import { useState, useEffect } from "react";
import ButtonMenu from "./Actions/ButtonMenu";
import MissionDashboard from "./Actions/MissionDashboard";
import FleetManagement from "./Actions/FleetManagement";
import { fetchReturningPlayer } from "./ApiCalls";
import logo from "../assets/images/spacetraders.ico"
import homeIcon from "../assets/images/home.png"
import shipIcon from "../assets/images/ship.png"
import moneyIcon from "../assets/images/money.png"
import "../assets/css/game.css"

export default function ReturningPlayer(apiToken: { agentToken: string; }) {
    const agentToken = apiToken.agentToken;
    const [userData, setUserData] = useState({ symbol: "", faction: "", agentToken: agentToken });
    const [userHeadquarters, setUserHeadquarters] = useState("");
    const [userCredits, setUserCredits] = useState(0);
    const [userShips, setUserShips] = useState(0);
    const [currentView, setCurrentView] = useState("Mission Dashboard");

    // fetch data for the logged in agent using api
    useEffect(() => {
        fetchReturningPlayer({ agentToken, setUserData, setUserHeadquarters, setUserCredits, setUserShips });
    }, [agentToken, setUserData, setUserHeadquarters, setUserCredits, setUserShips]);


    return (
        <div id="gameContainer">
            <div id="gameHeader">
                <div id="titleText">
                    <h1><img id="spaceLogo" src={logo}></img>&nbsp;Space Traders</h1>
                </div>
                <div id="playerDetails">
                    <span id="welcomeText">Welcome Back, {userData.symbol}</span>
                    <br/>
                    <img src={homeIcon} className="playerIcon" title="The waypoint where you are Headquartered"></img><span>&nbsp;{userHeadquarters}&nbsp;</span>&nbsp;&nbsp;&nbsp;
                    <img src={shipIcon} className="playerIcon" title="How many ships you currently have"></img><span>&nbsp;{userShips}&nbsp;</span>&nbsp;&nbsp;&nbsp;
                    <img src={moneyIcon} className="playerIcon" title="How much money you currently have"></img><span>&nbsp;{userCredits}&nbsp;</span>
                </div>
                <ButtonMenu currentView={currentView} setCurrentView={setCurrentView} />
                <div id="gameViews">
                    {currentView == "Mission Dashboard" ? <MissionDashboard agentToken={agentToken} /> : null}
                    {currentView == "Fleet Management" ? <FleetManagement agentToken={agentToken} /> : null}
                    {currentView == "Nothing" ? null : null}
                    {currentView == "Nothing" ? null : null}
                </div>
            </div>

        </div>
    )
}