<template id="layout">
  <q-layout view="hHh LpR fFf">

    <q-header id="layout-navbar">
      <q-toolbar>
        <q-toolbar-title>
          <img id="layout-navbar-logo" src="../assets/logo-fonte-branca.png">
        </q-toolbar-title>
        <q-tabs align="left">
          <q-route-tab to="/" label="Áreas" />
          <q-route-tab to="/people" label="Pessoas" />
          <q-route-tab to="/patrimony" label="Patrimônios" />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container id="layout-body">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<style scoped>
#layout-navbar {
  background-color: #1C1D22;
  color: #FFFFFF;
  height: 10vh;
  display: flex;
}

#layout-navbar-logo {
  width: 8%;
}

#layout-body {
  background-color: #2A2B2F;
  padding-bottom: 5%;
  min-height: 100vh;
}
</style>
