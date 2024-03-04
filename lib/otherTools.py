#!/bin/python3
import json

import requests
import re


def getWeather():
    weatherUrl = "https://weather.cma.cn/api/weather/view?stationid="
    resp = requests.get(weatherUrl)
    if resp:
        weatherData = json.loads(resp.content.decode('utf-8'))
        return weatherData
        #weatherData['data']['daily'][0]['date']
    else:
        pass


# res = getWeather()
#
# print(res['data']['daily'][0]['date'])



