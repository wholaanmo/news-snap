<template>
    <div class="account-page">
      <!-- Header -->
      <div class="header">
        <h1>CommuniTrade</h1>
        <h2>PROFILE INFORMATION</h2>
      </div>
  
      <div class="account-layout">
        <!-- Left Column - Profile Information -->
        <div class="profile-column">
          <div class="profile-card">
            <!-- Profile Header -->
            <div class="profile-header">
              <div class="profile-picture">
                <img 
                  src="../assets/default-avatar.png" 
                  alt="Profile Picture" 
                  class="avatar"
                />
              </div>
              <div class="profile-name">
                <h3>{{ user.fullName }}</h3>
                <button class="edit-profile-btn">
                  <span class="material-icons">edit</span>
                  Edit Profile
                </button>
              </div>
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
  
        <!-- Right Column - Messages and Posts -->
        <div class="content-column">
          <!-- Messages Section -->
          <div class="messages-card">
            <h3 class="section-title">Messages</h3>
            <div class="messages-list">
              <div 
                v-for="message in messages" 
                :key="message.id"
                class="message-item"
              >
                <input type="checkbox" class="message-checkbox">
                <span class="message-sender">{{ message.sender }}</span>
              </div>
            </div>
          </div>
  
          <!-- My Posts Section -->
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
  
  // Messages data
  const messages = ref([
    { id: 1, sender: 'Rejean Zapanta' },
    { id: 2, sender: 'Rejean Zapanta' },
    { id: 3, sender: 'Rejean Zapanta' },
    { id: 4, sender: 'Rejean Zapanta' },
    { id: 5, sender: 'Rejean Zapanta' },
    { id: 6, sender: 'Rejean Zapanta' },
    { id: 7, sender: 'Rejean Zapanta' }
  ])
  
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
    padding: 1rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .header h1 {
    color: var(--primary);
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
  
  .header h2 {
    color: var(--dark);
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  .account-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: start;
  }
  
  /* Profile Column */
  .profile-column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .profile-card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .profile-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
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
  
  .profile-name h3 {
    font-size: 1.5rem;
    color: var(--dark);
    margin-bottom: 0.5rem;
  }
  
  .edit-profile-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--primary);
    color: var(--light);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .edit-profile-btn:hover {
    background: var(--dark);
  }
  
  .profile-info {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .info-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .info-label {
    font-weight: 600;
    color: var(--primary);
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .info-value {
    color: var(--dark);
    font-size: 1rem;
    margin: 0;
    padding-left: 0.5rem;
  }
  
  /* Linked Accounts */
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
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
  }
  
  .add-account-btn:hover {
    background: var(--primary);
  }
  
  .linked-accounts {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .account-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background: var(--light);
    border-radius: 4px;
    font-size: 0.9rem;
  }
  
  .account-icon {
    font-size: 1rem;
    color: var(--primary);
  }
  
  .account-name {
    font-weight: 600;
    color: var(--dark);
    min-width: 80px;
  }
  
  .account-url {
    flex: 1;
    color: var(--grey);
    font-size: 0.8rem;
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
  }
  
  .remove-account-btn:hover {
    background: var(--grey);
    color: var(--light);
  }
  
  .no-accounts {
    color: var(--grey);
    font-style: italic;
    text-align: center;
    padding: 1rem;
  }
  
  /* Content Column */
  .content-column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .messages-card,
  .posts-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .section-title {
    color: var(--dark);
    font-size: 1.2rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--grey);
  }
  
  /* Messages */
  .messages-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .message-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem;
    border-radius: 4px;
    transition: background 0.3s ease;
  }
  
  .message-item:hover {
    background: var(--light);
  }
  
  .message-checkbox {
    width: 16px;
    height: 16px;
  }
  
  .message-sender {
    color: var(--dark);
    font-size: 0.9rem;
  }
  
  /* Posts */
  .posts-tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
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
  }
  
  .tab-btn.active {
    background: var(--primary);
    color: var(--light);
  }
  
  .posts-content {
    min-height: 200px;
  }
  
  .posts-list {
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
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .account-layout {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    
    .profile-header {
      flex-direction: column;
      text-align: center;
    }
    
    .header h1 {
      font-size: 2rem;
    }
    
    .header h2 {
      font-size: 1.25rem;
    }
  }
  
  @media (max-width: 480px) {
    .account-page {
      padding: 0.5rem;
    }
    
    .profile-card {
      padding: 1rem;
    }
    
    .avatar {
      width: 80px;
      height: 80px;
    }
    
    .posts-tabs {
      flex-direction: column;
    }
  }
  </style>