from abc import ABC


class BusinessObject(ABC):
    """
    code = 0
    _id = 0

    def __init__(self):
        self._id = BusinessObject.code
        BusinessObject.code += 1
    """
    def get_id(self):
        """Auslesen der ID."""
        return self._id

    """Die zwei Methoden get_id und set_id sind möglicherweise überflüssig"""

    def set_id(self, new_id):
        """Setzen der ID."""
        self._id = new_id
