class BankAccount:
    def __init__(self, owner, initial_balance = 0):
        self.owner = owner
        self.__balance = initial_balance
        
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.__balance += amount
        
    def withdraw(self, amount):
        if self.__balance < amount:
            raise ValueError("Insufficent balance")
        self.__balance -= amount
    
    @property
    def balance(self):
        return self.__balance
    
    def __str__(self):
        return f"BankAccount(owner={self.owner}, balance={self.balance})"
    

absu = BankAccount("Yabsira", 0)
absu.deposit(200)
absu.deposit(200)
absu.withdraw(100)
print(absu)