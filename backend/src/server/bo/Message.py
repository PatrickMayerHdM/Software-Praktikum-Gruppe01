from BusinessObject import BusinessObject as bo
from datetime import datetime


class Message(bo):
    def __init__(self, sender, recipient, content):
        super().__init__()
        self._sender = sender
        self._recipient = recipient
        self.content = content
        self._timestamp = datetime.now()

    def get_author(self):
        """Auslesen des Senders."""
        return self._sender

    def get_recipient(self):
        """Auslesen des Empfängers."""
        return self._recipient

    def get_content(self):
        """Auslesen der Nachricht."""
        return self.content

    def get_timestamp(self):
        """Auslesen des Zeitstempels."""
        return self._timestamp

    def __str__(self):
        """Auslesen der Nachricht."""
        return (f'Von: {self._sender} \n An: {self._recipient}\n '
                f'Content: {self.get_content()} \n Uhrzeit: {self._timestamp}')
