from Administration import Administration
from Profilevisits import Profilevisits

adm = Administration()

visit = Profilevisits('wIK8b15tdtZQ0fOPKUSLBjZUXb72', 'zQokAwj2tchqk4dkovLVvqCmzWp2')

test = adm.get_profilevisits(visit )

print(test)