from server.bo.Message import Message
from server.db.mapper import mapper


class MessageMapper(mapper):
    """ Mapper-Klasse, die Nachrichten auf eine relationale Datenbank abbildet."""

    def __init__(self):
        super().__init__()

    def find_all(self):
        """ Auslesen aller Nachrichten """
        result = []
        cursor = self._connection.cursor()
        cursor.execute('SELECT * FROM main.Message')
        tuples = cursor.fetchall()

        for (message_id, sender_id, recipient_id, content) in tuples:
            message = Message()
            message.set_id(message_id)
            message.set_sender(sender_id)
            message.set_recipient(recipient_id)
            message.set_content(content)
            result.append(message)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_sender_id(self, sender_id):
        """ Auslesen aller Nachrichten eines Absenders."""
        result = []
        cursor = self._connection.cursor()
        command = f'SELECT * FROM main.Message WHERE sender_id={sender_id} ORDER BY message_id'
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (message_id, sender_id, recipient_id, content) in tuples:
            message = Message()
            message.set_id(message_id)
            message.set_sender(sender_id)
            message.set_recipient(recipient_id)
            message.set_content(content)
            result.append(message)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_recipient(self, recipient_id):
        """ Auslesen aller Nachrichten eines Empfängers."""
        result = []
        cursor = self._connection.cursor()
        command = f'SELECT * FROM main.Message WHERE recipient_id={recipient_id} ORDER BY message_id'
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (message_id, sender_id, recipient_id, content) in tuples:
            message = Message()
            message.set_id(message_id)
            message.set_sender(sender_id)
            message.set_recipient(recipient_id)
            message.set_content(content)
            result.append(message)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        result = None

        cursor = self._connection.cursor()
        command = f'SELECT message_id, sender_id, recipient_id, content FROM main.Message WHERE message_id={key}'
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples is not None and len(tuples) > 0 and tuples[0] is not None:
            (message_id, sender_id, recipient_id, content) = tuples[0]
            message = Message()
            message.set_id(message_id)
            message.set_sender(sender_id)
            message.set_recipient(recipient_id)
            message.set_content(content)

            result = message
        else:
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, message):
        cursor = self._connection.cursor()
        cursor.execute('SELECT MAX(message_id) AS maxid FROM main.Message')
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            message.set_id(maxid[0] + 1)

        command = 'INSERT INTO main.Message (message_id, sender_id, recipient_id, content) VALUES (%s, %s, %s, ' \
                  '%s)'
        data = (message.get_id(),
                message.get_sender(),
                message.get_recipient(),
                message.get_content())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return message

    def update(self, message):
        cursor = self._connection.cursor()

        command = 'UPDATE main.Message SET sender_id=%s, recipient_id=%s, content=%s WHERE message_id=%s'
        data = (message.get_sender(),
                message.get_recipient(),
                message.get_content())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, message):
        cursor = self._connection.cursor()

        command = f'DELETE FROM main.Message WHERE message_id={message.get_id()}'
        cursor.execute(command)

        self._connection.commit()
        cursor.close()
