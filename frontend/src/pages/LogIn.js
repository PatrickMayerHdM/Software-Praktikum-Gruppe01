import React, {useEffect, useState} from "react";
import {auth, provider} from "./onfig";
import {signInWithPopup} from "firebase/auth";
import OnBoarding from "./OnBoarding";
function SignIn() {
	const [value,setValue] = useState('')
	const handleClick = () =>{
		signInWithPopup(auth,provider).then((data)=>{
			setValue(data.user.email)
			localStorage.setItem("email", data.user.email)
		})
	}

	useEffect(()=>{
		setValue(localStorage.getItem("email"))
	})
return (
	<div>
		{value?<OnBoarding/>:
			<button onClick={handleClick}> Registrieren mit Google </button>
		}
	</div>
);
}
export default SignIn;