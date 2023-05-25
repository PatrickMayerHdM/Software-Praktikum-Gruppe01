from BusinessObject import BusinessObject as bo


class Profile(bo):
    def __init__(self):
        super().__init__()
        self.favoriteNote_id = None
        self.account_id = None
        self.blockNote_id = None

    def get_favorite_note_id(self):
        return self.favoriteNote_id

    def set_favorite_note_id(self, favorite_note_id):
        self.favoriteNote_id = favorite_note_id

    def get_account_id(self):
        return self.account_id

    def set_account_id(self, account_id):
        self.account_id = account_id

    def get_block_note_id(self):
        return self.blockNote_id

    def set_block_note_id(self, block_note_id):
        self.blockNote_id = block_note_id



    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Profile()
        obj.set_id(dictionary['id'])
        obj.set_favorite_note_id(dictionary['favoriteNote_id'])
        obj.set_account_id(dictionary['account_id'])
        obj.set_block_note_id(dictionary['blockNote_id'])
        return obj
