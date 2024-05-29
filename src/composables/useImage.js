import { ref as storageRef } from "firebase/storage"
import { useFirebaseStorage, useStorageFile } from "vuefire"
import { computed } from "vue"

export default function useImage() {

    const newId = crypto.randomUUID()
    const storage = useFirebaseStorage()
    const storageRefPath = storageRef(storage, `/propiedades/${newId}.jpg`)

    const { 
        url,
        upload
    } = useStorageFile(storageRefPath)

    function uploadImage(e) {
        const data = e.target.files[0]
        if(data) upload(data)    
    }

    const image = computed(() => {
        return url.value ? url.value : null
    })

    return {
        image,
        url,
        uploadImage  
    }
}