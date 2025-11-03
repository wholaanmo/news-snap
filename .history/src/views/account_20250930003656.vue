<template>
    <div class="account-page">
      <div class="account-layout">
        <!-- Left Column - Profile Information -->
        <div class="profile-container">
          <div class="profile-card">
            <!-- Header and Edit Button -->
            <div class="profile-header">
              <h2 class="profile-title">Profile Information</h2>
              <button class="edit-button" @click="toggleEditMode">
                <span class="material-icons">{{ isEditing ? 'close' : 'edit' }}</span>
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
                  <button v-if="isEditing" class="upload-profile-pic-btn">
                    <span class="material-icons">photo_camera</span>
                  </button>
                </div>
                <h3 class="user-name">{{ user.fullName }}</h3>
              </div>
  
              <!-- Profile Information -->
              <div class="profile-info">
                <div class="info-section">
                  <label class="info-label">USERNAME:</label>
                  <div v-if="isEditing" class="edit-input-container">
                    <input 
                      type="text" 
                      v-model="editData.username"
                      class="edit-input"
                    />
                  </div>
                  <p v-else class="info-value">{{ user.username }}</p>
                </div>
  
                <div class="info-section">
                  <label class="info-label">EMAIL ADDRESS:</label>
                  <div v-if="isEditing" class="edit-input-container">
                    <input 
                      type="email" 
                      v-model="editData.email"
                      class="edit-input"
                    />
                  </div>
                  <p v-else class="info-value">{{ user.email }}</p>
                </div>
  
                <div class="info-section">
                  <label class="info-label">PHONE NUMBER:</label>
                  <div v-if="isEditing" class="edit-input-container">
                    <input 
                      type="tel" 
                      v-model="editData.phone"
                      class="edit-input"
                    />
                  </div>
                  <p v-else class="info-value">{{ user.phone }}</p>
                </div>
  
                <div class="info-section">
                  <label class="info-label">GOVERNMENT ID:</label>
                  <div v-if="isEditing" class="government-id-edit">
                    <div class="id-input-container">
                      <input 
                        type="text" 
                        v-model="editData.governmentId"
                        class="edit-input"
                        placeholder="Enter Government ID"
                      />
                    </div>
                    <div class="id-upload-section">
                      <label class="upload-label">
                        <input 
                          type="file" 
                          ref="idFileInput"
                          @change="handleIdUpload"
                          accept="image/*"
                          class="file-input"
                        />
                        <span class="material-icons">cloud_upload</span>
                        Upload ID Photo
                      </label>
                      <div v-if="editData.idPhoto" class="uploaded-file">
                        <span class="material-icons">description</span>
                        {{ editData.idPhoto.name }}
                      </div>
                    </div>
                  </div>
                  <p v-else class="info-value">{{ user.governmentId }}</p>
                </div>
  
                <!-- Linked Accounts Section -->
                <div class="info-section">
                  <div class="linked-accounts-header">
                    <label class="info-label">LINKED ACCOUNTS:</label>
                    <button class="add-account-btn" @click="showAddField = !showAddField">
                      <span class="material-icons">add</span>
                      Add
                    </button>
                  </div>
                  
                  <!-- Add Facebook Link Field -->
                  <div v-if="showAddField" class="add-account-field">
                    <div class="input-group">
                      <input 
                        type="text" 
                        v-model="newFacebookUrl"
                        placeholder="Enter Facebook profile URL"
                        class="url-input"
                      />
                      <button class="save-btn" @click="saveFacebookAccount">
                        <span class="material-icons">check</span>
                      </button>
                      <button class="cancel-btn" @click="cancelAddAccount">
                        <span class="material-icons">close</span>
                      </button>
                    </div>
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
                    <div v-if="user.linkedAccounts.length === 0 && !showAddField" class="no-accounts">
                      No linked accounts
                    </div>
                  </div>
                </div>
  
                <!-- Save/Cancel Buttons for Edit Mode -->
                <div v-if="isEditing" class="edit-actions">
                  <button class="save-btn-large" @click="saveChanges">
                    <span class="material-icons">save</span>
                    Save Changes
                  </button>
                  <button class="cancel-btn-large" @click="cancelEdit">
                    <span class="material-icons">cancel</span>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Right Column - Posts Section -->
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
  
  // Add account field state
  const showAddField = ref(false)
  const newFacebookUrl = ref('')
  
  // Edit mode state
  const isEditing = ref(false)
  const editData = ref({})
  const idFileInput = ref(null)
  
  // Toggle edit mode
  const toggleEditMode = () => {
    isEditing.value = !isEditing.value
    if (isEditing.value) {
      // Initialize edit data with current user data
      editData.value = {
        username: user.value.username,
        email: user.value.email,
        phone: user.value.phone,
        governmentId: user.value.governmentId,
        idPhoto: null
      }
    } else {
      editData.value = {}
    }
  }
  
  // Handle ID photo upload
  const handleIdUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      editData.value.idPhoto = file
    }
  }
  
  // Save changes
  const saveChanges = () => {
    user.value.username = editData.value.username
    user.value.email = editData.value.email
    user.value.phone = editData.value.phone
    user.value.governmentId = editData.value.governmentId
    // Here you would typically upload the ID photo to your server
    if (editData.value.idPhoto) {
      console.log('ID photo to upload:', editData.value.idPhoto)
      // Add your file upload logic here
    }
    isEditing.value = false
    editData.value = {}
  }
  
  // Cancel edit
  const cancelEdit = () => {
    isEditing.value = false
    editData.value = {}
  }
  
  // Add Facebook account function
  const saveFacebookAccount = () => {
    if (newFacebookUrl.value.trim()) {
      user.value.linkedAccounts.push({
        id: Date.now(),
        name: 'Facebook',
        url: newFacebookUrl.value
      })
      newFacebookUrl.value = ''
      showAddField.value = false
    }
  }
  
  // Cancel adding account
  const cancelAddAccount = () => {
    newFacebookUrl.value = ''
    showAddField.value = false
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
    margin-top: 2rem;
    margin-left: calc(3.5rem + 32px); /* Fixed left margin for closed sidebar */
  }
  
  .account-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: start;
  }
  
  /* Profile Container - Left Side */
  .profile-container {
    display: flex;
    flex-direction: column;
  }
  
  .profile-card {
    background: white;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    position: relative;
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
    position: relative;
  }
  
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--grey);
  }
  
  .upload-profile-pic-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    background: var(--primary);
    color: var(--light);
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .upload-profile-pic-btn:hover {
    background: var(--dark);
    transform: scale(1.1);
  }
  
  .upload-profile-pic-btn .material-icons {
    font-size: 1rem;
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
  
  /* Edit Input Styles */
  .edit-input-container {
    padding-left: 0.5rem;
  }
  
  .edit-input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--grey);
    border-radius: 4px;
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.3s ease;
  }
  
  .edit-input:focus {
    border-color: var(--primary);
  }
  
  /* Government ID Edit Section */
  .government-id-edit {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .id-input-container {
    padding-left: 0.5rem;
  }
  
  .id-upload-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .upload-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background: var(--light);
    border: 2px dashed var(--grey);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.85rem;
    color: var(--dark);
  }
  
  .upload-label:hover {
    border-color: var(--primary);
    background: #f8f9fa;
  }
  
  .file-input {
    display: none;
  }
  
  .uploaded-file {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background: var(--light);
    border-radius: 4px;
    font-size: 0.8rem;
    color: var(--dark);
  }
  
  .uploaded-file .material-icons {
    color: var(--primary);
    font-size: 1rem;
  }
  
  /* Edit Actions */
  .edit-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--grey);
  }
  
  .save-btn-large, .cancel-btn-large {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    font-size: 0.9rem;
  }
  
  .save-btn-large {
    background: var(--primary);
    color: var(--light);
  }
  
  .save-btn-large:hover {
    background: var(--dark);
  }
  
  .cancel-btn-large {
    background: var(--grey);
    color: var(--light);
  }
  
  .cancel-btn-large:hover {
    background: #666;
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
    transition: background 0.3s ease;
  }
  
  .add-account-btn:hover {
    background: var(--primary);
  }
  
  /* Add Account Field */
  .add-account-field {
    margin: 0.5rem 0;
  }
  
  .input-group {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  
  .url-input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid var(--grey);
    border-radius: 4px;
    font-size: 0.85rem;
    outline: none;
    transition: border-color 0.3s ease;
  }
  
  .url-input:focus {
    border-color: var(--primary);
  }
  
  .save-btn, .cancel-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .save-btn {
    background: var(--primary);
    color: var(--light);
  }
  
  .save-btn:hover {
    background: var(--dark);
  }
  
  .cancel-btn {
    background: var(--grey);
    color: var(--light);
  }
  
  .cancel-btn:hover {
    background: #666;
  }
  
  .save-btn .material-icons,
  .cancel-btn .material-icons {
    font-size: 1rem;
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
    transition: all 0.3s ease;
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
  
  /* Posts Container - Right Side */
  .posts-container {
    display: flex;
    flex-direction: column;
  }
  
  .posts-card {
    background: white;
    border-radius: 10px;
    padding: 1.25rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
      margin-top: 1.5rem;
      margin-left: 0.5rem;
    }
    
    .account-layout {
      grid-template-columns: 1fr;
      gap: 1.5rem;
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
    
    .input-group {
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .url-input {
      width: 100%;
    }
    
    .edit-actions {
      flex-direction: column;
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
      margin-top: 1rem;
      margin-left: 0.25rem;
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