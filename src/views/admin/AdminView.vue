<script setup>
    import usePropiedades from '@/composables/usePropiedades'
    import { propertyPrice } from '@/helpers'

    const { propiedadesCollection, deletItem } = usePropiedades()
</script>

<template>
    <h2 class="text-center text-h3 my-5 font-weight-bold">Admin Panel</h2>
    
    <v-btn
        color="indigo"
        variant="flat"
        :to="{name: 'nueva-propiedad'}"
    >
        Nueva Propiedad
    </v-btn>

    <v-card class="mx-auto mt-10" flat>
        <v-list>
            <v-list-item
                v-for="propiedad in propiedadesCollection"
                :key="propiedad.id"
            >
                <template v-slot:prepend>
                    <v-list-item-media :start="true">
                        <img width="180" :src="propiedad.imagen">
                    </v-list-item-media>
                </template>
                <v-list-item-title>{{ propiedad.titulo }}</v-list-item-title>
                <v-list-item-subtitle>{{ propertyPrice(propiedad.precio) }}</v-list-item-subtitle>
                <template v-slot:append>
                    <v-btn
                        color="indigo"
                        flat
                        class="mr-2"
                        :to="{name: 'editar-propiedad', params: { id: propiedad.id}}"
                    >
                        Editar
                    </v-btn>
                    <v-btn
                        color="red-darken-2"
                        flat
                        class="mr-2"
                        @click="deletItem(propiedad.id, propiedad.imagen)"
                    >
                        Eliminar
                    </v-btn>
                </template>
            </v-list-item>
        </v-list>
    </v-card>
</template>