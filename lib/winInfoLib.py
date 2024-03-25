#!/bin/python3
import os

import pynvml
import wmi

winInfoDict = ['']
w = wmi.WMI()

def getOsInfo():
    result = {}
    # systeminfo
    for system in w.Win32_OperatingSystem():
        tmp = {}
        usernameFull = os.environ['userdomain'] + '\\' + os.getlogin()+'@'+os.environ['COMPUTERNAME']
        tmp['osname'] = system.Caption
        tmp['usernameFull'] = usernameFull
        result['OperatingSystem'] = tmp

    w.Win32_Processor()
    w.Win32_DiskDrive()
    w.Win32_LogicalDisk()
    w.Win32_BaseBoard()
    w.Win32_NetworkAdapterConfiguration(IPEnabled=True)
    w.Win32_BIOS()
    w.Win32_PhysicalMemory()
    w.Win32_Process()
    w.Win32_VideoController()
    # w.Win32_PerfFormattedData_Counters_ThermalZoneInformation()[0].Temperature-273
    w.Win32_PerfFormattedData_Counters_ThermalZoneInformation()[0].Temperature
    # pynvml.nvmlDeviceGetTemperature(handle, 0)
'''
nop@SZMGINB1409A
----------------
Uptime: 14 days, 8 hours, 12 mins
IP: 1.1.1.1(WLAN)/2.2.2.2(ETH)/3.3.3.3(FIBER)
MAC: AA:BB:CC:DD:EE:FF/
CPU: Intel i5-5300U (4) @ 2.294GHz
GPU: Intel i5-5300U (4) @ 2.294GHz
Memory: 97MiB / 12543MiB
Disk: DISKNAME/DISKNAME/DISKNAME/DISKNAME
OS: Windows 10 x86_64
'''