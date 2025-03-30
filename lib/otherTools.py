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
    res = {}
    try:
        with open(os.path.join(memeInfo["memePath"],random.choice(os.listdir(memeInfo["memePath"]))),"r",encoding='utf-8') as f:
            excerpt =  random.choice(f.readlines())
        if excerpt is not None:
            res['excerpt'] = excerpt
    except:
            res['excerpt'] = r"今日无言。"

    gifPath = os.path.join(memeInfo["gifPath"],random.choice(os.listdir(memeInfo["gifPath"])))
    if gifPath is not None:
        res['gifPath'] = gifPath
    return res

def safe_rename(old_path, new_path):
    """安全重命名文件，自动处理错误"""
    try:
        os.rename(old_path, new_path)
        return True
    except FileNotFoundError:
        print(f"错误: 文件 {old_path} 不存在")
    except FileExistsError:
        print(f"错误: 文件 {new_path} 已存在")
    except PermissionError:
        print("错误: 无权限操作文件")
    return False
def get_randomFileR(directory):
    file_list = []
    for root, _, files in os.walk(directory):
        for file in files:
            file_list.append(os.path.join(root, file))
    if not file_list:
        return None
    return random.choice(file_list)

