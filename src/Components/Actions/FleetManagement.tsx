import { useState, useEffect } from "react";
import { fetchFleet, fetchShip, fetchWaypoint } from "../ApiCalls"

export default function FleetManagement(agentToken: { agentToken: string; }) {
    const [shipNames, setShipNames] = useState([""]); //list of the player's ships for quick reference
    const [currentShip, setCurrentShip] = useState("None"); //information about currently selected ship

    // fetch information about the player's ships from the api
    useEffect(() => {
        fetchFleet(agentToken.agentToken, setShipNames);
    }, [agentToken.agentToken, setShipNames]);

    return (
        <>
            <h2>Fleet Managment</h2>
            <div id="fleetList">
                {/* map all ships to buttons so player can choose to view more information */}
                {shipNames.map((ship) => <input key={ship} type="button" className={currentShip == String({ ship }) ? "ActiveMenuButton" : "MenuButton"} value={ship} onClick={() => setCurrentShip(ship)} />)}
            </div>
            <div id="shipOverview">
                {/* fetch information about the currently selected ship */}
                {currentShip == String("None") ? null : <ShipDetails shipSymbol={currentShip} agentToken={agentToken.agentToken} />}
            </div>
        </>
    )

}

//fetch and render details of a specified ship
function ShipDetails({ shipSymbol, agentToken }: { shipSymbol: string; agentToken: string }) {
    const [shipRegistration, setShipRegistration] = useState({ name: "", factionSymbol: "", role: "" });
    const [shipCooldown, setShipCooldown] = useState({ totalSeconds: 0, remainingSeconds: 0 });
    const [shipNav, setShipNav] = useState({ systemSymbol: "", waypointSymbol: "", route: "", status: "", flightMode: "" });

    // currently not fully implemented
    // const [shipCrew, setShipCrew] = useState();
    // const [shipFrame, setShipFrame] = useState();
    // const [shipReactor, setShipReactor] = useState();
    // const [shipEngine, setShipEngine] = useState();
    // const [shipModules, setShipModules] = useState();
    // const [shipMounts, setShipMounts] = useState();
    // const [shipCargo, setShipCargo] = useState();
    // const [shipFuel, setShipFuel] = useState();

    useEffect(() => {
        fetchShip({ agentToken, shipSymbol, setShipRegistration, setShipCooldown, setShipNav });
    }, [agentToken, shipSymbol, setShipRegistration, setShipCooldown, setShipNav]);

    return (
        <>
            <div id="shipDetails">
                <h3>Ship Details:</h3>
                {shipRegistration && shipCooldown &&
                    <section>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Faction</th>
                                    <th>Role</th>
                                    <th>Cooldown Time</th>
                                    <th>Cooldown Remaining</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{shipRegistration.name}</td>
                                    <td>{shipRegistration.factionSymbol}</td>
                                    <td>{shipRegistration.role}</td>
                                    <td>{shipCooldown.totalSeconds}</td>
                                    <td>{shipCooldown.remainingSeconds}</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>}
            </div>
            <WaypointDetails agentToken={agentToken} systemSymbol={shipNav.systemSymbol} waypointSymbol={shipNav.waypointSymbol} />

        </>
    )
}

// interface for data types in fetchAgentDetails
interface waypointPropTypes {
    agentToken: string;
    systemSymbol: string;
    waypointSymbol: string
}
//fetch details about a given waypoint
function WaypointDetails({ agentToken, systemSymbol, waypointSymbol }: waypointPropTypes) {
    const [waypointDetails, setWaypointDetails] = useState("");

    useEffect(() => {
        fetchWaypoint({ agentToken, systemSymbol, waypointSymbol, setWaypointDetails });
    }, [agentToken, systemSymbol, waypointSymbol, setWaypointDetails]);


    return (
        <div id="waypointData">
            <h3>Waypoint Data:</h3>
            <pre>{waypointDetails}</pre>

        </div>)
}

function FetchNewContract() {
    return (<></>)
}