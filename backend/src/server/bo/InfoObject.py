from server.bo.BusinessObject import BusinessObject as bo
from server.bo.Characteristic import Characteristic as char
class InfoObject(bo, char):
    def __init__(self):
        super().__init__()

    def get_choices(self):

        """ Auslesen der Auswahlmöglichkeiten """

        return {
            'FirstName' : [],
            'SurName' : [],
            'Age' : [],
            'Sex' : ['Männlich', 'Weiblich', 'Divers'],
            'Bodyheight' : [],
            'Haircolor' : ['schwarz', 'braun', 'blond', 'rot'],
            'Description' : [],
            'Smoking' : ['Raucher', 'Nichtraucher'],
            'Religion' : ['Christentum', 'Islam', 'Judentum', 'Hinduismus', 'Atheist'],
            'SearchingFor' : ['Offene Beziehung', 'Feste Beziehung', 'Nur Spaß']
        }