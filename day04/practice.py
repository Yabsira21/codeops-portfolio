class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    def describe(self):
        print(f"{self.title} is a {self.pages}-page book by author {self.author}")

book_1 = Book("The Great Gatsby", " F. Scott Fitzgerald", 300)
book_2 = Book("Animal Farm", " George Orwel", 200)

class Product:
    def __init__(self, name, price, qty):
        self.name = name
        self.price = price
        self.__qty = qty

    def restock(self, n): 
        if (n <= 0):
            raise ValueError("Must be positive")
        self.__qty += n
    
    def sell(self, n):
        if (n <= 0):
            raise ValueError("Must be positive")
        if (n > self.__qty):
            print("Insufficent quantity")
            return
        self.__qty -= n
    
    @property
    def quantity(self):
        return self.__qty
    
qty_1 = Product("Coke", 10, 100)
qty_2 = Product("Pepsi", 15, 50)
qty_3 = Product("Meth", 20, 40)

qty_1.sell(80)

print(qty_1.quantity)
print(qty_2.quantity)
print(qty_3.quantity)