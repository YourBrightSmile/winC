import ctypes
import subprocess
import sys
import time

import win32con
import tkinter as tk
import threading

vta = ctypes.WinDLL(r"C:\Users\nopnop\Desktop\VirtualDesktopAccessor.dll")
# vta.GoToDesktopNumber(2)
root = tk.Tk()
root.title('aeaeaeae')

def openProcess():
    time.sleep(30)
    #vta.GoToDesktopNumber(2)
    startupinfo = subprocess.STARTUPINFO()
    startupinfo.dwFlags |= subprocess.STARTF_USESHOWWINDOW
    startupinfo.wShowWindow = win32con.SW_SHOW
    process = subprocess.Popen("notepad", startupinfo=startupinfo, creationflags=win32con.DETACHED_PROCESS, close_fds=True)
    root.destroy()


t = threading.Thread(target=openProcess)
t.start()
root.mainloop()
