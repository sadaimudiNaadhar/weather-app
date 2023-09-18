<template>
  <div class="dropdown">
    <input
      type="text"
      v-model="searchTerm"
      @input="filterOptions"
      @click="toggleDropdown"
      class="form-control bg-body-tertiary bs-dark-text-emphasis"
      :placeholder="placeholder"
    />
    <ul v-show="isOpen" class="dropdown-menu form-control">
      <li v-for="(option, index) in filteredOptions" :key="index">
        <a href="#" @click="selectOption(option)">{{ option }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DropDown',
  data() {
    return {
      isOpen: false,
      searchTerm: '',
      options: ['P1', 'Option 2', 'Option 3', 'Option 4'] // Your list of options
    }
  },
  computed: {
    filteredOptions() {
      return this.options.filter((option) =>
        option.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    selectOption(option: string) {
      this.searchTerm = option
      this.isOpen = false
      this.$emit('selected-weather-station', this.searchTerm)
    },
    filterOptions() {
      this.isOpen = true
    }
  },
  props: {
    placeholder: {
      type: String,
      default: 'Search...'
    }
  }
}
</script>

<style scoped>
.dropdown {
  position: relative;
}

.dropdown .dropdown-menu {
  position: absolute;
  z-index: 1000;
  display: block;
  padding: 0.5rem;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

.dropdown .dropdown-menu a {
  display: block;
  padding: 0.25rem 0.5rem;
  text-decoration: none;
  color: #333;
}

.dropdown .dropdown-menu a:hover {
  background-color: #f2f2f2;
}

.form-control {
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}
</style>
