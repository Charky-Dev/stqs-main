import { useState, useEffect, useContext, type Dispatch, type SetStateAction } from "react";
import { doShipAction, fetchFleet, fetchShip } from "../../Api/ApiHandlingFleet"
import { fetchWaypointDetails } from "../../Api/ApiHandlingWaypoint"
import { fetchNewContract } from "../../Api/ApiHandlingContract"
import { AgentTokenContext, PageViewContext } from "../../GlobalContext";
import { FleetShip, WaypointProfile } from "../Classes";

export default function FleetManagement() {
    const [shipData, setShipData] = useState([new FleetShip]); //list of the player's ships
    const [currentShip, setCurrentShip] = useState("None"); //information about currently selected ship
    const [waypointDetails, setWaypointDetails] = useState(new WaypointProfile);
    const agentToken = useContext(AgentTokenContext); //Fetch agent token from context

    // Fetch information about the player's ships from the api
    useEffect(() => {
        fetchFleet(agentToken, setShipData);
    }, [agentToken, setShipData]);

    return (
        <>
            <h2>Fleet Management</h2>
            <div id="fleetList">
                {/* map all ships to buttons so player can choose to view more information */}
                {shipData.map((ship: FleetShip) => <input key={ship.symbol} type="button" className={currentShip === ship.symbol ? "activeGenericButton" : "genericButton"} value={ship.symbol} onClick={() => setCurrentShip(ship.symbol)} />)}
            </div>
            <div id="shipOverview">
                {/* Fetch information about the currently selected ship */}
                {currentShip === String("None") ? null : <ShipDetails shipSymbol={String(currentShip)} setWaypointDetails={setWaypointDetails} waypointDetails={waypointDetails} />}
            </div>
        </>
    )

}

//Fetch and render details of a specified ship
export function ShipDetails({ shipSymbol, setWaypointDetails, waypointDetails }: { shipSymbol: string; setWaypointDetails: Dispatch<SetStateAction<WaypointProfile>>, waypointDetails: WaypointProfile }) {
    const [fleetShipDetails, setFleetShipDetails] = useState(new FleetShip);
    const agentToken = useContext(AgentTokenContext); //Fetch agent token from context

    useEffect(() => {
        fetchShip({ agentToken, shipSymbol, setFleetShipDetails });
    }, [agentToken, shipSymbol, setFleetShipDetails]);

    useEffect(() => {
        fetchWaypointDetails({ agentToken, systemSymbol: fleetShipDetails.nav.systemSymbol, waypointSymbol: fleetShipDetails.nav.waypointSymbol, setWaypointDetails });
    }, [agentToken, fleetShipDetails, setWaypointDetails]);

    return (
        <>
            <div className="shipInfoBoxLeft">
                <VehicleDetails fleetShipDetails={fleetShipDetails} />
                <NavigationDetails fleetShipDetails={fleetShipDetails} />
            </div>

            <div className="shipInfoBoxRight">
                <WaypointDetails waypointDetails={waypointDetails} />
                <CommandDetails fleetShipDetails={fleetShipDetails} setFleetShipDetails={setFleetShipDetails} waypointDetails={waypointDetails} />
            </div>
        </>
    )
}

//Fetch details about a given waypoint
export function VehicleDetails({ fleetShipDetails }: { fleetShipDetails: FleetShip }) {
    return (
        <div className="shipInfoBox">
            <h3>Ship Details:</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Faction</th>
                        <th>Role</th>
                        <th>Cooldown</th>
                        <th>Fuel</th>
                        <th>Cargo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{fleetShipDetails.registration.name}</td>
                        <td>{fleetShipDetails.registration.factionSymbol}</td>
                        <td>{fleetShipDetails.registration.role}</td>
                        <td>{fleetShipDetails.cooldown.remainingSeconds} / {fleetShipDetails.cooldown.totalSeconds}</td>
                        <td>{fleetShipDetails.fuel.current} / {fleetShipDetails.fuel.capacity}</td>
                        <td>{fleetShipDetails.cargo.units} / {fleetShipDetails.cargo.capacity}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

//Fetch details about a given waypoint
export function NavigationDetails({ fleetShipDetails }: { fleetShipDetails: FleetShip }) {
    return (
        <div className="shipInfoBox">
            <h3>Navigation:</h3>
            <table>
                <thead>
                    <tr>
                        <th>System</th>
                        <th>Waypoint</th>
                        <th>Route</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Flight Mode</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{fleetShipDetails.nav.systemSymbol}</td>
                        <td>{fleetShipDetails.nav.waypointSymbol}</td>
                        <td>{fleetShipDetails.nav.route.origin.symbol} → {fleetShipDetails.nav.route.destination.symbol}</td>
                        <td>{new Date(fleetShipDetails.nav.route.departureTime).toUTCString()} → {new Date(fleetShipDetails.nav.route.arrival).toUTCString()}</td>
                        <td>{fleetShipDetails.nav.status}</td>
                        <td>{fleetShipDetails.nav.flightMode}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

//Fetch details about a given waypoint
export function WaypointDetails({ waypointDetails }: { waypointDetails: WaypointProfile }) {
    return (
        <div className="shipInfoBox">
            <h3>Location Summary:</h3>
            <div>{waypointDetails.systemSymbol} ({waypointDetails.faction.symbol}), {waypointDetails.type}{waypointDetails.isUnderConstruction && <> - Under Construction</>} </div>
            <br/>
            <div>{waypointDetails.traits.map((trait) => <span key={trait.symbol}> {trait.symbol.replace(/_/g, " ")}</span>)}</div>
        </div>
    )
}

//Fetch details about a given waypoint
export function CommandDetails({ fleetShipDetails, setFleetShipDetails, waypointDetails }: { fleetShipDetails: FleetShip, setFleetShipDetails: Dispatch<SetStateAction<FleetShip>>, waypointDetails: WaypointProfile }) {
    const setCurrentView = useContext(PageViewContext)[1]; // import page state from context
    const agentToken = useContext(AgentTokenContext); //Fetch agent token from context

    return (
        <div className="shipInfoBox">
            {
                ["COMMAND", "SATELLITE"].includes(fleetShipDetails.registration.role) &&
                <input type="button" className="fullWidthButton" value="Negotiate New Contract" onClick={() => fetchNewContract(agentToken, fleetShipDetails.registration.name, setCurrentView)} />
            }
            {
                "DOCKED" === fleetShipDetails.nav.status &&
                <input type="button" className="fullWidthButton" value="Orbit Ship" onClick={() => doShipAction({ agentToken, shipSymbol: fleetShipDetails.symbol, fleetShipDetails, setFleetShipDetails, action: "orbit" })} />
            }
            {
                "DOCKED" === fleetShipDetails.nav.status &&
                waypointDetails.traits.map((trait) => trait.symbol).includes("MARKETPLACE") &&
                <input type="button" className="fullWidthButton" value="Refuel Ship" onClick={() => doShipAction({ agentToken, shipSymbol: fleetShipDetails.symbol, fleetShipDetails, setFleetShipDetails, action: "refuel" })} />
            }
            {
                "IN_ORBIT" === fleetShipDetails.nav.status &&
                <input type="button" className="fullWidthButton" value="Dock Ship" onClick={() => doShipAction({ agentToken, shipSymbol: fleetShipDetails.symbol, fleetShipDetails, setFleetShipDetails, action: 'dock' })} />
            }
            {
                "IN_ORBIT" === fleetShipDetails.nav.status &&
                ["ASTEROID", "ENGINEERED_ASTEROID"].includes(waypointDetails.type) &&
                <input type="button" className="fullWidthButton" value="Extract Ores" onClick={() => doShipAction({ agentToken, shipSymbol: fleetShipDetails.symbol, fleetShipDetails, setFleetShipDetails, action: "extract" })} />
            }
        </div>
    )
}