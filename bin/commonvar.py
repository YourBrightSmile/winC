#!/bin/python3
from lib.otherTools import getWeather
from lib.winTools import getMonitorsAndBrightness, getAudioInfo, switchIODevice, winVolumeAdjust, winMicrophoneAdjust, \
    setMonitorBrightness

infoMethodDict = {'getWeather': getWeather,
                  'getAudioInfo': getAudioInfo,
                  'getMonitorsAndBrightness': getMonitorsAndBrightness,
                  'switchIODevice': switchIODevice,
                  'winVolumeAdjust': winVolumeAdjust,
                  'winMicrophoneAdjust': winMicrophoneAdjust,
                  'setMonitorBrightness': setMonitorBrightness,
                  }
