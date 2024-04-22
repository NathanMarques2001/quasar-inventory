<template>
  <q-dialog v-model="localVisible" @update:model-value="updateVisible">
    <q-card id="modal">
      <q-card-section>
        <q-card-title class="text-h6">Adicionar Patrimônio</q-card-title>
        <q-form @submit="handleSubmit">
          <q-input outlined v-model="categoria" label="Categoria" />
          <q-input outlined v-model="detalhe" label="Detalhe" />
          <q-input outlined v-model="dataAquisicao" label="Data de Aquisição" type="date" />
          <q-input outlined v-model="valorAquisicao" label="Valor de Aquisição" type="number" />
          <q-input outlined v-model="lote" label="Lote" type="number" />
          <q-input outlined v-model="areaAtribuicao" label="Área Atribuição" type="text" />
          <q-input outlined v-model="funcionarioAtribuicao" label="Funcionário Atribuição" type="text" />
          <q-card-actions align="right">
            <q-btn label="Cancelar" color="negative" @click="closeModal" />
            <q-btn type="button" label="Salvar" color="primary" @click="handleSubmit" />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, defineComponent } from 'vue';

export default defineComponent({
  name: 'Modal',
  props: {
    visible: Boolean,
    onSave: Function,
    onCloseModal: Function
  },
  setup(props) {
    const categoria = ref('');
    const detalhe = ref('');
    const dataAquisicao = ref('');
    const valorAquisicao = ref(0);
    const lote = ref(null);
    const areaAtribuicao = ref('');
    const funcionarioAtribuicao = ref('');
    const localVisible = ref(props.visible);

    const handleSubmit = () => {
      const patrimonio = {
        categoria: categoria.value,
        detalhe: detalhe.value,
        dataAquisicao: dataAquisicao.value,
        valorAquisicao: parseFloat(valorAquisicao.value),
        lote: lote.value,
        areaAtribuicao: areaAtribuicao.value,
        funcionarioAtribuicao: funcionarioAtribuicao.value
      };
      props.onSave(patrimonio);
      console.log(patrimonio);
      closeModal();
    };

    const closeModal = () => {
      localVisible.value = false;
      categoria.value = '';
      detalhe.value = '';
      dataAquisicao.value = '';
      valorAquisicao.value = 0;
      lote.value = null;
      areaAtribuicao.value = '';
      funcionarioAtribuicao.value = '';
      props.onCloseModal();
    };

    // Atualize a variável local quando a propriedade visível é alterada externamente
    const updateVisible = (value) => {
      localVisible.value = value;
    };

    return {
      categoria,
      detalhe,
      dataAquisicao,
      valorAquisicao,
      lote,
      areaAtribuicao,
      funcionarioAtribuicao,
      localVisible,
      handleSubmit,
      closeModal,
      updateVisible
    };
  }
});
</script>

<style scoped>
#modal {
  width: 60%;
}
</style>