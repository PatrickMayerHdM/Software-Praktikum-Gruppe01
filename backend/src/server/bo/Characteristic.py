from BusinessObject import BusinessObject as bo


class Characteristics(bo):
    def __init__(self):
        super().__init__()
        self._char_id = None
        self._char_name = ""

    def get_id(self):
        return self._id

    def set_char_id(self, value):
        self._char_id = value

    def get_char_id(self):
        return self._char_id

    def get_characteristic_name(self):
        return self._char_name

    def set_characteristic(self, value):
        self._char_name = value

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Characteristics()
        obj.set_id(dictionary['char_id'])
        obj.set_characteristic(dictionary['char_name'])
        return obj

