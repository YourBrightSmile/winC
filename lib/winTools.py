#!/bin/python3
import time
from ctypes import cast, POINTER

import wmi
from comtypes import CLSCTX_ALL
from pycaw.api.endpointvolume import IAudioEndpointVolume
from pycaw.api.mmdeviceapi import IMMDeviceEnumerator
from pycaw.constants import DEVICE_STATE, EDataFlow, CLSID_MMDeviceEnumerator
from pycaw.utils import AudioUtilities
import comtypes
import ctypes
import screen_brightness_control as sbc
from lib import policyconfig as pc
import pyautogui
import clr  # the pythonnet module.
import os
from lib.winInfoLib import *

# cwdpath = os.getcwd()
# clr.AddReference(cwdpath + r'\OpenHardwareMonitorLib.dll')
# clr.AddReference(cwdpath+r'\lib\OpenHardwareMonitorLib.dll')
# from OpenHardwareMonitor.Hardware import Computer


def getMonitorsAndBrightness():
    mab = {}
    mons = sbc.list_monitors()
    for mon in mons:
        try:
            mab[mon] = sbc.get_brightness(mon)[0]
        except Exception as e:
            print("except Exception:", e)
    return mab


def setMonitorBrightness(params):
    brightness = params['brightness']
    display = params['display']
    sbc.set_brightness(brightness, display)


# volumeSize 0.01-1.00
def winVolumeAdjust(params):
    # user32 = WinDLL("user32")
    # volume_up
    # user32.keybd_event(0xAF, 0, 0, 0)
    # volume_down
    # user32.keybd_event(0xAE, 0, 0, 0)
    param = params['param']
    devices = AudioUtilities.GetSpeakers()
    interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
    volume = cast(interface, POINTER(IAudioEndpointVolume))
    if param == 'mute':
        volume.SetMute(1, None)
    elif param == 'nomute':
        volume.SetMute(0, None)
    elif param == 0 or param == '0':
        volume.SetMasterVolumeLevelScalar(0, None)
    else:
        volume.SetMasterVolumeLevelScalar(round(int(param) / 100, 2), None)


def winMicrophoneAdjust(params):
    # user32 = WinDLL("user32")
    # volume_up
    # user32.keybd_event(0xAF, 0, 0, 0)
    # volume_down
    # user32.keybd_event(0xAE, 0, 0, 0)
    print(params)
    param = params['param']
    devices = AudioUtilities.GetMicrophone()
    interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
    volume = cast(interface, POINTER(IAudioEndpointVolume))
    if param == 'mute':
        volume.SetMute(1, None)
    elif param == 'nomute':
        volume.SetMute(0, None)
    elif param == 0 or param == '0':
        volume.SetMasterVolumeLevelScalar(0, None)
    else:
        volume.SetMasterVolumeLevelScalar(round(int(param) / 100, 2), None)


def getAudioVolumeInfo(type):
    volumeInfo = {}
    if type == 'all' or type == 'out':
        speakers = AudioUtilities.GetSpeakers()
        if speakers:
            tmp = {}
            interface = speakers.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
            volume = cast(interface, POINTER(IAudioEndpointVolume))
            tmp['volume'] = round(volume.GetMasterVolumeLevelScalar() * 100)
            tmp['isMute'] = volume.GetMute()
            volumeInfo['speaker'] = tmp
    if type == 'all' or type == 'in':
        microphone = AudioUtilities.GetMicrophone()
        if microphone:
            tmp = {}
            interface = microphone.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
            volume = cast(interface, POINTER(IAudioEndpointVolume))
            tmp['volume'] = round(volume.GetMasterVolumeLevelScalar() * 100)
            tmp['isMute'] = volume.GetMute()
            volumeInfo['microphone'] = tmp
    return volumeInfo

def getAudioOutVolumeInfo():
    return getAudioVolumeInfo('out')
def getAudioInVolumeInfo():
    return getAudioVolumeInfo('in')
def enumAudioDevices(direction="all", state=DEVICE_STATE.ACTIVE.value):
    devices = []
    # for all use EDataFlow.eAll.value
    if direction == "all":
        Flow = EDataFlow.eAll.value  # 2
    elif direction == "in":
        Flow = EDataFlow.eCapture.value  # 1
    else:
        Flow = EDataFlow.eRender.value  # 0

    deviceEnumerator = comtypes.CoCreateInstance(
        CLSID_MMDeviceEnumerator,
        IMMDeviceEnumerator,
        comtypes.CLSCTX_INPROC_SERVER)
    collection = deviceEnumerator.EnumAudioEndpoints(Flow, state)
    if collection:
        count = collection.GetCount()
        for i in range(count):
            dev = collection.Item(i)
            if dev is not None:
                if not ": None" in str(AudioUtilities.CreateDevice(dev)):
                    devices.append(AudioUtilities.CreateDevice(dev))
    #deviceEnumerator.Release()
    return devices


def getAudioDevicesID():
    devicesIn = enumAudioDevices('in')
    devicesOut = enumAudioDevices('out')

    devicesID = {}
    if len(devicesIn) > 0:
        for device in devicesIn:
            tmp = {}
            defaultDev = AudioUtilities.GetMicrophone()
            tmp['id'] = device.id
            if defaultDev.GetId() == device.id:
                tmp['default'] = 1
            else:
                tmp['default'] = 0
            tmp['id'] = device.id
            tmp['class'] = "in"
            devicesID[device.FriendlyName] = tmp

    if len(devicesOut) > 0:
        for device in devicesOut:
            tmp = {}
            defaultDev = AudioUtilities.GetSpeakers()
            tmp['id'] = device.id
            if defaultDev.GetId() == device.id:
                tmp['default'] = 1
            else:
                tmp['default'] = 0
            tmp['class'] = "out"
            devicesID[device.FriendlyName] = tmp

    return devicesID


def getControlInfo():
    audioInfo = getAudioVolumeInfo('all')
    deviceInfo = getAudioDevicesID()
    monitorInfo = getMonitorsAndBrightness()
    if deviceInfo and audioInfo and monitorInfo:
        audioInfo['audioInfo'] = deviceInfo
        audioInfo['monitorInfo'] = monitorInfo
        return audioInfo


def switchIODevice(params):
    policy_config = comtypes.CoCreateInstance(
        pc.CLSID_PolicyConfigClient,
        pc.IPolicyConfig,
        comtypes.CLSCTX_ALL
    )
    # Set OutputDevice: policy_config.SetDefaultEndpoint(deviceId, 0)
    # Set IputDevice: policy_config.SetDefaultEndpoint(deviceId, 1)

    policy_config.SetDefaultEndpoint(params['deviceId'], int(params['role']))
    policy_config.Release()


def getWinInfoByTypes(isall=0, *types):
    winInfo = {}
    if isall:
        for t in winInfoDict:
            winInfoDict[t]()
    else:
        for t in types:
            winInfoDict[t]()
    return winInfo


def isWinLocked():
    return ctypes.windll.user32.GetForegroundWindow() == 0


# can't use, windown prevent input
def unlockWindows():
    try:
        pyautogui.click(1, 1, 1)
        time.sleep(1)
        pyautogui.click(pyautogui.locateOnScreen('password_box.png'))
        time.sleep(1)
        pyautogui.FAILSAFE = False
        pyautogui.typewrite("ff", 1)
        pyautogui.typewrite("enter", 1)
        time.sleep(1)
    except:
        pass

# time.sleep(10)
# unlockWindows()

# winBrightnessAdjust(20)
# print(getMonitorsAndBrightness())
#
# setMonitorBrightness('Lenovo 40A0',100)
# sbc.fade_brightness(0,None,0.01)
# winVolumeAdjust()

# inD = getAudioDevices('in')
# outD = getAudioDevices('out')
# for i in inD:
#     print(i, inD[i])
# for o in outD:
#     print(o)
# c=comtypes.CoCreateInstance(CLSID_PolicyConfigClient,IMMDeviceEnumerator,CLSCTX_ALL)
