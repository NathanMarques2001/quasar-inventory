<template>
  <div class="q-pa-md">
    <q-table id="table" flat bordered :title="area" :rows="filteredRows" :columns="columns" row-key="index"
      virtual-scroll v-model:pagination="pagination" :rows-per-page-options="[rows.length]" />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const columns = [
  {
    name: 'index',
    label: '#',
    field: 'funcionario',
    align: 'left',
  },
  {
    name: 'nome',
    required: true,
    label: 'Nome',
    align: 'left',
    field: row => row.nome,
    sortable: true
  },
  {
    name: 'area',
    align: 'center',
    label: 'Área',
    field: 'area',
    sortable: true
  }
]

const seed = [
  {
    nome: "Nathan",
    area: "GSI",
    funcionario: "p012345"
  },
  {
    nome: "Joyce",
    area: "GSI",
    funcionario: "p012346"
  },
  {
    nome: "Carlos",
    area: "RH",
    funcionario: "p012347"
  },
  {
    nome: "Ana",
    area: "TI",
    funcionario: "p012348"
  },
  {
    nome: "Maria",
    area: "RH",
    funcionario: "p012349"
  },
  {
    nome: "Pedro",
    area: "TI",
    funcionario: "p012350"
  },
  {
    nome: "Bryan",
    area: "GS",
    funcionario: "p012351"
  }
]

let rows = []
for (let i = 0; i < seed.length; i++) {
  rows.push({ ...seed[i], index: i })
}

export default {
  setup() {
    const route = useRoute()
    const area = ref(route.params.area)

    const filteredRows = computed(() => {
      return rows.filter(row => row.area === area.value)
    })

    const pagination = ref({
      rowsPerPage: rows.length
    })

    return {
      columns,
      rows,
      filteredRows,
      pagination,
      area
    }
  }
}
</script>

<style scoped>
#table {
  min-height: 80vh;
  background-color: #1C1D22;
  color: #FFFFFF;
}
</style>
