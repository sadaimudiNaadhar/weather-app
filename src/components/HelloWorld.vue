<script setup lang="ts">
import DropDown from './DropDown.vue'

let options: object[] = [
  { value: '1', text: 'aa' + ' - ' + '1' },
  { value: '2', text: 'ab' + ' - ' + '2' },
  { value: '3', text: 'bc' + ' - ' + '3' },
  { value: '4', text: 'cd' + ' - ' + '4' },
  { value: '5', text: 'de' + ' - ' + '5' }
]



</script>

<template>
  <h1>Searchable Dropdown Example</h1>
  <DropDown :options="options" placeholder="Search options..." />

  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
    <button class="btn btn-primary" @click="setTime('Now')">Now</button>
    <button class="btn btn-primary" @click="setTime('8h')">8h</button>
    <button class="btn btn-primary" @click="setTime('18h')">18h</button>
  </div>
  <div class="row">
    <button type="button" class="btn btn-secondary btn-lg">Search</button>
  </div>
</template>

<script lang="ts">

export default {
  data() {
    return {
      selectedTimePeriod: '',
    };
  },
  computed: {
    // setTime(period: string) {

    //   this.selectedTimePeriod = period;
    //   this.isActive = !this.isActive;
    // },
  },
  methods: {
    setTime(period: string) {
      this.selectedTimePeriod = period; // Update the selected item

      // Loop through all the buttons and assign appropriate classes
      const buttons = document.querySelectorAll('button');
      buttons.forEach((button) => {
        if (button.textContent !== period) {
          button.classList.remove('btn', 'btn-success');
          button.classList.add('btn', 'btn-primary');
        } else {
          button.classList.remove('btn', 'btn-primary');
          button.classList.add('btn', 'btn-success');
        }
      });
    }
  },

};
</script>