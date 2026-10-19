<script setup>
import { ref, watch, computed } from 'vue'
import { useUserStore } from '../stores/userStore'

// const props = defineProps({
//   userToEdit: {
//     type: Object,
//     default: null
//   }
// })

// const emit = defineEmits(['save-user', 'clear-edit'])

const store = useUserStore()

const form = ref({
  name: '',
  email: '',
  password: ''
})

// Estado para controlar si el usuario ya intentó enviar el formulario (para no mostrar errores al inicio)
const touched = ref(false)

const resetForm = () => {
  form.value = { name: '', email: '', password: '' }
  touched.value = false
  // store.handleClearEdit()
  // emit('clear-edit')
}

// Detectar si estamos editando un usuario existente
watch(() => store.currentUser, (newUser) => {
  if (newUser) {
    form.value = { ...newUser, password: '' } // Password vacío por seguridad al editar
    touched.value = false
  } else {
    resetForm()
  }
}, { immediate: true })

// Objeto de errores computado reactivamente
const errors = computed(() => {
  const currentErrors = {}
  
  // Validación de Nombre
  if (!form.value.name.trim()) {
    currentErrors.name = 'El nombre es obligatorio.'
  } else if (form.value.name.trim().length < 3) {
    currentErrors.name = 'El nombre debe tener al menos 3 caracteres.'
  }

  // Validación de Email (Regex estándar)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.value.email.trim()) {
    currentErrors.email = 'El correo electrónico es obligatorio.'
  } else if (!emailRegex.test(form.value.email)) {
    currentErrors.email = 'El formato del correo no es válido.'
  }

  // Validación de Contraseña (Solo si no es edición)
  if (!store.currentUser) {
    if (!form.value.password) {
      currentErrors.password = 'La contraseña es obligatoria.'
    } else if (form.value.password.length < 6) {
      currentErrors.password = 'La contraseña debe tener al menos 6 caracteres.'
    }
  }

  return currentErrors
})

// El formulario es válido si el objeto de errores no tiene ninguna propiedad
const isFormValid = computed(() => Object.keys(errors.value).length === 0)

const handleSubmit = () => {
  touched.value = true // Marcamos que el usuario ya intentó enviar el formulario

  if (isFormValid.value) {
    // emit('save-user', { ...form.value })
    store.handleSaveUser({ ...form.value })
    resetForm()
  }
}

const handleCancel = () => {
  resetForm()
  store.handleClearEdit() // Esto te mandará de vuelta a '/' usando el router
}
</script>

<template>
  <div class="form-container">
    <h3>{{ store.currentUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario' }}</h3>
    <form @submit.prevent="handleSubmit" novalidate>
      <div class="form-group" :class="{ 'has-error': touched && errors.name }">
        <label>Nombre:</label>
        <input v-model="form.name" type="text" @blur="touched = true" required />
        <span v-if="touched && errors.name" class="error-message">{{ errors.name }}</span>
      </div>
      
      <div class="form-group" :class="{ 'has-error': touched && errors.email }">
        <label>Email:</label>
        <input v-model="form.email" type="email" @blur="touched = true" required />
        <span v-if="touched && errors.email" class="error-message">{{ errors.email }}</span>
      </div>
      
      <div class="form-group" v-if="!store.currentUser" :class="{ 'has-error': touched && errors.password }">
        <label>Contraseña:</label>
        <input v-model="form.password" type="password" @blur="touched = true" required />
        <span v-if="touched && errors.password" class="error-message">{{ errors.password }}</span>
      </div>

      <div class="actions">
        <button type="submit" class="btn btn-primary" :disabled="touched && !isFormValid">
          {{ store.currentUser ? 'Actualizar' : 'Guardar' }}
        </button>
        <button v-if="store.currentUser" type="button" @click="handleCancel" class="btn btn-secondary">
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
}
.form-group {
  margin-bottom: 16px;
}
.form-group label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
  color: #2c3e50;
}
.form-group input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.2s;
}
.form-group input:focus {
  outline: none;
  border-color: #42b883;
}
/* Estilos de Error */
.form-group.has-error input {
  border-color: #e53e3e;
  background-color: #fff5f5;
}
.error-text {
  color: #e53e3e;
  font-size: 0.85rem;
  margin-top: 4px;
  display: block;
}
.actions {
  display: flex;
  gap: 10px;
}
.btn {
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
.btn-primary { background-color: #42b883; color: white; }
.btn-primary:disabled { background-color: #a8e6cf; cursor: not-allowed; }
.btn-secondary { background-color: #a0aec0; color: white; }
</style>
