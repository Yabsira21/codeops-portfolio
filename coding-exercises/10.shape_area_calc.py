from abc import ABC, abstractmethod

class Shape(ABC):
    
    @abstractmethod
    def area():
        pass
    
    def describe(self):
        print(f"I am a with area {self.area()}")
        
        
class Circle(Shape):
    # PI = 3.14159
    
    def __init__(self, radius):
        self.radius = radius
        
    
    def area(self):
        return self.radius * self.radius * 3.14159
    

class Rectangle(Shape):
    def __init__(self, height, width):
        self.height = height
        self.width = width
        
    def area(self):
        return self.height * self.width
    
class Triangle(Shape):
    def __init__(self, height, base):
        self.height = height
        self.base = base
        
    def area(self):
        return self.height * self.base * 0.5
    

tri = Triangle(10, 10)
circle = Circle(10)
rec = Rectangle(10, 10)
s = Shape()

print(tri.area())
print(circle.area())
print(rec.area())

def total_areas(shape):
    sum = 0
    for s in shape:
        sum += s.area()
    return sum



    