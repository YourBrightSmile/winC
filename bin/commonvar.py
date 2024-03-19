#!/bin/python3
from lib.otherTools import getWeather
from lib.winTools import getMonitorsAndBrightness, switchIODevice, winVolumeAdjust, winMicrophoneAdjust, \
    setMonitorBrightness, getControlInfo

infoMethodDict = {'getWeather': getWeather,
                  'getMonitorsAndBrightness': getMonitorsAndBrightness,
                  'switchIODevice': switchIODevice,
                  'winVolumeAdjust': winVolumeAdjust,
                  'winMicrophoneAdjust': winMicrophoneAdjust,
                  'setMonitorBrightness': setMonitorBrightness,
                  'getControlInfo': getControlInfo,
                  }
