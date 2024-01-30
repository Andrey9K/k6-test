<p align="center">
  <img width="600" height="200" src="https://upload.wikimedia.org/wikipedia/commons/5/54/K6-load-testing-tool-logo.svg">
</p>


## Установка k6
    sudo snap install k6

## Запуск тестов
Перед запуском добавьте apiKey и apiURL в скрипты (s3-stress-test-query.js , s3-stress-test-mutation.js)

Запуск осуществляется через терминал.
#### Запуск скрипта на чтение

####
    k6 run --summary-trend-stats "min,avg,med,max,p(90),p(95),p(99)" ./s3-stress-test-query.js
#### Запуск скрипта на запись
#### 
    k6 run --summary-trend-stats "min,avg,med,max,p(90),p(95),p(99)" ./s3-stress-test-mutation.js

### Детальная выгрузка по каждой итерации

#### Выгрузка csv фала на чтение
    
    k6 run --out csv=./csv/detail-test-results.csv --summary-trend-stats "min,avg,med,max,p(90),p(95),p(99)" ./s3-stress-test-query.js

#### Выгрузка json фала на чтение
    
    k6 run --out json=./json/detail-test-results.json --summary-trend-stats "min,avg,med,max,p(90),p(95),p(99)" ./s3-stress-test-query.js

#### Выгрузка csv фала на запись
    
    k6 run --out csv=./csv/detail-test-results.csv --summary-trend-stats "min,avg,med,max,p(90),p(95),p(99)" ./s3-stress-test-mutation.js

#### Выгрузка json фала на запись
    
    k6 run --out json=./json/detail-test-results.json --summary-trend-stats "min,avg,med,max,p(90),p(95),p(99)" ./s3-stress-test-mutation.js
