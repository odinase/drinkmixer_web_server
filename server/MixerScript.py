import RPi.GPIO as GPIO
from RpiMotorLib import RpiMotorLib
from time import sleep
import sys
import json

with open('drinks.json') as json_file:
    drinks = json.load(json_file)["drinks"]

GPIO.setmode(GPIO.BCM)
direction= 21       # Direction -> GPIO Pin
step = 20      # Step -> GPIO Pin
enable = 17
GPIO_pins = (40, 41, 42) # Microstep Resolution MS1-MS3 -> GPIO Pin
servopins = [26, 19, 13, 6, 5]
for i in servopins:
    GPIO.setup(i, GPIO.OUT)
zeropoint = 90

GPIO.setup(17, GPIO.OUT)
GPIO.output(17, 1)        #Set the enable pin high to disable outputs. Saves power!3
mymotor = RpiMotorLib.A4988Nema(direction, step, GPIO_pins, "A4988")

def makedrink(ingredientlist):
    currentPos = 0
    prevdrink = 0
    for i in ingredientlist:
        if i == prevdrink:
            sleep(1.2)
        currentPos = gotoandpump(currentPos, i)
        prevdrink = i
    home(abs(currentPos))
    currentPos = 0
    

def gotoandpump(position, drink):
    servopins = [26, 19, 13, 6, 5]
    Positions = [0, 370, 870, 1370, 1870, 2370, 2870]
    if Positions[drink] > position:
        dir = 'fwd'
    else:
        dir = 'back'
    goto(dir, abs(Positions[drink]-position))
    sleep(0.2)
    pump(servopins[drink-1])
    return Positions[drink]

def home(length):
    GPIO.output(17, 0)
    mymotor.motor_go(False, "Full" , round(length/2), .0008, False, .05)
    mymotor.motor_go(False, "Full" , round(length/2), .0008, False, .05)
    GPIO.output(17, 1)
    
def goto(dir, length):
    GPIO.output(17, 0)
    if dir == 'fwd':
        mymotor.motor_go(True, "Full" , length, .0005, False, .05)
    else:
        mymotor.motor_go(False, "Full" , length, .0005, False, .05)
    GPIO.output(17, 1)
    

def pump(servoPIN):
    p = GPIO.PWM(servoPIN, 50)
    p.start(angle(zeropoint-60))
    sleep(2)
    p.ChangeDutyCycle(angle(zeropoint+10))
    sleep(0.2)
    p.ChangeDutyCycle(angle(zeropoint-20))
    sleep(0.2)
    p.ChangeDutyCycle(angle(zeropoint+10))
    sleep(0.2)
    p.stop()
    
def angle(desA):
    return ((desA/18)+2.5)

drink = sys.stdin.readline().rstrip('\n') 
makedrink(drinks[drink])
print('Complete!')
sys.stdout.flush()
