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
        cursor.execute('SELECT * FROM Message')
        tuples = cursor.fetchall()

        for (message_id, sender_id, recipient_id, timestamp, content) in tuples:
            message = Message()
            message.set_id(message_id)
            message.set_sender(sender_id)
            message.set_recipient(recipient_id)
            message.set_timestamp(timestamp)
            message.set_content(content)
            result.append(message)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_sender(self, sender_id):
        """ Auslesen aller Nachrichten eines Absenders."""
        result = []
        cursor = self._connection.cursor()
        command = f'SELECT * FROM Message WHERE sender_id={sender_id} ORDER BY message_id'
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (message_id, sender_id, recipient_id, timestamp, content) in tuples:
            message = Message()
            message.set_id(message_id)
            message.set_sender(sender_id)
            message.set_recipient(recipient_id)
            message.set_timestamp(timestamp)
            message.set_content(content)
            result.append(message)

        self._connection.commit()
        cursor.close

        return result

    def find_by_recipient(self, recipient_id):
        """ Auslesen aller Nachrichten eines Empfängers."""
        result = []
        cursor = self._connection.cursor()
        command = f'SELECT * FROM Message WHERE recipient_id={recipient_id} ORDER BY message_id'
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (message_id, sender_id, recipient_id, timestamp, content) in tuples:
            message = Message()
            message.set_id(message_id)
            message.set_sender(sender_id)
            message.set_recipient(recipient_id)
            message.set_timestamp(timestamp)
            message.set_content(content)
            result.append(message)

        self._connection.commit()
        cursor.close

        return result

    def insert(self, message):
        cursor = self._connection.cursor()
        cursor.execute('SELECT MAX(message_id) AS maxid FROM Message')
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            message.set_id(maxid[0] + 1)

        command = 'INSERT INTO Message (message_id, sender_id, recipient_id, timestamp, content) VALUES (%s, %s, %s, %s, %s)'
        data = (message.get_id(),
                message.get_sender(),
                message.get_recipient(),
                message.get_timestamp(),
                message.get_content())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return message

    def update(self, object):
        pass

    def delete(self, object):
        pass
