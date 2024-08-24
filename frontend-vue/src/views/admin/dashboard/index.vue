<script setup>
//import ref and onMounted
import { ref, onMounted } from "vue";

//import sidebar component
import SidebarMenu from "../../../components/SidebarMenu.vue";

//import js cookie
import Cookies from "js-cookie";

//init user
const user = ref(null);

onMounted(() => {
  // Get user data from cookies
  const userData = Cookies.get("user");
  if (userData) {
    user.value = JSON.parse(userData);
  }
});
</script>

<template>
  <div class="dashboard-container">
    <SidebarMenu />
    <div class="main-content">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <span class="navbar-brand">Dashboard</span>
          <div class="d-flex align-items-center">
            <span
              >Welcome, <strong>{{ user?.name }}</strong></span
            >
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.sidebar {
  width: 250px;
  background-color: #343a40;
  color: white;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}

.main-content {
  flex: 1;
  margin-left: 250px;
  background-color: #fff;
}

.navbar {
  border-bottom: 1px solid #dee2e6;
}

.content-area {
  padding: 20px;
}

.card {
  background-color: #ffffff;
  border: none;
}

.card-body {
  padding: 20px;
}

.card-title {
  margin-bottom: 15px;
}

@media (max-width: 768px) {
  .dashboard-container {
    flex-direction: column;
  }

  .main-content {
    margin-left: 0;
  }

  .sidebar {
    width: 100%;
    position: relative;
    min-height: auto;
  }
}
</style>
