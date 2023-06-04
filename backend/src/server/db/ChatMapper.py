from server.db.mapper import mapper
from server.bo.Chat import Chat


class ChatMapper(mapper):
    """ Mapper-Klasse, die den Chat auf eine relationale Datenbank abbildet."""

    def __init__(self):
        super().__init__()

    def find_all(self):
        """ Auslesen aller Chat-Objekte """
        result = []
        cursor = self._connection.cursor()
        cursor.execute('SELECT * FROM main.Chat')
        tuples = cursor.fetchall()

        for (chat_id, message_id, profile_id) in tuples:
            chat = Chat()
            chat.set_id(chat_id)
            chat.set_message_id(message_id)
            result.append(chat)

        self._connection.commit()
        cursor.close()

        return result



    def find_by_key(self, key):
        result = None

        cursor = self._connection.cursor()
        command = f'SELECT chat_id, message_id FROM main.Chat WHERE chat_id={key}'
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples is not None and len(tuples) > 0 and tuples[0] is not None:
            (chat_id, message_id) = tuples[0]
            chat = Chat()
            chat.set_id(chat_id)
            chat.set_message_id(message_id)

            result = chat
        else:
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, chat):
        cursor = self._connection.cursor()
        cursor.execute('SELECT MAX(chat_id) AS maxid FROM main.Chat')
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            chat.set_id(maxid[0] + 1)

        command = 'INSERT INTO main.Chat (chat_id, message_id) VALUES (%s, %s)'
        data = (chat.get_id(),
                chat.get_message_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return chat

    def update(self, chat):
        cursor = self._connection.cursor()

        command = 'UPDATE main.Chat SET message_id=%s WHERE chat_id=%s'
        data = (chat.get_message_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, chat):
        cursor = self._connection.cursor()

        command = f'DELETE FROM main.Chat WHERE chat_id={chat.get_id()}'
        cursor.execute(command)

        self._connection.commit()
        cursor.close()
