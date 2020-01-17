const AWS = require("aws-sdk");


const dynamo = new AWS.DynamoDB.DocumentClient({ region: "us-west-2", });
const tableName = "test";

const put = () => {
    dynamo.put(
        {
            TableName: tableName,
            Item: {
                id: "123",
                value: "Hello World",
            },
        },
        (err, data) => {
            if (err) {
                console.log("Error on put");
                console.log(err);
            }
        });
}

const ddelete = (increment) => {
    dynamo.delete(
        {
            TableName: tableName,
            Key: {
                id: "123",
            },
            ReturnValues: "ALL_OLD"
        },
        (err, data) => {
            if (data && data.Attributes) {
                increment();
            }
        });
}


put();

let deletes = 0;
for (let j = 0; j < 10; ++j) {
    ddelete(() => {
        deletes += 1;
        console.log(`Deletes: ${deletes}`);
    });
}

