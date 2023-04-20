from abc import ABC, abstractmethod


class relationship(ABC):
    """relationship ist die Superklasse von favoriteNote und BlockNote"""

    @abstractmethod
    def create_relation(self):
        pass

    """Mit @abstractmethod können die Methoden später überschrieben werden"""

    @abstractmethod
    def add_user(self, profile_id):
        pass

    @abstractmethod
    def del_user(self, profile_id):
        pass

    @abstractmethod
    def show_user(self):
        pass
