def is_valid(s):
    openings = []
    for p in s:
        print(p)
        if (p == "(" or p == "[" or p == "{"):
            openings.append(p)
        else:
            # print(openings)
            if (len(openings) == 0):
                return False
            else:
                last_item = openings.pop()
                if (last_item == "(" and p == ")") or (last_item == "{" and p == "}") or (last_item == "[" and p == "]") :
                    continue
                else:
                    return False
        
    return True

print(is_valid("(]"))
