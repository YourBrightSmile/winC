#!/bin/python3
import json
import requests
import os
import random
from conf.appconfig import memeInfo

def getWeather():
    weatherUrl = "https://weather.cma.cn/api/weather/view?stationid="
    resp = requests.get(weatherUrl)
    if resp.status_code == 200:
        # weatherData = json.loads(resp.content.decode('utf-8'))
        return json.loads(resp.content.decode('utf-8'))
        #weatherData['data']['daily'][0]['date']
    else:
        pass
def getMeme():
    with open(os.path.join(memeInfo["memePath"],random.choice(os.listdir(memeInfo["memePath"]))),"r",encoding='utf-8') as f:
        return random.choice(f.readlines())
# res = getWeather()
#
# print(res['data']['daily'][0]['date'])



