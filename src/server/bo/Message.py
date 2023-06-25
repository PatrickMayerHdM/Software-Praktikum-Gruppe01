from BusinessObject import BusinessObject as bo

class Message(bo):
    def __init__(self):
        super().__init__()
        self._sender_id = None
        self._recipient_id = None
        self._content = None

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
        return self._content

    def set_content(self, content):
        """ Setzen des Nachrichteninhalts. """
        self._content = content

    def __str__(self):
        """Auslesen der Nachricht."""
        return (f'Von: {self._sender_id} \n An: {self._recipient_id}\n '
                f'Content: {self.get_content()}')

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in eine Message()."""
        obj = Message()
        obj.set_id(dictionary['id'])
        obj.set_sender(dictionary['sender_id'])
        obj.set_recipient(dictionary['recipient_id'])
        obj.set_content(dictionary['content'])
        return obj