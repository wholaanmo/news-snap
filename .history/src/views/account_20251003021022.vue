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
                  <p class="verification-note">Upload a government ID to be verified.</p>
                </div>
                <div v-else class="id-display">
                  <div v-if="user.idPhotoUrl" class="uploaded-id">
                    <img :src="user.idPhotoUrl" alt="Government ID" class="id-image" />
                  </div>
                  <p v-else class="info-value">No ID uploaded</p>
                  <p class="verification-note">Upload a government ID to be verified.</p>
                </div>
              </div>

              <!-- Profile Picture Validation Message -->
              <div v-if="!user.hasProfilePicture" class="validation-message">
                <span class="material-icons">info</span>
                You must upload a profile picture before you can post on the website.
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
            <!-- My Skill Offers Section -->
            <div v-if="activeTab === 'offers'" class="posts-list">
              <div v-for="offer in user.skillOffers" :key="offer.id" class="post-item">
                <div class="post-header">
                  <h4 class="post-title">{{ offer.skills }}</h4>
                  <span class="post-time">{{ offer.timePosted }}</span>
                </div>
                <p class="post-description">{{ offer.description }}</p>
                <div class="post-details-grid">
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
                  <button class="btn edit-btn" @click="editOffer(offer)">
                    <span class="material-icons">edit</span>
                    Edit
                  </button>
                  <button class="btn delete-btn" @click="deleteOffer(offer.id)">
                    <span class="material-icons">delete</span>
                    Delete
                  </button>
                </div>
              </div>
              <div v-if="user.skillOffers.length === 0" class="no-posts">
                No skill offers posted yet.
              </div>
            </div>

            <!-- My Skill Requests Section -->
            <div v-if="activeTab === 'requests'" class="posts-list">
              <div v-for="request in user.skillRequests" :key="request.id" class="post-item">
                <div class="post-header">
                  <h4 class="post-title">{{ request.request }}</h4>
                  <span class="post-time">{{ request.timePosted }}</span>
                </div>
                <p class="post-description">{{ request.description }}</p>
                <div class="post-details-grid">
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
                  <button class="btn edit-btn" @click="editRequest(request)">
                    <span class="material-icons">edit</span>
                    Edit
                  </button>
                  <button class="btn delete-btn" @click="deleteRequest(request.id)">
                    <span class="material-icons">delete</span>
                    Delete
                  </button>
                </div>
              </div>
              <div v-if="user.skillRequests.length === 0" class="no-posts">
                No skill requests posted yet.
              </div>
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
  idPhotoUrl: '',
  hasProfilePicture: false, // Added for profile picture validation
  skillOffers: [
    {
      id: 1,
      skills: 'Web Development & UI/UX Design',
      description: 'Experienced full-stack developer offering website development and design services. Specialized in React, Vue.js, and modern UI/UX principles.',
      category: 'Technology',
      location: 'Remote',
      skillsRequested: 'Digital marketing, Content writing',
      schedule: 'Weekdays, 9 AM - 6 PM',
      additionalNotes: 'Portfolio available upon request. Can work with tight deadlines.',
      proof: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop',
      timePosted: '2 days ago'
    }
  ],
  skillRequests: [
    {
      id: 1,
      request: 'Need help with mobile app design',
      description: 'Looking for a designer to help create a mobile app interface for my startup.',
      category: 'Design',
      location: 'Remote',
      skillsOffered: 'Backend development',
      schedule: 'Within 3 weeks',
      additionalNotes: 'Experience with Figma preferred.',
      proof: null,
      timePosted: '1 day ago'
    }
  ]
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
    user.value.hasProfilePicture = true // Set profile picture validation to true
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

// Post management functions
const editOffer = (offer) => {
  console.log('Editing offer:', offer)
  // Implement edit functionality
}

const deleteOffer = (offerId) => {
  user.value.skillOffers = user.value.skillOffers.filter(offer => offer.id !== offerId)
}

const editRequest = (request) => {
  console.log('Editing request:', request)
  // Implement edit functionality
}

const deleteRequest = (requestId) => {
  user.value.skillRequests = user.value.skillRequests.filter(request => request.id !== requestId)
}
</script>

<style scoped>
/* Add these new styles for the updated features */

.verification-note {
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.5rem;
  font-style: italic;
}

.validation-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 6px;
  color: #856404;
  font-size: 0.85rem;
  margin: 1rem 0;
}

.validation-message .material-icons {
  font-size: 1rem;
  color: #f39c12;
}

/* Post item styles */
.post-item {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid #e9ecef;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.post-title {
  color: var(--primary);
  margin: 0;
  font-size: 1.1rem;
  flex: 1;
}

.post-time {
  color: var(--grey);
  font-size: 0.85rem;
}

.post-description {
  color: #555;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.post-details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-weight: 600;
  color: var(--primary);
  font-size: 0.85rem;
}

.detail-value {
  color: #555;
  font-size: 0.9rem;
}

.additional-notes {
  margin: 1rem 0;
}

.proof-image {
  margin: 1rem 0;
}

.proof-thumbnail {
  width: 100%;
  max-width: 200px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.post-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.edit-btn {
  background: #3498db;
  color: white;
}

.edit-btn:hover {
  background: #2980b9;
}

.delete-btn {
  background: #e74c3c;
  color: white;
}

.delete-btn:hover {
  background: #c0392b;
}

.no-posts {
  text-align: center;
  color: var(--grey);
  font-style: italic;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px dashed #ddd;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .post-details-grid {
    grid-template-columns: 1fr;
  }
  
  .post-header {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .post-actions {
    flex-direction: column;
  }
  
  .btn {
    justify-content: center;
  }
}
</style>