#!/bin/python3
import ctypes
import subprocess
import time
from ctypes import cast, POINTER
import comtypes
import pyautogui
import screen_brightness_control as sbc
import win32con
import win32gui
import win32process
from comtypes import CLSCTX_ALL
from pycaw.api.endpointvolume import IAudioEndpointVolume
from pycaw.api.mmdeviceapi import IMMDeviceEnumerator
from pycaw.constants import DEVICE_STATE, EDataFlow, CLSID_MMDeviceEnumerator
from pycaw.utils import AudioUtilities
from pyvda import AppView, VirtualDesktop, get_virtual_desktops

from lib import policyconfig as pc
from lib.winInfoLib import *
from conf.appconfig import appconfig

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
    try:
        if type == 'all' or type == 'out':
            speakers = AudioUtilities.GetSpeakers()
            if speakers:
                tmp = {}
                #BUG 0xC0000005  fixed
                #interface = speakers.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
                #volume = cast(interface, POINTER(IAudioEndpointVolume))
                volume = AudioUtilities.CreateDevice(speakers).EndpointVolume
                tmp['volume'] = round(volume.GetMasterVolumeLevelScalar() * 100)
                tmp['isMute'] = volume.GetMute()
                volumeInfo['speaker'] = tmp

        if type == 'all' or type == 'in':
            microphone = AudioUtilities.GetMicrophone()
            if microphone:
                tmp = {}
                #interface = microphone.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
                #volume = cast(interface, POINTER(IAudioEndpointVolume))
                volume = AudioUtilities.CreateDevice(microphone).EndpointVolume
                tmp['volume'] = round(volume.GetMasterVolumeLevelScalar() * 100)
                tmp['isMute'] = volume.GetMute()
                volumeInfo['microphone'] = tmp

    except Exception as e:
        print("getAudioVolumeInfo: ",e)
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
    try:
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
    except Exception as e:
        print("enumAudioDevices: ",e)
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
    #deviceInfo,monitorInfo=None,None
    if audioInfo and deviceInfo and monitorInfo:
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

# desktops start from 1
# window (startX,startY,endX,endY)
# Window and desktop  not working properly  , can't get handle from grandchild process ,ex.calc , execute calc will open child process to start Calcutor process (so window hwnd in grandchild process)
def startProgarmOnWindowDesktop(commands, window=None, desktops=1):
    vdNum = len(get_virtual_desktops())
    current_desktop = VirtualDesktop.current()
    current_app = AppView.current()
    target_desktop = VirtualDesktop(3)
    # VirtualDesktop(1).rename('desktop xx')
    # AppView.current().pin()
    # VirtualDesktop(5).go()
    # VirtualDesktop(3).create()
    if desktops > vdNum:
        createDesktops(desktops)
    for command in commands:
        if command:
            # mons = win32api.EnumDisplayMonitors()
            # win32api.GetMonitorInfo()
            startupinfo = subprocess.STARTUPINFO()
            startupinfo.dwFlags |= subprocess.STARTF_USESHOWWINDOW
            #
            startupinfo.wShowWindow = win32con.SW_MINIMIZE
            process = subprocess.Popen(command,
                                       startupinfo=startupinfo,
                                       creationflags=win32con.DETACHED_PROCESS | win32con.CREATE_NEW_PROCESS_GROUP,
                                       close_fds=True)

            time.sleep(0.1)
            print(process.pid)
            # 移动并显示窗口
            moveWindowForPid(process.pid, 0, 0, desktops, win32con.SW_SHOWMINIMIZED)
            print("comman end...", command)

def createDesktops(desktops, names=None):
    vdNum = len(get_virtual_desktops())
    if desktops > vdNum:
        for i in range(vdNum, desktops):
            VirtualDesktop(i).create()
            if names:
                VirtualDesktop(i).rename(names[i - vdNum])

def moveWindowForPid(pid, x, y, SW, desktop=1, ):
    def callback(hwnd, hwnds):
        # not need window visible
        # if win32gui.IsWindowVisible(hwnd) and win32gui.IsWindowEnabled(hwnd):
        if win32gui.IsWindow(hwnd):
            _, found_pid = win32process.GetWindowThreadProcessId(hwnd)
            # Default IME will be GET also
            if found_pid == pid and "Default IME" not in win32gui.GetWindowText(hwnd):
                print(hwnd)
                x0, y0, x1, y1 = win32gui.GetWindowRect(hwnd)
                w = x1 - x0
                h = y1 - y0
                # win32gui.MoveWindow(hwnd, x, y, w, h, True)
                print("xxx", x, y, w, h)
                win32gui.MoveWindow(hwnd, x, y, w, h, True)
                # 最小化显示窗口
                win32gui.ShowWindow(hwnd, SW)
                # app = AppView(hwnd)
                # app.move(VirtualDesktop(desktop))
        return True

    hwnds = []
    win32gui.EnumWindows(callback, hwnds)
    if hwnds is not None:
        return hwnds
    else:
        return False

def getAppInfo():
    return appconfig



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



