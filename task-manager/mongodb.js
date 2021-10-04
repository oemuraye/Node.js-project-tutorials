//CRUD create read update delete

// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const objectID = mongodb.objectID

const { MongoClient, ObjectID } = require("mongodb")

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// const id = new ObjectID()
// console.log(id.id.length)
// console.log(id.toHexString.length)

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
      return console.log("Unable to connect to database!");
    }

    const db = client.db(databaseName);

    // db.collection("users").insertOne(
    //   {
    //     name: "Pio",
    //     age: 27,
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert user");
    //     }

    //     console.log(result.ops);
    //   }
    // );

    // db.collection('users').insertMany([
    //     {
    //         name: 'Peace',
    //         age: 24
    //     },
    //     {
    //         name: 'Pius',
    //         age: 26
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert document')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "Clean the house",
    //       completed: true,
    //     },
    //     {
    //       description: "Renew inspection",
    //       completed: false,
    //     },
    //     {
    //       description: "Pot plants",
    //       completed: false,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert tasks!");
    //     }

    //     console.log(result.ops);
    //   }
    // );

    // db.collection("users").findOne({ _id: new ObjectID("615a951173308a434d7d877d") },
    //   (error, user) => {
    //     if (error) {
    //       return console.log("unable to fetch");
    //     }

    //     console.log(user);
    //   });

    //   db.collection('users').find({ age: 26 }).toArray((error, users) => {
    //       console.log(users)
    //   })

    //   db.collection('users').find({ age: 26 }).count((error, count) => {
    //       console.log(count)
    //   })

    db.collection("task").findOne(
      { _id: new ObjectID("615a8e68318c38cc47e93413") },
      (error, task) => {
        if (error) {
          return console.log("Unable to fetch");
        }

        console.log(task);
      }
    );

    db.collection('task').find({ completed: false }).toArray((error, task) => {
        console.log(task)
    })
});