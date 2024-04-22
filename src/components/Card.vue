<template>
  <q-card class="my-card">
    <q-card-section>
      <div class="text-h5"><b>{{ title }}</b></div>
      <div class="text-subtitle">Quantidade de pessoas: <b>{{ numberOfPeople }}</b></div>
      <div class="text-subtitle">Quantidade de patrimônios: <b>{{ numberOfAssets }}</b></div>
    </q-card-section>

    <q-card-actions vertical>
      <q-btn unelevated label="Ver pessoas" id="card-btn" @click="$router.push(`/people/${title}`)" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'Card',
  props: {
    title: String,
    numberOfPeople: Number,
    numberOfAssets: Number
  },
  setup() {
    const redirectToPeople = (title) => {
      const router = useRouter();
      router.push(`/people/${title}`);
    };


    return {
      redirectToPeople
    };
  }
}
</script>

<style scoped>
.my-card {
  background-color: #1C1D22;
  color: #FFFFFF;
  width: 25%;
  box-shadow: 0px 4px 4px rgba(255, 255, 255, 0.5);
  border: 1px solid #FFFFFF;
  border-radius: 20px;
  margin-top: 4%;
}

.my-card .text-h5 {
  padding: 6% 4%;
}

.my-card .text-subtitle {
  padding: 0 4%;
}

#card-btn {
  background-color: #2C45C7;
  color: #FFFFFF;
  border: 1px solid #FFFFFF;
  margin: 2% 6% 4% 6%;
  border-radius: 8px;
}
</style>