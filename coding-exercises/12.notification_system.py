class NotificationService:
    def __init__(self):
        self._observers = []
        
    def notify_all(self, event):
        for obs in self._observers:
            obs.notify(event)
                
    def add_channel(self, obs):
        self._observers.append(obs)

class SMSChannel:
    def __init__(self, sms):
        self.sms = sms
    
    def notify(self, msg):
        print(f"to {self.sms}")
        print(msg)
        
class EmailChannel:
    def __init__(self, email):
        self.email = email
    
    def notify(self, msg):
        print(f"to {self.email}")
        print(msg)
        
service = NotificationService()
service.add_channel(EmailChannel("smtp.example.com"))
service.add_channel(SMSChannel("+251900000000")) 
service.notify_all("Server is down!")