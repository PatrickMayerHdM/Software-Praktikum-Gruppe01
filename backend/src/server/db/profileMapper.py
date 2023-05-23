from mapper import mapper
from Profile import Profile
from Account import Account

class ProfileMapper(mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        """ Auslesen aller Profile """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT profile_id, favoriteNote_id, account_id, blockNote_id FROM main.Profile")
        tuples = cursor.fetchall()

        for (profile_id, favoriteNote_id, account_id, blockNote_id) in tuples:
            profile = Profile()
            profile.set_id(profile_id)
            profile.set_favorite_note_id(favoriteNote_id)
            profile.set_account_id(account_id)
            profile.set_block_note_id(blockNote_id)
            result.append(profile)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        result = None

        cursor = self._connection.cursor()
        command = f'SELECT profile_id, favoriteNote_id, account_id, blockNote_id FROM main.Profile WHERE profile_id={key}'
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples is not None and len(tuples) > 0 and tuples[0] is not None:
            (profile_id, favorite_note_id, account_id, block_note_id) = tuples[0]
            profile = Profile()
            profile.set_id(profile_id)
            profile.set_favorite_note_id(favorite_note_id)
            profile.account_id(account_id)
            profile.blockNote_id(block_note_id)

            result = profile
        else:
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def find_by_account_id(self, account_id):
        result = None
        cursor = self._connection.cursor()
        command = 'SELECT profile_id, favoriteNote_id, account_id, blockNote_id FROM main.Profile WHERE account_id=%s'
        data = (account_id,)
        cursor.execute(command, data)
        tuples = cursor.fetchall()

        try:
            (profile_id, favoriteNote_id, account_id, blockNote_id) = tuples[0]
            p = Profile()
            p.set_id(profile_id)
            p.set_favorite_note_id(favoriteNote_id)
            p.set_account_id(account_id)
            p.set_block_note_id(blockNote_id)
            result = p

        except IndexError:
            "Wenn Tupel leer sind, dann wird IndexError geworfen"
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def insert(self, profile):
        # Verbindugn zur DB + cursor-objekt erstellt
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM main.Profile")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn eine ID vorhanden ist, zählen wir diese um 1 hoch"""
                profile.set_id(maxid[0] + 1)

            else:
                """Wenn keine id vorhanden ist, beginnen wir mit der id 1"""
                profile.set_id(1)

        command = "INSERT INTO main.Profile (profile_id, favorite_note_id, account_id, block_note_id) VALUES (%s, %s, %s, %s)"
        data = (profile.get_id(), profile.get_favorite_note_id(), profile.get_account_id(), profile.get_block_note_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return profile

    def update(self, profile):
        """ Aktualisierung einer Profil-Instanz"""
        cursor = self._connection.cursor()

        command = "UPDATE main.Profile SET profile_id=%s, favoriteNote_id=%s, account_id=%s, block_note_id=%s"
        data = (profile.get_id(), profile.get_favorite_note_id(), profile.get_account_id(), profile.get_block_note_id())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, profile):
        """ Löschen eines Datensatzes """
        cursor = self._connection.cursor()

        command = f"DELETE FROM main.Profile WHERE profile_id = {profile.get_id()}"
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

