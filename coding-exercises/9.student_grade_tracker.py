class Student():
    def __init__(self, name):
        self.name = name
        self.score = {}
        
    def add_grade(self, subject, subjectScore):
        self.score[subject] = subjectScore
        
    def average(self):
        if (len(self.score) == 0): return 0
        tot = sum(list(self.score.values()))
        return tot/len(self.score)
    
    def highest(self):
        max = 0
        subject = ""
        for sub, sco in self.score.items():
            if (sco > max):
                max = sco
                subject = sub
        return (subject, max)
    
    def __repr__(self):
        return f"Student(name='{self.name}', grade={self.score})"

s = Student("Ali")
s.add_grade("Math", 90)
s.add_grade("Science", 85)
s.add_grade("English", 92)
print(s.average())
print(s.highest())
        
# ub = {"x": 12, "y": 24}

# for key, val in ub:
#     print(key, val)

# # print(sum(list(ub.values())))
# # for n in list(ub.values())

# print(len(ub))