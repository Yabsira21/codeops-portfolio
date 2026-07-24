def count_vowels(s):
    res = 0
    for l in s:
        if (l == "a" or l == "e" or l == "i" or l == "o" or l == "u" or l == "A" or l == "E" or l == "I" or l == "O" or l == "U"):
            res += 1
    
    return res

# print(count_vowels("Hellou"))