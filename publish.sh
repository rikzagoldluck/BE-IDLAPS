#!/bin/bash

# for i in {1..10}
# do
#   # mosquitto_pub -h localhost -t "silabs/aoa/position/multilocator-timing/ble-pd-4C5BB3110AD2" -m "{\"mac\":\"4C5BB3110AD2\",\"y\":$i,\"time\": $i}"
#   mosquitto_pub -h localhost -t "silabs/aoa/position/multilocator-timing/ble-pd-4C5BB3110C3B" -m "{\"mac\":\"4C5BB3110C3B\",\"y\":$i,\"time\": $i}"
# done
for i in {1..10}
do
  # mosquitto_pub -h localhost -t "silabs/aoa/angle/ble-pd-4C5BB3112B88/ble-pd-4C5BB3110AD2" -m "{\"elevation\":\"71\",\"azimuth\":\"$i\"}"
  mosquitto_pub -h localhost -t "silabs/aoa/angle/ble-pd-4C5BB3112B88/ble-pd-4C5BB3110C66" -m "{\"elevation\":\"71\",\"azimuth\":\"$i\"}"
done
