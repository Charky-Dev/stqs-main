import { useState, useEffect, useContext } from "react";
import { fetchFleetLocations } from "../Api/ApiHandlingFleet"
import { fetchAllShipyards, fetchShipyardShips, fetchNewShip} from "../Api/ApiHandlingWaypoint"
import { AgentTokenContext, PageViewContext } from "../globalContext";

export default function Shipyard() {
    const [shipyardNames, setShipyardNames] = useState([{ shipyardName: "", shipyardWaypoint: "" }]); //list of the player's shipyards for quick reference
    const [currentShipyard, setCurrentShipyard] = useState({ shipyardName: "", shipyardWaypoint: "" }); //information about currently selected shipyard
    const [shipLocations, setShipLocations] = useState([""]); //list of the player's ships for quick reference
    const agentToken = useContext(AgentTokenContext); //Fetch agent token from context

    // Fetch information about the player's ships from the api
    useEffect(() => {
        fetchFleetLocations(agentToken, setShipLocations);
    }, [agentToken, setShipLocations]);

    // Fetch information about the player's shipyards from the api
    useEffect(() => {
        fetchAllShipyards(agentToken, shipLocations, setShipyardNames);
    }, [agentToken, shipLocations, setShipyardNames]);
    
    return (
        <>
            <h2>View</h2>
            <div id="fleetList">
                {/* map all shipyards to buttons so player can choose to view more information */}
                {shipyardNames.map(({ shipyardName, shipyardWaypoint }) => <input key={shipyardName} type="button" className={currentShipyard.shipyardName == shipyardName ? "activeGenericButton" : "genericButton"} value={shipyardName} onClick={() => setCurrentShipyard({ shipyardName, shipyardWaypoint })} />)}
            </div>
            <div id="shipyardOverview">
                {/* Fetch information about the currently selected shipyard */}
                {currentShipyard.shipyardName === "None" ? null : <ShipyardDetails shipyardSymbol={currentShipyard.shipyardName} systemSymbol={currentShipyard.shipyardWaypoint} />}
            </div>
        </>
    )
}

// function to render shipyards in table
function ShipyardDetails({ shipyardSymbol, systemSymbol }: { shipyardSymbol: string, systemSymbol: string }) {
    const [shipyardStock, setShipyardStock] = useState([{ shipType: "", shipName: "", shipDescription: "", shipSupply: "", shipPurchasePrice: 0 }]);
    const agentToken = useContext(AgentTokenContext); //Fetch agent token from context

    useEffect(() => {
        fetchShipyardShips(agentToken, systemSymbol, shipyardSymbol, setShipyardStock);
    }, [agentToken, systemSymbol, shipyardSymbol, setShipyardStock]);

    return (
        <div id="contractDetails">
            {shipyardStock[0].shipType &&
                <table>
                    <thead>
                        <tr>
                            <th>
                                Type
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Description
                            </th>
                            <th>
                                Supply
                            </th>
                            <th>
                                Payment
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* map all ships to buttons so player can choose to view more information */}
                        {shipyardStock.map((ship) => <ShipDetails ship={ship} />)}
                    </tbody>
                </table>
            }
        </div>

    )
}

// function to render ships in table
function ShipDetails(stringShip: any) {
        const agentToken = useContext(AgentTokenContext); //fetch agent token from context
        const setPageView = useContext(PageViewContext);
    try {
        const ship = stringShip.ship;
        return (
            <tr key={ship.shipId}>
                <td>
                    {ship.shipType}
                </td>
                <td>
                    {ship.shipName}
                </td>
                <td>
                    {ship.shipDescription}
                </td>
                <td>
                    {ship.shipSupply}
                </td>
                <td>
                    {ship.shipPurchasePrice ? <input type="button" className="fullWidthButton" value="Purchase Ship" onClick={() => fetchNewShip(agentToken, ship.shipType, ship.shipyardSymbol, setPageView[1])}/> : "Unknown"}
                </td>
            </tr>

        )

    }

    catch (e) {
        return (
            <tr><td colSpan={6}>{String(e)}</td></tr>
        )
    }


}