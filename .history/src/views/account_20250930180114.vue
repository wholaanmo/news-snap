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
                  :src="profileImageUrl || '../assets/profile.jpg'" 
                  alt="Profile Picture" 
                  class="avatar"
                />
                <button v-if="isEditing" class="upload-profile-pic-btn" @click="triggerProfilePicUpload">
                  <span class="material-icons">photo_camera</span>
                </button>
                <input 
                  type="file" 
                  ref="profilePicInput"
                  @change="handleProfilePicUpload"
                  accept="image/*"
                  class="file-input-hidden"
                />
              </div>
              <div v-if="isEditing" class="edit-input-container full-name-edit">
                <input 
                  type="text" 
                  v-model="editData.fullName"
                  class="edit-input"
                  placeholder="Enter full name"
                />
              </div>
              <h3 v-else class="user-name">{{ user.fullName }}</h3>
            </div>

            <!-- Profile Information -->
            <div class="profile-info">
              <div class="info-section">
                <label class="info-label">FULL NAME:</label>
                <div v-if="isEditing" class="edit-input-container">
                  <input 
                    type="text" 
                    v-model="editData.fullName"
                    class="edit-input"
                  />
                </div>
                <p v-else class="info-value">{{ user.fullName }}</p>
              </div>

              <div class="info-section">
                <label class="info-label">USERNAME:</label>
                <div v-if="isEditing" class="edit-input-container">
                  <input 
                    type="text" 
                    v-model="editData.username"
                    class="edit-input"
                    disabled
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
                      <div class="file-preview">
                        <img :src="idImageUrl" alt="ID Preview" class="id-preview-image" />
                        <div class="file-info">
                          <span class="material-icons">description</span>
                          {{ editData.idPhoto.name }}
                        </div>
                      </div>
                      <button class="remove-file-btn" @click="removeIdPhoto">
                        <span class="material-icons">close</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div v-else class="id-display">
                  <div v-if="user.idPhotoUrl" class="uploaded-id">
                    <img :src="user.idPhotoUrl" alt="Government ID" class="id-image" />
                  </div>
                  <p v-else class="info-value">No ID uploaded</p>
                </div>
              </div>

              <!-- Linked Accounts Section -->
              <div class="info-section">
                <div class="linked-accounts-header">
                  <label class="info-label">LINKED ACCOUNTS:</label>
                  <div class="account-options" v-if="isEditing">
                    <button class="add-account-btn" @click="showAddField = !showAddField">
                      <span class="material-icons">add</span>
                      Add
                    </button>
                  </div>
                </div>
                
                <!-- Add Account Field -->
                <div v-if="showAddField && isEditing" class="add-account-field">
                  <div class="account-type-selector">
                    <select v-model="selectedAccountType" class="account-select">
                      <option value="facebook">Facebook</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="instagram">Instagram</option>
                    </select>
                  </div>
                  <div class="input-group">
                    <input 
                      type="text" 
                      v-model="newAccountUrl"
                      :placeholder="getAccountPlaceholder()"
                      class="url-input"
                    />
                    <button class="save-btn" @click="saveLinkedAccount">
                      <span class="material-icons">check</span>
                    </button>
                    <button class="cancel-btn" @click="cancelAddAccount">
                      <span class="material-icons">close</span>
                    </button>
                  </div>
                  <div v-if="urlError" class="error-message">
                    {{ urlError }}
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
                      v-if="isEditing"
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
  linkedAccounts: [],
  idPhotoUrl: '' // Added to store the uploaded ID photo URL
})

// Tab state
const activeTab = ref('offers')

// Add account field state
const showAddField = ref(false)
const selectedAccountType = ref('facebook')
const newAccountUrl = ref('')
const urlError = ref('')

// Edit mode state
const isEditing = ref(false)
const editData = ref({})
const idFileInput = ref(null)
const profilePicInput = ref(null)
const profileImageUrl = ref('')
const idImageUrl = ref('')

// URL validation patterns
const urlPatterns = {
  facebook: /^(https?:\/\/)?(www\.)?(facebook\.com|fb\.com)\/.+/i,
  linkedin: /^(https?:\/\/)?(www\.)?linkedin\.com\/.+/i,
  instagram: /^(https?:\/\/)?(www\.)?instagram\.com\/.+/i
}

// Account name mapping
const accountNames = {
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  instagram: 'Instagram'
}

// Toggle edit mode
const toggleEditMode = () => {
  isEditing.value = !isEditing.value
  if (isEditing.value) {
    // Initialize edit data with current user data
    editData.value = {
      fullName: user.value.fullName,
      username: user.value.username,
      email: user.value.email,
      phone: user.value.phone,
      governmentId: user.value.governmentId,
      idPhoto: null
    }
  } else {
    editData.value = {}
    showAddField.value = false
    newAccountUrl.value = ''
    urlError.value = ''
  }
}

// Get placeholder text based on selected account type
const getAccountPlaceholder = () => {
  const placeholders = {
    facebook: 'Enter Facebook profile URL',
    linkedin: 'Enter LinkedIn profile URL',
    instagram: 'Enter Instagram profile URL'
  }
  return placeholders[selectedAccountType.value]
}

// Validate URL
const validateUrl = (url, type) => {
  if (!url.trim()) {
    return 'URL is required'
  }
  
  // Add https:// if missing
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url
  }
  
  // Basic URL validation
  try {
    new URL(url)
  } catch {
    return 'Please enter a valid URL'
  }
  
  // Platform-specific validation
  if (!urlPatterns[type].test(url)) {
    return `Please enter a valid ${accountNames[type]} URL`
  }
  
  return null
}

// Save linked account
const saveLinkedAccount = () => {
  urlError.value = validateUrl(newAccountUrl.value, selectedAccountType.value)
  
  if (!urlError.value) {
    let finalUrl = newAccountUrl.value
    // Ensure URL has protocol
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl
    }
    
    user.value.linkedAccounts.push({
      id: Date.now(),
      name: accountNames[selectedAccountType.value],
      url: finalUrl
    })
    newAccountUrl.value = ''
    showAddField.value = false
    urlError.value = ''
  }
}

// Cancel adding account
const cancelAddAccount = () => {
  newAccountUrl.value = ''
  showAddField.value = false
  urlError.value = ''
}

// Trigger profile picture upload
const triggerProfilePicUpload = () => {
  profilePicInput.value?.click()
}

// Handle profile picture upload
const handleProfilePicUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Create a URL for the uploaded image
    profileImageUrl.value = URL.createObjectURL(file)
    console.log('Profile picture uploaded:', file.name)
    // Here you would typically upload the file to your server
  }
}

// Handle ID photo upload
const handleIdUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    editData.value.idPhoto = file
    // Create a preview URL for the ID image
    idImageUrl.value = URL.createObjectURL(file)
  }
}

// Remove ID photo
const removeIdPhoto = () => {
  editData.value.idPhoto = null
  idImageUrl.value = ''
  if (idFileInput.value) {
    idFileInput.value.value = ''
  }
}

// Save changes
const saveChanges = () => {
  user.value.fullName = editData.value.fullName
  user.value.username = editData.value.username
  user.value.email = editData.value.email
  user.value.phone = editData.value.phone
  user.value.governmentId = editData.value.governmentId
  
  // Handle ID photo upload
  if (editData.value.idPhoto) {
    console.log('ID photo to upload:', editData.value.idPhoto)
    // Store the ID photo URL for display
    user.value.idPhotoUrl = idImageUrl.value
    // Here you would typically upload the file to your server
  }
  
  isEditing.value = false
  editData.value = {}
  showAddField.value = false
}

// Cancel edit
const cancelEdit = () => {
  isEditing.value = false
  editData.value = {}
  showAddField.value = false
  newAccountUrl.value = ''
  urlError.value = ''
  // Reset profile picture if it was changed but not saved
  profileImageUrl.value = ''
  // Reset ID image URL if it was changed but not saved
  idImageUrl.value = ''
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
  margin-top: 0.5rem;
  margin-left: 0;
  width: 100%;
  box-sizing: border-box;
}

.account-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: start;
  max-width: 1200px;
  margin: 0 auto;
}

/* Profile Container - Left Side */
.profile-container {
  display: flex;
  flex-direction: column;
}

.profile-card {
  background: white;
  border-radius: 10px;
  padding: 1.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

/* Profile Header */
.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--grey);
  width: 100%;
  flex-wrap: wrap;
  gap: 0.5rem;
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
  flex-shrink: 0;
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
  gap: 1.25rem;
  align-items: flex-start;
  width: 100%;
}

.profile-picture-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
  min-width: 100px;
}

.profile-picture {
  flex-shrink: 0;
  position: relative;
}

.avatar {
  width: 80px;
  height: 80px;
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
  width: 28px;
  height: 28px;
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
  font-size: 0.9rem;
}

.file-input-hidden {
  display: none;
}

.user-name {
  font-size: 1rem;
  color: var(--dark);
  margin: 0;
  text-align: center;
  word-break: break-word;
  max-width: 100px;
}

.full-name-edit {
  width: 100%;
  max-width: 100px;
}

.profile-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
}

.info-label {
  font-weight: 600;
  color: var(--primary);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  width: 100%;
}

.info-value {
  color: var(--dark);
  font-size: 0.9rem;
  margin: 0;
  padding-left: 0.5rem;
  word-break: break-word;
  width: 100%;
}

/* Edit Input Styles */
.edit-input-container {
  padding-left: 0.5rem;
  width: 100%;
  box-sizing: border-box;
}

.edit-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--grey);
  border-radius: 4px;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
  max-width: 100%;
}

.edit-input:focus {
  border-color: var(--primary);
}

.edit-input:disabled {
  background-color: #f5f5f5;
  color: #666;
  cursor: not-allowed;
}

/* Government ID Edit Section */
.government-id-edit {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

.id-upload-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.upload-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem;
  background: var(--light);
  border: 2px dashed var(--grey);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.8rem;
  color: var(--dark);
  width: 100%;
  box-sizing: border-box;
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
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.5rem;
  background: var(--light);
  border-radius: 4px;
  font-size: 0.75rem;
  color: var(--dark);
  width: 100%;
  box-sizing: border-box;
}

.file-preview {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
}

.id-preview-image {
  width: 35px;
  height: 35px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid var(--grey);
  flex-shrink: 0;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
  flex: 1;
}

.file-info span {
  flex-shrink: 0;
}

.uploaded-file .material-icons {
  color: var(--primary);
  font-size: 0.9rem;
}

.remove-file-btn {
  background: none;
  border: none;
  color: var(--grey);
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.remove-file-btn:hover {
  background: var(--grey);
  color: var(--light);
}

/* ID Display Section */
.id-display {
  padding-left: 0.5rem;
  width: 100%;
}

.uploaded-id {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.id-image {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  border: 2px solid var(--grey);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 100%;
}

.id-verified {
  color: #10b981;
  font-size: 0.75rem;
  font-weight: 600;
  margin: 0;
}

/* Edit Actions */
.edit-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid var(--grey);
  width: 100%;
  flex-wrap: wrap;
}

.save-btn-large, .cancel-btn-large {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 0.85rem;
  flex: 1;
  min-width: 120px;
  justify-content: center;
  box-sizing: border-box;
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
  width: 100%;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.account-options {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.add-account-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: var(--grey);
  color: var(--light);
  border: none;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.7rem;
  transition: background 0.3s ease;
  white-space: nowrap;
}

.add-account-btn:hover {
  background: var(--primary);
}

/* Add Account Field */
.add-account-field {
  margin: 0.5rem 0;
  width: 100%;
}

.account-type-selector {
  margin-bottom: 0.5rem;
  width: 100%;
}

.account-select {
  padding: 0.4rem;
  border: 1px solid var(--grey);
  border-radius: 4px;
  font-size: 0.8rem;
  outline: none;
  transition: border-color 0.3s ease;
  width: 100%;
  box-sizing: border-box;
  max-width: 100%;
}

.account-select:focus {
  border-color: var(--primary);
}

.input-group {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
}

.url-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--grey);
  border-radius: 4px;
  font-size: 0.8rem;
  outline: none;
  transition: border-color 0.3s ease;
  min-width: 150px;
  box-sizing: border-box;
}

.url-input:focus {
  border-color: var(--primary);
}

.save-btn, .cancel-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
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
  font-size: 0.9rem;
}

.error-message {
  color: #dc3545;
  font-size: 0.7rem;
  margin-top: 0.25rem;
  padding-left: 0.25rem;
  width: 100%;
}

.linked-accounts {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
}

.account-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem;
  background: var(--light);
  border-radius: 4px;
  font-size: 0.8rem;
  width: 100%;
  box-sizing: border-box;
  flex-wrap: wrap;
}

.account-icon {
  font-size: 0.85rem;
  color: var(--primary);
  flex-shrink: 0;
}

.account-name {
  font-weight: 600;
  color: var(--dark);
  min-width: 60px;
  flex-shrink: 0;
}

.account-url {
  flex: 1;
  color: var(--grey);
  font-size: 0.7rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}

.remove-account-btn {
  background: none;
  border: none;
  color: var(--grey);
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 50%;
  font-size: 0.75rem;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.remove-account-btn:hover {
  background: var(--grey);
  color: var(--light);
}

.no-accounts {
  color: var(--grey);
  font-style: italic;
  text-align: center;
  padding: 0.6rem;
  font-size: 0.8rem;
  width: 100%;
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
  width: 100%;
  box-sizing: border-box;
}

.section-title {
  color: var(--dark);
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--grey);
  width: 100%;
}

/* Posts */
.posts-tabs {
  display: flex;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
  width: 100%;
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
  font-size: 0.8rem;
  box-sizing: border-box;
  white-space: nowrap;
}

.tab-btn.active {
  background: var(--primary);
  color: var(--light);
}

.posts-content {
  min-height: 120px;
  width: 100%;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 100%;
}

.post-item {
  padding: 0.75rem;
  background: var(--light);
  border-radius: 6px;
  color: var(--dark);
  text-align: center;
  font-size: 0.85rem;
  width: 100%;
  box-sizing: border-box;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .account-layout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .profile-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .profile-info {
    width: 100%;
  }
  
  .edit-input-container {
    padding-left: 0;
  }
  
  .id-display {
    padding-left: 0;
  }
}

@media (max-width: 768px) {
  .account-page {
    padding: 0.75rem;
  }
  
  .profile-card,
  .posts-card {
    padding: 1rem;
    border-radius: 8px;
  }
  
  .profile-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .profile-title {
    font-size: 1.2rem;
  }
  
  .avatar {
    width: 70px;
    height: 70px;
  }
  
  .user-name {
    font-size: 0.95rem;
    max-width: 90px;
  }
  
  .info-label {
    font-size: 0.75rem;
  }
  
  .info-value {
    font-size: 0.85rem;
    padding-left: 0;
  }
  
  .edit-actions {
    flex-direction: column;
  }
  
  .save-btn-large,
  .cancel-btn-large {
    min-width: 100%;
  }
  
  .input-group {
    flex-direction: column;
    align-items: stretch;
  }
  
  .url-input {
    min-width: 100%;
  }
  
  .account-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  .account-url {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .account-page {
    padding: 0.5rem;
  }
  
  .account-layout {
    gap: 1rem;
  }
  
  .profile-card,
  .posts-card {
    padding: 0.75rem;
    border-radius: 6px;
  }
  
  .profile-title {
    font-size: 1.1rem;
  }
  
  .section-title {
    font-size: 1rem;
  }
  
  .avatar {
    width: 60px;
    height: 60px;
  }
  
  .upload-profile-pic-btn {
    width: 24px;
    height: 24px;
  }
  
  .upload-profile-pic-btn .material-icons {
    font-size: 0.8rem;
  }
  
  .id-image {
    width: 100px;
    height: 70px;
  }
  
  .tab-btn {
    font-size: 0.75rem;
    padding: 0.5rem;
  }
  
  .posts-tabs {
    flex-direction: column;
  }
}

/* Handle sidebar states */
@media (min-width: 769px) {
  /* When sidebar is open */
  .account-page {
    margin-left: 250px; /* Adjust based on your sidebar width */
    width: calc(100% - 250px);
    transition: margin-left 0.3s ease, width 0.3s ease;
  }
  
  /* When sidebar is closed */
  .account-page.sidebar-closed {
    margin-left: 60px; /* Adjust based on your collapsed sidebar width */
    width: calc(100% - 60px);
  }
}

/* Print styles */
@media print {
  .account-page {
    padding: 0;
    margin: 0;
  }
  
  .profile-card,
  .posts-card {
    box-shadow: none;
    border: 1px solid #ccc;
  }
  
  .edit-button,
  .upload-profile-pic-btn,
  .add-account-btn,
  .remove-account-btn,
  .save-btn-large,
  .cancel-btn-large {
    display: none;
  }
}
</style>