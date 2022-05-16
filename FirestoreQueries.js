import { useState, useEffect } from "react";

import { app, database } from "./firebaseConfig";
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    where
} from "firebase/firestore";


const FirestoreQueries = () => {

    const [data, setData] = useState({});


    const handleInput = (event) => {
        let newInput = { [event.target.name]: event.target.value };
        setData({ ...data, ...newInput });
    };
    const collectionRef = collection(database, "users");
    const ageQuery = query(collectionRef, where("age", "==", 28));

    const handleSubmit = () => {
        addDoc(collectionRef, {
            name: data.name,
            email: data.email,
            age: Number(data.age)
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
        onSnapshot(ageQuery, (data) => {
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
        <div>
            <input
                name="name"
                placeholder="Name"
                onChange={(event) => handleInput(event)}
            />

            <input
                name="email"
                placeholder="Email"
                onChange={(event) => handleInput(event)}
            />

            <input
                name="age"
                placeholder="Age"
                onChange={(event) => handleInput(event)}
            />
            <br />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default FirestoreQueries;