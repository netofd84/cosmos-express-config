const config = {
    endpoint: "",
    key: "",
    databaseId: "tickets",
    containerId: "Items",
    partitionKey: { kind: "Hash", paths: ["/category"] }
  };
  
  module.exports = config;