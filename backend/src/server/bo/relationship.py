from abc import ABC, abstractmethod

"""In relationship die get_id und set_id Methode eingeführt. Somit ist blockNote und favoriteNot eunabhängig von bo"""


class relationship(ABC):
    def __init__(self):
        self.rel_id = 0

    """Mit @abstractmethod können die Methoden später überschrieben werden"""

    @abstractmethod
    def add_user(self, profile_id):
        pass

    @abstractmethod
    def del_user(self, profile_id):
        pass

    @abstractmethod
    def get_all_users(self):
        pass
