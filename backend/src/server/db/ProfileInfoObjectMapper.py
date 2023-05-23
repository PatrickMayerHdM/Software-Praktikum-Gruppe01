from server.bo.ProfileContainsInfoObjects import ProfileContainsInfoObj
from server.db.mapper import mapper

class ProfileInfoObjectMapper(mapper):
    """ Mapper-Klasse, welche die InfoObjekte zu Profilen auf eine DB abbildet. """
    def __init__(self):
        super().__init__()

    def find_all(self):
        pass

    def find_by_key(self, key):
        pass

    def insert(self, object):
        cursor = self._connection.cursor()
        #cursor.execute('SELECT MAX(id) AS maxid FROM main.ProfileContainsInfoObjects')
        # die obere Zeile existiert so nicht, weil ein Datensatz in der Tabelle keine eigene id besitzt.
        tuples = cursor.fetchall()

        command = 'INSERT INTO main.ProfileContainsInfoObjects (profile_id, infoobject_id) VALUES (%s, %s)'
        data = (ProfileContainsInfoObj.set_profile(),
                ProfileContainsInfoObj.set_infoobj())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return object

    def update(self, object):
        pass

    def delete(self, object):
        pass