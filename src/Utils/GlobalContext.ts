import {type Dispatch, type SetStateAction, createContext } from "react"
import { WaypointProfile } from "../Views/GameInterface/Navigation/NavigationClasses";
import { FleetShipDetails } from "../Views/GameInterface/Fleet Management/FleetClasses";
import { ShippingContract } from "../Views/GameInterface/Mission Dashboard/MissionClasses";

// Context to hold the agent token
export const AgentTokenContext = createContext("");

// Context to hold the page view token
export const PageViewContext = createContext<[string, Dispatch<SetStateAction<string>>]>(["New", () => "New"]);

//information about user's current contracts
export const ContractsContext = createContext<[ShippingContract[], Dispatch<SetStateAction<ShippingContract[]>>]>([[new ShippingContract], () => ["None"]]);

//information about currently selected ship
export const FleetShipDetailsContext = createContext<[FleetShipDetails, Dispatch<SetStateAction<FleetShipDetails>>]>([new FleetShipDetails, () => "None"]);
//information about user's whole fleet
export const AllShipsContext = createContext<[FleetShipDetails[], Dispatch<SetStateAction<FleetShipDetails[]>>]>([[new FleetShipDetails], () => ["None"]]);

//information about currently selected ship
export const CurrentWaypointContext = createContext<[WaypointProfile, Dispatch<SetStateAction<WaypointProfile>>]>([new WaypointProfile, () => "None"]);
//information about ship's current waypoint
export const AllWaypointsContext = createContext<[WaypointProfile[], Dispatch<SetStateAction<WaypointProfile[]>>]>([[new WaypointProfile], () => ["None"]]);
