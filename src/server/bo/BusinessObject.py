from abc import ABC


class BusinessObject(ABC):

    def __init__(self):
        self._id = 0

    def get_id(self):
        """Auslesen der ID."""
        return self._id

    def set_id(self, new_id):
        """Setzen der ID."""
        self._id = new_id
