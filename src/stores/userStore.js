import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '../router' 

const API_URL = 'http://localhost:8000/users'

export const useUserStore = defineStore('userStore', () => {
  // State (Variables reactivas)
  const users = ref([])
  const currentUser = ref(null)
  const isLoading = ref(false)

  // Actions (Métodos para modificar el estado y llamar a la API)
  const loadUsers = async () => {
    isLoading.value = true
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Error al obtener usuarios')
      users.value = await response.json()
    } catch (error) {
      console.error(error)
      alert('No se pudo conectar con la API')
    } finally {
      isLoading.value = false
    }
  }

  const handleSaveUser = async (userData) => {
    try {
      if (userData.id) {
        const response = await fetch(`${API_URL}/${userData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: userData.name, email: userData.email })
        })
        if (!response.ok) throw new Error('Error al actualizar')
      } else {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        })
        if (!response.ok) throw new Error('Error al crear')
      }
      currentUser.value = null
      await loadUsers()
      router.push('/')
    } catch (error) {
      console.error(error)
      alert('Ocurrió un error al procesar la solicitud')
    }
  }

  const handleDeleteUser = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Error al eliminar')
      await loadUsers()
    } catch (error) {
      console.error(error)
      alert('No se pudo eliminar al usuario')
    }
  }

  const handleEditUser = (user) => {
    currentUser.value = user
    router.push('/edit')
  }

  const handleClearEdit = () => {
    currentUser.value = null
    router.push('/')
  }

  // Retornamos lo que queremos hacer público
  return {
    users,
    currentUser,
    isLoading,
    loadUsers,
    handleSaveUser,
    handleDeleteUser,
    handleEditUser,
    handleClearEdit
  }
})
