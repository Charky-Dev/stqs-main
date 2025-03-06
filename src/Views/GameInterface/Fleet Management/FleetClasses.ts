//Ship object for the user's fleet
export class FleetShipDetails {
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
    route: {
      origin: {
        symbol: "", type: "", systemSymbol: "", x: 0, y: 0
      },
      destination: {
        symbol: "", type: "", systemSymbol: "", x: 0, y: 0
      },
      arrival: Date(),
      departureTime: Date(),
    },
    status: "",
    flightMode: ""
  };
  fuel = {
    current: 0,
    capacity: 0,
    consumed: {
      amount: 0,
      timestamp: Date(),
    }
  };
  cargo = {
    capacity: 0,
    units: 0,
    inventory: [
      {
        symbol: "",
        name: "",
        description: "",
        units: 0
      }
    ]
  };
}

export class MarketplaceStock {
  symbol = "";
  exports = [
    {
      symbol: "",
      name: "",
      description: ""
    }
  ];
  imports = [
    {
      symbol: "",
      name: "",
      description: ""
    }
  ];
  exchange = [
    {
      symbol: "",
      name: "",
      description: ""
    }
  ];
  transactions = [
    {
      waypointSymbol: "",
      shipSymbol: "",
      tradeSymbol: "",
      type: "",
      units: 0,
      pricePerUnit: 0,
      totalPrice: 0,
      timestamp: Date()
    }
  ];
  tradeGoods = [
    {
      symbol: "",
      type: "",
      tradeVolume: 0,
      supply: "",
      activity: "",
      purchasePrice: 0,
      sellPrice: 0
    }
  ];
}