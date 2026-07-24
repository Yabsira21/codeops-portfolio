def find_duplicates(lst):
    res = []
    dict = {}
    for num in lst: 
        if (num in dict):
            dict[num] += 1
        else:
            dict[num] = 1
            
    print(dict)
    
    for key in list(dict.keys()):
        if (dict[key] > 1):
            res.append(key)
        # print(dict[key])
    
    return res