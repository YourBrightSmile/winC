import clr # the pythonnet module.
import os 
cwdpath = os.getcwd()
clr.AddReference(cwdpath+r'\OpenHardwareMonitorLib.dll') 
# e.g. clr.AddReference(r'OpenHardwareMonitor/OpenHardwareMonitorLib'), without .dll

from OpenHardwareMonitor.Hardware import Computer

c = Computer()
c.CPUEnabled = True # get the Info about CPU
c.GPUEnabled = True # get the Info about GPU
c.Open()
c.Hardware[0].Update()
c.Hardware[1].Update()
print(c.Hardware[0].Sensors)
print(c.Hardware[0].Sensors[0].Identifier)
print(c.Hardware[0].Sensors[0].get_Value())
print(c.Hardware[0].Sensors[0].get_Value())
print(c.Hardware[1].Sensors[0].get_Name())
#while True:
#    for a in range(0, len(c.Hardware[0].Sensors)):
#        # print(c.Hardware[0].Sensors[a].Identifier)
#        if "/temperature" in str(c.Hardware[0].Sensors[a].Identifier):
#            print(c.Hardware[0].Sensors[a].get_Value())
#            c.Hardware[0].Update()
