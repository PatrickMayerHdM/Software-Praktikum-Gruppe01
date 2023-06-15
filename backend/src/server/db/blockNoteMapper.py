from server.bo.blockNote import BlockNote
from server.db.mapper import mapper

"""Notiz: in DB wird der Name blockNote verwendet"""


class BlockNoteMapper(mapper):
    """ Mapper-Klasse, der die Blocklist auf eine relationale Datenbank abbildet."""

    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._connection.cursor()

        cursor.execute('SELECT blocknote_id, blocked_id, blocking_id FROM main.Blocknote')
        tuples = cursor.fetchall()

        for (blocknote_id, blocking_id, blocked_id) in tuples:
            blockliste = BlockNote()
            blockliste.set_id(blocknote_id)
            blockliste.set_blocking_id(blocking_id)
            blockliste.set_blocked_id(blocked_id)
            result.append(blockliste)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_blocking_user(self, blocking_id):
        result = []
        cursor = self._connection.cursor()
        command = f"SELECT blocknote_id, blocking_id, blocked_id FROM main.Blocknote WHERE blocking_id='{blocking_id}'"
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (blocknote_id, blocking_id, blocked_id) in tuples:
            blockliste = BlockNote()
            blockliste.set_id(blocknote_id)
            blockliste.set_blocking_id(blocking_id)
            blockliste.set_blocked_id(blocked_id)
            result.append(blockliste)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        result = None

        cursor = self._connection.cursor()
        command = f'SELECT blocknote_id, blocked_id, blocking_id FROM main.Blocknote WHERE blocknote_id={key}'
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples is not None \
                and len(tuples) > 0 \
                and tuples[0] is not None:
            (blocknote_id, blocked_id, blocking_id) = tuples[0]
            blockliste = BlockNote()
            blockliste.set_id(blocknote_id)
            blockliste.set_blocked_id(blocked_id)
            blockliste.set_blocking_id(blocking_id)
            result = blockliste
        else:
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, blocknote):
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(blocknote_id) AS maxid FROM main.Blocknote")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                blocknote.set_id(maxid[0] + 1)

        command = "INSERT INTO main.Blocknote (blocknote_id, blocking_id, blocked_id) VALUES (%s, %s, %s)"
        data = (blocknote.get_id(),
                blocknote.get_blocking_id(),
                blocknote.get_blocked_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def update(self, blockliste):
        cursor = self._connection.cursor()

        command = 'UPDATE main.Blocknote SET blocked_id=%s, blocking_id=%s WHERE blocknote_id=%s'

        data = (blockliste.get_blocked_id(),
                blockliste.get_blocking_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, blockliste):
        cursor = self._connection.cursor()
        command = f'DELETE FROM main.Blocknote WHERE blocknote_id ={blockliste.get_id()}'
        cursor.execute(command)

        self._connection.commit()
        cursor.close()


if (__name__ == "__main__"):
    with BlockNote() as mapper:
        result = mapper.find_all()
        for b in result:
            print(b)
