from server.bo.BusinessObject import BusinessObject as bo

class SearchProfile(bo):
    def __init__(self):
        super().__init__()
        self.google_id = None

    def get_google_fk(self):
        """Auslesen der Google_id."""
        return self.google_id

    def set_google_fk(self, google_id):
        """Setzen der Google_id."""
        self.google_id = google_id

    def __str__(self):
        # str Methode gibt das erstellte Suchprofil in Form eines String zurück
        return "searchprofile: {}, {}".format(self.get_id(), self.google_id)

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = SearchProfile()
        obj.set_id(dictionary.get('id'))
        obj.set_google_fk(dictionary.get('google_id'))
        return obj