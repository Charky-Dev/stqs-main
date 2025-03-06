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