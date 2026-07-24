def concat(lst):
    str = ""
    for l in lst:
        str += l
    return str

def group_anagrams(words):
    # sorted_wrds = []
    res = []
    dict = {}
    for w in words:
        # sorted_wrds.append(concat(sorted(w)))
        sorted_word = concat(sorted(w))
        print(sorted_word)
        if (sorted_word in dict):
            dict[sorted_word].append(w)
        else:
            dict[sorted_word] = [w]
            
    # print(dict.values())
    return list(dict.values())
    # print(sorted_wrds)
    
# print(group_anagrams(["eat","tea", "tan", "ate", "nat", "bat"]))