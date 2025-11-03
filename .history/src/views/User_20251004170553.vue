<template>
    <div class="admin-layout">
      <!-- Admin Navbar -->
      <AdminNavbar :toggle-sidebar="toggleSidebar" />
      
      <!-- Admin Sidebar -->
      <AdminSidebar
        :isOpen="sidebarOpen"
        @toggle="sidebarOpen = $event"
      />
  
      <div class="admin-content" :class="sidebarOpen && 'sidebar-open'">
        <div class="users-management-page">
          <!-- Your existing User.vue content remains the same -->
          <!-- Search Bar -->
          <div class="search-container">
            <div class="search-bar">
              <i class="fas fa-search"></i>
              <input 
                type="text" 
                placeholder="Search users..." 
                v-model="searchQuery"
                @input="filterUsers"
              >
            </div>
          </div>
  
          <!-- Users Header with Count -->
          <div class="users-header">
            <h1>User Management</h1>
            <div class="users-count">
              Total Users: <span>{{ filteredUsers.length }}</span>
            </div>
          </div>
  
          <!-- Users Grid -->
          <div class="users-grid">
            <!-- ... rest of your user grid content ... -->
          </div>
  
          <!-- Profile Modal -->
          <div v-if="showProfileModal" class="modal-overlay" @click="closeProfileModal">
            <!-- ... your modal content ... -->
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AdminSidebar from '@/components/AdminSidebar.vue'
  import AdminNavbar from '@/components/Navbar.vue'
  
  export default {
    name: 'UsersManagement',
    components: {
      AdminSidebar,
      AdminNavbar
    },
    data() {
      return {
        sidebarOpen: false,
        searchQuery: '',
        filteredUsers: [],
        showProfileModal: false,
        currentProfile: {},
        allUsers: [
          // ... your existing users data ...
        ]
      }
    },
    mounted() {
      this.filteredUsers = [...this.allUsers];
    },
    methods: {
      toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen
      },
      filterUsers() {
        // ... your existing filterUsers method ...
      },
      openProfileModal(user) {
        // ... your existing method ...
      },
      closeProfileModal() {
        // ... your existing method ...
      },
      openReportModalFromProfile(offer, userName) {
        // ... your existing method ...
      }
    }
  }
  </script>
  
  <style scoped>
  .admin-layout {
    display: flex;
    min-height: 100vh;
  }
  
  .admin-content {
    flex: 1 1 0;
    margin-left: calc(3.5rem + 32px);
    margin-top: 60px;
    transition: margin-left 0.2s ease-out;
    padding: 2rem;
  }
  
  .admin-content.sidebar-open {
    margin-left: var(--sidebar-width);
  }
  
  /* Your existing User.vue styles remain the same */
  .users-management-page {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .search-container {
    margin-bottom: 2rem;
  }
  
  /* ... rest of your existing styles ... */
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .admin-content {
      margin-left: 0;
      margin-top: 60px;
      padding: 1rem;
    }
    
    .admin-content.sidebar-open {
      margin-left: 0;
    }
  }
  </style>