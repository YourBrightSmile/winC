import shlex
import subprocess
import threading
import time

import psutil
import win32api
import win32con
import win32gui
import win32process
import win32service
from pyvda import AppView, get_apps_by_z_order, VirtualDesktop, get_virtual_desktops


# desktops start from 1
# window (startX,startY,endX,endY)
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
            # 后台打开窗口，无图标，无窗口
            startupinfo.wShowWindow = win32con.SW_HIDE
            process = subprocess.Popen(command,
                                       startupinfo=startupinfo,
                                       creationflags=win32con.DETACHED_PROCESS | win32con.CREATE_NEW_PROCESS_GROUP,
                                       close_fds=True)

            time.sleep(0.1)
            print(process.pid)
            #  not working properly
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


# n = AppView(hwnds[0])
# n.move(VirtualDesktop(3))
#
# StartInfo = win32process.STARTUPINFO()
# StartInfo.dwX, StartInfo.dwY = (800, 800)
# StartInfo.dwFlags |= subprocess.STARTF_USESHOWWINDOW
# StartInfo.dwFlags |= win32con.STARTF_USEPOSITION
# StartInfo.wShowWindow = win32con.SW_MINIMIZE
# StartInfo.dwX = 1400
# StartInfo.dwY = 0
# process = win32process.CreateProcess(None,  # Name
#                                  "notepad",  # command
#                                  None,  # ProcessSecurityAttributes
#                                  None,  # ThreadSecurityAttributes
#                                  True,  # bInheritHandles
#                                  #win32con.NORMAL_PRIORITY_CLASS | win32con.CREATE_NEW_CONSOLE,
#                                  win32con.CREATE_NEW_CONSOLE,
#                                  # CreationFlags
#                                  None,  # Environment
#                                  None,  # CurrentDirectory
#                                 StartInfo)  # StartupInfo
from ctypes import *

WORD = c_ushort
DWORD = c_ulong
LPBYTE = POINTER(c_ubyte)
LPTSTR = POINTER(c_wchar_p)
HANDLE = c_void_p
DEBUG_PROCESS = 0x00000001
CREATE_NEW_CONSOLE = 0x00000010


class STARTUPINFO(Structure):
    _fields_ = [
        ("cb", DWORD),
        ("lpReserved", LPTSTR),
        ("lpDesktop", LPTSTR),
        ("lpTitle", LPTSTR),
        ("dwX", DWORD),
        ("dwY", DWORD),
        ("dwXSize", DWORD),
        ("dwYSize", DWORD),
        ("dwXCountChars", DWORD),
        ("dwYCountChars", DWORD),
        ("dwFillAttribute", DWORD),
        ("dwFlags", DWORD),
        ("wShowWindow", WORD),
        ("cbReserved2", WORD),
        ("lpReserved2", LPBYTE),
        ("hStdInput", HANDLE),
        ("hStdOutput", HANDLE),
        ("hStdError", HANDLE),
    ]


class PROCESS_INFORMATION(Structure):
    _fields_ = [
        ("hProcess", HANDLE),
        ("hThread", HANDLE),
        ("dwProcessId", DWORD),
        ("dwThreadId", DWORD),
    ]
deskName = "BBB"
hDesktop = win32service.CreateDesktop(deskName, 0, win32con.GENERIC_ALL, None)
kernel32 = windll.kernel32
creation_flags = win32con.DETACHED_PROCESS | win32con.CREATE_NEW_PROCESS_GROUP
startupinfo = STARTUPINFO()
processinfo = PROCESS_INFORMATION()
startupinfo.dwFlags = 0x1
startupinfo.wShowWindow = win32con.SW_SHOW

startupinfo.lpDesktop = pointer(c_wchar_p(deskName))
# startupinfo.lpDesktop = pointer(c_char_p(r"WinSta0\Default".encode('utf-8')))
startupinfo.cb = sizeof(startupinfo)
kernel32.CreateProcessW(None, "notepad", None, None, None, creation_flags, None, None, byref(startupinfo),
                            byref(processinfo))
StartInfo = win32process.STARTUPINFO()
StartInfo.lpDesktop = deskName
StartInfo.dwFlags = win32con.STARTF_USESHOWWINDOW
StartInfo.wShowWindow = win32con.SW_SHOW
ProcInfo = win32process.CreateProcess(
    None,
    "mspaint.exe",
    None,
    None,
    True,
    win32con.NORMAL_PRIORITY_CLASS | win32con.CREATE_NEW_CONSOLE,
    None,
    None,
    StartInfo)
def getWindows(hDesktop):
    hDesktop.SetThreadDesktop()
    print("aa")
    import pygetwindow as pg
    pg.getAllTitles()
    pg.getAllWindows()
    hDesktop.EnumDesktopWindows()
