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


    def update(self, account):
        """ Aktualisierung einer Account-Instanz
          :param account = ist das Objekt (Datensatz), der in DB aktualisiert werden soll."""
        cursor = self._connection.cursor()

        command = 'UPDATE Account SET google_id=%s, profile_id=%s WHERE account_id=%s'
        data = (account.get_google_id(), account.get_profile_id(), account.get_id())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, account):
        """ Löschen eines Datensatzes
        :param account = Objekt, das gelöscht werden soll."""
        cursor = self._connection.cursor()

        command = f'DELETE FROM Account WHERE account_id={account.get_id()}'
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    def find_by_google_id(self, google_id):
        """ Auslesen eines Accounts, der eine bestimmte GoogleID hat.
        :param google_id = Die GoogleID des Accounts, der gesucht wird."""

        cursor = self._connection.cursor()
        command = 'SELECT * FROM Account WHERE google_id=%s'
        cursor.execute(command, (google_id,))
        tuple = cursor.fetchone()

        if tuple is not None:
            account = Account()
            account.set_id(tuple[0])
            account.set_google_id(tuple[1])
            account.set_profile_id(tuple[2])
            return account

        cursor.close()
        return None
