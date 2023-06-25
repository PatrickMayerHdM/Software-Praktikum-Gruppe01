from BusinessObject import BusinessObject as bo


class BlockNote(bo):
    def __init__(self):
        """
        blocking_id = Blockierende User
        blocked_id = Geblockte User
        """
        super().__init__()
        self.blocking_id = None
        self.blocked_id = None

    def set_blocked_id(self, blocked_id):
        """Setzen des Geblockten."""
        self.blocked_id = blocked_id

    def get_blocked_id(self):
        """Auslesen des Geblockten."""
        return self.blocked_id

    def set_blocking_id(self, blocking_id):
        """Setzen des Blockierenden."""
        self.blocking_id = blocking_id

    def get_blocking_id(self):
        """Auslesen des Blockierenden."""
        return self.blocking_id

    def __str__(self):
        # str Methode gibt das erstellte profil in Form eines String zurück
        return "blocknote: {}, {}, {}".format(self.get_id(), self.blocking_id, self.blocked_id)

    @staticmethod
    def from_dict(dictionary=dict()):
        bn = BlockNote()
        bn.set_id(dictionary['id'])
        bn.set_blocking_id(dictionary['blocking_id'])
        bn.set_blocked_id(dictionary['blocked_id'])
        return bn
