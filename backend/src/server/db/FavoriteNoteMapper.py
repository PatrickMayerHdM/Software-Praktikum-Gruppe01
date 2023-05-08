from server.bo.favoriteNote import favoriteNote
from server.db.mapper import mapper

class FavoriteNoteMapper(mapper):
    """ Mapper-Klasse, der die Merkliste auf eine relationale Datenbank abbildet."""
    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._connection.cursor()

        cursor.execute('SELECT favoriteNote_id, profile_id FROM FavoriteNote')
        tuples = cursor.fetchall()

        for (favoriteNote_id, profile_id) in tuples:
            merkliste = favoriteNote()
            merkliste.set_id(favoriteNote_id)
            merkliste.add_user(profile_id)
            result.append(merkliste)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_key(self, id):
        result = None

        cursor = self._connection.cursor()
        command = f'SELECT favoriteNote_id, profile_id FROM FavoriteNote WHERE favoriteNote_id={id}'
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples is not None \
                and len(tuples) > 0 \
                and tuples[0] is not None:
            (favoriteNote_id, profile_id) = tuples[0]
            merkliste = favoriteNote()
            merkliste.set_id(favoriteNote_id)
            merkliste.add_user(profile_id)

            result = merkliste
        else:
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, favorite):
        pass

    def update(self, object):
        pass

    def delete(self, object):
        pass