from server.bo.ProfileContainsInfoObjects import ProfileContainsInfoObj
from server.db.mapper import mapper

class ProfileInfoObjectMapper(mapper):
    """ Mapper-Klasse, welche die InfoObjekte zu Profilen auf eine DB abbildet. """
    def __init__(self):
        super().__init__()

    def find_all(self):
        """ Auslesen aller Profil-Info-Objekte."""
        result = []
        cursor = self._connection.cursor()
        cursor.execute('SELECT * FROM main.ProfileContainsInfoObjects')
        tuples = cursor.fetchall()

        for (profile_id, infoobject_id) in tuples:
            profile = ProfileContainsInfoObj()
            profile.set_profile(profile_id)
            profile.set_infoobj(infoobject_id)
            result.append(profile)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_profile_id(self, profile_id):
        """ Auslesen der Info-Objekte zu einem spezifischem Profil. """
        result = []
        cursor = self._connection.cursor()
        command = f'SELECT * FROM main.ProfileContainsInfoObjects WHERE profile_id={profile_id} ORDER BY infoobject_id'
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (profile_id, infoobject_id) in tuples:
            profile = ProfileContainsInfoObj()
            profile.set_profile(profile_id)
            profile.set_infoobj(infoobject_id)
            result.append(profile)

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, object):
        """ Hinzufügen der Info-Objekte zu einem spezifischem Profil. """
        cursor = self._connection.cursor()
        tuples = cursor.fetchall()

        command = 'INSERT INTO main.ProfileContainsInfoObjects (profile_id, infoobject_id) VALUES (%s, %s)'
        data = (ProfileContainsInfoObj.set_profile(),
                ProfileContainsInfoObj.set_infoobj())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return object

    def update(self, profile):
        """ Updaten der Info-Objekte zu einem spezifischem Profil. """
        cursor = self._connection.cursor()

        command = 'UPDATE main.ProfileContainsInfoObjects SET profile_id=%s, infoobject_id=%s WHERE profile_id=%s'
        data = (ProfileContainsInfoObj.get_profile(),
                ProfileContainsInfoObj.get_infoobj())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, profile):
        """ Löschen der Info-Objekte zu einem spezifischem Profil. """
        cursor = self._connection.cursor()

        command = f'DELETE FROM main.ProfileContainsInfoObjects WHERE profile_id={ProfileContainsInfoObj.get_profile()}'
        cursor.execute(command)

        self._connection.commit()
        cursor.close()