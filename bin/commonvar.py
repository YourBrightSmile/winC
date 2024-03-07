#!/bin/python3
from lib.otherTools import getWeather
from lib.winTools import getMonitorsAndBrightness, getAudioDeviceVolume

infoMethodDict = {'getWeather': getWeather,
                  'getAudioDeviceVolume': getAudioDeviceVolume,
                  'getMonitorsAndBrightness': getMonitorsAndBrightness,
                  }
