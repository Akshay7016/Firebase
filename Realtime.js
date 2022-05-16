import { useState, useEffect } from "react";

import { app, database } from "./firebaseConfig";
import {
    collection,
    addDoc,
    onSnapshot
} from "firebase/firestore";


const Realtime = () => {

    const [data, setData] = useState({});
    const collectionRef = collection(database, "users");


    const handleInput = (event) => {
        let newInput = { [event.target.name]: event.target.value };
        setData({ ...data, ...newInput });
    };

    const addData = () => {
        addDoc(collectionRef, {
            email: data.email,
            password: data.password
        })
            .then(() => {
                alert("Data Added");
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    // Realtime changes will happen 
    const getData = () => {
        onSnapshot(collectionRef, (data) => {
            console.log(
                data.docs.map((item) => {
                    return item.data();
                })
            );
        });
    };

    useEffect(() => {
        getData();
    }, []);

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
            <button onClick={addData}>Submit</button>
        </div>
    );

}

export default Realtime;