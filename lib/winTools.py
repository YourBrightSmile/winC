import win32api
from ctypes import WinDLL
user32 = WinDLL("user32")
user32.keybd_event(0xAF, 0, 0, 0)
user32.keybd_event(0xAE, 0, 0, 0)



# 通知窗口用户生成了应用程序命令事件，例如，使用鼠标单击应用程序命令按钮或在键盘上键入应用程序命令键。
# WM_APPCOMMAND = 0x319
# APPCOMMAND_VOLUME_MAX = 0x0a
# APPCOMMAND_VOLUME_MIN = 0x09
# APPCOMMAND_VOLUME_DOWN = 0xAE
# APPCOMMAND_VOLUME_UP = 0xAF
# APPCOMMAND_MICROPHONE_VOLUME_DOWN = 0x15
# APPCOMMAND_MICROPHONE_VOLUME_UP = 0x16
#win32api.SendMessage(-1, WM_APPCOMMAND, 0x30292, APPCOMMAND_VOLUME_MAX * 0x10000) 0xA0000
#win32api.SendMessage(-1, WM_APPCOMMAND, 0x30292, APPCOMMAND_VOLUME_MIN * 0x10000) 0x90000
