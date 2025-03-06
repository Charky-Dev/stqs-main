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
    deliver: [{
      tradeSymbol: "",
      destinationSymbol: "",
      unitsRequired: 0,
      unitsFulfilled: 0
    }]
  };
  accepted = false;
  fulfilled = false;
  expiration = Date();
  deadlineToAccept = Date();
}