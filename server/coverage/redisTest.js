const redis = require("redis");
const bluebird = require("bluebird");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
const client = redis.createClient(6380, process.env.REDISCACHEHOSTNAME, 
    {auth_pass: process.env.REDISCACHEKEY, tls: {servername: process.env.REDISCACHEHOSTNAME}});

client.on("error", function (err) {
  console.log("Error " + err);
});

async function testCache() {

  // Connect to the Azure Cache for Redis over the SSL port using the key.
      
  // Perform cache operations using the cache connection object...
  client.set("key", "value1", redis.print);
  // Simple PING command
  console.log("\nCache command: PING");
  console.log("Cache response : " + await client.pingAsync());

  // Simple get and put of integral data types into the cache
  console.log("\nCache command: GET Message");
  console.log("Cache response : " + await client.getAsync("Message"));    

  console.log("\nCache command: SET Message");
  console.log("Cache response : " + await client.setAsync("Message",
      "Hello! The cache is working from Node.js!"));    

  // Demonstrate "SET Message" executed as expected...
  console.log("\nCache command: GET Message");
  console.log("Cache response : " + await client.getAsync("Message"));    

  // Get the client list, useful to see if connection list is growing...
  console.log("\nCache command: CLIENT LIST");
  console.log("Cache response : " + await client.clientAsync("LIST"));    
}

testCache();