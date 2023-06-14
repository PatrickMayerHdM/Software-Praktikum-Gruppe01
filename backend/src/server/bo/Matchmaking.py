""" In diesem Dokument wird das Matchmkaing realisiert"""

"""Das Matchmaking vergleicht ein Suchprofil mit dem Profil eines anderen Nutzers und gibt einen 
Prozentwert zurück, der angibt, wie gut diese zusammenpassen. Dies wird für sämtliche Profile durchgefüht.
Der Prozentuale wert je Profil wird zurückgegeben und den Nutzer angezeigt."""

    # Sprachauswertung. Bei dieser wird zuerst geprft, ob die Eigenschaften
    # der durch den user definierten Eingaben ähnlich genug sind.
    # Anschließend wird die Ähnlichkeit der Info-Objekte verglichen.
class Matchmaking:

    def __init__(self, searchprofile_id, userprofile_id):
        self.searchprofile_id = "" # id des ausgewählten Suchprofils
        self.userprofile_id = "" # id des betrachteten userprofils
        self.info_object_id = "" # Id der Info Objekte, die gezogen werden
        self.characteristic_id = "" # Id der Charakteristik

# Hier werden noch set methoden benötigt. Für jede variable, die gezogen wird.
        def find_profile_id_by_key(self):
            """Auslesen der id des betrachteten userprofils"""
            return self.userprofile_id
        def get_searchprofile_id(self):
            """Auslesen der id des ausgewählten Suchprofils"""
            return  self.searchprofile_id
        def get_info_object_id(self):
            """auslesen der Infoobjekt_id"""
            return self.info_object_id
        def get_characteristic_id(self):
            """Auslesen der Charakteristik_id"""
            return self.characteristic_id


    def percentage(self):
        total_infoobjects = len(self.searchprofile_id.get_infoobject_id)
        total_count = 0

        for infoobject in self.searchprofile_id:
            if infoobject in self.userprofile_id and self.searchprofile_id[char_value] == self.userprofile_id[char_value]:
                total_count += 1

        # Sprachauswertung kommt hierhin und muss in total percentage hinzugefgt werden.

        total_percentage = (total_count / total_infoobjects) *100
        return  total_percentage


