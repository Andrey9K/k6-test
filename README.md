<p align="center">
  <img width="600" height="200" src="https://upload.wikimedia.org/wikipedia/commons/5/54/K6-load-testing-tool-logo.svg">
</p>


## Установка k6
    sudo snap install k6
### Установка доп. выгрузки html
    npm install k6-html-reporter --save-dev
Выгрузка html  не поддерживает p(99).
## Запуск тестов
Перед запуском добавьте apiKey и apiURL в скрипты (s3-stress-test-query.js , s3-stress-test-mutation.js)

Запуск осуществляется через терминал (терминал должен находиться в дериктории проекта).
    Подробнее настройки можно посмотреть в <a href="https://k6.io/docs/get-started/results-output/">документации</a>
#### Запуск скрипта на чтение

    k6 run ./s3-stress-test-query.js 
           
#### Запуск скрипта на запись
    
    k6 run ./s3-stress-test-mutation.js

### Детальная выгрузка по каждой итерации
Для более детальной выгрузки по каждой итерации в исходную каменду для запуска необходимо добавить:
#### Для CSV
    
    --out csv=./csv/detail-test-result.csv

#### Для Json 
    
    --out json=./json/detail-test-result.json 
###Например
#### Для полной выгрузки на чтение
    
    k6 run --out csv=./csv/detail-test-result.csv --out json=./json/detail-test-result.json ./s3-stress-test-mutation.js

#### Для полной выгрузки на запись
    
    k6 run --out csv=./csv/detail-test-result.csv --out json=./json/detail-test-result.json ./s3-stress-test-mutation.js
