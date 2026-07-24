class Employee:
    def __init__(self, name, base_salary):
        self.name = name
        self.base_salary = base_salary
        
    
class FullTimeEmployee(Employee):
    def __init__(self, name, base_salary):
        super().__init__(name, base_salary)
        
    def pay(self):
        return self.base_salary
    
class PartTimeEmployee(Employee):
    def __init__(self, name, hourly_rate, hours_worked):
           self.name = name
           self.hourly_rate = hourly_rate
           self.hours_worked = hours_worked
    
    def pay(self):
            return self.hours_worked * self.hourly_rate
        
class ContractEmployee(Employee):
    def __init__(self, name, base_salary, bonus):
            super().__init__(name, base_salary)
            self.bonus = bonus 
    
    def pay(self):
        return self.base_salary + self.bonus
    
def print_payroll(employees):
    for emp in employees:
        print(f'{emp.name} - {emp.pay()} ETB')
        
x = FullTimeEmployee("x", 100)
y = PartTimeEmployee("y", 0.5, 280)
z = ContractEmployee("z", 1000, 200)

arr = [x,y,z]

print_payroll(arr)
        