import { useState, useEffect } from "react";
import ButtonMenu from "../../Components/ButtonMenu/ButtonMenu";
import MissionDashboard from "../GameInterface/Mission Dashboard/MissionDashboard";
import FleetManagement from "../GameInterface/Fleet Management/FleetManagement";
import Shipyard from "../GameInterface/Shipyard/Shipyard";
import Navigation from "../GameInterface/Navigation/Navigation";
import { fetchReturningPlayer } from "../../Utils/Api/ApiHandlingPlayer";
import { AgentTokenContext, PageViewContext } from "../../Utils/GlobalContext";
import logo from "../../Assets/images/spacetraders.ico"
import homeIcon from "../../Assets/images/home.png"
import shipIcon from "../../Assets/images/ship.png"
import moneyIcon from "../../Assets/images/money.png"
import "../../Assets/css/game.css"
import { Views } from "../../Utils/ViewChoices";

export default function ViewHandler(apiToken: { agentToken: string; }) {
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
                            {currentView === Views.MissionDashboard && <MissionDashboard />}
                            {currentView === Views.FleetManagement && <FleetManagement />}
                            {currentView === Views.Shipyards && <Shipyard />}
                            {currentView === Views.Navigation && <Navigation />}
                        </div>
                    </PageViewContext.Provider>
                </div>
            </div>
        </AgentTokenContext.Provider>
    )
}