const AWS = require('aws-sdk');
let awsConfig = require('C:/Users/i355539/.aws/local');
AWS.config.update(awsConfig);
const handler = require('./index').handler;

let enter = {
    "httpMethod": "GET",
    "path": "/notify",
    "queryStringParameters": {
        "plate": "1243124132325",
        "parkingLotId": "22",
        "status": "enter"
    }
};

let exit = {
    "httpMethod": "GET",
    "path": "/notify",
    "queryStringParameters": {
        "plate": "1243124132325",
        "parkingLotId": "22",
        "status": "exit"
    }
};

let userRep = {
    "httpMethod": "GET",
    "path": "/userReport",
    "queryStringParameters": {
        "plate": "1243124132325",
    }
};

let lotRep = {
    "httpMethod": "GET",
    "path": "/lotReport",
    "queryStringParameters": {
        "parkingLotId": "1",
    }
};

let record = {
    "Records": [{
        "eventID": "6e0cb53785f8bebd9fadefce2014feb7",
        "eventName": "INSERT",
        "eventVersion": "1.1",
        "eventSource": "aws:dynamodb",
        "awsRegion": "us-west-2",
        "dynamodb": {
            "ApproximateCreationDateTime": 1559568225,
            "Keys": {"uniqid": {"S": "s7hwv7jwgenjyg"}},
            "NewImage": {
                "exitTime": {"N": "0"},
                "parkingLotId": {"S": "5"},
                "plate": {"S": "212121"},
                "uniqid": {"S": "s7hwv7jwgenjyg"},
                "enterTime": {"N": "1559568224967"}
            },
            "SequenceNumber": "3574900000000061043767973",
            "SizeBytes": 90,
            "StreamViewType": "NEW_IMAGE"
        },
        "eventSourceARN": "arn:aws:dynamodb:us-west-2:087537676854:table/parkingLotDb/stream/2019-06-03T13:11:56.792"
    }]
};

handler(lotRep);
