class Logger:
    _instance = None

    def __init__(self):
        self.logs = []
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
    
    def log(self, lvl, msg):
        self.logs.append(f"[{lvl}] {msg}") 
        print(f"[{lvl}] {msg}")
        return
    
    def get_logs(self):
        return self.logs
    

log1 = Logger()
log2 = Logger()
print(log1 is log2)