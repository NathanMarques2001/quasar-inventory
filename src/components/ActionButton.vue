<template>
  <div>
    <q-btn @click="openModal" color="primary" label="Abrir Modal" />
    <q-btn @click="inativarPatrimonio" color="negative" label="Inativar" />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    openModal() {
      console.log('Abrir modal para o patrimônio ID:', this.id);
    },
    inativarPatrimonio() {
      console.log('Inativar patrimônio ID:', this.id);
    }
  }
}
</script>
