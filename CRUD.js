import { useState, useEffect } from "react";

import { app, database } from "./firebaseConfig";
import {
    getAuth,
    signInwithEmailAndPassword,
    createUserWithEmailAndPassword
} from 'firebase/auth';

import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";
import './CRUD.css'

const CRUD = () => {
    const [array, setArray] = useState([]);
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const auth = getAuth();
    const dbInstance = collection(database, 'users')

    const handleInputs = (event) => {
        let inputs = { [event.target.name]: event.target.value }
        setData({ ...data, ...inputs })
    }

    const addData = () => {
        addDoc(dbInstance, data)
            .then(() => {
                alert('Data Sent');
                getData()
            })
            .catch((err) => {
                alert(err.message)
            })
    }


    const getData = async () => {
        const data = await getDocs(dbInstance);
        setArray(data.docs.map((item) => {
            return { ...item.data(), id: item.id }
        }))
    }

    const updateData = (id) => {
        let dataToUpdate = doc(database, 'users', id)
        updateDoc(dataToUpdate, {
            name: 'Ashish',
            email: 'ashishisbalh@gmail.com',
            password: 'abcdef'
        })
            .then(() => {
                alert('Data Updated')
                getData()
            })
            .catch((err) => {
                alert(err)
            })
    }

    const deleteData = (id) => {
        let dataToDelete = doc(database, 'users', id)
        deleteDoc(dataToDelete)
            .then(() => {
                alert('Data Deleted')
                getData()
            })
            .catch((err) => {
                alert(err)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="app-header">
            <input
                placeholder="Name"
                name="name"
                type="text"
                className="input-fields"
                onChange={event => handleInputs(event)}
            />
            <input
                placeholder="Email"
                name="email"
                type="email"
                className="input-fields"
                onChange={event => handleInputs(event)}
            />
            <input
                placeholder="Password"
                name="password"
                type="password"
                className="input-fields"
                onChange={event => handleInputs(event)}
            />

            <button onClick={addData}>Get Data</button>

            {array.map((item) => {
                return (
                    <div key={item.id}>
                        <p>{item.name}</p>
                        <p>{item.email}</p>
                        <p>{item.password}</p>

                        <button className="button" onClick={() => updateData(item.id)}>Update</button>
                        <button className="button" onClick={() => deleteData(item.id)}>Delete</button>
                    </div>
                )
            })}
        </div>
    );
}

export default CRUD;