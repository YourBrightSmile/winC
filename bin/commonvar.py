#!/bin/python3
from lib.otherTools import getWeather
from lib.winTools import *

infoMethodDict = {'getWeather': getWeather,
                  'getMonitorsAndBrightness': getMonitorsAndBrightness,
                  'switchIODevice': switchIODevice,
                  'winVolumeAdjust': winVolumeAdjust,
                  'winMicrophoneAdjust': winMicrophoneAdjust,
                  'setMonitorBrightness': setMonitorBrightness,
                  'getControlInfo': getControlInfo,
                  'getAudioOutVolumeInfo': getAudioOutVolumeInfo,
                  'getAudioInVolumeInfo': getAudioInVolumeInfo,
                  }
