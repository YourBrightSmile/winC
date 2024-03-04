import datetime
import json
import logging
import platform
import time

import psutil
import re
import socket
import uuid
from psutil._common import bytes2human
import wmi
def getSystemInfo():
    try:
        info = {}
        info['platform'] = platform.system()
        info['platform-release'] = platform.release()
        info['platform-version'] = platform.version()
        info['architecture'] = platform.machine()
        info['hostname'] = socket.gethostname()
        info['ip-address'] = socket.gethostbyname(socket.gethostname())
        info['mac-address'] = ':'.join(re.findall('..', '%012x' % uuid.getnode()))
        info['processor'] = platform.processor()

        info['ram-total'] = str(round(psutil.virtual_memory().total / (1024.0 ** 3),1)) + " GB"
        info['ram-used'] = str(round(psutil.virtual_memory().used / (1024.0 ** 3),1)) + " GB"
        info['boot-time'] = str(datetime.datetime.fromtimestamp(psutil.boot_time()).strftime("%Y-%m-%d %H:%M:%S"))
        return json.dumps(info)
    except Exception as e:
        logging.exception(e)


bytes2human(167677784064)
#内核数
psutil.cpu_count(False)
#逻辑核数
psutil.cpu_count()
psutil.cpu_percent(percpu=True)
psutil.disk_partitions()
psutil.disk_usage('C://')
psutil.disk_io_counters(perdisk=True)
psutil.users()
psutil.net_if_addrs()
uptimestamp = time.mktime(time.localtime(time.time())) - psutil.boot_time()
run_days = int(uptimestamp / 86400)
run_hour = int((uptimestamp % 86400) / 3600)
run_minute = int((uptimestamp % 3600) / 60)
run_second = int(uptimestamp % 60)

#GPU
c = wmi.WMI()
gpus = c.Win32_VideoController()
