def read_numbers(filename):
    res = []
    try:
        with open(filename) as f:
            for line in f:
                try:
                    num = int(line)
                    res.append(num)
                except:
                    continue
        return res
            
    except FileNotFoundError:
        print("File Not Found")
        return []
    
print(read_numbers("test.txt"))