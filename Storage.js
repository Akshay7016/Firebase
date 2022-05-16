import { useState } from "react";
import { app, storage } from "./firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Storage = () => {

    const [data, setData] = useState({});

    const handleSubmit = () => {
        // to store image in some folder
        // const storageRef = ref(storage, `images/${data.name}`);

        const storageRef = ref(storage, data.name);
        const uploadTask = uploadBytesResumable(storageRef, data);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is" + progress + "% done");
            },
            (error) => {
                console.log(error.message);
            },
            () => {
                // success  
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                });
            }
        );
    }

    return (
        <div className="App">
            <input type="file" onChange={(event) => setData(event.target.files[0])} />
            <br />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );

}

export default Storage;