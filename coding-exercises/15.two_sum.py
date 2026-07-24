def two_sum(nums, target):
    sorted_nums = sorted(nums)
    # for i, num in enumerate(sorted_nums):
    window = sum(nums[:2])
    if (window == target): return [0, 1]
    # best = window
    for i in range(2, len(sorted_nums)):
        window += nums[i] - nums[i - 2]
        if (window == target): return [i, i+1]
    return "Not found"
        
print( two_sum([3,7,7], 6))