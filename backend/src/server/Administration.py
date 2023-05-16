from server.bo.Message import Message
from server.db.MessageMapper import MessageMapper


class Administration(object):
    def __init__(self):
        pass

    """Spezifische Methoden für Nachrichten"""

    def addMessage(self, sender, recipient, content):
        """Objekt der Klasse Massage wird erstellt"""
        m = Message()

        """Objekt wird eine id zugewiesen. Zugriff auf BusinessObjekt"""
        m.set_id(1)

        """Objekt wird ein Sender, Empfänger und Kontent
         zugewiesen. Zugriff auf Message"""
        m.set_sender(sender)
        m.set_recipient(recipient)
        m.set_content(content)

        """Objekt wird mit insert-methode in DB eingebunden"""
        with MessageMapper() as mapper:
            return mapper.insert(m)

    def get_messages(self, message_id):
        with MessageMapper() as mapper:
            return mapper.find_by_key(message_id)

    def save_message(self, msg):
        with MessageMapper() as mapper:
            mapper.update(msg)

    def delete_message(self, message):
        """Hier wird "message" mit mapper aus DB gelöscht"""
        with MessageMapper() as mapper:
            mapper.delete(message)
