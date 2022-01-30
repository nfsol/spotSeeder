const faker = require("faker");
const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");

async function seedDB() {
  // Connection URL
  const uri = process.env.NODE_APP_MONGO_URI;

  const client = new MongoClient(uri, {useNewUrlParser: true});

  try {
    await client.connect();
    console.log("Connected correctly to server");
    const collection = client.db("myFirstDatabase").collection("spots");
    const userCollection = client.db("myFirstDatabase").collection("users");

    // collection.drop();
    let userList = [];

    for (let i = 0; i < 25; i++){
      let newUser = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        entries: [],
        register_date: faker.date.recent()
      }

// _id:61d21b0ade28607e8bd8c1d0
// name:"Tim"
// email:"tim@test.com"
// password:"$2a$10$.X1D2Zsec1.i22MPQcQO.OdVzidXnGWC.T2z28LVaTtCz/Ze099Tq"
// entries:Array
// register_date:2022-01-02T21:37:14.075+00:00

      let spotList = [];
      for (let i = 0; i < 15; i++) {
        
        let newSpot = {
          name: faker.random.words(),
          lat: faker.address.longitude(),
          lng: faker.address.latitude(),
          url: faker.image.imageUrl(),
          desc: faker.lorem.paragraph(),
          owner: newUser.name
        };
        console.log(newSpot);
        spotList.push(newSpot);
      }
      userList.push(newUser);
      await collection
      .insertMany(spotList)
    } await userCollection.insertMany(userList)
    console.log("Database seeded! :)");
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
}

seedDB();
