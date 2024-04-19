import re
import time

import pymem
import requests
from pyautogui import hotkey
from conf.appconfig import qqMusicShortcuts

# qqmisic character string
patternSpec = '"music.richFlag.listening.ListeningMusicReport" : {\n      "method" : "ListeningMusicReport",\n      "module" : "music.richFlag.listening",\n'

# img
imgGetUrl = 'https://i.y.qq.com/v8/playsong.html?ADTAG=ryqq.songDetail&songmid='


def getMusicInfo():
    try:
        qqMusic = pymem.Pymem("QQMusic.exe")
    except Exception as e:
        return "NA"
        #print("pymem init failed", e)
    if qqMusic:
        result = {}
        address = qqMusic.pattern_scan_all(patternSpec.encode('utf-8'), return_multiple=True)
        if len(address) == 0:
            hotkey(qqMusicShortcuts['play'].replace(' ', '').split('+'))
            time.sleep(0.5)
            hotkey(qqMusicShortcuts['play'].replace(' ', '').split('+'))
            address = qqMusic.pattern_scan_all(patternSpec.encode('utf-8'), return_multiple=True)

        for addr in address:
            try:
                str = qqMusic.read_string(addr, 600)
                # need modify
                if len(str) == 600:
                    result['songmid'] = re.search('songmid" : "(.*)"', str)[1]
                    result['songid'] = re.search('songID" : (.*),', str)[1]
                    # origin remainingTime is played time , not real remaining time
                    # result['remainingTime'] = int(re.search('songPlayTime" : (.*),', str)[1]) - int(re.search('remainingTime" : (.*),', str)[1])
                    resp = requests.get(imgGetUrl + result['songmid'])
                    result['songImgUrl'] = \
                        re.search(r'<meta itemProp="image" content="(.*)2592000"/><script', resp.text)[1] + "2592000"
                    result['songName'] = \
                    re.search('''<meta itemProp="name" content="(.*)"/><meta itemProp="description"''', resp.text)[1]

                    if result:
                        return result
            except Exception as e:
                pass
    else:
        return "N/A"


def getMusicLyrics(song):
    pass


'''
https://y.gtimg.cn/music/photo_new/T002R150x150M000004JcPEC0LHeiB_1.jpg?max_age=2592000


'''


def ctrlMusicShortcuts(params):
    app = params['app']
    key = params['key']
    if app == "QQMusic":
        if key == 'play':
            hotkey(qqMusicShortcuts[key].replace(' ', '').split('+'))
        elif key == 'previous':
            hotkey(qqMusicShortcuts[key].replace(' ', '').split('+'))
        elif key == 'next':
            hotkey(qqMusicShortcuts[key].replace(' ', '').split('+'))
        elif key == 'volup':
            hotkey(qqMusicShortcuts[key].replace(' ', '').split('+'))
        elif key == 'voldown':
            hotkey(qqMusicShortcuts[key].replace(' ', '').split('+'))
    pass
