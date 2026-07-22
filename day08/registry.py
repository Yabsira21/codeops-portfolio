class Account: 
    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self.__balance = balance
        self._observers = []
        self.history = []
        self.counter = 0
        # self.counter = 0
      
        
    
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
    
    #   [a,b,c,d]
    def total_transactions(self, history=None):
        if history is None:
            history = self.history

        if not history:
            return 0

        return 1 + self.total_transactions(history[1:])
        
        
        

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
            
    def top_by_balance(self, n):      
        accs = list(self.accounts.values())
     
        sortedAccs = sorted(accs, key=lambda acc: acc.balance, reverse=True)
  
        for i, acc in enumerate(sortedAccs):
            if (i + 1 > n): return
            print(f'{i + 1}. {account_styler(acc)}')
            
    def find_by_number(self, acc_num):
        accs = list(self.accounts.values())
        sortedAccs = sorted(accs, key=lambda acc: acc.account_number)
        lo = 0
        hi = len(sortedAccs) - 1
        steps = 0
        while lo <= hi:
            steps += 1
            mid = (lo + hi) // 2
            if (sortedAccs[mid].account_number == acc_num):
                print(f"Took {steps} steps")
                return sortedAccs[mid]
            elif (sortedAccs[mid].account_number < acc_num):
                lo = mid + 1
            else:
                hi = mid - 1
        print(f"Took {steps} steps still didn't found nothing")
        return -1
    
    
        
        
        

def account_styler(acc):
    result = (f"Name: {acc.owner}\nNumber: {acc.account_number}\nBalance: {acc.balance}")
    return result

def account_finder_styler(acc):
    if (acc == -1):
        print("Account Not found")
        return
    print(account_styler(acc))
    
    

        
# acc = AccountFactory.create("savings","Almaz", "CBE-1")
# acc.subscribe(SMSAlert())
# acc.deposit(500)
reg = AccountRegistry() 
acc = AccountFactory.create("savings", "Almaz", "CBE-1", 0)
acc_2 = AccountFactory.create("savings", "test", "CBE-2", 2500)
acc_3 = AccountFactory.create("savings", "john", "CBE-3", -2500)
acc_3 = AccountFactory.create("savings", "john", "CBE-4", 7500)
reg.add(acc)
reg.add(acc_2)
reg.add(acc_3)
hi = reg.find_by_number("CBE-8")
account_finder_styler(hi)
reg.top_by_balance(2)
print(acc.total_transactions())

# reg.find_by_number(4)

