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
    <h3>Listado de Usuarios</h3>
    <table v-if="store.users.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in store.users" :key="user.id">
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
</style>
