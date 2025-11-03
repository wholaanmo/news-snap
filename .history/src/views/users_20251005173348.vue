<template>
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

    <!-- Profile Modal -->
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
export default {
  name: 'UsersManagement',
  data() {
    return {
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
        },
        {
          id: 3,
          fullName: 'Michael Chen',
          email: 'michael.chen@example.com',
          phone: '+1 (555) 456-7890',
          userPicture: '/default-avatar3.jpg',
          isVerified: true,
          linkedAccounts: [
            { platform: 'Twitter', icon: 'link', url: 'https://twitter.com/michaelchen' }
          ],
          skillOffers: [
            {
              id: 1,
              skills: 'UI/UX Design',
              timePosted: '3 days ago',
              description: 'Professional UI/UX design services',
              category: 'Design',
              location: 'San Francisco',
              skillsRequested: 'Figma, Adobe XD',
              schedule: 'Weekdays'
            }
          ],
          skillRequests: []
        },
        {
          id: 4,
          fullName: 'Emma Wilson',
          email: 'emma.wilson@example.com',
          phone: '+1 (555) 234-5678',
          userPicture: '/default-avatar4.jpg',
          isVerified: false,
          linkedAccounts: [],
          skillOffers: [],
          skillRequests: [
            {
              id: 1,
              request: 'Marketing Strategy',
              timePosted: '5 days ago',
              description: 'Need help with digital marketing strategy',
              category: 'Marketing',
              location: 'Chicago',
              skillsOffered: 'Content Writing',
              schedule: 'Flexible'
            }
          ]
        },
        {
          id: 5,
          fullName: 'David Brown',
          email: 'david.brown@example.com',
          phone: '+1 (555) 345-6789',
          userPicture: '/default-avatar5.jpg',
          isVerified: true,
          linkedAccounts: [
            { platform: 'GitHub', icon: 'code', url: 'https://github.com/davidbrown' },
            { platform: 'LinkedIn', icon: 'work', url: 'https://linkedin.com/in/davidbrown' },
            { platform: 'Portfolio', icon: 'person', url: 'https://davidbrown.dev' }
          ],
          skillOffers: [
            {
              id: 1,
              skills: 'Mobile App Development',
              timePosted: '1 day ago',
              description: 'iOS and Android app development',
              category: 'Technology',
              location: 'Remote',
              skillsRequested: 'React Native, Swift',
              schedule: 'Flexible'
            }
          ],
          skillRequests: []
        },
        {
          id: 6,
          fullName: 'Lisa Garcia',
          email: 'lisa.garcia@example.com',
          phone: '+1 (555) 567-8901',
          userPicture: '/default-avatar6.jpg',
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
:root {
  --primary: #121731;
  --dark: #0a0f23;
  --grey: #666;
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
  border-color: var(--primary);
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
  color: var(--primary);
  margin: 0;
}

.users-count {
  text-align: right;
  color: var(--grey);
}

.users-count span {
  font-weight: bold;
  color: var(--primary);
}

/* Users Grid Styles - 3 containers per row */
.users-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
  color: var(--primary);
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
  background: linear-gradient(135deg, var(--primary), #728a9c);
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
  box-shadow: 0 4px 8px rgba(18, 23, 49, 0.3);
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
  color: var(--grey);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-email i,
.user-phone i {
  width: 16px;
  color: #888;
}

/* Modal Styles */
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
  width: 80%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

/* Profile Modal Styles */
.profile-modal {
  max-width: 800px;
  max-height: 95vh;
  padding: 2rem;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.profile-picture {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
}

.profile-info h2 {
  margin: 0 0 8px 0;
  color: var(--primary);
  text-align: left;
}

.name-verified {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.verified-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: #d4edda;
  color: #155724;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.material-icons {
  font-size: 18px;
  margin-right: 2px;
}

.profile-email, .profile-phone {
  margin: 4px 0;
  color: var(--grey);
}

.profile-sections {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.profile-section h3 {
  margin: 0 0 15px 0;
  color: var(--primary);
  font-size: 1.25rem;
}

.linked-accounts {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.account-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: background-color 0.3s;
}

.account-item:hover {
  background-color: #e9ecef;
  text-decoration: none;
  color: inherit;
}

.material-icons .account-icon {
  color: var(--primary);
  font-size: 20px;
}


.account-platform {
  flex: 1;
  font-weight: 500;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.profile-post-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #e9ecef;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.post-header h4 {
  margin: 0;
  color: var(--primary);
  flex: 1;
}

.post-time {
  color: var(--grey);
  font-size: 0.875rem;
}

.post-description {
  margin: 0 0 15px 0;
  color: #555;
  line-height: 1.5;
}

.post-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 15px;
}

.detail-item {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-weight: 600;
  color: var(--primary);
  font-size: 0.875rem;
  margin-bottom: 4px;
}

.detail-value {
  color: #555;
}

.additional-notes {
  margin-bottom: 15px;
}

.proof-image {
  margin: 15px 0;
}

.proof-thumbnail {
  width: 100%;
  max-width: 200px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.post-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.post-actions {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  font-size: 0.875rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s;
  font-size: 0.900rem;
}

.report-btn {
  color: #e74c3c;
  border: 1px solid #e74c3c;
}

.report-btn:hover {
  background: #e74c3c;
  color: white;
}

.contact-btn {
  color: var(--primary);
  border: 1px solid var(--primary);
}

.contact-btn:hover {
  background: var(--primary);
  color: white;
}

.profile-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.close-btn {
  padding: 12px 30px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.close-btn:hover {
  background: var(--dark);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .users-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

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
  
  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .profile-picture {
    margin-right: 0;
    margin-bottom: 15px;
  }

  .post-details {
    grid-template-columns: 1fr;
  }

  .post-actions {
    flex-direction: column;
  }
}
</style>