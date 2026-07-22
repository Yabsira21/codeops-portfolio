class Account: 
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self.__balance = balance
        self._observers = []
        self.history = []
    
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
        record = ("deposit", amount)
        self.history.append(record)
        
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
        record = ("withdraw", amount)
        self.history.append(record)
    
    def _notify(self, event):
        for obs in self._observers:
            obs.update(event)
            
    def subscribe(self, obs):
        self._observers.append(obs)

    def statement(self):
        print(f"You have {self.__balance} ETB")
        
    def undo_last(self):
        if (len(self.history) == 0):
            print("You have no transaction")
            return
        last_transcation = self.history.pop()
        if (last_transcation[0] == "withdraw"):
            self.__balance += last_transcation[1]
            print(f"Your cash {last_transcation[1]} ETB has been returned You now have {self.__} ")
        elif (last_transcation[0] == "deposit"):
            self.__balance -= last_transcation[1]
            print(f"Your cash {last_transcation[1]} ETB has been gone You now have {self.balance} ")
        
        

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

class AccountRegistry:
    def __init__(self):
        self.accounts = {}
    def add(self, acc):
        self.accounts[acc.account_number] = acc
    def find(self, number):
        return self.accounts.get(number)	
    def listAll(self):
        for i, acc in enumerate(self.accounts.values()):
            print(f'{i + 1}. {account_styler(acc)}')

def account_styler(acc):
    result = (f"Name: {acc.owner}\nNumber: {acc.account_number}\nBalance: {acc.balance}")
    return result
    

        
# acc = AccountFactory.create("savings","Almaz", "CBE-1")
# acc.subscribe(SMSAlert())
# acc.deposit(500)
reg = AccountRegistry() 
acc = AccountFactory.create("savings", "Almaz", "CBE-1", 0)
acc_2 = AccountFactory.create("savings", "test", "CBE-2", 2500)
# reg.add(acc)
# reg.add(acc_2)

acc.deposit(200)
acc.deposit(500)

acc.undo_last()

print(acc.balance)



# account = (reg.find("CBE-1"))
# print(reg.listAll())
# reg.listAll()

# for number, acc in reg.listAll().items():
#     print(number, acc.owner, acc.balance)
