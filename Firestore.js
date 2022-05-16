import { useState } from "react";

import { app, database } from "./firebaseConfig";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";


const Firestore = () => {

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

    const getData = () => {
        getDocs(collectionRef).then((response) => {
            console.log(
                response.docs.map((item) => {
                    return { ...item.data(), id: item.id };
                })
            );
        });
    };

    const updateData = () => {
        const docToUpdate = doc(database, "users", "UB3pXXrT1ruYz7nNIVFA");
        updateDoc(docToUpdate, {
            email: "ABC@gmail.com",
            password: 789655
        })
            .then(() => {
                alert("Data Updated");
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    const deleteData = () => {
        const docToDelete = doc(database, "users", "QshS7BlC0pu1vOpx4Woj");
        deleteDoc(docToDelete)
            .then(() => {
                alert("Data Deleted");
            })
            .catch((err) => {
                alert(err.message);
            });
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
            <button onClick={deleteData}>Submit</button>
        </div>
    );

}

export default Firestore;

//--------------------------FirebaseConfig.js------------------------------

// import{initializeApp}from "firebase/app";
// import{getFirestore}from 'firebase/firestore';
// const firebaseConfig={
//   apikey: "AIzaSyCIJW3zligbSHVsfEuCixG90i5SqkFZ@gM",
//   authDomain: "fir-frontend-c872e.firebaseapp.com"
//   projectId: "fir-frontend-c872e",
//   storageBucket: "fir-frontend-c872e.appspot.com",
//  messagingSenderId: "866258327739",
//   appId: "1:866258327739:web:68a139d624a9c9d682f19e"
// };
// export const app=initializeApp (firebaseConfig);
// export const database=getFirestore (app) 
