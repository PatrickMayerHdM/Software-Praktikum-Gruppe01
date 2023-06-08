from BusinessObject import BusinessObject as bo


class Profile(bo):
    def __init__(self):
        super().__init__()
        self.favoriteNote_id = None
        self.blockNote_id = None
        self.google_fk = None

    def get_favorite_note_id(self):
        return self.favoriteNote_id

    def set_favorite_note_id(self, favorite_note_id):
        self.favoriteNote_id = favorite_note_id

    def get_block_note_id(self):
        return self.blockNote_id

    def set_block_note_id(self, block_note_id):
        self.blockNote_id = block_note_id

    def set_google_fk(self, google_id):
        self.google_fk = google_id

    def get_google_fk(self):
        return self.google_fk

    def __str__(self):
        # str Methode gibt das erstellte profil in Form eines String zurück
        return "profile: {}, {}, {}".format(self.get_id(),
                                            self.favoriteNote_id,
                                            self.blockNote_id,
                                            self.google_fk)
    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Profile()
        obj.set_id(dictionary['id'])
        obj.set_favorite_note_id(dictionary['favoriteNote_id'])
        obj.set_block_note_id(dictionary['blockNote_id'])
        obj.set_google_fk(dictionary['profile_id'])
        return obj
