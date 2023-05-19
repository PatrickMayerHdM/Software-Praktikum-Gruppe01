from flask import request
from google.auth.transport import requests
import google.oauth2.id_token
from server.Administration import Administration


def secured(function):


    firebase_request_adapter = requests.Request()

    def wrapper(*args, **kwargs):
        # Holt sich den token, von dem Cookie und speichert sich diesen in id_token
        id_token = request.cookies.get("token")

        error_message = None
        claims = None
        objects = None


        if id_token:
            try:
                """
                Verifiziert den token mit der Firebase Auth API, dies passiert dabei jedes mal wenn eine Seite geladen 
                wird. Dies ist zwar recht Arbeitsintensiv, jedoch für unsere Anwendung in Ordnung.
                """
                claims = google.oauth2.id_token.verify_firebase_token(
                    id_token, firebase_request_adapter)

                if claims is not None:
                    adm = Administration()

                    google_user_id = claims.get("user_id")
                    email = claims.get("email")
                    name = claims.get("name")


                    account = adm.get_account_by_google_id(google_user_id) # Wir müssen dies in Administration noch erstellen.

                    if account is not None:

                        """
                        Wenn der Account bei uns schon bekannt ist, wurde diese google_user_id schon verwendet. 
                        Die google_user_id, dabei gehen wir davon aus, dass sich die google_user_id nicht verändern kann.
                        Jedoch können sich andere Teile, wie der Name oder die E-Mailadresse verändern. 
                        Um jetzt Fehler zu vermeiden, updaten wir jetzt in unserem System einmal diese beiden Objekte.
                        """

                        account.set_email(email)
                        account.set_user_name(name)
                        adm.save_account(account)

                    else:

                        """
                        Dies tritt auf, wenn der Anwender mit dieser google_user_id bisher noch nicht in unserem System 
                        war. Daher legen wir ein neues Account-Objekt an und übergeben in dieses den Namen, die E-Mail 
                        adresse und die google_user_id.
                        """

                        account = adm.create_account(google_user_id, name, email)

                    print(request.method, request.path, "angefragt durch:", name, email)

                    objects = function(*args, **kwargs)
                    return objects

                else:
                    return " ", 401  # UNAUTHORIZED

            except ValueError as exc:
                error_message = str(exc)
                return exc, 401 # UNAUTHORIZED

        return " ", 401 # UNAUTHORIZED

    return wrapper






