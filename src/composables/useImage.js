import { ref as storageRef } from "firebase/storage"
import { useFirebaseStorage, useStorageFile } from "vuefire"

export default function useImage() {

    const newId = crypto.randomUUID()
    const storage = useFirebaseStorage()
    const storageRefPath = storageRef(storage, `/propiedades/${newId}`)

    const { 
        url,
        upload
    } = useStorageFile(storageRefPath)


    function uploadImage(e) {
        console.log(e.target.files[0])
    }

    return {
        uploadImage,

    }
}