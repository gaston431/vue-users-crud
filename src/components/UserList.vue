<script setup>
import { useUserStore } from '../stores/userStore'

// defineProps({
//   users: {
//     type: Array,
//     required: true
//   }
// })

// defineEmits(['edit-user', 'delete-user'])

const store = useUserStore()
</script>

<template>
  <div class="table-container">
    <div class="search-box">
      <label for="search">Buscar:</label>
      <input 
        id="search"
        type="text" 
        v-model="store.searchQuery" 
        placeholder="Filtrar por nombre o email..."
        class="search-input"
      />
    </div>
    <h3>Listado de Usuarios</h3>
    <table v-if="store.filteredUsers.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in store.filteredUsers" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <!-- <button @click="$emit('edit-user', user)" class="btn btn-edit">Editar</button>
            <button @click="$emit('delete-user', user.id)" class="btn btn-delete">Eliminar</button> -->
            <button @click="store.handleEditUser(user)" class="btn btn-edit">Editar</button>
            <button @click="store.handleDeleteUser(user.id)" class="btn btn-delete">Eliminar</button>
        </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No hay usuarios registrados.</p>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}
th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}
th {
  background-color: #f4f4f4;
}
.btn {
  padding: 6px 10px;
  margin-right: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn-edit { background-color: #3182ce; color: white; }
.btn-delete { background-color: #e53e3e; color: white; }
.search-box {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.search-input {
  padding: 6px 12px;
  border: 1px solid #718096;
  border-radius: 4px;
  color: #000;
  width: 100%;
  max-width: 300px;
}
</style>
