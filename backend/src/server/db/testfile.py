from server.Administration import Administration
from server.bo.Matchmaking import Matchmaking
adm = Administration()
m =Matchmaking()

profile_id1 = 'H3wfee67TCh7dbHQz2qafu9Q9XB2'  # Setze hier die Profil-ID für das erste Profil ein
profile_id2 = 'H2Qfee67TCh7dbHQz2qafu9Q9XB2'  # Setze hier die Profil-ID für das zweite Profil ein


profile1 = m.get_char_values_for_profiles(profile_id1)
profile2 = m.get_char_values_for_profiles(profile_id2)


print(profile1)
print(profile2)

similarity = m.calculate_similarity(profile1, profile2)
print("Ähnlichkeit:", similarity)


print(profile1['Char Values'][30])