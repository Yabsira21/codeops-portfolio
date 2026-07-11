def split_bill(total, people, tip_rate=0.10):
    total_with_tip = total + (total * tip_rate)
    amount_per_person = total_with_tip / people
    for p in people:
        print(f"Person {p} should pay: ${amount_per_person:.2f}")
        