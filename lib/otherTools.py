#!/bin/python3
import json
import requests


def getWeather():
    weatherUrl = "https://weather.cma.cn/api/weather/view?stationid="
    resp = requests.get(weatherUrl)
    if resp.status_code == 200:
        # weatherData = json.loads(resp.content.decode('utf-8'))
        return json.loads(resp.content.decode('utf-8'))
        #weatherData['data']['daily'][0]['date']
    else:
        pass

# res = getWeather()
#
# print(res['data']['daily'][0]['date'])



