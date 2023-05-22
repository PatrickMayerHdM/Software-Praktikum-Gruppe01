from server.bo.BusinessObject import BusinessObject as bo


class InfoObject(bo):
    def __init__(self):
        super().__init__()
        self.charx_id = None
        self.value = None

    def set_char_reference(self, char_id):
        self.charx_id = char_id

    def get_char_reference(self):
        return self.charx_id

    def set_value(self, value):
        self.value = value

    def get_value(self):
        return self.value


