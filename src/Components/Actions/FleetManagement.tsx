import { useState, useEffect } from "react";

export default function FleetManagement(agentToken: { agentToken: string; }) {
    const [shipNames, setShipNames] = useState([""]);
    const [currentShip, setCurrentShip] = useState("None")

    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch("https://api.spacetraders.io/v2/my/ships", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + agentToken.agentToken,
                    "Content-Type": "application/json",
                },
            });

            const json = await resp.json();

            if (resp.ok) {
            const shipNames: string[] = [];
            const shipData = json.data;

            for (const ship in shipData) {
                shipNames.push(shipData[ship].symbol);
            }
    

            setShipNames(shipNames);
            console.log(shipNames);
        }

        };

        fetchData();
    }, [agentToken]);
    

    return (
        <>
            <h2>Fleet Managment</h2>
            <h3>Current Ships:</h3>
            {shipNames.map((ship) => <input key={ship} type="button" className={currentShip == String({ship}) ? "ActiveMenuButton" : "MenuButton"} value={ship} onClick={() => setCurrentShip(ship)}/>)}
            
            {currentShip == String("None") ? null : <ShipDetails shipSymbol={currentShip} agentToken={agentToken.agentToken}/>}
        </>
    )

}



// {
//   "data": [
//     {
//       "symbol": "YOKOHAMA-1",
//       "nav": {
//         "systemSymbol": "X1-T24",
//         "waypointSymbol": "X1-T24-A1",
//         "route": {
//           "origin": {
//             "symbol": "X1-T24-A1",
//             "type": "PLANET",
//             "systemSymbol": "X1-T24",
//             "x": -24,
//             "y": -4
//           },
//           "destination": {
//             "symbol": "X1-T24-A1",
//             "type": "PLANET",
//             "systemSymbol": "X1-T24",
//             "x": -24,
//             "y": -4
//           },
//           "arrival": "2025-02-13T17:35:34.162Z",
//           "departureTime": "2025-02-13T17:35:34.162Z"
//         },
//         "status": "DOCKED",
//         "flightMode": "CRUISE"
//       },
//       "crew": {
//         "current": 57,
//         "capacity": 80,
//         "required": 57,
//         "rotation": "STRICT",
//         "morale": 100,
//         "wages": 0
//       },
//       "fuel": {
//         "current": 400,
//         "capacity": 400,
//         "consumed": {
//           "amount": 0,
//           "timestamp": "2025-02-13T17:35:34.162Z"
//         }
//       },
//       "cooldown": {
//         "shipSymbol": "YOKOHAMA-1",
//         "totalSeconds": 0,
//         "remainingSeconds": 0
//       },
//       "frame": {
//         "symbol": "FRAME_FRIGATE",
//         "name": "Frigate",
//         "description": "A medium-sized, multi-purpose spacecraft, often used for combat, transport, or support operations.",
//         "moduleSlots": 8,
//         "mountingPoints": 5,
//         "fuelCapacity": 400,
//         "condition": 1,
//         "integrity": 1,
//         "requirements": {
//           "power": 8,
//           "crew": 25
//         }
//       },
//       "reactor": {
//         "symbol": "REACTOR_FISSION_I",
//         "name": "Fission Reactor I",
//         "description": "A basic fission power reactor, used to generate electricity from nuclear fission reactions.",
//         "condition": 1,
//         "integrity": 1,
//         "powerOutput": 31,
//         "requirements": {
//           "crew": 8
//         }
//       },
//       "engine": {
//         "symbol": "ENGINE_ION_DRIVE_II",
//         "name": "Ion Drive II",
//         "description": "An advanced propulsion system that uses ionized particles to generate high-speed, low-thrust acceleration, with improved efficiency and performance.",
//         "condition": 1,
//         "integrity": 1,
//         "speed": 30,
//         "requirements": {
//           "power": 6,
//           "crew": 8
//         }
//       },
//       "modules": [
//         {
//           "symbol": "MODULE_CARGO_HOLD_II",
//           "name": "Expanded Cargo Hold",
//           "description": "An expanded cargo hold module that provides more efficient storage space for a ship's cargo.",
//           "capacity": 40,
//           "requirements": {
//             "crew": 2,
//             "power": 2,
//             "slots": 2
//           }
//         },
//         {
//           "symbol": "MODULE_CREW_QUARTERS_I",
//           "name": "Crew Quarters",
//           "description": "A module that provides living space and amenities for the crew.",
//           "capacity": 40,
//           "requirements": {
//             "crew": 2,
//             "power": 1,
//             "slots": 1
//           }
//         },
//         {
//           "symbol": "MODULE_CREW_QUARTERS_I",
//           "name": "Crew Quarters",
//           "description": "A module that provides living space and amenities for the crew.",
//           "capacity": 40,
//           "requirements": {
//             "crew": 2,
//             "power": 1,
//             "slots": 1
//           }
//         },
//         {
//           "symbol": "MODULE_MINERAL_PROCESSOR_I",
//           "name": "Mineral Processor",
//           "description": "Crushes and processes extracted minerals and ores into their component parts, filters out impurities, and containerizes them into raw storage units.",
//           "requirements": {
//             "crew": 0,
//             "power": 1,
//             "slots": 2
//           }
//         },
//         {
//           "symbol": "MODULE_GAS_PROCESSOR_I",
//           "name": "Gas Processor",
//           "description": "Filters and processes extracted gases into their component parts, filters out impurities, and containerizes them into raw storage units.",
//           "requirements": {
//             "crew": 0,
//             "power": 1,
//             "slots": 2
//           }
//         }
//       ],
//       "mounts": [
//         {
//           "symbol": "MOUNT_SENSOR_ARRAY_II",
//           "name": "Sensor Array II",
//           "description": "An advanced sensor array that improves a ship's ability to detect and track other objects in space with greater accuracy and range.",
//           "strength": 4,
//           "requirements": {
//             "crew": 2,
//             "power": 2
//           }
//         },
//         {
//           "symbol": "MOUNT_GAS_SIPHON_II",
//           "name": "Gas Siphon II",
//           "description": "An advanced gas siphon that can extract gas from gas giants and other gas-rich bodies more efficiently and at a higher rate.",
//           "strength": 20,
//           "requirements": {
//             "crew": 2,
//             "power": 2
//           }
//         },
//         {
//           "symbol": "MOUNT_MINING_LASER_II",
//           "name": "Mining Laser II",
//           "description": "An advanced mining laser that is more efficient and effective at extracting valuable minerals from asteroids and other space objects.",
//           "strength": 5,
//           "requirements": {
//             "crew": 2,
//             "power": 2
//           }
//         },
//         {
//           "symbol": "MOUNT_SURVEYOR_II",
//           "name": "Surveyor II",
//           "description": "An advanced survey probe that can be used to gather information about a mineral deposit with greater accuracy.",
//           "strength": 2,
//           "deposits": [
//             "QUARTZ_SAND",
//             "SILICON_CRYSTALS",
//             "PRECIOUS_STONES",
//             "ICE_WATER",
//             "AMMONIA_ICE",
//             "IRON_ORE",
//             "COPPER_ORE",
//             "SILVER_ORE",
//             "ALUMINUM_ORE",
//             "GOLD_ORE",
//             "PLATINUM_ORE",
//             "DIAMONDS",
//             "URANITE_ORE"
//           ],
//           "requirements": {
//             "crew": 4,
//             "power": 3
//           }
//         }
//       ],
//       "registration": {
//         "name": "YOKOHAMA-1",
//         "factionSymbol": "COSMIC",
//         "role": "COMMAND"
//       },
//       "cargo": {
//         "capacity": 40,
//         "units": 0,
//         "inventory": []
//       }
//     }

function ShipDetails({shipSymbol, agentToken}:{shipSymbol:string; agentToken:string}){
    const [shipInfo, setShipInfo] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch("https://api.spacetraders.io/v2/my/ships/" + shipSymbol, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + agentToken,
                    "Content-Type": "application/json",
                },
            });

            const json = await resp.json();

            if (resp.ok) {
            setShipInfo(JSON.stringify(json, null, 2));
        }

        };

        fetchData();
    }, [agentToken, shipSymbol]);

    return (
    <>
    <h3>Ship Details: {shipSymbol}</h3>
    <pre>{shipInfo}</pre>
    </>
    )
}

function FetchNewContract() {
    return (<></>)
}