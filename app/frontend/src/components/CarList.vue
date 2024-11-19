<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>Lista de Carros</h1>
          <v-select
            v-model="selectedCategory"
            :items="categories"
            item-title="text"
            item-value="value"
            label="Filtrar por Categoria"
            @update:modelValue="fetchCars"
          ></v-select>
        </v-col>
      </v-row>

      <v-data-table :headers="headers" :items="cars" class="elevation-1">
        <template #item.rentWeekdayPrice="{ item }">
          {{ formatCurrency(item.rentWeekdayPrice) }}
        </template>
        <template #item.rentWeekendPrice="{ item }">
          {{ formatCurrency(item.rentWeekendPrice) }}
        </template>
        <template #item.rentWeekdayPriceLoyalty="{ item }">
          {{ formatCurrency(item.rentWeekdayPriceLoyalty) }}
        </template>
        <template #item.rentWeekendPriceLoyalty="{ item }">
          {{ formatCurrency(item.rentWeekendPriceLoyalty) }}
        </template>
        <template #item.actions="{ item }">
          <v-btn icon @click="removeCar(item.id)">
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from '../axios';

interface Car {
  id: number;
  manufacturer: string;
  model: string;
  modelYear: number;
  category: string;
  rentWeekdayPrice: number;
  rentWeekendPrice: number;
  rentWeekdayPriceLoyalty: number;
  rentWeekendPriceLoyalty: number;
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
        { value: '', text: 'Todas as Categorias' },
        { value: 1, text: 'Compact Hatch' },
        { value: 2, text: 'Medium Hatch' },
        { value: 3, text: 'Sedan' },
        { value: 4, text: 'Van' },
        { value: 5, text: 'Pickup' },
      ] as Category[],
      headers: [
        { title: 'Fabricante', value: 'manufacturer' },
        { title: 'Modelo', value: 'model' },
        { title: 'Ano', value: 'modelYear' },
        { title: 'Categoria', value: 'category' },
        { title: 'Preço Dia de Semana', value: 'rentWeekdayPrice' },
        { title: 'Preço Fim de Semana', value: 'rentWeekendPrice' },
        {
          title: 'Preço Dia de Semana (Fidelidade)',
          value: 'rentWeekdayPriceLoyalty',
        },
        {
          title: 'Preço Fim de Semana (Fidelidade)',
          value: 'rentWeekendPriceLoyalty',
        },
        { title: 'Ações', value: 'actions', sortable: false },
      ],
    };
  },
  methods: {
    fetchCars() {
      let url = '/api/cars';
      if (this.selectedCategory) {
        url += `/filter?category=${this.selectedCategory}`;
      }
      axios.get(url).then((response) => {
        this.cars = response.data.map((car: Car) => ({
          ...car,
          categoryText: car.category.toString().split('_').join(' '),
        }));
      });
    },
    removeCar(id: number) {
      axios.delete(`/api/cars/${id}`).then(() => {
        this.fetchCars();
      });
    },
    formatCurrency(value: number) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value);
    },
  },
  mounted() {
    this.fetchCars();
  },
});
</script>
