<template>
  <div id="app">
    <div id="nav">
      <router-link to="/rotating-cubes">Rotating Cubes</router-link> |
      <router-link to="/responsive-rotating-cubes">Responsive Rotating Cubes</router-link> |
      <router-link to="/responsive-rotating-cubes-hd-dpi">Responsive Rotating Cubes HD-DPI</router-link> |
      <router-link to="/adjustable-cube">Adjustable Cube</router-link> |
      <router-link to="/geometries">Geometries</router-link> |
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
