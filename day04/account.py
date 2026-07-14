class Account:
    
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self.__balance = balance
    
    @property
    def balance(self):
        return self.__balance
    
    def deposit(self, amount):
        if (amount <= 0):
            raise ValueError("Must be positive")
        self.__balance += amount
    
    def withdraw(self, amount):
        if (amount <= 0):
            raise ValueError("Must be positive")
        if (amount > self.__balance):
            print("Insufficent balance")
            return
        self.__balance -= amount

    def statement(self):
        print(f"You have {self.__balance} ETB")
        
acc_1 = Account("account holder 1", "100")
acc_2 = Account("account holder 2", "101")

acc_1.deposit(200)
acc_2.deposit(300)

acc_1.withdraw(600)
acc_2.withdraw(100)

print(acc_1.balance)
print(acc_2.balance)