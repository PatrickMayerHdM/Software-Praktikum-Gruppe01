from BusinessObject import BusinessObject as bo
from datetime import datetime


class Message(bo):
    def __init__(self):
        super().__init__()
        self._sender = None
        self._recipient = None
        self.content = None
        self._timestamp = datetime.now()

    def get_sender(self):
        """Auslesen des Senders."""
        return self._sender

    def set_sender(self, sender):
        """ Setzen des Absenders. """
        self._sender = sender

    def get_recipient(self):
        """Auslesen des Empfängers."""
        return self._recipient

    def set_recipient(self, recipient):
        """ Setzen des Empfängers. """
        self._recipient = recipient

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
        return (f'Von: {self._sender} \n An: {self._recipient}\n '
                f'Content: {self.get_content()} \n Uhrzeit: {self._timestamp}')


"""
message = Message()

message.set_sender("Peter")
message.set_recipient("Dominik")
message.set_content("Hallo Dominik, wie geht es dir?")
message.set_timestamp("10.05.2023")

print(message)
"""