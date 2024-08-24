<script setup>
// Import reactive and ref from vue
import { reactive, ref } from "vue";

// Import useRouter from vue-router
import { useRouter } from "vue-router";

// Initialize vue-router on Composition API
const router = useRouter();

// Import services api
import api from "../../services/api";

// State for user input
const user = reactive({
  name: "",
  email: "",
  password: "",
});

// State for validation messages
const validation = ref([]);

// Method for registration
const register = async () => {
  try {
    // Call API for registration
    await api.post("/api/register", {
      name: user.name,
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation,
    });

    // Redirect to the login page
    router.push({ name: "login" });
  } catch (error) {
    // Assign validation value with error
    validation.value = error.response.data.errors || [];
  }
};
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card border-0 rounded shadow-sm p-4" style="width: 400px">
      <div class="card-body">
        <h4 class="text-center mb-4">Register Your Account</h4>
        <div v-if="validation.length" class="alert alert-danger">
          <ul class="mb-0">
            <li v-for="(error, index) in validation" :key="index">
              {{ error.path }}: {{ error.msg }}
            </li>
          </ul>
        </div>
        <form @submit.prevent="register">
          <div class="form-group mb-3">
            <label class="mb-1 fw-bold">Full Name</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-person"></i></span>
              <input
                type="text"
                v-model="user.name"
                class="form-control"
                placeholder="Full Name"
                required
              />
            </div>
          </div>

          <div class="form-group mb-3">
            <label class="mb-1 fw-bold">Email Address</label>
            <div class="input-group">
              <span class="input-group-text"
                ><i class="bi bi-envelope"></i
              ></span>
              <input
                type="email"
                v-model="user.email"
                class="form-control"
                placeholder="Email Address"
                required
              />
            </div>
          </div>

          <div class="form-group mb-3">
            <label class="mb-1 fw-bold">Password</label>
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-lock"></i></span>
              <input
                type="password"
                v-model="user.password"
                class="form-control"
                placeholder="Password"
                required
              />
            </div>
          </div>

          <button type="submit" class="btn btn-primary w-100 mb-3">
            Register
          </button>
        </form>

        <div class="text-center mb-3">
          <span>Or register with</span>
        </div>

        <div class="d-flex justify-content-between">
          <button class="btn btn-outline-dark w-100 me-2 btn-icon">
            <i class="bi bi-google"></i> <span>Google</span>
          </button>
          <button class="btn btn-outline-dark w-100 me-2 btn-icon">
            <i class="bi bi-facebook"></i> <span>Facebook</span>
          </button>
          <button class="btn btn-outline-dark w-100 btn-icon">
            <i class="bi bi-github"></i> <span>GitHub</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vh-100 {
  height: 100vh;
}
.card {
  background-color: #f9f9f9;
}
.input-group-text {
  background-color: #e9ecef;
  border: none;
}
.btn-primary {
  background-color: #000000;
  border: none;
}
.btn-primary:hover {
  background-color: #3b5bdb;
}
.btn-outline-dark {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem;
  font-size: 0.875rem;
}
.btn-icon i {
  font-size: 1.25rem;
  margin-right: 0.5rem;
}
.btn-icon span {
  display: none;
}
.btn-icon {
  transition: background-color 0.2s ease;
}
.btn-icon:hover {
  background-color: #e9ecef;
}
@media (min-width: 576px) {
  .btn-icon span {
    display: inline;
  }
}
</style>
