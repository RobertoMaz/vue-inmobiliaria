import { ref } from 'vue'

export default function useLocationMap() {
    const zoom = ref(14)
    const center = ref([-34.7792101, -58.4733119])

    function pin(e) {
        const marker = e.target.getLatLng()
        center.value = [marker.lat, marker.lng]
    }

    return {
        zoom,
        center,
        pin
    }
}