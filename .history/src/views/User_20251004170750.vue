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
      <div 
        v-for="user in filteredUsers" 
        :key="user.id" 
        class="user-profile-container"
      >
        <div class="user-main-info">
          <div class="name-verified">
            <h3 class="user-name">{{ user.fullName }}</h3>
            <span 
              v-if="user.isVerified" 
              class="verified-badge"
            >
              <i class="fas fa-check-circle"></i>
              Verified
            </span>
          </div>
          <button 
            class="view-records-btn" 
            @click="openProfileModal(user)"
          >
            View Records
          </button>
        </div>
        
        <div class="user-details">
          <img 
            :src="user.userPicture" 
            :alt="user.fullName" 
            class="profile-picture"
          >
          <div class="contact-info">
            <p class="user-email">
              <i class="fas fa-envelope"></i>
              {{ user.email }}
            </p>
            <p class="user-phone">
              <i class="fas fa-phone"></i>
              {{ user.phone }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Profile Modal - Your Provided Code -->
    <div v-if="showProfileModal" class="modal-overlay" @click="closeProfileModal">
      <div class="modal-content profile-modal" @click.stop>
        <div class="profile-header">
          <img :src="currentProfile.userPicture" :alt="currentProfile.fullName" class="profile-picture">
          <div class="profile-info">
            <div class="name-verified">
              <h2>{{ currentProfile.fullName }}</h2>
              <span class="verified-badge" v-if="currentProfile.isVerified">
                <span class="material-icons">verified</span>
                Verified
              </span>
            </div>
            <p class="profile-email">{{ currentProfile.email }}</p>
            <p class="profile-phone">{{ currentProfile.phone }}</p>
          </div>
        </div>

        <div class="profile-sections">
          <!-- Linked Accounts Section -->
          <div class="profile-section">
            <h3>Linked Accounts</h3>
            <div class="linked-accounts">
              <a 
                v-for="account in currentProfile.linkedAccounts" 
                :key="account.platform"
                :href="account.url" 
                target="_blank" 
                class="account-item"
              >
                <span class="material-icons account-icon">{{ account.icon }}</span>
                <span class="account-platform">{{ account.platform }}</span>
              </a>
            </div>
          </div>

          <!-- Skill Offer Posts Section -->
          <div class="profile-section">
            <h3>Skill Offer Posts</h3>
            <div class="posts-list">
              <div v-for="offer in currentProfile.skillOffers" :key="offer.id" class="profile-post-card">
                <div class="post-header">
                  <h4>{{ offer.skills }}</h4>
                  <span class="post-time">{{ offer.timePosted }}</span>
                </div>
                <p class="post-description">{{ offer.description }}</p>
                <div class="post-details">
                  <div class="detail-item">
                    <span class="detail-label">Category:</span>
                    <span class="detail-value">{{ offer.category }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Location:</span>
                    <span class="detail-value">{{ offer.location }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Skills Requested:</span>
                    <span class="detail-value">{{ offer.skillsRequested }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Schedule:</span>
                    <span class="detail-value">{{ offer.schedule }}</span>
                  </div>
                </div>
                <div class="additional-notes" v-if="offer.additionalNotes">
                  <span class="detail-label">Additional Notes:</span>
                  <p class="detail-value">{{ offer.additionalNotes }}</p>
                </div>
                <div class="proof-image" v-if="offer.proof">
                  <img :src="offer.proof" alt="Proof" class="proof-thumbnail">
                </div>
                <div class="post-actions">
                  <button class="btn report-btn" @click="openReportModalFromProfile(offer, currentProfile.fullName)">
                    <span class="material-icons">flag</span>
                    Report
                  </button>
                  <button class="btn contact-btn">
                    <span class="material-icons">message</span>
                    Contact
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Skill Request Posts Section -->
          <div class="profile-section">
            <h3>Skill Request Posts</h3>
            <div class="posts-list">
              <div v-for="request in currentProfile.skillRequests" :key="request.id" class="profile-post-card">
                <div class="post-header">
                  <h4>{{ request.request }}</h4>
                  <span class="post-time">{{ request.timePosted }}</span>
                </div>
                <p class="post-description">{{ request.description }}</p>
                <div class="post-details">
                  <div class="detail-item">
                    <span class="detail-label">Category:</span>
                    <span class="detail-value">{{ request.category }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Location:</span>
                    <span class="detail-value">{{ request.location }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Skills Offered:</span>
                    <span class="detail-value">{{ request.skillsOffered }}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Schedule:</span>
                    <span class="detail-value">{{ request.schedule }}</span>
                  </div>
                </div>
                <div class="additional-notes" v-if="request.additionalNotes">
                  <span class="detail-label">Additional Notes:</span>
                  <p class="detail-value">{{ request.additionalNotes }}</p>
                </div>
                <div class="proof-image" v-if="request.proof">
                  <img :src="request.proof" alt="Proof" class="proof-thumbnail">
                </div>
                <div class="post-actions">
                  <button class="btn report-btn" @click="openReportModalFromProfile(request, currentProfile.fullName)">
                    <span class="material-icons">flag</span>
                    Report
                  </button>
                  <button class="btn contact-btn">
                    <span class="material-icons">message</span>
                    Contact
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="profile-actions">
          <button class="btn close-btn" @click="closeProfileModal">Close</button>
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