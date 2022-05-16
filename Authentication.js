import { useState } from "react";
import { app } from "./firebaseConfig";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";


const Authentication = () => {

    let auth = getAuth();
    const [data, setData] = useState({});


    const handleInput = (event) => {
        let newInput = { [event.target.name]: event.target.value };
        setData({ ...data, ...newInput });
    };


    const createUser = () => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((response) => {
                console.log(response.user)
            })
            .catch((err) => {
                alert(err.message)
            })
    };

    const signIn = () => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((response) => {
                console.log(response.user)
            })
            .catch((err) => {
                alert(err.message)
            })
    };


    return (
        <div className="App" >
            <input
                name="email"
                placeholder="Email"
                onChange={(event) => handleInput(event)}
            />
            <input
                name="password"
                placeholder="Password"
                onChange={(event) => handleInput(event)}
            />
            <br />
            <button onClick={createUser}>Submit</button>
        </div>
    );
}

export default Authentication;