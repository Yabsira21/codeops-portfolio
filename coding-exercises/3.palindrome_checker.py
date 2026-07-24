def is_palindrome(str):
    new_str = str.strip().lower()
    reversed = ""
    for l in range(len(new_str) - 1, -1, -1):
        reversed += new_str[l]
    
    # print(new_str)
    # print(reversed)
    return new_str == reversed

# print(is_palindrome("saas"))   