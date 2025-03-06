// Contract object for mission dashboard
export class ShippingContract {
  id = "";
  factionSymbol = "";
  type = "";
  terms = {
    deadline: Date(),
    payment: {
      onAccepted: 0,
      onFulfilled: 0
    },
    deliver: {
      tradeSymbol: "",
      destinationSymbol: "",
      unitsRequired: 0,
      unitsFulfilled: 0
    }
  };
  accepted = false;
  fulfilled = false;
  expiration = Date();
  deadlineToAccept = Date();
}

//Ship object for the user's fleet
export class FleetShip {
  symbol = "";
  registration = {
    name: "",
    factionSymbol: "",
    role: ""
  };
  cooldown = {
    totalSeconds: 0,
    remainingSeconds: 0
  };
  nav = {
    systemSymbol: "",
    waypointSymbol: "",
    route: {},
    status: "",
    flightMode: ""
  };
}

//Shipyard object for shipyard dashboard
export class ShipyardStock {
  shipType = "";
  shipName = "";
  shipDescription = "";
  shipSupply = "";
  shipyardWaypointSymbol = "";
  shipPurchasePrice = 0;
}

//Waypoint object
export class WaypointProfile {
  systemSymbol = "";
  symbol = "";
  type = "";
  x = 0;
  y = 0;
  orbitals = [];
  traits = [{ symbol: "" }];
  modifiers = [];
  chart = {
    submittedBy: "",
    submittedOn: ""
  };
  faction = {
    symbol: ""
  };
  orbits = "";
  isUnderConstruction = false;
}