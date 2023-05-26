from BusinessObject import BusinessObject as bo


class Characteristics(bo):
    def __init__(self):
        super().__init__()
        self.char_name = ""
        self.char_typ = ""

    def get_char_id(self):
        return self._id

    def get_characteristic_name(self):
        return self.char_name

    def set_characteristic(self, value):
        self.char_name = value

    def set_characteristic_typ(self, typ):
        self.char_typ = typ

    def get_characteristic_typ(self):
        return self.char_typ

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Characteristics()
        obj.set_id(dictionary['id'])
        obj.set_characteristic(dictionary['char_name'])
        return obj


"""
obj = Characteristics()
print(obj.char_id)
"""
