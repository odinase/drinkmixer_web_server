import sys

def run_test(test_word):
    filename = "newfile.txt"

    # The 'a' flag tells Python to keep the file contents
    # and append (add line) at the end of the file.
    myfile = open(filename, 'a')

    # Add the line
    myfile.write(test_word)

    # Close the file
    myfile.close()

    print("Complete")
    sys.stdout.flush()

run_test(sys.argv[1])