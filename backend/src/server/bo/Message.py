from BusinessObject import BusinessObject as bo
from datetime import datetime


class Message(bo):
    def __init__(self):
        super().__init__()
        self._sender_id = None
        self._recipient_id = None
        self.content = None
        # self._timestamp = datetime.now()

    def get_sender(self):
        """Auslesen des Senders."""
        return self._sender_id

    def set_sender(self, sender):
        """ Setzen des Absenders. """
        self._sender_id = sender

    def get_recipient(self):
        """Auslesen des Empfängers."""
        return self._recipient_id

    def set_recipient(self, recipient):
        """ Setzen des Empfängers. """
        self._recipient_id = recipient

    def get_content(self):
        """Auslesen der Nachricht."""
        return self.content

    def set_content(self, content):
        """ Setzen des Nachrichteninhalts. """
        self.content = content

    def get_timestamp(self):
        """Auslesen des Zeitstempels."""
        return self._timestamp

    def set_timestamp(self, timestamp):
        """ Setzen des Zeitstempels."""
        self._timestamp = timestamp

    def __str__(self):
        """Auslesen der Nachricht."""
        return (f'Von: {self._sender_id} \n An: {self._recipient_id}\n '
                f'Content: {self.get_content()} \n Uhrzeit: {self._timestamp}')

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in eine Message()."""
        obj = Message()
        obj.set_id(dictionary['id'])
        obj.set_sender(dictionary['sender_id'])
        obj.set_recipient(dictionary['recipient_id'])
        # obj.set_timestamp(dictionary['timestamp'])
        obj.set_content(dictionary['content'])
        return obj


"""
message = Message()

message.set_sender("Peter")
message.set_recipient("Dominik")
message.set_content("Hallo Dominik, wie geht es dir?")
message.set_timestamp("10.05.2023")

print(message)
"""