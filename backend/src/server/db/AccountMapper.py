from server.bo.Account import Account
from server.db.mapper import mapper

class AccountMapper(mapper):
    """ Mapper-Klasse, die Account-Objekte auf eine relationale Datenbank abbildet. """
    def __init__(self):
        super().__init__()

    def find_all(self):
        """ Auslesen aller Accounts"""
        result = []
        cursor = self._connection.cursor()
        cursor.execute('SELECT account_id, google_id, profile_id FROM Account')
        tuples = cursor.fetchall() # Alle Datensätze aus DB in tuples speichern.

        for (account_id, google_id, profile_id) in tuples:
            account = Account()
            account.set_id(account_id)
            account.set_google_id(google_id)
            account.set_profile_id(profile_id)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """
        Suchen eines Accounts über die ID

        :param key Primärschlüsselattribut (account_id)
        :return Account-Objekt das dem übergebenen Schlüssel entspricht. None bei nicht vorhandenen DB-Tupel
        """
        result = None

        cursor = self._connection.cursor()
        cursor.execute(f'SELECT account_id, google_id, profile_id FROM Account WHERE account_id={key}')
        tuples = cursor.fetchall()

        for (account_id, google_id, profile_id) in tuples:
            account = Account()
            account.set_id(account_id)
            account.set_google_id(google_id)
            account.set_profile_id(profile_id)
            result = account

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, account):
        """
        Einfügen einer Account-Instanz in die Datenbank.
        :param account = zu speicherndes Objekt
        :return das in der DB gespeicherte Objekt
        """
        cursor = self._connection.cursor()
        cursor.execute(f'SELECT MAX(account_id) AS maxid FROM Account')
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            account.set_id([maxid]+1) # Höchste ID + 1

        command = f'INSERT INTO Account (account_id, google_id, profile_id) VALUES (%s, %s, %s)'
        """Datensatz wird in Tabelle "Account" hinzugefügt. Die Values "%s" sind Platzhalter und 
        werden in der Ausführung übergeben."""
        data = (account.get_id(), account.get_google_id(), account.get_profile_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()
        return account


    def update(self, object):
        pass

    def delete(self, object):
        pass

    def find_by_google_id(self, google_id):
        pass
