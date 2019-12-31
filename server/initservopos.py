import RPi.GPIO as GPIO
from RpiMotorLib import RpiMotorLib
from time import sleep

def angle(desA):
    return ((desA/18)+2.5)

GPIO.setmode(GPIO.BCM)
servopins = [26, 19, 13, 6, 5]
zeropoint = 90
for i in servopins:
    GPIO.setup(i, GPIO.OUT)
    p = GPIO.PWM(i, 50)
    p.start(angle(zeropoint))
    sleep(0.2)
    p.stop()

GPIO.cleanup()