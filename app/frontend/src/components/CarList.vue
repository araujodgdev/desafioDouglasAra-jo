<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>Lista de Carros</h1>
          <v-select
            v-model="selectedCategory"
            :items="categories"
            item-text="text"
            item-value="value"
            label="Filtrar por Categoria"
            @change="fetchCars"
          ></v-select>
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="cars"
        class="elevation-1"
      >
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
        { value: '', text: 'Todas as Categorias' },
        { value: 1, text: 'Compact Hatch' },
        { value: 2, text: 'Medium Hatch' },
        { value: 3, text: 'Sedan' },
        { value: 4, text: 'Van' },
        { value: 5, text: 'Pickup' },
      ] as Category[],
      headers: [
        { text: 'Fabricante', value: 'manufacturer' },
        { text: 'Modelo', value: 'model' },
        { text: 'Ano', value: 'modelYear' },
        { text: 'Categoria', value: 'categoryText' },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
    };
  },
  methods: {
    fetchCars() {
      let url = '/api/cars';
      if (this.selectedCategory) {
        url += `?category=${this.selectedCategory}`;
      }
      axios.get(url).then((response) => {
        this.cars = response.data.map((car: Car) => ({
          ...car,
          categoryText: this.getCategoryText(car.category),
        }));
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
