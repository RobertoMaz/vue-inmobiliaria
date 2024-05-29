import { ref, computed } from "vue"
import { collection, doc, deleteDoc } from "firebase/firestore"
import { ref as storageRef, deleteObject } from "firebase/storage"
import { useFirestore, useCollection, useFirebaseStorage } from "vuefire"

export default function usePropiedades(){

    const pileta = ref(false)
    const storage = useFirebaseStorage()

    const db = useFirestore()
    const propiedadesCollection = useCollection(collection(db, 'propiedades'))

    async function deletItem(id, urlImage) {
        if(confirm('¿Deseas eliminar esta propiedad?')){
            const docRef = doc(db, 'propiedades', id)
            const imageRef = storageRef(storage, urlImage)

            await Promise.all([
                deleteDoc(docRef),
                deleteObject(imageRef)
            ])
        }
    }

    const propiedadesFiltradas = computed(() => {
            return pileta.value 
                ? propiedadesCollection.value.filter(propiedad => propiedad.pileta)
                : propiedadesCollection.value
    })

    return {
        propiedadesCollection,
        pileta,
        propiedadesFiltradas,
        deletItem
    }
}