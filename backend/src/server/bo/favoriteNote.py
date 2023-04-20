from relationship import relationship


class favoriteNote(relationship):
    def __init__(self):
        self.Merkzettel_list = []

    def create_relation(self):
        """Merkzettel Liste wird im Konstruktur bereits initialisiert... falsch?"""
        self.Merkzettel_list = []

    def add_user(self, profile_id):
        """if abfrage um doppelte Nutzer in Liste zu vermeiden"""
        if profile_id not in self.Merkzettel_list:
            self.Merkzettel_list.append(profile_id)

    def del_user(self, profile_id):
        """Nutzer kann nur gelöscht werden, wenn Nutzer auch in Liste vorhanden ist"""
        if profile_id in self.Merkzettel_list:
            self.Merkzettel_list.remove(profile_id)

    def show_user(self):
        return self.Merkzettel_list


"""Test des Codes

Merkzettel1 = favoriteNote()

Merkzettel1.add_user(4590)
Merkzettel1.add_user(9987)
Merkzettel1.add_user(9987)

print(Merkzettel1.show_user())
"""
