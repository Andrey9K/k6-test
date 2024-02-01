import http from 'k6/http';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { Trend, Rate, Counter, Gauge } from 'k6/metrics';

const apiKey = 'b267882a2ac6eefe6918d99e128fb9cb';
const apiURL = 'http://pimcore-preprod.terminal.lft/pimcore-graphql-webservices/stressTest';

export const _fail_response = new Rate('fail_response');

export const options = {
    // vus: 3,
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
        ],
    },
    stages: [
        // {duration: '5m', target: 5},
        // {duration: '5m', target: 10},
        // {duration: '5m', target: 15},
        // {duration: '5m', target: 20},
        // {duration: '5m', target: 25},
        // {duration: '5m', target: 30},
        // {duration: '5m', target: 35},
        // {duration: '5m', target: 40},
        // {duration: '5m', target: 45},
        // {duration: '5m', target: 50},
        // {duration: '5m', target: 55},
        // {duration: '5m', target: 60},
        // {duration: '5m', target: 65},
        // {duration: '5m', target: 70},
        // {duration: '5m', target: 75},
        // {duration: '5m', target: 80},
        // {duration: '5m', target: 85},
        // {duration: '5m', target: 90},
        // {duration: '5m', target: 95},
        // {duration: '5m', target: 100},
        // {duration: '5m', target: 105},
        // {duration: '5m', target: 110},
        // {duration: '5m', target: 115},
        // {duration: '5m', target: 120},
        // {duration: '5m', target: 125},
        // {duration: '5m', target: 130},
        // {duration: '5m', target: 135},
        // {duration: '5m', target: 140},
        // {duration: '5m', target: 145},
        // {duration: '5m', target: 150},
        // {duration: '5m', target: 155},
        // {duration: '5m', target: 160},
        // {duration: '5m', target: 165},
        // {duration: '5m', target: 170},
        // {duration: '5m', target: 175},
        // {duration: '5m', target: 180},
        // {duration: '5m', target: 185},
        // {duration: '5m', target: 190},
        // {duration: '5m', target: 195},
        // {duration: '5m', target: 200},
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
    ],
    // duration: '1m',
    // iterations: 10
    summaryTrendStats: ["min","avg","med","max","p(90)","p(95)","p(99)"],
};


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
    const randomString = generateRandomString(10);

    const query = `{
    getProductListing (
      filter: "{\\"guid1C\\": \\"${randomString}\\"}"
    ) 
    {
      edges {
        node {
          id
        }
      }
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
    try {
        const json = response.json();
        const hasEdgesKey = !!json.data.getProductListing;
        if (!hasEdgesKey) {
            const fail_response = true;
            console.log(hasEdgesKey);
            console.log(response.json())
            _fail_response.add(fail_response);
        } else {
            const fail_response = false;
            _fail_response.add(fail_response);
        }

    } catch (error) {
        // JSON не корректен
        console.error('JSON не корректен');
        const fail_response = true;
        _fail_response.add(fail_response);
    }
}
export function handleSummary(data) {
    const now = new Date();
    const formattedDate = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
    const formattedTime = `${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;
    const fileName = `./json/result_${formattedDate}-${formattedTime}.json`;
    const fileName2 = `./html/result_${formattedDate}-${formattedTime}.html`;
    return {
        'stdout': textSummary(data, { indent: ' ', enableColors: true }),
        [fileName]: JSON.stringify(data),
        [fileName2]: htmlReport(data),

    };
}
//Установка k6
// sudo snap install k6
// Запуск тестов
// k6 run ./s3-stress-test-query.js
// k6 run --summary-trend-stats "min,avg,med,max,p(90),p(95),p(99)" ./s3-stress-test-query.js
//Запуск теста с более детальной выгрузкой по каждой итерации
// k6 run --out csv=./csv/detail-test-result.csv --summary-trend-stats "min,avg,med,max,p(90),p(95),p(99)" ./s3-stress-test-query.js
// k6 run --out json=./json/detail-test-result.json --summary-trend-stats "min,avg,med,max,p(90),p(95),p(99)" ./s3-stress-test-query.js