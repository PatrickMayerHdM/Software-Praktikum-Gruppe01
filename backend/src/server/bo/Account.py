from BusinessObject import BusinessObject as bo


class Account(bo):

    def __init__(self, google_id, account_id):
        super().__init__()
        self.profile_id = None
        self.google_id = google_id
        self.account_id = account_id

    def set_profile_id(self, profile_id):
        """Anlegen profile_id"""
        self.profile_id = profile_id

    def get_google_id(self):
        """Auslesen google_id"""
        return self.google_id

    def set_google_id(self, google_id):
        """Speichern der Google ID"""
        self.google_id = google_id

    def __str__(self):
        # str Methode gibt das erstellte profil in Form eines String zurück
        return "account: {}, {}, {}, {}, ".format(self.get_id(), self.profile_id,
                                                  self.account_id, self.google_id)



