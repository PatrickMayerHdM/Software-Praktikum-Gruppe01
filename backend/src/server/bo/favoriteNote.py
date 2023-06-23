from BusinessObject import BusinessObject as bo


class FavoriteNote(bo):
    def __init__(self):
        """
        adding_id = Hinzufügende User
        added_id = Hinzugefügte User
        """
        super().__init__()
        self.adding_id = None
        self.added_id = None


    def set_added_id(self, added_id):
        """Setzen des Hinzugefügten."""
        self.added_id = added_id

    def get_added_id(self):
        """Auslesen des Hinzugefügten."""
        return self.added_id

    def set_adding_id(self, adding_id):
        """Setzen des Hinzufügenden."""
        self.adding_id = adding_id

    def get_adding_id(self):
        """Auslesen des Hinzufügenden."""
        return self.adding_id

    def __str__(self):
        # str Methode gibt das erstellte profil in Form eines String zurück
        return "favoritenote: {}, {}, {}".format(self.get_id(), self.adding_id, self.added_id)

    @staticmethod
    def from_dict(dictionary=dict()):
        fn = FavoriteNote()
        fn.set_id(dictionary['id'])
        fn.set_adding_id(dictionary['adding_id'])
        fn.set_added_id(dictionary['added_id'])
        return fn