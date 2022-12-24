#!/bin/bash

cd ../app && node index.js &

nginx -g "daemon off;"

