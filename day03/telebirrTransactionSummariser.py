summeraisedDict = {}

try:
    with open("transactions.txt") as f:
        for line in f:
            name = line.strip().split(",")[0]
            amount = float(line.strip().split(",")[1])
            if (name in summeraisedDict):
                summeraisedDict[name] = float(summeraisedDict[name]) + amount
            else:
                summeraisedDict[name] = amount
        print(summeraisedDict)
except FileNotFoundError:
    print("No transaction file found")

