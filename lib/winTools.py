#!/bin/python3
import time
from ctypes import cast, POINTER
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


def getMonitorsAndBrightness():
    mab = {}
    mons = sbc.list_monitors()
    for mon in mons:
        try:
            mab[mon] = sbc.get_brightness(mon)[0]
        except Exception as e:
            print("except Exception:", e)
    return mab


def setMonitorBrightness(display, brightness):
    sbc.set_brightness(brightness, display)


# volumeSize 0.01-1.00
def winVolumeAdjust(volumeSize, method):
    # user32 = WinDLL("user32")
    # volume_up
    # user32.keybd_event(0xAF, 0, 0, 0)
    # volume_down
    # user32.keybd_event(0xAE, 0, 0, 0)
    devices = AudioUtilities.GetSpeakers()
    interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
    volume = cast(interface, POINTER(IAudioEndpointVolume))
    volume.SetMasterVolumeLevelScalar(volumeSize, None)
    volume.SetMute()


def winMicrophoneAdjust(volumeSize, method):
    # user32 = WinDLL("user32")
    # volume_up
    # user32.keybd_event(0xAF, 0, 0, 0)
    # volume_down
    # user32.keybd_event(0xAE, 0, 0, 0)
    devices = AudioUtilities.GetMicrophone()
    interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
    volume = cast(interface, POINTER(IAudioEndpointVolume))
    volume.SetMasterVolumeLevelScalar(volumeSize, None)
    volume.SetMute()


def getAudioVolumeInfo():
    volumeInfo = {}
    speakers = AudioUtilities.GetSpeakers()
    if speakers:
        tmp = {}
        interface = speakers.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
        volume = cast(interface, POINTER(IAudioEndpointVolume))
        tmp['volume'] = round(volume.GetMasterVolumeLevelScalar()*100)
        tmp['isMute'] = volume.GetMute()
        volumeInfo['speaker'] = tmp

    microphone = AudioUtilities.GetMicrophone()
    if microphone:
        tmp = {}
        interface = microphone.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
        volume = cast(interface, POINTER(IAudioEndpointVolume))
        tmp['volume'] = round(volume.GetMasterVolumeLevelScalar()*100)
        tmp['isMute'] = volume.GetMute()
        volumeInfo['microphone'] = tmp
    return volumeInfo


def getAudioDevicesID(direction="all", state=DEVICE_STATE.ACTIVE.value):
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
    if deviceEnumerator is None:
        return devices

    collection = deviceEnumerator.EnumAudioEndpoints(Flow, state)
    if collection is None:
        return devices

    count = collection.GetCount()
    for i in range(count):
        dev = collection.Item(i)
        if dev is not None:
            if not ": None" in str(AudioUtilities.CreateDevice(dev)):
                devices.append(AudioUtilities.CreateDevice(dev))
    devicesID = {}
    # for device in devices:
    #     tmp = {}
    #     tmp['id'] = device.id
    #     tmp['state'] = device.state.value
    #     deviceInfo[device.FriendlyName] = tmp
    for device in devices:
        devicesID[device.FriendlyName] = device.id
    return devicesID
    #TODO 添加in out字段

def getAudioInfo():
    audioInfo = getAudioVolumeInfo()
    nameid = getAudioDevicesID("all")
    if nameid:
        audioInfo['deviceInfo'] = nameid
        return audioInfo

def switchIODevice(deviceId, role):
    policy_config = comtypes.CoCreateInstance(
        pc.CLSID_PolicyConfigClient,
        pc.IPolicyConfig,
        comtypes.CLSCTX_ALL
    )
    # Set OutputDevice: policy_config.SetDefaultEndpoint(deviceId, 0)
    # Set IputDevice: policy_config.SetDefaultEndpoint(deviceId, 1)

    policy_config.SetDefaultEndpoint(deviceId, role)
    policy_config.Release()


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
a = AudioUtilities.GetAllDevices()
a[1].state.value
