<template>
  <v-container>
    <v-btn icon="mdi-arrow-left" @click="$router.back()"></v-btn>
    <h2 class="text-h5 mb-2">{{ list.name }}</h2>
    <p class="text-subtitle-2 mb-4">CO₂e: {{ list.totalCO2 }} kg ({{ list.co2Level }})</p>
    <v-list>
      <v-list-item v-for="(item, i) in list.items" :key="i">
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.amount }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-chip>{{ item.co2 }} kg CO₂</v-chip>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const list = ref(null)

onMounted(() => {
  const mockLists = [
    {
      id: 1,
      name: 'Aftensmad',
      totalCO2: 6.4,
      co2Level: 'Høj',
      items: [
        { name: 'Hakket oksekød', amount: '200g', co2: 10 },
        { name: 'Æg', amount: '10 stk', co2: 8 },
        { name: 'Smør', amount: '200g', co2: 10 },
      ],
    },
    {
      id: 2,
      name: 'Rema 100',
      totalCO2: 3.2,
      co2Level: 'Medium',
      items: [
        { name: 'Tomater', amount: '1kg', co2: 1.2 },
        { name: 'Ris', amount: '500g', co2: 2 },
      ],
    },
  ]
  list.value = mockLists.find(l => l.id === parseInt(route.params.id))
})
</script>
