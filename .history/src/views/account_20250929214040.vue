<template>
    <div class="account-container">
      <div class="account-card">
        <!-- Edit Button -->
        <button class="edit-button">
          <span class="material-icons">edit</span>
        </button>
  
        <!-- Profile Content -->
        <div class="profile-content">
          <!-- Profile Picture -->
          <div class="profile-picture">
            <img 
              src="../assets/default-avatar.png" 
              alt="Profile Picture" 
              class="avatar"
            />
          </div>
  
          <!-- Profile Information -->
          <div class="profile-info">
            <div class="info-item">
              <label class="label">Full Name</label>
              <p class="value">{{ user.fullName }}</p>
            </div>
  
            <div class="info-item">
              <label class="label">Email Address</label>
              <p class="value">{{ user.email }}</p>
            </div>
  
            <div class="info-item">
              <label class="label">Phone Number</label>
              <p class="value">{{ user.phone }}</p>
            </div>
  
            <div class="info-item">
              <label class="label">Government ID</label>
              <p class="value">{{ user.governmentId }}</p>
            </div>
  
            <div class="info-item">
              <label class="label">Linked Accounts</label>
              <div class="linked-accounts">
                <span 
                  v-for="account in user.linkedAccounts" 
                  :key="account"
                  class="account-tag"
                >
                  {{ account }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Sample user data - replace with actual data from your backend
  const user = ref({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    governmentId: 'XXX-XX-XXXX',
    linkedAccounts: ['Google', 'Facebook', 'Apple']
  })
  </script>
  
  <style scoped>
  .account-container {
    padding: 1rem;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .account-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: relative;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .edit-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: var(--primary);
    color: var(--light);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
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
    font-size: 1.2rem;
  }
  
  .profile-content {
    display: flex;
    gap: 2rem;
    align-items: flex-start;
  }
  
  .profile-picture {
    flex-shrink: 0;
  }
  
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--grey);
  }
  
  .profile-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .info-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .label {
    font-weight: 600;
    color: var(--primary);
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .value {
    color: var(--dark);
    font-size: 1rem;
    margin: 0;
  }
  
  .linked-accounts {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .account-tag {
    background: var(--grey);
    color: var(--light);
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .account-container {
      padding: 0.5rem;
    }
    
    .account-card {
      padding: 1rem;
      max-width: 100%;
    }
    
    .profile-content {
      flex-direction: column;
      gap: 1.5rem;
      align-items: center;
      text-align: center;
    }
    
    .avatar {
      width: 100px;
      height: 100px;
    }
    
    .profile-info {
      width: 100%;
    }
    
    .linked-accounts {
      justify-content: center;
    }
  }
  
  @media (max-width: 480px) {
    .account-card {
      padding: 0.75rem;
    }
    
    .edit-button {
      top: 0.75rem;
      right: 0.75rem;
      width: 35px;
      height: 35px;
    }
    
    .edit-button .material-icons {
      font-size: 1rem;
    }
    
    .avatar {
      width: 80px;
      height: 80px;
    }
    
    .label {
      font-size: 0.8rem;
    }
    
    .value {
      font-size: 0.9rem;
    }
  }
  </style>