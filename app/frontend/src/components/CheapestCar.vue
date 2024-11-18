<template>
    <div>
      <h1>Encontrar Carro Mais Barato</h1>
      <form @submit.prevent="findCheapestCar">
        <div>
          <label>Data de Início:</label>
          <input type="date" v-model="searchParams.startDate" required />
        </div>
        <div>
          <label>Data de Fim:</label>
          <input type="date" v-model="searchParams.endDate" required />
        </div>
        <div>
          <label>Programa de Fidelidade:</label>
          <input type="checkbox" v-model="searchParams.loyaltyProgram" />
        </div>
        <div>
          <label>E-mail (opcional):</label>
          <input type="email" v-model="searchParams.email" />
        </div>
        <button type="submit">Encontrar Carro</button>
      </form>
      <div v-if="result">
        <h2>Carro Mais Barato</h2>
        <p>
          {{ result.car.manufacturer }} {{ result.car.model }} - {{
            formatCurrency(result.price)
          }}
        </p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import axios from 'axios';
  
  interface Car {
    manufacturer: string;
    model: string;
  }
  
  interface SearchParams {
    startDate: string;
    endDate: string;
    loyaltyProgram: boolean;
    email?: string;
  }
  
  interface Result {
    car: Car;
    price: number;
  }
  
  export default defineComponent({
    name: 'CheapestCar',
    data() {
      return {
        searchParams: {
          startDate: '',
          endDate: '',
          loyaltyProgram: false,
          email: '',
        } as SearchParams,
        result: null as Result | null,
      };
    },
    methods: {
      findCheapestCar() {
        axios.post('/api/cheapest-car', this.searchParams).then((response) => {
          this.result = response.data;
          if (this.searchParams.email) {
            alert('Resultado enviado para o seu e-mail.');
          }
        });
      },
      formatCurrency(value: number) {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(value);
      },
    },
  });
  </script>
  