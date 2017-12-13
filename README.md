# GSPNS Rest API [![Build Status](https://travis-ci.org/aleksandar-babic/busNS-rest-api.svg?branch=master)](https://travis-ci.org/aleksandar-babic/busNS-rest-api)
### What is this?
##### This API will allow you to get all informations about bus lanes (both city and suburban) and all informations about bus schedules (again, both city and suburban).

### How to run it?
* Option 1 - Clone this repository, install node dependencies and run API
```bash
# Assuming that you have Git, NodeJS and NPM already installed
git clone https://github.com/aleksandar-babic/busNS-rest-api.git && cd busNS-rest-api
npm install
npm start
```
* Option 2 - Run inside Docker container
```bash
# Assuming that you have Docker already installed
docker run -it -p 8080:8080 allexki/busns-rest:node
```
> Either of options will start API that listens on port 8080
### How to run unit tests?
API is using Mocha as test runner, chai(and chai-http), to run all unit tests execute following command : 
```bash
npm test
```
### Example response for bus with lane number 11A on work days
```json
{
    "id": "11A.",
    "linija": "Smer A:  Z.STANICA - BOLNICA - LIMAN - Z.STANICA",
    "dan": "R",
    "raspored": {
        "10": [
            "01",
            "13",
            "25",
            "37",
            "49"
        ],
        "11": [
            "01",
            "13",
            "25",
            "37",
            "49"
        ],
        "12": [
            "01",
            "13",
            "25",
            "37",
            "49"
        ],
        "13": [
            "00",
            "10",
            "20",
            "30",
            "40",
            "50"
        ],
        "14": [
            "00",
            "10",
            "20",
            "30",
            "40",
            "50"
        ],
        "15": [
            "00",
            "10",
            "20",
            "30",
            "40",
            "52"
        ],
        "16": [
            "04",
            "16",
            "28",
            "40",
            "52"
        ],
        "17": [
            "04",
            "16",
            "28",
            "40",
            "52"
        ],
        "18": [
            "04",
            "16",
            "31",
            "46"
        ],
        "19": [
            "01",
            "16",
            "31",
            "46"
        ],
        "20": [
            "01",
            "16",
            "38"
        ],
        "21": [
            "00",
            "22",
            "44"
        ],
        "22": [
            "06",
            "28",
            "50"
        ],
        "23": [
            "12",
            "36"
        ],
        "05": [
            "00",
            "15",
            "25",
            "35",
            "45",
            "55"
        ],
        "06": [
            "05",
            "15",
            "25",
            "35",
            "45",
            "55"
        ],
        "07": [
            "05",
            "15",
            "20MDJ",
            "25",
            "30MDJ",
            "35",
            "40MDJ",
            "45",
            "55"
        ],
        "08": [
            "05",
            "15",
            "25",
            "37",
            "49"
        ],
        "09": [
            "01",
            "13",
            "25",
            "37",
            "49"
        ],
        "00": [
            "00"
        ]
    }
}
```
