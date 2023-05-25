from BusinessObject import BusinessObject as bo


class Characteristics(bo):
    def __init__(self):
        super().__init__()
        self.char_name = ""

    def get_char_id(self):
        return self._id

    def get_characteristic_name(self):
        return self.char_name

    def set_characteristic(self, value):
        self.char_name = value

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Characteristics()
        obj.set_id(dictionary['id'])
        obj.set_characteristic(dictionary['char_name'])
        return obj



