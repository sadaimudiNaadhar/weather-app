<script lang="ts">
export default {
  name: 'HeaderVue',
  methods: {
    checkIfDarkMode() {
      const mode = document.documentElement.getAttribute('data-bs-theme')
      if (mode === 'dark') {
        return true
      }

      return false
    },
    toggleDarkMode() {
      if (this.checkIfDarkMode()) {
        document.documentElement.setAttribute('data-bs-theme', 'light')
        return
      }
      document.documentElement.setAttribute('data-bs-theme', 'dark')
    }
  },
  mounted() {
    this.checkIfDarkMode()
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <a class="navbar-brand" href="#"><i class="bi bi-sunrise"></i> Weather Stats</a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent"></div>

      <!-- Todo: Save dark mode data to local storage to persist dark mode -->
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckChecked"
          :onchange="toggleDarkMode"
          :checked="checkIfDarkMode()"
        />

        <label class="form-check-label text-end" for="flexSwitchCheckChecked">Dark Mode</label>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.heading h3 {
  margin: 0;
}
</style>
