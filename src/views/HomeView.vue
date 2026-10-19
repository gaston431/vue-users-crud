<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import UserList from '../components/UserList.vue'
import { useUserStore } from '../stores/userStore'

const store = useUserStore()
const router = useRouter()

onMounted(() => {
  store.loadUsers()
})
</script>

<template>
  <div>
    <div class="header-actions">
      <h2>Listado de Usuarios</h2>
      <button @click="router.push('/create')" class="btn btn-create">
        + Nuevo Usuario
      </button>
    </div>
    
    <div v-if="store.isLoading" class="loading">Cargando usuarios...</div>
    <UserList v-else />
  </div>
</template>

<style scoped>
.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.btn-create {
  background-color: #42b883;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
</style>
