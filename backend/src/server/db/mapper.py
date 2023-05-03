import mysql.connector as connector
import os
from contextlib import AbstractContextManager
from abc import ABC, abstractmethod


class mapper(AbstractContextManager, ABC):

    def __init__(self):
        self._connection = None

    """Was soll geschehen wenn wir mit der Mapper anfangen zu arbeiten"""

    def __enter__(self):

        """Hier wird geprüft ob die Verbindung zur Datenbank in der Cloud oder lokal ausgeführt wird. """

        if os.getenv('GAE_ENV', '').startswith('standard'):

            self._connection = connector.connect(user='demo', password='demo', unix_socket='', database='DatingApp_V2')

        else:
            """Kommen wir hier an, läuft der Code auf einem lokalen Development Server. Es wird eine Verbindung zu 
            einer lokal installierten MySQL Datenbank hergestellt."""
            self._connection = connector.connect(user='demo', password='demo', host='', database='DatingApp_V2')

        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        """ Verbindung zur DB wird geschlossen, wenn wir nicht mehr mit Mapper arbeiten."""
        self._connection.close()

    @abstractmethod
    def find_all(self):
        pass

    @abstractmethod
    def find_by_key(self, key):
        pass

    @abstractmethod
    def insert(self, object):
        pass

    @abstractmethod
    def update(self, object):
        pass

    @abstractmethod
    def delete(self, object):
        pass


