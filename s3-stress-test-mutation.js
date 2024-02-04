import http from 'k6/http';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import {Rate} from 'k6/metrics'

const apiKey = 'b267882a2ac6eefe6918d99e128fb9cb';
const apiURL = 'http://pimcore-preprod.terminal.lft/pimcore-graphql-webservices/stressTest';

export const failResponse = new Rate('fail_response');

export const options = {
    summaryTrendStats: ["min","avg","med","max","p(90)","p(95)","p(99)"],
    thresholds: {
        http_req_failed: [
            {
                threshold: 'rate <= 0.1',
                abortOnFail: true,
            },
        ],
        'fail_response': [
            {
                threshold: 'rate <= 0.1',
                abortOnFail: true,
            }
        ]
    },
    stages: [
        {duration: '5m', target: 5},
        {duration: '5m', target: 10},
        {duration: '5m', target: 15},
        {duration: '5m', target: 20},
        {duration: '5m', target: 25},
        {duration: '5m', target: 30},
        {duration: '5m', target: 35},
        {duration: '5m', target: 40},
        {duration: '5m', target: 45},
        {duration: '5m', target: 50},
        {duration: '5m', target: 55},
        {duration: '5m', target: 60},
        {duration: '5m', target: 65},
        {duration: '5m', target: 70},
        {duration: '5m', target: 75},
        {duration: '5m', target: 80},
        {duration: '5m', target: 85},
        {duration: '5m', target: 90},
        {duration: '5m', target: 95},
        {duration: '5m', target: 100},
        {duration: '5m', target: 105},
        {duration: '5m', target: 110},
        {duration: '5m', target: 115},
        {duration: '5m', target: 120},
        {duration: '5m', target: 125},
        {duration: '5m', target: 130},
        {duration: '5m', target: 135},
        {duration: '5m', target: 140},
        {duration: '5m', target: 145},
        {duration: '5m', target: 150},
        {duration: '5m', target: 155},
        {duration: '5m', target: 160},
        {duration: '5m', target: 165},
        {duration: '5m', target: 170},
        {duration: '5m', target: 175},
        {duration: '5m', target: 180},
        {duration: '5m', target: 185},
        {duration: '5m', target: 190},
        {duration: '5m', target: 195},
        {duration: '5m', target: 200},
        {duration: '5m', target: 205},
        {duration: '5m', target: 210},
        {duration: '5m', target: 215},
        {duration: '5m', target: 220},
        {duration: '5m', target: 225},
        {duration: '5m', target: 230},
        {duration: '5m', target: 240},
        {duration: '5m', target: 245},
        {duration: '5m', target: 250},
        {duration: '5m', target: 255},
        {duration: '5m', target: 260},
        {duration: '5m', target: 265},
        {duration: '5m', target: 270},
        {duration: '5m', target: 275},
    ]
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

export default function () {
    const randomString = generateRandomString(15);
    const query = `mutation {
  createProduct (
    parentId: 4786496
    key: "stress_test_${randomString}"
    input: {
      name: "stress_test_${randomString}"
      guid1C: "${randomString}"
      code1C: "stress_test_${randomString}"
      codeWMS: "${randomString}"
      codeSupplier: "${randomString}"
      codeManufacturer: "${randomString}"
      status: "Новинка"
      categoryAccounting: "Наборы"
      direction:
        {id: 22275, type: "object"}
      subject:
        {id: 22275, type: "object"}
      brand:
        {id: 22275, type: "object"}
      series:
        {id: 22275, type: "object"}      
      article: "${randomString}"
      mainCharacteristics: "${randomString}"
      comment: "${randomString}"
      productName: "${randomString}"
      directAnalogue:[
        {id: 104, type: "object"},
        {id: 177139, type: "object"}
      ]
      WB: "${randomString}"
      productName1: "${randomString}"
      ozone: "${randomString}"
      productName2: "${randomString}"
      sitesGeneral: "${randomString}"      
      catalogView:
        {id: 106, type: "object"}
      WEBName: "${randomString}"
      marketingPropertiesValues:[
        {id: 743233, type: "object"},
        {id: 743245, type: "object"}
      ]
      picture: "${randomString}"
      video: "${randomString}"
      etimClass:
        {id: 163646, type: "object"}
      raecID: "${randomString}"
      units:[
        {id: 3967449, type: "object"},
        {id: 3967461, type: "object"}
      ]
      minimumIndivisibleMultiplicity: 123
      minimumMultiplicitySales: 124 
      DateMeasurement: "0001-01-01T00:00:00"
      importer:
        {id: 22140, type: "object"}
      russian: "${randomString}"
      kazakh: "${randomString}"
      armenian: "${randomString}"
      uzbek: "${randomString}"
      moldavian: "${randomString}"
      kyrgyz: "${randomString}"
      countryOrigin: "${randomString}"
    }
  ) {
    success message
  }
}`;

    const headers = {
        'Content-Type': 'application/json',
        'apiKey': apiKey
    };

    const response = http.post(
        apiURL ,
        JSON.stringify({ query }),
        { headers }
    );
    if (response.status === 200) {
        const json= response.json();
        const success = !!json.data.createProduct.success
        if (success === false) {
            failResponse.add(true);
        } else {
            failResponse.add(false);
        }
    } else {
        failResponse.add(true);
    }
}
export function handleSummary(data) {
    const now = new Date();
    const formattedDate = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
    const formattedTime = `${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;
    const json = `./json/summary_${formattedDate}-${formattedTime}.json`;
    const html = `./html/result_${formattedDate}-${formattedTime}.html`;
    return {
        'stdout': textSummary(data, { indent: ' ', enableColors: true }),
        [json]: JSON.stringify(data),
        [html]: htmlReport(data)
    }
}