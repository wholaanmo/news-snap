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

    <!-- Edit Skill Offer Modal -->
    <div v-if="showEditOfferModal" class="modal-overlay" @click="showEditOfferModal = false">
      <div class="modal-content" @click.stop>
        <h2>Edit Skill Offer</h2>
        
        <form @submit.prevent="saveOfferEdit" class="offer-form">
          <div class="form-group">
            <label for="edit-skills">Skills *</label>
            <input 
              type="text" 
              id="edit-skills" 
              v-model="editingOffer.skills" 
              required 
              placeholder="What skills are you offering?"
            >
          </div>
          
          <div class="form-group">
            <label for="edit-description">Description *</label>
            <textarea 
              id="edit-description" 
              v-model="editingOffer.description" 
              required 
              rows="3"
              placeholder="Describe what you can offer in detail..."
            ></textarea>
          </div>
          
          <div class="form-group">
            <label for="edit-category">Category *</label>
            <select id="edit-category" v-model="editingOffer.category" required>
              <option value="" disabled>Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Design">Design</option>
              <option value="Writing">Writing</option>
              <option value="Marketing">Marketing</option>
              <option value="Education">Education</option>
              <option value="Home Services">Home Services</option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="edit-location">Location *</label>
            <input 
              type="text" 
              id="edit-location" 
              v-model="editingOffer.location" 
              required 
              placeholder="Where can you provide this service?"
            >
          </div>
          
          <div class="form-group">
            <label for="edit-skills-requested">Skills Requested</label>
            <input 
              type="text" 
              id="edit-skills-requested" 
              v-model="editingOffer.skillsRequested" 
              placeholder="What skills are you looking for in return?"
            >
          </div>
          
          <div class="form-group">
            <label for="edit-schedule">Schedule *</label>
            <input 
              type="text" 
              id="edit-schedule" 
              v-model="editingOffer.schedule" 
              required 
              placeholder="When are you available?"
            >
          </div>
          
          <div class="form-group">
            <label for="edit-additional-notes">Additional Notes</label>
            <textarea 
              id="edit-additional-notes" 
              v-model="editingOffer.additionalNotes" 
              rows="2"
              placeholder="Any other important information..."
            ></textarea>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn cancel-btn" @click="showEditOfferModal = false">Cancel</button>
            <button type="submit" class="btn submit-btn">Save Changes</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Skill Request Modal -->
    <div v-if="showEditRequestModal" class="modal-overlay" @click="showEditRequestModal = false">
      <div class="modal-content" @click.stop>
        <h2>Edit Skill Request</h2>
        
        <form @submit.prevent="saveRequestEdit" class="request-form">
          <div class="form-group">
            <label for="edit-request">Request *</label>
            <input 
              type="text" 
              id="edit-request" 
              v-model="editingRequest.request" 
              required 
              placeholder="What skill are you looking for?"
            >
          </div>
          
          <div class="form-group">
            <label for="edit-req-description">Description *</label>
            <textarea 
              id="edit-req-description" 
              v-model="editingRequest.description" 
              required 
              rows="3"
              placeholder="Describe what you need in detail..."
            ></textarea>
          </div>
          
          <div class="form-group">
            <label for="edit-req-category">Category *</label>
            <select id="edit-req-category" v-model="editingRequest.category" required>
              <option value="" disabled>Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Design">Design</option>
              <option value="Writing">Writing</option>
              <option value="Marketing">Marketing</option>
              <option value="Education">Education</option>
              <option value="Home Services">Home Services</option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="edit-req-location">Location *</label>
            <input 
              type="text" 
              id="edit-req-location" 
              v-model="editingRequest.location" 
              required 
              placeholder="Where do you need this service?"
            >
          </div>
          
          <div class="form-group">
            <label for="edit-skills-offered">Skills Offered</label>
            <input 
              type="text" 
              id="edit-skills-offered" 
              v-model="editingRequest.skillsOffered" 
              placeholder="What skills can you offer in return?"
            >
          </div>
          
          <div class="form-group">
            <label for="edit-req-schedule">Schedule *</label>
            <input 
              type="text" 
              id="edit-req-schedule" 
              v-model="editingRequest.schedule" 
              required 
              placeholder="When do you need this done?"
            >
          </div>
          
          <div class="form-group">
            <label for="edit-req-additional-notes">Additional Notes</label>
            <textarea 
              id="edit-req-additional-notes" 
              v-model="editingRequest.additionalNotes" 
              rows="2"
              placeholder="Any other important information..."
            ></textarea>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn cancel-btn" @click="showEditRequestModal = false">Cancel</button>
            <button type="submit" class="btn submit-btn">Save Changes</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Confirmation Dialog -->
    <div v-if="showDeleteConfirmation" class="modal-overlay" @click="showDeleteConfirmation = false">
      <div class="modal-content" @click.stop>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this post? This action cannot be undone.</p>
        <div class="form-actions">
          <button type="button" class="btn cancel-btn" @click="showDeleteConfirmation = false">Cancel</button>
          <button type="button" class="btn delete-btn" @click="confirmDelete">Delete</button>
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

// Add to your existing reactive data
const showDeleteConfirmation = ref(false)
const postToDelete = ref(null)
const deleteType = ref('') // 'offer' or 'request'

// Add to your existing reactive data
const showEditOfferModal = ref(false)
const showEditRequestModal = ref(false)
const editingOffer = ref({})
const editingRequest = ref({})

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

// Update your existing delete functions
const deleteOffer = (offerId) => {
  postToDelete.value = offerId
  deleteType.value = 'offer'
  showDeleteConfirmation.value = true
}

const deleteRequest = (requestId) => {
  postToDelete.value = requestId
  deleteType.value = 'request'
  showDeleteConfirmation.value = true
}

// Add new confirmation function
const confirmDelete = () => {
  if (deleteType.value === 'offer' && postToDelete.value) {
    user.value.skillOffers = user.value.skillOffers.filter(offer => offer.id !== postToDelete.value)
  } else if (deleteType.value === 'request' && postToDelete.value) {
    user.value.skillRequests = user.value.skillRequests.filter(request => request.id !== postToDelete.value)
  }
  
  showDeleteConfirmation.value = false
  postToDelete.value = null
  deleteType.value = ''
}

// Update your existing edit functions
const editOffer = (offer) => {
  editingOffer.value = { ...offer }
  showEditOfferModal.value = true
}

const editRequest = (request) => {
  editingRequest.value = { ...request }
  showEditRequestModal.value = true
}

// Add new save functions
const saveOfferEdit = () => {
  const index = user.value.skillOffers.findIndex(offer => offer.id === editingOffer.value.id)
  if (index !== -1) {
    user.value.skillOffers[index] = { ...editingOffer.value }
  }
  showEditOfferModal.value = false
}

const saveRequestEdit = () => {
  const index = user.value.skillRequests.findIndex(request => request.id === editingRequest.value.id)
  if (index !== -1) {
    user.value.skillRequests[index] = { ...editingRequest.value }
  }
  showEditRequestModal.value = false
}
</script>

<style scoped>
.account-page {
  padding: 2rem;
  margin-top: 0.5rem;
  margin-left: 0;
  width: 100%;
  box-sizing: border-box;
}

.account-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
  max-width: 1200px;
  margin: 0 auto;
}

/* Add to your existing styles */
.post-title,
.post-description,
.post-details-grid,
.additional-notes {
  text-align: left;
}

.detail-item {
  text-align: left;
}

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
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

/* Profile Header */
.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--grey);
  width: 100%;
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
  gap: 1.5rem;
  align-items: flex-start;
  width: 100%;
}

.profile-picture-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
  min-width: 120px;
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

.file-input-hidden {
  display: none;
}

.user-name {
  font-size: 1.1rem;
  color: var(--dark);
  margin: 0;
  text-align: center;
  word-break: break-word;
  max-width: 120px;
}

.full-name-edit {
  width: 100%;
  max-width: 120px;
}

.profile-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-width: 0; /* Prevents flex item from overflowing */
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
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  width: 100%;
}

.info-value {
  color: var(--dark);
  font-size: 0.95rem;
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
  font-size: 0.95rem;
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
  padding: 0.75rem;
  background: var(--light);
  border: 2px dashed var(--grey);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.85rem;
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
  font-size: 0.8rem;
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
  width: 40px;
  height: 40px;
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
  font-size: 1rem;
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
  width: 150px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
  border: 2px solid var(--grey);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 100%;
}

.id-verified {
  color: #10b981;
  font-size: 0.8rem;
  font-weight: 600;
  margin: 0;
}

/* Edit Actions */
.edit-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--grey);
  width: 100%;
  flex-wrap: wrap;
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
  flex: 1;
  min-width: 140px;
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
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
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
  font-size: 0.85rem;
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
  font-size: 0.85rem;
  outline: none;
  transition: border-color 0.3s ease;
  min-width: 200px;
  box-sizing: border-box;
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
  font-size: 1rem;
}

.error-message {
  color: #dc3545;
  font-size: 0.75rem;
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
  font-size: 0.85rem;
  width: 100%;
  box-sizing: border-box;
  flex-wrap: wrap;
}

.account-icon {
  font-size: 0.9rem;
  color: var(--primary);
  flex-shrink: 0;
}

.account-name {
  font-weight: 600;
  color: var(--dark);
  min-width: 70px;
  flex-shrink: 0;
}

.account-url {
  flex: 1;
  color: var(--grey);
  font-size: 0.75rem;
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
  font-size: 0.8rem;
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
  padding: 0.75rem;
  font-size: 0.85rem;
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
  font-size: 0.85rem;
  box-sizing: border-box;
}

.tab-btn.active {
  background: var(--primary);
  color: var(--light);
}

.posts-content {
  min-height: 150px;
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
  font-size: 0.9rem;
  width: 100%;
  box-sizing: border-box;
}

/* Responsive Design */
@media (max-width: 768px) {
  .account-page {
    padding: 1rem;
    margin-top: 1.5rem;
  }
  
  .account-layout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0;
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
    min-width: auto;
  }
  
  .edit-actions {
    flex-direction: column;
  }
  
  .save-btn-large, .cancel-btn-large {
    min-width: auto;
    width: 100%;
  }
  
  .posts-tabs {
    flex-direction: column;
  }
  
  .profile-card,
  .posts-card {
    padding: 1rem;
  }
  
  .linked-accounts-header {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
  
  .account-options {
    width: 100%;
    justify-content: flex-end;
  }
  
  .account-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  .account-url {
    width: 100%;
    order: 3;
  }
}

@media (max-width: 480px) {
  .account-page {
    padding: 0.5rem;
    margin-top: 1rem;
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
  
  .account-item {
    flex-wrap: wrap;
  }
  
  .account-url {
    min-width: 100%;
    order: 3;
  }
  
  .profile-content {
    gap: 1rem;
  }
  
  .profile-info {
    gap: 1rem;
  }
}
</style>