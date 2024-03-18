import wmi


def get_size(bytes, suffix="B"):
    """
    Scale bytes to its proper format
    e.g:
        1253656 => '1.20MB'
        1253656678 => '1.17GB'
    """
    factor = 1024
    for unit in ["", "K", "M", "G", "T", "P"]:
        if bytes < factor:
            return f"{bytes:.2f}{unit}{suffix}"
        bytes /= factor


w = wmi.WMI()
w.Win32_OperatingSystem()[0].Caption
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