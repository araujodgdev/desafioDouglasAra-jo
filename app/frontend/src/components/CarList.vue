<template>
  <div>
    <h1>Lista de Carros</h1>
    <select v-model="selectedCategory" @change="fetchCars">
      <option value="">Todas as Categorias</option>
      <option
        v-for="category in categories"
        :key="category.value"
        :value="category.value"
      >
        {{ category.text }}
      </option>
    </select>
    <table>
      <thead>
        <tr>
          <th>Fabricante</th>
          <th>Modelo</th>
          <th>Ano</th>
          <th>Categoria</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="car in cars" :key="car.id">
          <td>{{ car.manufacturer }}</td>
          <td>{{ car.model }}</td>
          <td>{{ car.modelYear }}</td>
          <td>{{ getCategoryText(car.category) }}</td>
          <td>
            <button @click="removeCar(car.id)">Remover</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

interface Car {
  id: number;
  manufacturer: string;
  model: string;
  modelYear: number;
  category: number;
}

interface Category {
  value: number;
  text: string;
}

export default defineComponent({
  name: 'CarList',
  data() {
    return {
      cars: [] as Car[],
      selectedCategory: '',
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
    fetchCars() {
      let url = '/api/cars';
      if (this.selectedCategory) {
        url += `?category=${this.selectedCategory}`;
      }
      axios.get(url).then((response) => {
        this.cars = response.data;
      });
    },
    removeCar(id: number) {
      axios.delete(`/api/cars/${id}`).then(() => {
        this.fetchCars();
      });
    },
    getCategoryText(value: number) {
      const category = this.categories.find((cat) => cat.value === value);
      return category ? category.text : 'Desconhecida';
    },
  },
  mounted() {
    this.fetchCars();
  },
});
</script>
