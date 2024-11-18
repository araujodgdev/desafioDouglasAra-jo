<template>
    <div>
      <h1>Cadastrar Carro</h1>
      <form @submit.prevent="registerCar">
        <div>
          <label>Fabricante:</label>
          <input v-model="car.manufacturer" required />
        </div>
        <div>
          <label>Modelo:</label>
          <input v-model="car.model" required />
        </div>
        <div>
          <label>Ano:</label>
          <input type="number" v-model.number="car.modelYear" required />
        </div>
        <div>
          <label>Categoria:</label>
          <select v-model="car.category" required>
            <option
              v-for="category in categories"
              :key="category.value"
              :value="category.value"
            >
              {{ category.text }}
            </option>
          </select>
        </div>
        <button type="submit">Cadastrar Carro</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import axios from 'axios';
  
  interface Car {
    manufacturer: string;
    model: string;
    modelYear: number | null;
    category: number | null;
  }
  
  interface Category {
    value: number;
    text: string;
  }
  
  export default defineComponent({
    name: 'CarRegister',
    data() {
      return {
        car: {
          manufacturer: '',
          model: '',
          modelYear: null,
          category: null,
        } as Car,
        categories: [
          { value: 1, text: 'Compact Hatch' },
          { value: 2, text: 'Medium Hatch' },
          { value: 3, text: 'Sedan' },
          { value: 4, text: 'Van' },
          { value: 5, text: 'Pickup' },
        ] as Category[],
      };
    },
    methods: {
      registerCar() {
        axios.post('/api/cars', this.car).then(() => {
          this.$router.push('/');
        });
      },
    },
  });
  </script>
  