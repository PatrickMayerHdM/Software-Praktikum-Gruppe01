from server.bo.BusinessObject import BusinessObject as bo


class InfoObject(bo):
    def __init__(self, werte):
        super().__init__()
        self.werte = werte



