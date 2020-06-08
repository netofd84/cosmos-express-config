const express = require('express');
const bodyParse = require('body-parser');

const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("./api/cosmos/config");
const dbContext = require("./api/cosmos/databaseContext");

const { endpoint, key, databaseId, containerId } = config;

const client = new CosmosClient({ endpoint, key });

const database = client.database(databaseId);
const container = database.container(containerId);

// Make sure Tasks database is already setup. If not, create it.
dbContext.create(client, databaseId, containerId);


const app = express();

async function start() {
    
    console.log(`Querying container: Items`);

    // query to return all items
    const querySpec = {
    query: "SELECT * from c"
    };

    // read all items in the Items container
    const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();

    items.forEach(item => {
    console.log(`${item.id} - ${item.description}`);
    });

    const newItem = {
        id: "7",
        category: "fun",
        name: "Cosmos DB",
        description: "Complete Cosmos DB Node.js Quickstart ⚡",
        isComplete: false
      };


    const { resource: createdItem } = await container.items.create(newItem);

    console.log(`\r\nCreated new item: ${createdItem.id} - ${createdItem.description}\r\n`);
 }


app.use((req,res,next) => {
    start();
})

app.listen(3000);