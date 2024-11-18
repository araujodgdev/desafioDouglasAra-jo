<template>
  <div id="app">
    <nav>
      <router-link to="/">Lista de Carros</router-link>
      <router-link to="/register">Cadastrar Carro</router-link>
      <router-link to="/cheapest">Encontrar Carro Mais Barato</router-link>
    </nav>
    <router-view />
  </div>
</template>
