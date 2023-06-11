""" In diesem Dokument wird das Matchmkaing realisiert"""

"""Das Matchmaking vergleicht ein Suchprofil mit dem Profil eines anderen Nutzers und gibt einen 
Prozentwert zurück, der angibt, wie gut diese zusammenpassen. Dies wird für sämtliche Profile durchgefüht.
Der Prozentuale wert je Profil wird zurückgegeben und den Nutzer angezeigt."""

class Matchmaking:

    def __init__(self):
        super().__init__()


""" Definiere Matchmaking für das Profil"""

    def calc_matchmaking(self, search_profile, profile):
        print("Matchmaking aufgerufen")