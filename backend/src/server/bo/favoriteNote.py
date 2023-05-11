from relationship import relationship
from BusinessObject import BusinessObject as bo


class favoriteNote(bo, relationship):
    def __init__(self):
        super().__init__()
        """Erstellen einer Liste Merkzettel um Profile dort zu speichern"""
        self.Merkzettel_list = []

    def add_user(self, profile_id):
        """if abfrage, um doppelte Nutzer in Liste zu vermeiden"""
        if profile_id not in self.Merkzettel_list:
            self.Merkzettel_list.append(profile_id)

    def del_user(self, profile_id):
        """Nutzer kann nur gelöscht werden, wenn Nutzer auch in Liste vorhanden ist"""
        if profile_id in self.Merkzettel_list:
            self.Merkzettel_list.remove(profile_id)

    def get_all_users(self):
        return self.Merkzettel_list

    def __str__(self):
        # str Methode gibt die favoriteNote in Form eines String zurück
        return "Merkliste: {}, {}".format(self.get_id(), self.get_all_users())


Merkzettel1 = favoriteNote()
Merkzettel2 = favoriteNote()

Merkzettel1.add_user(4590)
Merkzettel1.add_user(9987)
Merkzettel1.add_user(9987)

Merkzettel2.add_user(34)
Merkzettel2.add_user(314)
Merkzettel2.add_user(343)

print(Merkzettel1)
print((Merkzettel2))
