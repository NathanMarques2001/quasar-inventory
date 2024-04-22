<template>
  <q-dialog v-model="localVisible" @update:model-value="updateVisible">
    <q-card id="modal">
      <q-card-section>
        <q-card-title class="text-h6">Editar Patrimônio</q-card-title>
        <q-form @submit="handleSubmit">
          <q-input outlined v-model="categoria" label="Categoria" />
          <q-input outlined v-model="detalhe" label="Detalhe" />
          <q-input id="checkbox" type="checkbox" v-model="ativo" label="Ativo" />
          <q-input outlined v-model="dataAtribuicao" label="Data de Atribuição" type="date" />
          <q-input outlined v-model="areaAtribuicao" label="Área de Atribuição" />
          <q-input outlined v-model="funcionarioAtribuicao" label="Funcionário de Atribuição" />
          <q-input outlined v-model="enderecoAtribuicao" label="Endereço de Atribuição" />
          <q-input outlined v-model="dataRecolhimento" label="Data de Recolhimento" type="date" />
          <q-input outlined v-model="motivoRecolhimento" label="Motivo de Recolhimento" />
          <q-input outlined v-model="estadoConservacao" label="Estado de Conservação" />
          <q-input outlined v-model="detalheConservacao" label="Detalhe de Conservação" />
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
  name: 'EditForm',
  props: {
    visible: Boolean,
    onSave: Function,
    onCloseModal: Function
  },
  setup(props) {
    const categoria = ref('');
    const detalhe = ref('');
    const ativo = ref(false);
    const dataAtribuicao = ref('');
    const areaAtribuicao = ref('');
    const funcionarioAtribuicao = ref('');
    const enderecoAtribuicao = ref('');
    const dataRecolhimento = ref('');
    const motivoRecolhimento = ref('');
    const estadoConservacao = ref('');
    const detalheConservacao = ref('');
    const localVisible = ref(props.visible);

    const handleSubmit = () => {
      const patrimonio = {
        categoria: categoria.value,
        detalhe: detalhe.value,
        ativo: ativo.value,
        dataAtribuicao: dataAtribuicao.value,
        areaAtribuicao: areaAtribuicao.value,
        funcionarioAtribuicao: funcionarioAtribuicao.value,
        enderecoAtribuicao: enderecoAtribuicao.value,
        dataRecolhimento: dataRecolhimento.value,
        motivoRecolhimento: motivoRecolhimento.value,
        estadoConservacao: estadoConservacao.value,
        detalheConservacao: detalheConservacao.value
      };
      props.onSave(patrimonio);
      closeModal();
    };

    const closeModal = () => {
      localVisible.value = false;
      // Limpar os campos do formulário ao fechar o modal
      categoria.value = '';
      detalhe.value = '';
      ativo.value = false;
      dataAtribuicao.value = '';
      areaAtribuicao.value = '';
      funcionarioAtribuicao.value = '';
      enderecoAtribuicao.value = '';
      dataRecolhimento.value = '';
      motivoRecolhimento.value = '';
      estadoConservacao.value = '';
      detalheConservacao.value = '';
      props.onCloseModal();
    };

    const updateVisible = (value) => {
      localVisible.value = value;
    };

    return {
      categoria,
      detalhe,
      ativo,
      dataAtribuicao,
      areaAtribuicao,
      funcionarioAtribuicao,
      enderecoAtribuicao,
      dataRecolhimento,
      motivoRecolhimento,
      estadoConservacao,
      detalheConservacao,
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