#!/bin/python3
import wmi

winInfoDict = ['']
w = wmi.WMI()

def getOperatingSystem():
    result = {}
    # systeminfo
    for system in w.Win32_OperatingSystem():
        tmp = {}
        tmp['systemname'] = system.Caption
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