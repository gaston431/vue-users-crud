import { ref } from 'vue'

const API_URL = 'http://localhost:8000/users'

export function useUsers() {
  const users = ref([])
  const currentUser = ref(null)
  const isLoading = ref(false)

  // GET: Obtener todos los usuarios
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

  // POST / PUT: Guardar o actualizar usuario
  const handleSaveUser = async (userData) => {
    try {
      if (userData.id) {
        // PUT
        const response = await fetch(`${API_URL}/${userData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: userData.name, email: userData.email })
        })
        if (!response.ok) throw new Error('Error al actualizar')
      } else {
        // POST
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        })
        if (!response.ok) throw new Error('Error al crear')
      }
      currentUser.value = null
      await loadUsers()
    } catch (error) {
      console.error(error)
      alert('Ocurrió un error al procesar la solicitud')
    }
  }

  // DELETE: Eliminar usuario
  const handleDeleteUser = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Error al eliminar')
      await loadUsers()
    } catch (error) {
      console.error(error)
      alert('No se pudo eliminar al usuario')
    }
  }

  const handleEditUser = (user) => {
    currentUser.value = user
  }

  const handleClearEdit = () => {
    currentUser.value = null
  }

  // Exponemos las variables y métodos necesarios para los componentes
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
}
