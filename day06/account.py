class Account: 
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self.__balance = balance
        self._observers = []
    
    @property
    def balance(self):
        return self.__balance
    
    def deposit(self, amount):
        if (amount <= 0):
            raise ValueError("Must be positive")
        self.__balance += amount
        depositAlert = AlertService()
        depositAlert.sendMsg(f"Your acc {self.account_number} has been credited with {amount}")
        self._notify(
        f"Your acc {self.account_number} has been credited with {amount}"
    )
        
    def withdraw(self, amount):
        if (amount <= 0):
            raise ValueError("Must be positive")
        if (amount > self.__balance):
            print("Insufficent balance")
            return
        self.__balance -= amount
        withdrawAlert = AlertService()
        withdrawAlert.sendMsg(f"Your acc {self.account_number} has been debited {amount}")
        
        self._notify(
        f"Your acc {self.account_number} has been debited {amount}")
    
    def _notify(self, event):
        for obs in self._observers:
            obs.update(event)
            
    def subscribe(self, obs):
        self._observers.append(obs)

    def statement(self):
        print(f"You have {self.__balance} ETB")
        

class AccountFactory():
    @staticmethod
    def create(kind, owner, number, balance=0):
        if kind == "savings":
            return SavingAccount(owner, number, balance)
        if kind == "current":
            return CurrentAccount(owner, number, balance)
        raise ValueError(f"Unknown type: {kind}")
        
class SavingAccount(Account):
    def __init__(self, owner, number, balance=0, rate=0.05):
        super().__init__(owner, number, balance)
        self.rate = rate
    
    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)
    
    def statement(self):
        print(
            f"You have {self.balance} ETB (rate: {self.rate * 100}%)"
        )
        
class CurrentAccount(Account):
    def __init__(self, owner, num, balance=0, od=1000):
        super().__init__(owner, num,balance)
        self.overdraft = od
        
    def withdraw(self, amount):
        if (amount <= 0):
            raise ValueError("Must be positive")
        
        if amount > self.balance + self.overdraft:
            raise ValueError("Over limit")
        self._Account__balance -= amount
    
    def statement(self):
        print(
            f"You have {self.balance} ETB (overdraft: {self.overdraft} ETB)"
        )

class AlertService:
    def sendMsg(self, msg):
        print(msg)
        
class SMSAlert:
    def update(self, event):
        print(f"[Account SMS] {event}")
        
acc = AccountFactory.create("savings","Almaz", "CBE-1")
acc.subscribe(SMSAlert())
acc.deposit(500)

# acc_1 = Account("account holder 1", "100")
# acc_2 = Account("account holder 2", "101")
# acc_3 = CurrentAccount("acc", "101", 100, 1000)

# # acc_3.statement()

# accounts = [
#     Account("acc_1", "100"),
#     SavingAccount("acc_2", "101", 0.05, 500),
#     CurrentAccount("acc_3", "102", 100, 1000)
# ]

# for acc in accounts:
#     acc.statement()

# acc_1.deposit(200)
# acc_2.deposit(300)

# acc_1.withdraw(600)
# acc_2.withdraw(100)

# print(acc_1.balance)
# print(acc_2.balance)