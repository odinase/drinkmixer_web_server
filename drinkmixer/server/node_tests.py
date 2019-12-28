import sys

while True:
    line = sys.stdin.readline()
    # Filename to write
    filename = "newfile.txt"

    # Open the file with writing permission
    myfile = open(filename, 'w')

    # Write a line to the file
    myfile.write("{}\n".format(line))

    # Close the file
    myfile.close()
