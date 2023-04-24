from BusinessObject import BusinessObject as bo


class profile(bo):
    def __init__(self):
        super().__init__()
        self.charsList = []
        self.content = None
        self.contact_id = None

    def add_char(self, chars):
        """Die Charasteristics werden der Liste self.charsList hinzugefügt"""
        if chars not in self.charsList:
            self.charsList.append(chars)

    def del_chars(self, chars):
        """Die Charasteristics werden von der Liste self.charsList entfernt"""
        if chars in self.charsList:
            self.charsList.remove(chars)

    def show_char(self):
        """Zeigt die Charesteristics an"""
        return self.charsList







"""
Test des Codes

A = profile()

A.add_char("Raucher")
print(A.show_char())
"""