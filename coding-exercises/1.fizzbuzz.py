def fizzbuzz(arr):
    for num in range(1, arr + 1):
        if (num % 3 == 0 and num % 5 == 0):
            print("FizzBuzz")
        elif (num % 3 == 0):
            print("Buzz")
        elif (num % 5 == 0):
            print("Buzz")
        else:
            print(num)

# fizzbuzz(16)