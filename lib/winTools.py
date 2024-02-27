#!/bin/python3
import win32api
import win32con
import ctypes
from ctypes import wintypes
from ctypes import WinDLL

PHYSICAL_MONITOR_DESCRIPTION_SIZE = 128


class PHYSICAL_MONITOR(ctypes.Structure):
    _fields_ = [('hPhysicalMonitor', wintypes.HANDLE),
                ('szPhysicalMonitorDescription',
                 ctypes.c_wchar * PHYSICAL_MONITOR_DESCRIPTION_SIZE)]

def winVolumeAdjust():
    user32 = WinDLL("user32")
    #volumn_up
    user32.keybd_event(0xAF, 0, 0, 0)
    #volumn_down
    user32.keybd_event(0xAE, 0, 0, 0)

def winBrightnessAdjust(brightness):
    MONITOR_DEFAULTTOPRIMARY = 1
    h_wnd = ctypes.windll.user32.GetDesktopWindow()
    h_monitor = ctypes.windll.user32.MonitorFromWindow(h_wnd, MONITOR_DEFAULTTOPRIMARY)
    nummons = wintypes.DWORD()
    bres = ctypes.windll.Dxva2.GetNumberOfPhysicalMonitorsFromHMONITOR(h_monitor, ctypes.byref(nummons))
    physical_monitors = (PHYSICAL_MONITOR * nummons.value)()
    bres = ctypes.windll.Dxva2.GetPhysicalMonitorsFromHMONITOR(h_monitor, nummons, physical_monitors)
    physical_monitor = physical_monitors[0]
    min_brightness = wintypes.DWORD()
    max_brightness = wintypes.DWORD()
    cur_brightness = wintypes.DWORD()

    curBres = ctypes.windll.Dxva2.GetMonitorBrightness(physical_monitor.hPhysicalMonitor, ctypes.byref(min_brightness), ctypes.byref(cur_brightness), ctypes.byref(max_brightness))
    print(curBres)
    bres = ctypes.windll.Dxva2.SetMonitorBrightness(physical_monitor.hPhysicalMonitor, brightness)

winBrightnessAdjust(20)




