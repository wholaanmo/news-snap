<template>
    <div class="admin-layout">
      <!-- Admin Navbar -->
      <AdminNavbar :toggle-sidebar="toggleSidebar" />
      
      <!-- Admin Sidebar -->
      <AdminSidebar
        :isOpen="sidebarOpen"
        @toggle="sidebarOpen = $event"
      />

      /
  
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
  import AdminNavbar from '@/components/AdminNavbar.vue'
  
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
        {
          id: 1,
          fullName: 'John Smith',
          email: 'john.smith@example.com',
          phone: '+1 (555) 123-4567',
          userPicture: '/default-avatar.jpg',
          isVerified: true,
          linkedAccounts: [
            { platform: 'GitHub', icon: 'code', url: 'https://github.com/johnsmith' },
            { platform: 'LinkedIn', icon: 'work', url: 'https://linkedin.com/in/johnsmith' }
          ],
          skillOffers: [
            {
              id: 1,
              skills: 'Web Development',
              timePosted: '2 days ago',
              description: 'Full-stack web development services',
              category: 'Technology',
              location: 'Remote',
              skillsRequested: 'JavaScript, Vue.js, Node.js',
              schedule: 'Flexible'
            }
          ],
          skillRequests: [
            {
              id: 1,
              request: 'Graphic Design Help',
              timePosted: '1 week ago',
              description: 'Need logo design for my startup',
              category: 'Design',
              location: 'New York',
              skillsOffered: 'Web Development in exchange',
              schedule: 'Weekends'
            }
          ]
        },
        {
          id: 2,
          fullName: 'Sarah Johnson',
          email: 'sarah.j@example.com',
          phone: '+1 (555) 987-6543',
          userPicture: '/default-avatar2.jpg',
          isVerified: false,
          linkedAccounts: [],
          skillOffers: [],
          skillRequests: []
        }
      ]
    }
  },
  mounted() {
    this.filteredUsers = [...this.allUsers];
  },
  methods: {
    filterUsers() {
      if (!this.searchQuery) {
        this.filteredUsers = [...this.allUsers];
        return;
      }
      
      const query = this.searchQuery.toLowerCase();
      this.filteredUsers = this.allUsers.filter(user => 
        user.fullName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone.includes(query)
      );
    },
    openProfileModal(user) {
      this.currentProfile = user;
      this.showProfileModal = true;
    },
    closeProfileModal() {
      this.showProfileModal = false;
      this.currentProfile = {};
    },
    openReportModalFromProfile(offer, userName) {
      // Implement report functionality as needed
      console.log('Reporting offer:', offer, 'from user:', userName);
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
  
  .users-management-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Search Bar Styles */
.search-container {
  margin-bottom: 2rem;
}

.search-bar {
  position: relative;
  max-width: 500px;
}

.search-bar i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.search-bar input {
  width: 100%;
  padding: 12px 45px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
}

.search-bar input:focus {
  border-color: #4b6cb7;
}

/* Users Header Styles */
.users-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.users-header h1 {
  color: #333;
  margin: 0;
}

.users-count {
  text-align: right;
  color: #666;
}

.users-count span {
  font-weight: bold;
  color: #4b6cb7;
}

/* Users Grid Styles */
.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.user-profile-container {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.user-profile-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.user-main-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.name-verified {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.user-name {
  margin: 0;
  color: #333;
  font-size: 1.2rem;
}

.verified-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background-color: #e8f5e8;
  color: #2e7d32;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.verified-badge i {
  font-size: 0.9rem;
}

.view-records-btn {
  background: linear-gradient(135deg, #121731, #728a9c);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.view-records-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(75, 108, 183, 0.3);
}

.user-details {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.profile-picture {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f0f0f0;
}

.contact-info {
  flex: 1;
}

.user-email,
.user-phone {
  margin: 0.25rem 0;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-email i,
.user-phone i {
  width: 16px;
  color: #888;
}

/* Modal Styles (from your existing code, enhanced for consistency) */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: white;
  border-radius: 15px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .users-management-page {
    padding: 1rem;
  }
  
  .users-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .users-count {
    text-align: left;
  }
  
  .users-grid {
    grid-template-columns: 1fr;
  }
  
  .user-main-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .user-details {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .contact-info {
    width: 100%;
  }
}
</style>