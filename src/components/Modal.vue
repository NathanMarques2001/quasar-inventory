<template>
  <q-dialog v-model="modalOpen">
    <q-card>
      <q-card-section>
        <q-card-title class="text-h6">Adicionar Patrimônio</q-card-title>
        <q-form @submit="handleSubmit">
          <q-input outlined v-model="categoria" label="Categoria" />
          <q-input outlined v-model="detalhe" label="Detalhe" />
          <q-input outlined v-model="dataAquisicao" label="Data de Aquisição" type="date" />
          <q-input outlined v-model="valorAquisicao" label="Valor de Aquisição" type="number" />
          <q-input outlined v-model="lote" label="Lote" type="number" />
          <q-card-actions align="right">
            <q-btn label="Cancelar" color="negative" @click="closeModal" />
            <q-btn type="submit" label="Salvar" color="primary" />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Modal',
  setup() {
    const modalOpen = ref(false);
    const categoria = ref('');
    const detalhe = ref('');
    const dataAquisicao = ref('');
    const valorAquisicao = ref(0);
    const lote = ref(null);

    const handleSubmit = () => {
      const patrimonio = {
        categoria: categoria.value,
        detalhe: detalhe.value,
        dataAquisicao: dataAquisicao.value,
        valorAquisicao: parseFloat(valorAquisicao.value),
        lote: lote.value
      };
      // Aqui você pode fazer o que desejar com o objeto patrimonio, como emitir um evento para o componente pai
      closeModal();
    };

    const closeModal = () => {
      modalOpen.value = false;
      // Limpar os campos do formulário ao fechar o modal
      categoria.value = '';
      detalhe.value = '';
      dataAquisicao.value = '';
      valorAquisicao.value = 0;
      lote.value = null;
    };

    return {
      modalOpen,
      categoria,
      detalhe,
      dataAquisicao,
      valorAquisicao,
      lote,
      handleSubmit,
      closeModal
    };
  }
};
</script>
