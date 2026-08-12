def flatten_nested_loop(lst):
    result = []

    for item in lst:
        if isinstance(item, list):
            result.extend(flatten_nested_loop(item))
        else:
            result.append(item)

    return result

# def flatten_nested_loop(lst):
#     result = []
    
#     for i in lst:
#         if type(i) == list:
#             for j in i:
#                 result.append(j)
        
#         else:
#             result.append(i)
    
#     return result