from server.bo.favoriteNote import favoriteNote
from server.db.mapper import mapper

"""Notiz: in DB wird der Name favoriteNote verwendet"""


class FavoriteNoteMapper(mapper):
    """ Mapper-Klasse, der die Merkliste auf eine relationale Datenbank abbildet."""

    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._connection.cursor()

        cursor.execute('SELECT favoriteNote_id, profile_id FROM favoriteNote')
        tuples = cursor.fetchall()

        for (favoriteNote_id, profile_id) in tuples:
            merkliste = favoriteNote()
            merkliste.set_id(favoriteNote_id)
            merkliste.add_user(profile_id)
            result.append(merkliste)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_user(self, user):
        result = []
        cursor = self._connection.cursor()
        command = f'SELECT favoriteNote_id, profile_id FROM favoriteNote WHERE favoriteNote_id={user}'
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (favoriteNote_id, profile_id) in tuples:
            merkliste = favoriteNote()
            merkliste.set_id(favoriteNote_id)
            merkliste.add_user(profile_id)
            result.append(merkliste)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        result = None

        cursor = self._connection.cursor()
        command = f'SELECT favoriteNote_id, profile_id FROM favoriteNote WHERE favoriteNote_id={key}'
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

    def insert(self, merkliste):
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM favoriteNote")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            merkliste.set_id(maxid[0] + 1)

        command = "Insert INTO favoriteNote (favoriteNote_id, profile_id) Values (%s, %s)"
        data = (merkliste.get_id(), merkliste.get_all_users())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def update(self, merkliste):
        cursor = self._connection.cursor()

        command = "UPDATE favoriteNote" + "SET profile_id=%s WHERE id=%s"
        data = (merkliste.get_id, merkliste.get_all_users)
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, merkliste):
        cursor = self._connection.cursor()
        command = f'DELETE FROM favoriteNote WHERE profile_id={merkliste.get_id()}'
        cursor.execute(command)

        self._connection.commit()
        cursor.close()


if (__name__ == "__main__"):
    with favoriteNote() as mapper:
        result = mapper.find_all()
        for m in result:
            print(m)
