""" In diesem Dokument wird das Matchmkaing realisiert"""

"""Das Matchmaking vergleicht ein Suchprofil mit dem Profil eines anderen Nutzers und gibt einen 
Prozentwert zurück, der angibt, wie gut diese zusammenpassen. Dies wird für sämtliche Profile durchgefüht.
Der Prozentuale wert je Profil wird zurückgegeben und den Nutzer angezeigt."""

    # Sprachauswertung. Bei dieser wird zuerst geprft, ob die Eigenschaften
    # der durch den user definierten Eingaben ähnlich genug sind.
    # Anschließend wird die Ähnlichkeit der Info-Objekte verglichen.
class Matchmaking:
    def __init__(self, searchprofile, userprofile):
        self.searchprofile = searchprofile
        self.userprofile =userprofile

    def percentage(self):
        total_infoobjects = len(self.searchprofile.get_infoobjects)
        total_count = 0

        for infoobject in self.searchprofile:
            if infoobject in self.userprofile and self.searchprofile[infoobject] == self.userprofile[infoobject]:
                total_count += 1

        # Sprachauswertung kommt hierhin und muss in total percentage hinzugefgt werden.

        total_percentage = (total_count / total_infoobjects) *100
        return  total_percentage