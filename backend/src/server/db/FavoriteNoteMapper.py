from server.bo.favoriteNote import FavoriteNote
from server.db.mapper import mapper

"""Notiz: in DB wird der Name favoriteNote verwendet"""


class FavoriteNoteMapper(mapper):
    """ Mapper-Klasse, der die Merkliste auf eine relationale Datenbank abbildet."""

    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._connection.cursor()

        cursor.execute('SELECT favoritenote_id, added_id, adding_id FROM main.Favoritenote')
        tuples = cursor.fetchall()

        for (favoritenote_id, added_id, adding_id) in tuples:
            merkliste = FavoriteNote()
            merkliste.set_id(favoritenote_id)
            merkliste.set_added_id(added_id)
            merkliste.set_adding_id(adding_id)
            result.append(merkliste)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_adding_user(self, adding_id):
        result = []
        cursor = self._connection.cursor()
        command = f'SELECT favoritenote_id, added_id, adding_id FROM main.Favoritenote WHERE adding_user={adding_id}'
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (favoritenote_id, added_id, adding_id) in tuples:
            merkliste = FavoriteNote()
            merkliste.set_id(favoritenote_id)
            merkliste.set_added_id(added_id)
            merkliste.set_adding_id(adding_id)
            result.append(merkliste)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        result = None

        cursor = self._connection.cursor()
        command = f'SELECT favoritenote_id, added_id, adding_id FROM main.Favoritenote WHERE favoritenote_id={key}'
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples is not None \
                and len(tuples) > 0 \
                and tuples[0] is not None:
            (favoritenote_id, added_id, adding_id) = tuples[0]
            merkliste = FavoriteNote()
            merkliste.set_id(favoritenote_id)
            merkliste.set_added_id(added_id)
            merkliste.set_adding_id(adding_id)
            result = merkliste
        else:
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, merkliste):
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(favoritenote_id) AS maxid FROM main.Favoritenote")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            merkliste.set_id(maxid[0] + 1)

        command = "Insert INTO main.Favoritenote (favoritenote_id, added_id, adding_id) Values (%s, %s, %s)"
        data = (merkliste.get_id(),
                merkliste.get_added_id(),
                merkliste.get_adding_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def update(self, merkliste):
        cursor = self._connection.cursor()

        command = 'UPDATE main.Favoritenote SET added_id=%s, adding_id=%s WHERE favoritenote_id=%s'

        data = (merkliste.get_id, merkliste.get_all_users)
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, merkliste):
        cursor = self._connection.cursor()
        command = f'DELETE FROM main.Favoritenote WHERE favoritenote_id ={merkliste.get_id()}'
        cursor.execute(command)

        self._connection.commit()
        cursor.close()


if (__name__ == "__main__"):
    with FavoriteNote() as mapper:
        result = mapper.find_all()
        for m in result:
            print(m)
