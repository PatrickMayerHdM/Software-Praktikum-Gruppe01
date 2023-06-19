from BusinessObject import BusinessObject as bo


class NamedCharacteristics(bo):

    def __int__(self):
        super().__int__()
        self.named_char_name = ""

    def get_named_char_id(self):
        return self._id

    def get_named_characteristic_name(self):
        return self.named_char_name

    def set_named_characteristic(self, value):
        self.named_char_name = value

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = NamedCharacteristics()
        obj.set_named_characteristic(dictionary['char_name'])
        return obj
