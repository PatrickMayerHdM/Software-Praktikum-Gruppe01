from server.bo.BusinessObject import BusinessObject as bo


class Account(bo):

    def __init__(self):
        super().__init__()
        self.google_id = ""  # Die Google ID des Nutzers
        self.profile_id = None
        self.name = ""  # Name eines Nutzers
        self.email = ""  # E-Mail eines Nutzers

    def set_profile_id(self, profile_id):
        """Anlegen profile_id"""
        self.profile_id = profile_id

    def get_profile_id(self):
        """Auslesen der Profil ID"""
        return self.profile_id

    def get_google_id(self):
        """Auslesen google_id"""
        return self.google_id

    def set_google_id(self, google_id):
        """Speichern der Google ID"""
        self.google_id = google_id

    def set_user_name(self, name):
        """ Speichern des Google Klarnamens."""
        self.name = name

    def get_user_name(self):
        """ Auslesen des Google Klarnamens. """
        return self.name

    def set_email(self, email):
        """ Speichern der E-Mail. """
        self.email = email

    def get_email(self):
        """ Auslesen der Google E-Mail."""
        return self.email

    def __str__(self):
        # str Methode gibt den account in Form eines String zurück
        return "account: {}, {}, {}, {}, {}".format(self.get_id(), self.profile_id,
                                                    self.google_id, self.name, self.email)

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Account()
        obj.set_id(dictionary['id'])
        obj.set_google_id(dictionary['google_id'])
        obj.set_user_name(dictionary['name'])
        obj.set_profile_id(dictionary['profile_id'])
        obj.set_email(dictionary['email'])
        return obj
