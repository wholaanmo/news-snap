<template>
  <div class="account-page">
    <div class="account-layout">
      <!-- Profile Information Container -->
      <div class="profile-container">
        <div class="profile-card">
          <!-- Header and Edit Button -->
          <div class="profile-header">
            <h2 class="profile-title">Profile Information</h2>
            <button class="edit-button">
              <span class="material-icons">edit</span>
            </button>
          </div>

          <!-- Profile Content -->
          <div class="profile-content">
            <div class="profile-picture-section">
              <div class="profile-picture">
                <img 
                  src="../assets/default-avatar.png" 
                  alt="Profile Picture" 
                  class="avatar"
                />
              </div>
              <h3 class="user-name">{{ user.fullName }}</h3>
            </div>

            <!-- Profile Information -->
            <div class="profile-info">
              <div class="info-section">
                <label class="info-label">USERNAME:</label>
                <p class="info-value">{{ user.username }}</p>
              </div>

              <div class="info-section">
                <label class="info-label">EMAIL ADDRESS:</label>
                <p class="info-value">{{ user.email }}</p>
              </div>

              <div class="info-section">
                <label class="info-label">PHONE NUMBER:</label>
                <p class="info-value">{{ user.phone }}</p>
              </div>

              <div class="info-section">
                <label class="info-label">GOVERNMENT ID:</label>
                <p class="info-value">{{ user.governmentId }}</p>
              </div>

              <!-- Linked Accounts Section -->
              <div class="info-section">
                <div class="linked-accounts-header">
                  <label class="info-label">LINKED ACCOUNTS:</label>
                  <button class="add-account-btn" @click="addFacebookAccount">
                    <span class="material-icons">add</span>
                    Add
                  </button>
                </div>
                <div class="linked-accounts">
                  <div 
                    v-for="account in user.linkedAccounts" 
                    :key="account.id"
                    class="account-item"
                  >
                    <span class="material-icons account-icon">link</span>
                    <span class="account-name">{{ account.name }}</span>
                    <span class="account-url">{{ account.url }}</span>
                    <button 
                      class="remove-account-btn"
                      @click="removeAccount(account.id)"
                    >
                      <span class="material-icons">close</span>
                    </button>
                  </div>
                  <div v-if="user.linkedAccounts.length === 0" class="no-accounts">
                    No linked accounts
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Posts Section Below Profile -->
      <div class="posts-container">
        <div class="posts-card">
          <h3 class="section-title">MY POSTS</h3>
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
            <div v-if="activeTab === 'offers'" class="posts-list">
              <div class="post-item">My SKILL OFFERS</div>
              <div class="post-item">My SKILL OFFERS</div>
            </div>
            <div v-if="activeTab === 'requests'" class="posts-list">
              <div class="post-item">My SKILL REQUESTS</div>
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
  governmentId: 'XXX-XX-XXXX',
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
  padding: 0.75rem;
  max-width: 1000px;
  margin: 0 auto;
}

.account-layout {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Profile Container */
.profile-container {
  width: 100%;
}

.profile-card {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  max-width: 900px;
  margin: 0 auto;
}

/* Profile Header */
.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--grey);
}

.profile-title {
  color: var(--dark);
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
}

.edit-button {
  background: var(--primary);
  color: var(--light);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-button:hover {
  background: var(--dark);
  transform: scale(1.05);
}

.edit-button .material-icons {
  font-size: 1.1rem;
}

/* Profile Content */
.profile-content {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.profile-picture-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.profile-picture {
  flex-shrink: 0;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--grey);
}

.user-name {
  font-size: 1.1rem;
  color: var(--dark);
  margin: 0;
  text-align: center;
}

.profile-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.info-label {
  font-weight: 600;
  color: var(--primary);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  color: var(--dark);
  font-size: 0.95rem;
  margin: 0;
  padding-left: 0.5rem;
}

/* Linked Accounts */
.linked-accounts-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;
}

.add-account-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: var(--grey);
  color: var(--light);
  border: none;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
}

.add-account-btn:hover {
  background: var(--primary);
}

.linked-accounts {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.account-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem;
  background: var(--light);
  border-radius: 4px;
  font-size: 0.85rem;
}

.account-icon {
  font-size: 0.9rem;
  color: var(--primary);
}

.account-name {
  font-weight: 600;
  color: var(--dark);
  min-width: 70px;
}

.account-url {
  flex: 1;
  color: var(--grey);
  font-size: 0.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.remove-account-btn {
  background: none;
  border: none;
  color: var(--grey);
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 50%;
  font-size: 0.8rem;
}

.remove-account-btn:hover {
  background: var(--grey);
  color: var(--light);
}

.no-accounts {
  color: var(--grey);
  font-style: italic;
  text-align: center;
  padding: 0.75rem;
  font-size: 0.85rem;
}

/* Posts Container */
.posts-container {
  width: 100%;
}

.posts-card {
  background: white;
  border-radius: 10px;
  padding: 1.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 0 auto;
}

.section-title {
  color: var(--dark);
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--grey);
}

/* Posts */
.posts-tabs {
  display: flex;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}

.tab-btn {
  flex: 1;
  background: var(--light);
  border: none;
  padding: 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  color: var(--dark);
  font-size: 0.85rem;
}

.tab-btn.active {
  background: var(--primary);
  color: var(--light);
}

.posts-content {
  min-height: 150px;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.post-item {
  padding: 0.75rem;
  background: var(--light);
  border-radius: 6px;
  color: var(--dark);
  text-align: center;
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .account-page {
    padding: 0.5rem;
  }
  
  .profile-content {
    flex-direction: column;
    gap: 1.25rem;
    align-items: center;
    text-align: center;
  }
  
  .profile-header {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }
  
  .posts-tabs {
    flex-direction: column;
  }
  
  .profile-card,
  .posts-card {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .account-page {
    padding: 0.25rem;
  }
  
  .avatar {
    width: 80px;
    height: 80px;
  }
  
  .profile-title {
    font-size: 1.1rem;
  }
  
  .user-name {
    font-size: 1rem;
  }
  
  .profile-card,
  .posts-card {
    padding: 0.75rem;
  }
}
</style>