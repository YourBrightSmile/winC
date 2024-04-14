#!/bin/python3
import datetime
import os

import clr
import psutil
from psutil._common import bytes2human
from pynvml import *
import wmi

cwdpath = os.getcwd()
clr.AddReference(cwdpath + r'\..\lib\OpenHardwareMonitorLib.dll')
# clr.AddReference(cwdpath + r'\lib\OpenHardwareMonitorLib.dll')
# clr.AddReference(cwdpath+r'\lib\OpenHardwareMonitorLib.dll')
from OpenHardwareMonitor.Hardware import Computer
from OpenHardwareMonitor import Hardware

w = wmi.WMI()


def getOsInfo():
    result = {}
    result['domain'] = os.environ['userdomain']
    result['user'] = os.getlogin()
    result['computername'] = os.environ['COMPUTERNAME']

    for system in w.Win32_OperatingSystem():
        result['os'] = system.Caption + "." + system.BuildNumber + " / " + system.InstallDate[:8] + "_installed"

    result['uptime'] = datetime.datetime.fromtimestamp(psutil.boot_time()).strftime("%Y-%m-%d %H: %M: %S")
    ifaddrs, ifstats = psutil.net_if_addrs(), psutil.net_if_stats()
    result['ip'] = ""
    result['mac'] = ""
    for name, val in ifstats.items():
        res = {}
        if ifstats[name][0] and 'Loopback' not in name:
            result['ip'] = result['ip'] + ifaddrs[name][1].address + "/"
            result['mac'] = result['mac'] + ifaddrs[name][0].address + "/"
    result['ip'] = result['ip'][:-1]
    result['mac'] = result['mac'][:-1]
    # for name, val in ifstats.items():
    #     res = {}
    #     if ifstats[name][0] and 'Loopback' not in name:
    #         iftmp = {}
    #         iftmp["address"] = ifaddrs[name][1].address
    #         iftmp["netmask"] = ifaddrs[name][1].netmask
    #         iftmp["netmask-c"] = sum(bin(int(x)).count('1') for x in ifaddrs[name][1].netmask.split('.'))
    #         iftmp["mac"] = ifaddrs[name][0].address
    #         res[name] = iftmp
    #         result['ifinfo'].update(res)
    cpus = w.Win32_Processor()
    result['cpu'] = ""
    for c in cpus:
        if c.Availability == 3:
            result['cpu'] += c.name + " / "
    if result['cpu']:
        result['cpu'] = result['cpu'][:-2]

    vcs = w.Win32_VideoController()
    result['gpu'] = ""
    for v in vcs:
        if v.Availability == 3:
            result['gpu'] += v.name + " / "
    if result['gpu']:
        result['gpu'] = result['gpu'][:-2]

    memsinfo = w.Win32_PhysicalMemory()
    if len(memsinfo) > 0:
        for phymem in memsinfo:
            result['memory'] = phymem.PartNumber + " " + str(bytes2human(int(phymem.Capacity))) + " " + str(
                phymem.Speed) + "MHz /"
    if result['memory']:
        result['memory'] = result['memory'][:-2]
    swapinfo = psutil.swap_memory()
    if swapinfo:
        result['swap'] = str(bytes2human(int(swapinfo.used))) + " Used / " + str(
            bytes2human(int(swapinfo.total))) + " Total"
    diskinfo = w.Win32_DiskDrive()
    if diskinfo:
        tmp = ""
        for disk in diskinfo:
            tmp = tmp + disk.Caption + " " + str(bytes2human(int(disk.Size))) + " " + disk.MediaType + '''
      '''
    result['disk'] = tmp.rstrip()
    return result


def getIfStats():
    result = {}
    ifstats = psutil.net_io_counters()
    result['bytes_sent'] = str(bytes2human(ifstats.bytes_sent))
    result['bytes_recv'] = str(bytes2human(ifstats.bytes_recv))
    res = ''' NET


 SEND: ''' + result['bytes_sent'] + '''

 RECV: ''' + result['bytes_recv'] + '''
    '''
    return res


def getCpuTempPower():
    cpuResult = {}
    handle = Computer()
    handle.CPUEnabled = True
    # handle.GPUEnabled = True
    handle.Open()
    for hardware in handle.Hardware:
        if hardware.HardwareType == Hardware.HardwareType.CPU:
            hardware.Update()
            for sensor in hardware.Sensors:
                if sensor.SensorType == Hardware.SensorType.Temperature and "Package" in sensor.Name:
                    cpuResult[sensor.Name + " Temp"] = sensor.Value
                if sensor.SensorType == Hardware.SensorType.Power and "Package" in sensor.Name:
                    cpuResult[sensor.Name + " Power"] = sensor.Value
    handle.Close()
    if cpuResult:
        return cpuResult


def getGpuStats():
    # intel
    # gpus = w.Win32_VideoController()
    result = {}
    nvmlInit()
    handle = nvml.nvmlDeviceGetHandleByIndex(0)
    meminfo = nvmlDeviceGetMemoryInfo(handle)
    result['gpu_memused'] = str(bytes2human(meminfo.used))
    result['gpu_memtotal'] = str(bytes2human(meminfo.total))
    result['gpu_fan'] = str(nvmlDeviceGetFanSpeed(handle)) + '%'
    result['gpu_power'] = str(round(nvmlDeviceGetPowerUsage(handle) / 1024, 2)) + "W"
    result['gpu_percent'] = str(nvmlDeviceGetUtilizationRates(handle).gpu) + "%"
    result['gpu_temp'] = str(nvmlDeviceGetTemperature(handle, NVML_TEMPERATURE_GPU)) + "℃"
    res = (''' GPU      ''' + result['gpu_percent'] + '''

   ''' + result['gpu_memused'] + '/' + result['gpu_memtotal'] + '''
  
   Fan ''' + result['gpu_fan'] + '''
   
 ''' + result['gpu_power'] + ',' + result['gpu_temp'])
    nvmlShutdown()
    return res


def getCpuStats():
    result = {}
    result['cpus'] = len(w.Win32_Processor())
    result['cpus'] = str(psutil.cpu_count(logical=False))
    result['lcpus'] = str(psutil.cpu_count())
    result['freq'] = str(round(psutil.cpu_freq().current / 1000, 2)) + "GHz"
    result['maxfreq'] = str(round(psutil.cpu_freq().max / 1000, 2)) + "GHz"
    result['cpu_percent'] = str(psutil.cpu_percent(interval=1)) + "%"
    ctp = getCpuTempPower()
    for name, value in ctp.items():
        # if "Power" in name:
        #     result['power'] = str(round(value)) + "W"
        if "Temp" in name:
            result['temp'] = str(round(value)) + "℃"
    result['power'] = "40W"

    res = ''' CPU  ''' + result['maxfreq'] + '''

     ''' + result['cpu_percent'] + '''
    ''' + result['freq'] + '''

   ''' + result['power'] + ',' + result['temp']
    return res


def getMemStats():
    result = {}
    memstats = psutil.virtual_memory()
    result['mem_total'] = str(bytes2human(memstats.total))
    result['mem_used'] = str(bytes2human(memstats.used))
    result['mem_percent'] = str(memstats.percent) + "%"
    result['mem_speed'] = str(w.Win32_PhysicalMemory()[0].Speed) + "MHz"
    res = ''' MEM   ''' + result['mem_speed'] + '''

        
     ''' + result['mem_percent'] + '''
     
  ''' + result['mem_used'] + '/' + result['mem_total']
    return res


def getDiskStats():
    result = {}
    tmpstr = ''
    part = psutil.disk_partitions()
    for p in part:
        tmp = {}
        dUse = psutil.disk_usage(p.mountpoint)
        tmp['fstype'] = p.fstype
        tmp['total'] = str(bytes2human(dUse.total))
        tmp['used'] = str(bytes2human(dUse.used))
        tmp['free'] = str(bytes2human(dUse.free))
        tmp['percent'] = str(dUse.percent) + "%"
        tmpstr = tmpstr + '  ' + p.mountpoint + " " + tmp['used'] + ' / ' + tmp['total'] + ' \t' + tmp[
            'percent'] + ', ' + tmp['fstype'] + '\n'
        result[p.mountpoint] = tmp
    smemstats = psutil.swap_memory()
    result['smem_total'] = str(bytes2human(smemstats.total))
    result['smem_used'] = str(bytes2human(smemstats.used))
    result['smem_percent'] = str(smemstats.percent) + "%"
    res1 = '''
SWAP:
    ''' + result['smem_used'] + ' / ' + result['smem_total'] + ',' + result['smem_percent']

    res2 = '''

MOUNT:
''' + tmpstr
    return res1 + res2
