def word_frequency(text):
    new_str = text.lower()
    words = []
    temp_word = ""
    res = {}
    
    for index, word in enumerate(new_str):
        if (word != " "):
            temp_word += word
        else:
            if (temp_word != ""):
                words.append(temp_word)
                temp_word = ""
                
        if (index == len(new_str) -1 and word != " "):
            # print(f"hix {temp_word}")
            words.append(temp_word)
    print(words, "words")
    for word in words:
        if (word in res):
            res[word] += 1
        else:
            res[word] = 1

    return res
# print(word_frequency("hi how are you hi"))