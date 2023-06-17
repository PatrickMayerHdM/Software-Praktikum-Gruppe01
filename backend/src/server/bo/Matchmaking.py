from server.db.MatchmakingMapper import MatchmakingMapper
from BusinessObject import BusinessObject as bo
class Matchmaking(bo):
    def __init__(self):
        super().__init__()
        self.google_fk = None
        self.percentage = None
        self.searchprofile_id = None

    """Die Id des zu vergleichenden Suchprofils muss gesetzt werden"""
    def get_searchprofile_id(self):
        return self.searchprofile_id()
    def set_searchprofile_id(self, searchprofile_id):
        return self.searchprofile_id == searchprofile_id

    """Zuerst soll eine Liste mit allen Profilen in die Klasse gezogen werden"""
    def get_all_profiles(self):
        profile_list = []
        for # Profile aus der Datenbank holen:
            profile_list.append(#die Profile)

    """Anschließend sollen die Userprofile in der liste mit einem Suchprofil verglichen werden."""
    def genderfilter(self):
        pass

    """Dann wird getestet, ob das UserProfil in der Altersspanne des Suchprofils ist."""

    def agefilter(self):
        pass
    """Dann beginnt der eigentliche Algorihmus"""
    def get_char_values(self, profile_id):
        """Diese Methode holt sich die char_values je profil und speichert diese in einem Dictionary"""

        with MatchmakingMapper() as mapper:
            info_objects = mapper.find_info_by_profile(profile_id)
            char_values = {}

        for info_obj in info_objects:
            char_id = info_obj.get_char_fk()
            char_value = info_obj.get_value()
            char_values[char_id] = char_value

        return char_values

    def get_char_values_for_profiles(self, profile_id):
        """Diese Methode gibt ein Dictionary mit einer gegebenen Profile ID und deren Char Values zurück"""
        char_values = self.get_char_values(profile_id)

        profile = {
            "Profile ID": profile_id,
            "Char Values": char_values
        }
        return profile


    """ Hier fehlt noch der Mapper aufruf. (Wie wird genau der text ausgegeben? """


    def compare_text(self, text1, text2):
        """Diese Methode soll den Freitext der Profile miteinander vergleichen. Dabei wird der
        Jaccard Koeffizient angewendet. """

        """Zuerst müssen die Daten in das Matchmaking"""
        # Zuerst müssen die Texte in Worter aufgeteilt werden
        words1 = set(text1.lower().split())
        words2 = set(text2.lower().split())

        """Anschließend wird die Anzahl der gemeinsamen Wörter berechnet"""
        intersection = len(words1.intersection(words2))

        """Für den Jaccard Koeffizienten muss auch die Gegenmege bestimmt werden"""

        join = len(words1) + len(words2) - intersection

        """Anschließend soll der Jaccard Koeffizient berechnet werden"""
        comparation = intersection / join
        return comparation

    def calculate_similarity(self, profile1, profile2, comparation):
        """Diese Methode berechnet die Ähnlichkeit der zwei Profile"""
        char_values1 = profile1["Char Values"]
        char_values2 = profile2["Char Values"]

        """Die gesamte Anzahl der Charakteristiken wird benötigt, um den Nenner der Berechnung darzustellen"""
        total_keys = set(char_values1.keys()).union(char_values2.keys())
        matching_count = 0

        """Hier wird überprüft, ob die Info-Objekte gleich sind."""
        for key in total_keys:
            if key in char_values1 and key in char_values2:
                if char_values1[key] == char_values2[key]:
                    matching_count += 1

        """Die Anzahl der gleichen Info Objekte wird durch die gesamtanzahl der InfoObjekte geteilt.
        mit dem Ähnlichkeitsmaß wird auch das verglichene Userprofil zurückgegeben."""
        similarity = int(matching_count + comparation / len(total_keys)) *100  # muss die länge der keys + 1 werden?

        similarity_list = []
        similarity_list.append([profile1["google_id"], similarity])

        return similarity_list
