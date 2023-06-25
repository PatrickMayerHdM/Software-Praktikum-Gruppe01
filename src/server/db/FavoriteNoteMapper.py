from favoriteNote import FavoriteNote
from src.server.db.mapper import mapper


class FavoriteNoteMapper(mapper):
    """ Mapper-Klasse, der die Merkliste auf eine relationale Datenbank abbildet."""

    def __init__(self):
        super().__init__()

    def find_all(self):
        """ Auslesen aller Merkungen. """
        result = []
        cursor = self._connection.cursor()

        cursor.execute('SELECT favoritenote_id, added_id, adding_id FROM main.Favoritenote')
        tuples = cursor.fetchall()

        for (favoritenote_id, adding_id, added_id) in tuples:
            merkliste = FavoriteNote()
            merkliste.set_id(favoritenote_id)
            merkliste.set_adding_id(adding_id)
            merkliste.set_added_id(added_id)
            result.append(merkliste)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_adding_user(self, adding_id):
        """ Auslesen aller Merkungen eines Nutzers anhand seiner Id. """
        result = []
        cursor = self._connection.cursor()
        command = f"SELECT favoritenote_id, adding_id, added_id FROM main.Favoritenote WHERE adding_id='{adding_id}' AND added_id NOT IN (SELECT blocked_id FROM main.Blocknote WHERE blocking_id='{adding_id}') AND added_id NOT IN (SELECT blocking_id FROM main.Blocknote WHERE blocked_id='{adding_id}')"
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (favoritenote_id, adding_id, added_id) in tuples:
            merkliste = FavoriteNote()
            merkliste.set_id(favoritenote_id)
            merkliste.set_adding_id(adding_id)
            merkliste.set_added_id(added_id)
            result.append(merkliste)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """ Auslesen aller Merkungen anhand einer favoritenote_id. """
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

    def insert(self, favoritenote):
        """ Hinzufügen einer Merkung. """
        cursor = self._connection.cursor()
        command = "SELECT favoritenote_id FROM main.Favoritenote WHERE adding_id = %s AND added_id = %s"
        data = (favoritenote.get_adding_id(), favoritenote.get_added_id())
        cursor.execute(command, data)
        """ Abfrage, ob bereits ein Eintrag für genau diese adding_id und added_id existiert. """
        existing_id = cursor.fetchone()

        if existing_id is None:
            """ Falls ein Profil noch nicht zum Merkzettel hinzugefügt wurde. """
            cursor.execute("SELECT MAX(favoritenote_id) AS maxid FROM main.Favoritenote")
            tuples = cursor.fetchall()

            for (maxid,) in tuples:
                if maxid is not None:
                    favoritenote.set_id(maxid + 1)

            insert_command = "INSERT INTO main.Favoritenote (favoritenote_id, adding_id, added_id) VALUES (%s, %s, %s)"
            insert_data = (favoritenote.get_id(), favoritenote.get_adding_id(), favoritenote.get_added_id())
            cursor.execute(insert_command, insert_data)

        self._connection.commit()
        cursor.close()

    def update(self, merkliste):
        """ Updaten einer Merkung. """
        cursor = self._connection.cursor()

        command = 'UPDATE main.Favoritenote SET added_id=%s, adding_id=%s WHERE favoritenote_id=%s'

        data = (merkliste.get_id, merkliste.get_all_users)
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, adding_id, added_id):
        """ Löschen einer Merkung. """
        cursor = self._connection.cursor()
        command = f'DELETE FROM main.Favoritenote WHERE adding_id=%s AND added_id=%s'
        data = (adding_id, added_id)
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()


if (__name__ == "__main__"):
    with FavoriteNote() as mapper:
        result = mapper.find_all()
        for m in result:
            print(m)
