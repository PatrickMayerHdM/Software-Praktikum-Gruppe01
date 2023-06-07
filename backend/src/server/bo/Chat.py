from BusinessObject import BusinessObject


class Chat(BusinessObject):
    def __init__(self):
        super().__init__()
        self.message_id = None

    def set_message_id(self, message_id):
        self.message_id = message_id

    def get_message_id(self):
        return self.message_id


    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Chat()
        obj.set_id(dictionary['id'])
        obj.set_message_id(dictionary['message_id'])
        return obj
