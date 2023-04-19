from BusinessObject import BusinessObject


class Account(BusinessObject):

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


    def set_account_id(self, account_id):
        """Anlegen accountID"""
        self.account_id = account_id


    def get_account_id(self):
        """Auslesen account_id (TESTWEISE)"""
        return self.account_id

