from server.bo.BusinessObject import BusinessObject as bo
from server.bo.Characteristic import Characteristic as char


class InfoObject(char, bo):
    def __init__(self, name, characteristic):
        super().__init__()
        self.name = name
        self.characteristic = characteristic


    def get_choices(self):
        """ Auslesen der Auswahlmöglichkeiten """

        return {
            'FirstName': [],
            'SurName': [],
            'Age': [],
            'Sex': ['Männlich', 'Weiblich', 'Divers'],
            'Bodyheight': [],
            'Haircolor': ['schwarz', 'braun', 'blond', 'rot'],
            'Description': [],
            'Smoking': ['Raucher', 'Nichtraucher'],
            'Religion': ['Christentum', 'Islam', 'Judentum', 'Hinduismus', 'Atheist'],
            'SearchingFor': ['Offene Beziehung', 'Feste Beziehung', 'Nur Spaß']
        }


