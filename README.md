# Parking Lot
AWS Lambda & dynamoDB parking application

## Usage
Host: 
```
https://oybopy61c3.execute-api.us-west-2.amazonaws.com/prod
```


##### Car Enter/Exit:
```
method: GET
path: /notify?parkingLotId=<PARKING LOT ID>&status=<STATUS>&plate=<CAR LICENSE PLATE>
```
- PARKING LOT ID is a string designating the specified parking lot.
- STATUS can be either "exit" or "enter".
- CAR LICENSE PLATE is the string of the car license plate.

Gets car enter/exit and store the parking record into DynamoDB.


##### Parking Lot Report:
```
method: GET
path: /lotReport?parkingLotId=<PARKING LOT ID>
```

-  PARKING LOT ID is a string designating the specified parking lot.

Gets a specific parking lot week report with plates number of the cars parked in it and their parking time.


##### User Car Report:
```
method: GET
path: /userReport?plate=<CAR LICENSE PLATE>
```
-  CAR LICENSE PLATE is the string of the car license plate.

Gets a specific user's car report with lot ids of the lots that the car parked in and it's parking time at each one of them.


##### User Charges:
dynamoDB Streams:
at each update of a car status (/notify), dynamoDB triggers a call to the lambda function which calculate the user's charge (5$ hourly charge),
 and d trigger a request to this url, if the user owe over 50$:
 ```
 http://charges.examples.com/charge?plate=<LICENSE PLATE>
 ```
 

## Data Modeling:
 
1. Table:
    - Partition key: uniqueId
    - *used to put unique items

2. GSI 1:
    - Partition key:  plate
    - Sort key:       parkingLotId
    - *used to validate and get car status before putting/updating a new car status

3. GSI 2:
    - Partition key:  parkingLotId
    - Sort key:       enterTime
    -  *used to get a week time lot report

4. GSI 3:
    - Partition key:  plate
    - Sort key:       enterTime
    - *used to get a month time user report

##Consistency & Concurrency:
 - The app makes sure to check the car's status before each it reports enter/exit to the lot. If a car entered in the past and didn't exit yet, it reports an error. If a car notifies an exit to a parking lot without an entrance, it also reports an error.
 - When the parking lot manager or a car driver pulls up the stats for a parking lot or plate number, the app searchs the database and calculates the deltas between each entrance and exit. If there is no exit yet, It considers that as if the calculation of time is up to now. In such cases, when a car has not yet exited there may be inconsistencies with what actually exists in the database after getting the report.
 - The entire system depends on AWS's integrity. In the event of a failure on their part, there is no way of knowing how the system will behave. Depending on the failure.
 - Concurrency exists from Node.js and AWS being environments which operate asynchronously and parallel.