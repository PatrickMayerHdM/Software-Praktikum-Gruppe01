# Anleitung anbindung fake-backend
## In package.json
### 1. proxy:
in package.json den proxy zu "http://localhost:3001" wechseln. 
  `"proxy": "http://localhost:3001",`
<br> **(Vor einem commit gilt dies wieder rückgängig zu machen!)**

### 2. json-server:
um den richtigen json sever zu haben, in package.json das richtige json auswählen. Also wenn man einen
Test mit messages machen will, sollte hier beim script das stehen: 
<br> `"start": "json-server --watch fake-backend/datingsite/api/newprofiles.json --port 3001 --delay 2500"`

### 3. json-server starten
Damit die Anbindung funktioniert sollte hier `start` ausgeführt werden

## Im Ordner fake-backend
### 4. json sollte da sein
Hier jetzt überprüfen ob das das benötigte json da ist und sonst erstellen.

### 5. json routes
In routes.json muss jetzt die Route zu dem passenden json noch überprüft werden, ob vorhanden. 
Wenn dies nicht der Fall ist gilt diese zu erstellen.

### 6. Beispiel config (params)
Wenn es sich um einen komplett neunen Call handelt, so muss dieser hier erst so definiert werden.
<br> In diesem Beispiel ist es `params: '/newprofiles',`. Hier gibt das newprofiles die Endung an welche die URL für 
die Anfrage haben muss, um dann quasi hier zu landen.

### 7. Beispiel config (requests)
Dann werden requests definiert.<br> `requests: [{ method: 'GET', response: '/response-files/api/newprofiles.json' },`
<br> Dies ist dann eine request mit der get Methode, auf dieses json file: `newprofiles.json`

## In DaitingSiteAPI
### 8. datingServerBaseURL
Hier muss zum einen die `datingServerBaseURL` geändert werden. So soll dann die eigentliche, welche ins richtige 
Backend geht auskommentiert werden und diese welche für das fake-backend definiert ist nicht mehr kommentiert sein.
<br> **(Vor einem commit gilt dies wieder rückgängig zu machen!)**

### 9. URL der Anfrage überprüfen
Für die einzelne Anfrage, sollte dann nochamals überprüft werden, ob die URL auch wirklich sitmmt.

### 10. react (neu)starten
Hier gilt es entweder React jetzt nochmals zu starten, oder React zu starten. Denn wenn änderungen an der package.json 
gemacht wurden, sollte React neu gestartet werden, damit auch wirklich alles korrekt ausgeführt wird.
<br>
<br>
<br> **(Diese Anleitung ist ein work in progress, da ich selbst bisher nur limitierte erfahrung mit dem Fake-backend
habe, meine Erkenntnisse jedoch einmal notieren wollte, Grüße Patrick Mayer)**