#!/bin/python3
from lib.otherTools import getWeather
from lib.winTools import getAudioDevices, getMonitorsAndBrightness

infoMethodDict = {'getWeather': getWeather,
                  'getAudioDevices': getAudioDevices,
                  'getMonitorsAndBrightness': getMonitorsAndBrightness,
                  }
