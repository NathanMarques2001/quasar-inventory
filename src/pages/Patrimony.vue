<template>
  <div class="q-pa-md">
    <q-btn @click="openModal" label="Adicionar Patrimônio" color="primary" />
    <Modal :modalOpen="modalOpen" @closeModal="modalOpen = false" />
    <q-table id="table" flat bordered title="Patrimônios" :rows="rows" :columns="columns" row-key="id" virtual-scroll
      v-model:pagination="pagination" :rows-per-page-options="[rows.length]" />
  </div>
</template>

<script>
import { ref } from 'vue'
import ActionButton from '../components/ActionButton.vue'
import Modal from 'src/components/Modal.vue';

const columns = [
  {
    name: 'id',
    label: 'ID',
    field: 'id'
  },
  {
    name: 'categoria',
    required: true,
    label: 'Categoria',
    align: 'left',
    field: row => row.categoria,
    sortable: true
  },
  {
    name: 'detalhe',
    label: 'Detalhe',
    align: 'left',
    field: row => row.detalhe,
    sortable: true
  },
  {
    name: 'ativo',
    label: 'Ativo',
    align: 'center',
    field: row => row.ativo ? 'Sim' : 'Não',
    sortable: true
  },
  {
    name: 'areaAtribuicao',
    label: 'Área Atribuição',
    align: 'center',
    field: row => row.areaAtribuicao,
    sortable: true
  },
  {
    name: 'funcionarioAtribuicao',
    label: 'Funcionário Atribuição',
    align: 'center',
    field: row => row.funcionarioAtribuicao,
    sortable: true
  },
  {
    name: 'actions',
    label: 'Ações',
    field: 'actions',
    align: 'center',
  }
]

const patrimonios = [
  {
    id: 126,
    categoria: "Notebook",
    detalhe: "Notebook Lenovo ThinkPad X1 Carbon Gen 9",
    ativo: true,
    dataAtribuicao: "2024-04-21",
    areaAtribuicao: "GSI",
    funcionarioAtribuicao: "p012345",
    enderecoAtribuicao: "Sede Rua da Bahia - Prédio II, sala 211",
    dataRecolhimento: null,
    motivoRecolhimento: "",
    estadoConservacao: "novo",
    detalheConservacao: "Em perfeito estado"
  },
  {
    id: 127,
    categoria: "Impressora",
    detalhe: "Impressora HP LaserJet Pro MFP M428fdw",
    ativo: false,
    dataAtribuicao: "2024-03-15",
    areaAtribuicao: "RH",
    funcionarioAtribuicao: "p012346",
    enderecoAtribuicao: "Home-office",
    dataRecolhimento: "2024-04-10",
    motivoRecolhimento: "Término do contrato",
    estadoConservacao: "marcas de uso",
    detalheConservacao: "Funciona perfeitamente, mas com algumas marcas de uso visíveis."
  },
  {
    id: 128,
    categoria: "Cadeira",
    detalhe: "Cadeira ergonômica Herman Miller Aeron",
    ativo: true,
    dataAtribuicao: "2024-02-10",
    areaAtribuicao: "TI",
    funcionarioAtribuicao: "p012347",
    enderecoAtribuicao: "Sede Rua da Bahia - Prédio III, sala 301",
    dataRecolhimento: null,
    motivoRecolhimento: "",
    estadoConservacao: "velho",
    detalheConservacao: "Funciona, mas apresenta alguns sinais de desgaste."
  },
  {
    id: 129,
    categoria: "Mesa",
    detalhe: "Mesa de escritório em L",
    ativo: true,
    dataAtribuicao: "2024-03-15",
    areaAtribuicao: "RH",
    funcionarioAtribuicao: "p012349",
    enderecoAtribuicao: "Sede Rua da Bahia - Prédio III, sala 303",
    dataRecolhimento: null,
    motivoRecolhimento: "",
    estadoConservacao: "novo",
    detalheConservacao: "Em perfeito estado"
  },
  {
    id: 130,
    categoria: "Lâmpada",
    detalhe: "Lâmpada LED Philips Hue White and Color Ambiance",
    ativo: true,
    dataAtribuicao: "2024-02-10",
    areaAtribuicao: "TI",
    funcionarioAtribuicao: "p012350",
    enderecoAtribuicao: "Home-office",
    dataRecolhimento: null,
    motivoRecolhimento: "",
    estadoConservacao: "novo",
    detalheConservacao: "Em perfeito estado"
  },
  {
    id: 131,
    categoria: "Câmera",
    detalhe: "Câmera de segurança Arlo Pro 3",
    ativo: true,
    dataAtribuicao: "2024-03-20",
    areaAtribuicao: "GS",
    funcionarioAtribuicao: "p012351",
    enderecoAtribuicao: "Sede Rua da Bahia - Prédio II, sala 305",
    dataRecolhimento: null,
    motivoRecolhimento: "",
    estadoConservacao: "novo",
    detalheConservacao: "Em perfeito estado"
  }
];

const rows = patrimonios.map(patrimonio => ({
  ...patrimonio,
  actions: {
    component: ActionButton,
    id: patrimonio.id
  }
}));

export default {
  components: {
    ActionButton,
    Modal
  },
  setup() {
    const modalOpen = ref(false);

    // Método para abrir o modal
    const openModal = () => {
      modalOpen.value = true;
    };
    return {
      columns,
      rows,
      modalOpen,
      openModal,
      pagination: ref({
        rowsPerPage: rows.length
      })
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
