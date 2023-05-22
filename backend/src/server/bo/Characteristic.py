from BusinessObject import BusinessObject as bo

class Characteristics(bo):
    def __init__(self):
        super().__init__()
        self.char_id = None
        self.char_name = ""

    def get_characteristic(self):
        return self.char_id

    def set_characteristic(self, value):
        self.char_name = value