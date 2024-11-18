<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Aplicação de Aluguel de Carros</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn variant="text" to="/">Lista de Carros</v-btn>
      <v-btn variant="text" to="/register">Cadastrar Carro</v-btn>
      <v-btn variant="text" to="/cheapest">Carro Mais Barato</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'App',
});
</script>
