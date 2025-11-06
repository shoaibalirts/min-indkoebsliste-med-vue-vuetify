<template>
  <v-container>
    <h1 class="text-h5 mb-4">Dine Indkøbslister</h1>
    <v-list>
      <v-list-item
        v-for="list in sortedLists"
        :key="list.id"
        @click="goToList(list.id)"
        class="mb-2"
      >
        <v-list-item-content>
          <v-list-item-title>{{ list.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ formatDate(list.date) }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-chip :color="getLevelColor(list.co2Level)" text-color="white" label>
          {{ list.co2Level }}
        </v-chip>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const lists = ref([
  { id: 1, name: 'Aftensmad', date: '2025-11-05', co2Level: 'Høj' },
  { id: 2, name: 'Rema 100', date: '2025-11-04', co2Level: 'Medium' },
  { id: 3, name: 'Fødselsdagsfest', date: '2025-10-30', co2Level: 'Lav' }
])

const sortedLists = computed(() =>
  [...lists.value].sort((a, b) => new Date(b.date) - new Date(a.date))
)

const formatDate = date => new Date(date).toLocaleDateString('da-DK')
const getLevelColor = level => {
  if (level === 'Høj') return 'red'
  if (level === 'Medium') return 'orange'
  return 'green'
}

const goToList = id => router.push(`/lists/${id}`)
</script>
