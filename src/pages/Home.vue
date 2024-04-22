<template>
  <q-page>
    <div id="input-container">
      <q-input class="q-input--dense" outlined v-model="searchTerm" label="Pesquisar por área" :dense="dense" />
    </div>
    <div id="home-container">
      <template v-for="(region, index) in filteredRegions" :key="index">
        <Card :title="region.title" :numberOfPeople="region.numberOfPeople" :numberOfAssets="region.numberOfAssets" />
      </template>
    </div>
  </q-page>
</template>

<script setup>
import Card from '../components/Card.vue';
import { ref, computed } from 'vue';

const regions = [
  { title: 'GSI', numberOfPeople: 2 },
  { title: 'GS', numberOfPeople: 1 },
  { title: 'TI', numberOfPeople: 2 },
  { title: 'RH', numberOfPeople: 2 }
];

const searchTerm = ref('');
const dense = ref(true);

const filteredRegions = computed(() => {
  return regions.filter(region => region.title.toLowerCase().includes(searchTerm.value.toLowerCase()));
});
</script>

<style scoped>
#home-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-left: 6%;
  gap: 8%;
}

#input-container {
  margin-top: 1%;
  width: 100%;
  display: flex;
  justify-content: center;
}

#input-container .q-input--dense {
  width: 80%;
  background-color: #DBE2E2;
  border-radius: 5px;
}
</style>
