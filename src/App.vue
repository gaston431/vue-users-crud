<script setup>
import { onMounted } from 'vue'
import UserForm from './components/UserForm.vue'
import UserList from './components/UserList.vue'
// import { useUsers } from './composables/useUsers.js'
// import { useUserStore } from './stores/userStore'

// Extraemos todo lo que necesitamos usando desestructuración
// const {
//   users,
//   currentUser,
//   isLoading,
//   loadUsers,
//   handleSaveUser,
//   handleDeleteUser,
//   handleEditUser,
//   handleClearEdit
// } = useUsers()

// const store = useUserStore()

// // Cargar datos al montar el componente
// onMounted(() => {
//   store.loadUsers()
// })
</script>

<template>
  <div class="app-container">
    <!-- <h1>Dashboard de Usuarios (CRUD)</h1> -->
    
    <!-- Formulario arriba -->
    <!-- <UserForm 
      :userToEdit="currentUser" 
      @save-user="handleSaveUser" 
      @clear-edit="handleClearEdit"
    />
    
    <div v-if="isLoading" class="loading">Cargando usuarios...</div> -->

    <!-- Tabla abajo -->
    <!-- <UserList 
      v-else
      :users="users" 
      @edit-user="handleEditUser" 
      @delete-user="handleDeleteUser"
    /> -->

    <!-- <UserForm />
    <div v-if="store.isLoading" class="loading">Cargando usuarios...</div>
    <UserList v-else /> -->

    <header>
      <h1>Panel de Administración</h1>
      <nav>
        <RouterLink to="/" class="nav-link">Usuarios</RouterLink>
      </nav>
    </header>

    <!-- Componente dinámico donde se renderizan las vistas de las rutas -->
    <main>
      <RouterView />
    </main>

  </div>
</template>

<style>
/* body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #fafafa;
}
.app-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: white;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border-radius: 8px;
}
h1 {
  text-align: center;
  color: #2c3e50;
} */

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #fafafa;
}
.app-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: white;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border-radius: 8px;
}
header {
  border-bottom: 2px solid #eee;
  padding-bottom: 15px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h1 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.5rem;
}
.nav-link {
  color: #3182ce;
  text-decoration: none;
  font-weight: bold;
}
.nav-link:hover {
  text-decoration: underline;
}
.loading {
  text-align: center;
  font-style: italic;
  color: #666;
  padding: 20px;
}
</style>
