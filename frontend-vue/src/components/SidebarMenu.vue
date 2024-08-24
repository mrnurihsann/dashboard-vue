<script setup>
// Import useRouter from vue-router
import { useRouter } from "vue-router";

// Initialize router
const router = useRouter();

// Import Cookies from js-cookie
import Cookies from "js-cookie";

// Method to handle logout
const logout = () => {
  // Remove token and user from cookies
  Cookies.remove("token");
  Cookies.remove("user");

  // Redirect to login
  router.push({ name: "login" });
};
</script>

<template>
  <div class="sidebar-menu card border-0 rounded shadow-sm">
    <div class="card-header bg-primary text-white">MAIN MENU</div>
    <div class="card-body p-0">
      <div class="list-group list-group-flush">
        <router-link
          :to="{ name: 'dashboard' }"
          class="list-group-item list-group-item-action"
        >
          <i class="bi bi-house-door me-2"></i>Dashboard
        </router-link>
        <router-link
          :to="{ name: 'admin.users.index' }"
          class="list-group-item list-group-item-action"
        >
          <i class="bi bi-people me-2"></i>Users
        </router-link>
        <a
          href="#"
          @click="logout"
          class="list-group-item list-group-item-action"
        >
          <i class="bi bi-box-arrow-right me-2"></i>Logout
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar-menu {
  background-color: #343a40;
  color: #ffffff;
  min-height: 100vh;
  padding: 15px;
}

.sidebar-menu .card-header {
  background-color: #3b5bdb;
  font-weight: bold;
  text-transform: uppercase;
}

.sidebar-menu .list-group-item {
  background-color: #343a40;
  color: #ffffff;
  border: none;
}

.sidebar-menu .list-group-item:hover {
  background-color: #3b5bdb;
  color: #ffffff;
}

.sidebar-menu .list-group-item i {
  font-size: 1.2rem;
}

.sidebar-menu .list-group-item-action {
  display: flex;
  align-items: center;
}

@media (max-width: 768px) {
  .sidebar-menu {
    min-height: auto;
    padding: 10px;
  }
}
</style>
