<script setup>
  import usePropiedades from '@/composables/usePropiedades'
  import Propiedad from '@/components/Propiedad.vue'
  import { propertyPrice } from '@/helpers'
  const { pileta, propiedadesFiltradas } = usePropiedades()

</script>

<template>
  <h1 class="text-center text-h3 my-5 font-weight-bold">Nuestras Propiedades</h1>
  <v-card flat class="py-10">
    <v-card-title>
      Búsqueda 
      <v-checkbox label="Pileta" v-model="pileta" />
    </v-card-title>
    <v-row>
      <Propiedad 
        v-for="propiedad in propiedadesFiltradas"
        :key="propiedad.id"
        :propiedad="propiedad"
        :price="propertyPrice"
      />
    </v-row>
  </v-card>
</template>
