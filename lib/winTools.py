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
    # vol_range = volume.GetVolumeRange()
    cur_volume = volume.GetMasterVolumeLevel()
    isMute = volume.GetMute()

    # volume.GetMute()
    # volume.SetMute(1, None)
    volume.SetMasterVolumeLevelScalar(volumeSize, None)


def winMicrophoneAdjust(volumeSize, method):
    # user32 = WinDLL("user32")
    # volume_up
    # user32.keybd_event(0xAF, 0, 0, 0)
    # volume_down
    # user32.keybd_event(0xAE, 0, 0, 0)
    devices = AudioUtilities.GetMicrophone()
    interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
    volume = cast(interface, POINTER(IAudioEndpointVolume))
    # vol_range = volume.GetVolumeRange()
    cur_volume = volume.GetMasterVolumeLevel()
    isMute = volume.GetMute()

    # volume.GetMute()
    # volume.SetMute(1, None)
    volume.SetMasterVolumeLevelScalar(volumeSize, None)


def getAudioDeviceVolume(direction="in", state=DEVICE_STATE.ACTIVE.value):
    devices = []
    # for all use EDataFlow.eAll.value
    if direction == "in":
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
    deviceIDName = {}
    for device in devices:
        deviceIDName['id'] = device.id
        deviceIDName['name'] = device.FriendlyName
        deviceIDName['volume'] = device._volume
    return deviceIDName


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
# a=comtypes.CoCreateInstance(CLSID_PolicyConfigClient,IMMDeviceEnumerator,CLSCTX_ALL)
