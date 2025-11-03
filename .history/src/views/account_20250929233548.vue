<template>
  <div class="account-page">
    <!-- Header -->
    <div class="header">
      <h1>CommuniTrade</h1>
      <h2>Profile Information</h2>
    </div>

    <div class="account-content">
      <!-- Left Side - Profile Information -->
      <div class="profile-section">
        <div class="profile-card">
          <!-- Profile Picture and Name -->
          <div class="profile-header">
            <div class="profile-picture-container">
              <div class="profile-picture">
                <img 
                  src="../assets/default-avatar.png" 
                  alt="Profile Picture" 
                  class="avatar"
                />
              </div>
              <div class="profile-name-section">
                <h3 class="profile-name-label">Profile Picture</h3>
                <h2 class="user-fullname">{{ user.fullName }}</h2>
              </div>
            </div>
          </div>

          <!-- Profile Information -->
          <div class="profile-details">
            <div class="detail-item">
              <strong class="detail-label">USERNAME:</strong>
              <span class="detail-value">{{ user.username }}</span>
            </div>

            <div class="detail-item">
              <strong class="detail-label">EMAIL ADDRESS:</strong>
              <span class="detail-value">{{ user.email }}</span>
            </div>

            <div class="detail-item">
              <strong class="detail-label">PHONE NUMBER:</strong>
              <span class="detail-value">{{ user.phone }}</span>
            </div>

            <div class="detail-item">
              <strong class="detail-label">GOVERNMENT ID:</strong>
              <span class="detail-value">{{ user.governmentId }}</span>
            </div>

            <!-- Linked Accounts -->
            <div class="linked-accounts-section">
              <div class="linked-accounts-header">
                <strong class="detail-label">LINKED ACCOUNTS:</strong>
                <button class="add-account-btn" @click="addFacebookAccount">
                  <span class="material-icons">add</span>
                  Add
                </button>
              </div>
              
              <div class="divider"></div>
              
              <div class="linked-accounts-list">
                <div v-if="user.linkedAccounts.length === 0" class="no-accounts">
                  No linked accounts
                </div>
                <div 
                  v-for="account in user.linkedAccounts" 
                  :key="account.id"
                  class="account-item"
                >
                  <span class="account-platform">{{ account.name }}</span>
                  <span class="account-url">{{ account.url }}</span>
                  <button 
                    class="remove-account-btn"
                    @click="removeAccount(account.id)"
                  >
                    <span class="material-icons">close</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Posts -->
      <div class="posts-section">
        <div class="posts-card">
          <h3 class="posts-title">POSTS</h3>
          
          <div class="posts-tabs">
            <button 
              class="tab-btn"
              :class="{ active: activeTab === 'offers' }"
              @click="activeTab = 'offers'"
            >
              MY SKILL OFFERS
            </button>
            <button 
              class="tab-btn"
              :class="{ active: activeTab === 'requests' }"
              @click="activeTab = 'requests'"
            >
              MY SKILL REQUESTS
            </button>
          </div>

          <div class="posts-content">
            <div v-if="activeTab === 'offers'" class="tab-content">
              <div class="post-item">My SKILL OFFERS</div>
            </div>
            <div v-if="activeTab === 'requests'" class="tab-content">
              <div class="post-item">My SKILL REQUESTS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// User data
const user = ref({
  fullName: 'Kathryn Bernardo',
  username: 'kathryn_b',
  email: 'kathryn.bernardo@example.com',
  phone: '+1 (555) 123-4567',
  governmentId: 'XXXX-XX-XXXX',
  linkedAccounts: []
})

// Tab state
const activeTab = ref('offers')

// Add Facebook account function
const addFacebookAccount = () => {
  const facebookUrl = prompt('Please enter your Facebook profile URL:')
  if (facebookUrl) {
    user.value.linkedAccounts.push({
      id: Date.now(),
      name: 'Facebook',
      url: facebookUrl
    })
  }
}

// Remove account function
const removeAccount = (accountId) => {
  user.value.linkedAccounts = user.value.linkedAccounts.filter(
    account => account.id !== accountId
  )
}
</script>

<style scoped>
.account-page {
  padding: 2rem 1rem 1rem 1rem;
  margin-left: calc(3.5rem + 32px);
  min-height: calc(100vh - 60px);
  transition: margin-left 0.2s ease-out;
}

/* Header */
.header {
  margin-bottom: 2rem;
}

.header h1 {
  color: var(--primary);
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.header h2 {
  color: var(--dark);
  font-size: 1.5rem;
  font-weight: 600;
}

/* Main Content Layout */
.account-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
}

/* Profile Section */
.profile-section {
  display: flex;
  flex-direction: column;
}

.profile-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Profile Header */
.profile-header {
  margin-bottom: 2rem;
}

.profile-picture-container {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.profile-picture {
  flex-shrink: 0;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--grey);
}

.profile-name-section {
  display: flex;
  flex-direction: column;
}

.profile-name-label {
  color: var(--dark);
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.user-fullname {
  color: var(--primary);
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

/* Profile Details */
.profile-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  color: var(--dark);
  font-size: 0.9rem;
  font-weight: 600;
}

.detail-value {
  color: var(--dark-alt);
  font-size: 1rem;
  margin-left: 0.5rem;
}

/* Linked Accounts */
.linked-accounts-section {
  margin-top: 1rem;
}

.linked-accounts-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.add-account-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: var(--grey);
  color: var(--light);
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background 0.3s ease;
}

.add-account-btn:hover {
  background: var(--primary);
}

.divider {
  height: 1px;
  background: var(--grey);
  margin: 0.5rem 0;
}

.linked-accounts-list {
  min-height: 60px;
}

.no-accounts {
  color: var(--grey);
  font-style: italic;
  text-align: center;
  padding: 1rem;
}

.account-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  background: var(--light);
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.account-platform {
  font-weight: 600;
  color: var(--primary);
  font-size: 0.9rem;
}

.account-url {
  flex: 1;
  color: var(--grey);
  font-size: 0.8rem;
  margin: 0 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.remove-account-btn {
  background: none;
  border: none;
  color: var(--grey);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.remove-account-btn:hover {
  background: var(--grey);
  color: var(--light);
}

/* Posts Section */
.posts-section {
  display: flex;
  flex-direction: column;
}

.posts-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.posts-title {
  color: var(--dark);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--grey);
}

/* Posts Tabs */
.posts-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tab-btn {
  flex: 1;
  background: var(--light);
  border: none;
  padding: 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  color: var(--dark);
  font-size: 0.9rem;
}

.tab-btn.active {
  background: var(--primary);
  color: var(--light);
}

/* Posts Content */
.posts-content {
  min-height: 150px;
}

.tab-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.post-item {
  padding: 1rem;
  background: var(--light);
  border-radius: 6px;
  color: var(--dark);
  text-align: center;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .account-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .account-page {
    margin-left: 0;
    padding: 1rem 0.5rem;
  }
  
  .header h1 {
    font-size: 2rem;
  }
  
  .header h2 {
    font-size: 1.25rem;
  }
  
  .profile-picture-container {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .posts-tabs {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .profile-card,
  .posts-card {
    padding: 1rem;
  }
  
  .avatar {
    width: 60px;
    height: 60px;
  }
  
  .user-fullname {
    font-size: 1.25rem;
  }
}
</style>