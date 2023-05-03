from server.bo.Account import Account
from server.db.mapper import mapper

class AccountMapper(mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """ Auslesen aller Accounts"""
        result = []
        cursor = self._connection.cursor()
        cursor.execute('SELECT account_id, google_id, profile_id FROM Account')
        tuples = cursor.fetchall() # Alle Datensätze aus DB in tuples speichern.

        for (account_id, google_id, profile_id) in tuples:
            account = Account(google_id, account_id)
            account.set_id(account_id)
            account.set_google_id(google_id)
            account.set_profile_id(profile_id)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        pass

    def insert(self, object):
        pass

    def update(self, object):
        pass

    def delete(self, object):
        pass
