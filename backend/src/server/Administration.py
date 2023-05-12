from bo.Message import Message
from db.MessageMapper import MessageMapper


class Administration(object):
    def __init__(self):
        pass

    """Spezifische Methoden für Nachrichten"""

    def create_message(self, sender, recipient, content):
        m = Message()
        m.set_id(1)
        m.set_sender(sender)
        m.set_recipient(recipient)
        m.set_content(content)

        with MessageMapper() as mapper:
            return mapper.insert(m)

    def save_message(self, msg):
        with MessageMapper() as mapper:
            mapper.update(msg)

    def delete_message(self, message):
        with MessageMapper() as mapper:
            mapper.delete(message)
