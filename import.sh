#!/bin/bash

mongoimport --host mongodb --db metrics --collection metrics --type json --file /mongo-seed/metrics.json --jsonArray
