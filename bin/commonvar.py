#!/bin/python3
from lib.otherTools import getWeather
from lib.winTools import getMonitorsAndBrightness, getAudioInfo

infoMethodDict = {'getWeather': getWeather,
                  'getAudioInfo': getAudioInfo,
                  'getMonitorsAndBrightness': getMonitorsAndBrightness,
                  }
