from BusinessObject import BusinessObject as bo


class Profile(bo):
    def __init__(self):
        super().__init__()
        self._favoritenote_id = None
        self._blocknote_id = None
        self._google_fk = None

    def get_favorite_note_id(self):
        """Auslesen der Favoritenote_id."""
        return self._favoritenote_id

    def set_favorite_note_id(self, favoritenote_id):
        """Setzen der Favoritenote_id."""
        self._favoritenote_id = favoritenote_id

    def get_block_note_id(self):
        """Auslesen der Blocknote_id."""
        return self._blocknote_id

    def set_block_note_id(self, blocknote_id):
        """Setzen der Blocknote_id."""
        self._blocknote_id = blocknote_id

    def set_google_fk(self, google_id):
        """Setzen der Google_id."""
        self._google_fk = google_id

    def get_google_fk(self):
        """Auslesen der Google_id."""
        return self._google_fk

    def __str__(self):
        # str Methode gibt das erstellte profil in Form eines String zurück
        return "profile: {}, {}, {}, {}".format(self.get_id(),
                                            self._favoritenote_id,
                                            self._blocknote_id,
                                            self._google_fk)
    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Profile()
        obj.set_id(dictionary['id'])
        obj.set_favorite_note_id(dictionary['favoriteNote_id'])
        obj.set_block_note_id(dictionary['blockNote_id'])
        obj.set_google_fk(dictionary['profile_id'])
        return obj
