def max_water(height):
    left = 0
    right = len(height) - 1
    maximum = 0

    while left < right:
        area = min(height[left], height[right]) * (right - left)

        if area > maximum:
            maximum = area

        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return maximum