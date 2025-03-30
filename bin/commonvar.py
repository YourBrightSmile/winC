#!/bin/python3
from lib.musicLib import getMusicInfo, ctrlMusicShortcuts
from lib.otherTools import *
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
                  'getIfStats': getIfStats,
                  'getCpuStats': getCpuStats,
                  'getGpuStats': getGpuStats,
                  'getMemStats': getMemStats,
                  'getDiskStats': getDiskStats,
                  'getMusicInfo': getMusicInfo,
                  'geMeme': getMeme,
                  'ctrlMusicShortcuts': ctrlMusicShortcuts,

                  }
