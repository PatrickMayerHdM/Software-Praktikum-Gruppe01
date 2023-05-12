from server.bo.blockNote import blockNote
from server.db.mapper import mapper

"""Notiz: in DB wird der Name blockNote verwendet"""


class FavoriteNoteMapper(mapper):
    """ Mapper-Klasse, der die Blocklist auf eine relationale Datenbank abbildet."""

    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._connection.cursor()

        cursor.execute('SELECT blockNote_id, profile_id FROM blockNote')
        tuples = cursor.fetchall()

        for (blockNote_id, profile_id) in tuples:
            blockliste = blockNote()
            blockliste.set_id(blockNote_id)
            blockliste.add_user(profile_id)
            result.append(blockliste)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_user(self, user):
        result = []
        cursor = self._connection.cursor()
        command = f'SELECT blockNote_id, profile_id FROM blockNote WHERE blockNote_id={user}'
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (blockNote_id, profile_id) in tuples:
            blockliste = blockNote()
            blockliste.set_id(blockNote_id)
            blockliste.add_user(profile_id)
            result.append(blockliste)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        result = None

        cursor = self._connection.cursor()
        command = f'SELECT blockNote_id, profile_id FROM blockNote WHERE blockNote_id={key}'
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples is not None \
                and len(tuples) > 0 \
                and tuples[0] is not None:
            (blockNote_id, profile_id) = tuples[0]
            blockliste = blockNote()
            blockliste.set_id(blockNote_id)
            blockliste.add_user(profile_id)

            result = blockliste
        else:
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, blockliste):
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM blockNote")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            blockliste.set_id(maxid[0] + 1)

        command = "Insert INTO blockNote (blockNote_id, profile_id) Values (%s, %s)"
        data = (blockliste.get_id(), blockliste.get_all_users())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def update(self, blockliste):
        cursor = self._connection.cursor()

        command = "UPDATE blockNote" + "SET profile_id=%s WHERE id=%s"
        data = (blockliste.get_id, blockliste.get_all_users)
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, blockliste):
        cursor = self._connection.cursor()
        command = f'DELETE FROM blockNote WHERE profile_id={blockliste.get_id()}'
        cursor.execute(command)

        self._connection.commit()
        cursor.close()


if (__name__ == "__main__"):
    with blockNote() as mapper:
        result = mapper.find_all()
        for b in result:
            print(b)
