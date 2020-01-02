import sys
from time import sleep
import json

with open('drinks.json') as json_file:
    drinks = json.load(json_file)["drinks"]

line = sys.stdin.readline().rstrip('\n')
# Filename to write
filename = "newfile.txt"

# Open the file with writing permission
myfile = open(filename, 'w')

# Write a line to the file
# array = drinks[line]
# for a in array:
#     print(a)
#     myfile.write("{}\n".format(a))

# Close the file
myfile.close()
sleep(5)
print('Complete!')
sys.stdout.flush()
