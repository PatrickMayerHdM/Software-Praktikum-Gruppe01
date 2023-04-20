from relationship import relationship


class blockNote(relationship):
    def __init__(self):
        self.block_list = []

    def create_relation(self):
        """Merkzettel Liste wird im Konstruktur bereits initialisiert...
        create_relation als überflüssig??"""
        self.block_list = []

    def add_user(self, profile_id):
        """if abfrage um doppelte Nutzer in Liste zu vermeiden"""
        if profile_id not in self.block_list:
            self.block_list.append(profile_id)

    def del_user(self, profile_id):
        """Nutzer kann nur gelöscht werden, wenn Nutzer auch in Liste vorhanden ist"""
        if profile_id in self.block_list:
            self.block_list.remove(profile_id)

    def show_user(self):
        return self.block_list
