<script setup>
// Import reactive and ref from vue
import { reactive, ref } from "vue";

// Import useRouter from vue-router
import { useRouter } from "vue-router";

// Initialize vue-router on Composition API
const router = useRouter();

// Import services api
import api from "../../services/api";

// Import js-cookie
import Cookies from "js-cookie";

// State for user input
const user = reactive({
  email: "",
  password: "",
});

// State for validation messages and login failure
const validation = ref([]);
const loginFailed = ref([]);
const isLoading = ref(false); // State for loading

// Method for login
const login = async () => {
  isLoading.value = true; // Start loading

  try {
    // Call API login
    const response = await api.post("/api/login", {
      email: user.email,
      password: user.password,
    });

    // Set token and user in cookies
    Cookies.set("token", response.data.data.token);
    Cookies.set("user", JSON.stringify(response.data.data.user));

    // Verify the token is set before redirecting
    if (Cookies.get("token")) {
      // Redirect to dashboard
      router.push({ name: "dashboard" });
    }
  } catch (error) {
    // Assign validation and loginFailed values with error data
    validation.value = error.response.data.errors || [];
    loginFailed.value = error.response.data.message || "Login failed.";
  } finally {
    isLoading.value = false; // End loading
  }
};

// Social login methods (placeholders for now)
const loginWithGoogle = () => {
  // Handle Google login
};
const loginWithFacebook = () => {
  // Handle Facebook login
};
const loginWithGitHub = () => {
  // Handle GitHub login
};
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card border-0 rounded shadow-sm p-4" style="width: 400px">
      <div class="card-body">
        <h4 class="text-center mb-4">Login to Your Account</h4>
        <div v-if="validation.length" class="alert alert-danger">
          <ul class="mb-0">
            <li v-for="(error, index) in validation" :key="index">
              {{ error.path }}: {{ error.msg }}
            </li>
          </ul>
        </div>
        <div v-if="loginFailed" class="alert alert-danger">
          {{ loginFailed }}
        </div>
        <form @submit.prevent="login">
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

          <button
            type="submit"
            class="btn btn-primary w-100"
            :disabled="isLoading"
          >
            <span
              v-if="isLoading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span v-if="isLoading">Logging in...</span>
            <span v-else>Login</span>
          </button>
        </form>

        <div class="text-center my-3">or</div>

        <div class="d-grid gap-2">
          <button
            class="btn btn-outline-dark d-flex align-items-center justify-content-center"
            @click="loginWithGoogle"
          >
            <i class="bi bi-google me-2"></i> Continue with Google
          </button>
          <button
            class="btn btn-outline-primary d-flex align-items-center justify-content-center"
            @click="loginWithFacebook"
          >
            <i class="bi bi-facebook me-2"></i> Continue with Facebook
          </button>
          <button
            class="btn btn-outline-secondary d-flex align-items-center justify-content-center"
            @click="loginWithGitHub"
          >
            <i class="bi bi-github me-2"></i> Continue with GitHub
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
</style>
