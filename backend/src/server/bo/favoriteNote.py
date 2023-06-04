from relationship import relationship
from BusinessObject import BusinessObject as bo


class FavoriteNote(bo):
    def __init__(self):
        super().__init__()
        self.added_id = None
        self.adding_id = None

    def set_added_id(self, added_id):
        self.added_id = added_id

    def get_added_id(self):
        return self.added_id

    def set_adding_id(self, adding_id):
        self.adding_id = adding_id

    def get_adding_id(self):
        return self.adding_id

    def __str__(self):
        # str Methode gibt das erstellte profil in Form eines String zurück
        return "favoritenote: {}, {}, {}".format(self.get_id(), self.added_id,
                                                 self.adding_id)

    @staticmethod
    def from_dict(dictionary=dict()):
        fn = FavoriteNote()
        fn.set_id(dictionary['id'])
        fn.set_added_id(dictionary['added_id'])
        fn.set_adding_id(dictionary['adding_id'])
        return fn