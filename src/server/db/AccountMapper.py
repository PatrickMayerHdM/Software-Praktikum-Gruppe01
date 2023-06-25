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
        cursor.execute('SELECT account_id, google_id, profile_id, name, email FROM main.Account')
        tuples = cursor.fetchall() # Alle Datensätze aus DB in tuples speichern.

        for (account_id, google_id, profile_id, name, email) in tuples:
            account = Account()
            account.set_id(account_id)
            account.set_google_id(google_id)
            account.set_profile_id(profile_id)
            account.set_user_name(name)
            account.set_email(email)
            result.append(account)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """
        Suchen eines Accounts über die ID

        :param key Primärschlüsselattribut (account_id)
        :return Account-Objekt das dem übergebenen Schlüssel entspricht. IndexError bei nicht vorhandenen DB-Tupel
        """
        result = None

        cursor = self._connection.cursor()
        command = f'SELECT account_id, google_id, profile_id, name, email FROM main.Account WHERE account_id={key}'
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (account_id, google_id, profile_id, name, email) = tuples[0]
            account = Account()
            account.set_id(account_id)
            account.set_google_id(google_id)
            account.set_profile_id(profile_id)
            account.set_user_name(name)
            account.set_email(email)
            result = account
        except IndexError:
            """ Wenn der Cursor keine Tupel findet, wird ein IndexError auftreten."""
            result = None

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
        cursor.execute(f'SELECT MAX(account_id) AS maxid FROM main.Account')
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn eine ID vorhanden ist, zählen wir diese um 1 hoch"""
                account.set_id(maxid[0] + 1)

            else:
                """Wenn keine id vorhanden ist, beginnen wir mit der id 1"""
                account.set_id(1)

        command = 'INSERT INTO main.Account (account_id, google_id, profile_id, name, email) VALUES (%s, %s, %s, %s, %s)'
        """Datensatz wird in Tabelle "Account" hinzugefügt. Die Values "%s" sind Platzhalter und 
        werden in der Ausführung übergeben."""
        data = (account.get_id(), account.get_google_id(), account.get_profile_id(), account.get_user_name(),
                account.get_email())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()
        return account


    def update(self, account):
        """ Aktualisierung einer Account-Instanz
          :param account = ist das Objekt (Datensatz), der in DB aktualisiert werden soll."""
        cursor = self._connection.cursor()

        command = 'UPDATE main.Account SET google_id=%s, profile_id=%s, name=%s, email=%s WHERE google_id=%s'
        data = (account.get_id(), account.get_google_id(), account.get_profile_id(), account.get_user_name(),
                account.get_email())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, account):
        """ Löschen eines Datensatzes
        :param account = Objekt, das gelöscht werden soll."""
        cursor = self._connection.cursor()

        command = f'DELETE FROM main.Account WHERE account_id={account.get_id()}'
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    def find_by_google_id(self, google_id):
        result = None
        """ Auslesen eines Accounts, der eine bestimmte GoogleID hat.
        :param google_id = Die GoogleID des Accounts, der gesucht wird."""

        cursor = self._connection.cursor()
        command = 'SELECT account_id, google_id, profile_id, name, email FROM main.Account WHERE google_id=%s'
        data = (google_id,)
        cursor.execute(command, data)
        tuples = cursor.fetchall()

        try:
            (account_id, google_id, profile_id, name, email) = tuples[0]
            a = Account()
            a.set_id(account_id)
            a.set_google_id(google_id)
            a.set_profile_id(profile_id)
            a.set_user_name(name)
            a.set_email(email)
            result = a

        except IndexError:
            "Wenn Tupel leer sind, dann wird IndexError geworfen"
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def find_by_name(self, name):
        result = []
        cursor = self._connection.cursor()
        command = f'SELECT account_id, name, email, google_id, profile_id FROM main.Account WHERE name LIKE {name} ORDER BY name'
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, email, google_id, profile_id) in tuples:
            account = Account()
            account.set_id(id)
            account.set_user_name(name)
            account.set_email(email)
            account.set_google_id(google_id)
            account.set_google_id(profile_id)
            result.append(account)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_email(self, email_adress):
        """
        Suchen eines Accounts über die E-Mail-Adresse

        :param email_adress Attribut (email)
        :return Account-Objekt das dem übergebenen Schlüssel entspricht. IndexError bei nicht vorhandenen DB-Tupel
        """
        result = None

        cursor = self._connection.cursor()
        command = f'SELECT account_id, google_id, profile_id, name, email FROM main.Account WHERE email={email_adress}'
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (account_id, google_id, profile_id, name, email) = tuples[0]
            account = Account()
            account.set_id(account_id)
            account.set_google_id(google_id)
            account.set_profile_id(profile_id)
            account.set_user_name(name)
            account.set_email(email)
            result = account
        except IndexError:
            """ Wenn der Cursor keine Tupel findet, wird ein IndexError auftreten."""
            result = None

        self._connection.commit()
        cursor.close()

        return result




