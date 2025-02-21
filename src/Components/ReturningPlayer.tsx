import { useState, useEffect } from "react";
import ButtonMenu from "./Views/ButtonMenu";
import MissionDashboard from "./Views/Mission Dashboard/MissionDashboard";
import FleetManagement from "./Views/Fleet Management/FleetManagement";
import Shipyard from "./Views/Shipyard/Shipyard";
import { fetchReturningPlayer } from "./Api/ApiHandlingPlayer";
import { AgentTokenContext, PageViewContext } from "./GlobalContext";
import logo from "../assets/images/spacetraders.ico"
import homeIcon from "../assets/images/home.png"
import shipIcon from "../assets/images/ship.png"
import moneyIcon from "../assets/images/money.png"
import "../assets/css/game.css"

export default function ReturningPlayer(apiToken: { agentToken: string; }) {
    const agentToken: string = apiToken.agentToken;

    const [userData, setUserData] = useState({ symbol: "", faction: "", agentToken: agentToken });
    const [userHeadquarters, setUserHeadquarters] = useState("");
    const [userCredits, setUserCredits] = useState(0);
    const [userShips, setUserShips] = useState(0);
    const pageViewState = useState("Mission Dashboard");
    const [currentView, setCurrentView] = pageViewState;

    // fetch data for the logged in agent using api
    useEffect(() => {
        fetchReturningPlayer({ agentToken, setUserData, setUserHeadquarters, setUserCredits, setUserShips });
    }, [agentToken, setUserData, setUserHeadquarters, setUserCredits, setUserShips]);


    return (
        <AgentTokenContext.Provider value={agentToken}>
            <div id="gameContainer">
                <div id="gameHeader">
                    <div id="titleText">
                        <h1><img id="spaceLogo" src={logo}></img>&nbsp;Space Traders</h1>
                    </div>
                    <div id="playerDetails">
                        <span id="welcomeText">Welcome Back, {userData.symbol}</span>
                        <br />
                        <img src={homeIcon} className="playerIcon" title="The waypoint where you are Headquartered"></img><span>&nbsp;{userHeadquarters}&nbsp;</span>&nbsp;&nbsp;&nbsp;
                        <img src={shipIcon} className="playerIcon" title="How many ships you currently have"></img><span>&nbsp;{userShips}&nbsp;</span>&nbsp;&nbsp;&nbsp;
                        <img src={moneyIcon} className="playerIcon" title="How much money you currently have"></img><span>&nbsp;{userCredits}&nbsp;</span>
                    </div>
                    <PageViewContext.Provider value={[currentView, setCurrentView]}>
                    <ButtonMenu />
                        <div id="gameViews">
                            {currentView === "Mission Dashboard" && <MissionDashboard />}
                            {currentView === "Fleet Management" && <FleetManagement />}
                            {currentView === "Shipyard" && <Shipyard />}
                        </div>
                    </PageViewContext.Provider>
                </div>
            </div>
        </AgentTokenContext.Provider>
    )
}