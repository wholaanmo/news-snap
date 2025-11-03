<template>
  <div class="skill-request-platform">
    <!-- Search Bar -->
    <div class="search-container">
      <div class="search-bar">
        <span class="material-icons">search</span>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search for skills, categories, or locations..."
        >
      </div>
    </div>

    <!-- Header with Request Skill Button -->
    <div class="header-container">
      <h1 class="requests-header">Requests</h1>
      <button class="request-skill-btn" @click="showForm = true">
        <span class="material-icons">add</span>
        Request Skill
      </button>
    </div>

    <!-- Posts Container -->
    <div class="posts-container">
      <div 
        v-for="post in filteredPosts" 
        :key="post.id" 
        class="post-card"
      >
        <!-- User Info -->
        <div class="user-info">
          <img :src="post.userPicture" :alt="post.userName" class="user-picture">
          <div class="user-details">
            <h3 class="user-name">{{ post.userName }}</h3>
            <span class="post-time">{{ post.timePosted }}</span>
          </div>
        </div>

        <!-- Post Content -->
        <div class="post-content">
          <h2 class="request-title">{{ post.request }}</h2>
          <p class="description">{{ post.description }}</p>
          
          <div class="details-grid">
            <div class="detail-item">
              <span class="detail-label">Category:</span>
              <span class="detail-value">{{ post.category }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Location:</span>
              <span class="detail-value">{{ post.location }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Skills Offered:</span>
              <span class="detail-value">{{ post.skillsOffered }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Schedule:</span>
              <span class="detail-value">{{ post.schedule }}</span>
            </div>
          </div>
          
          <div class="additional-notes" v-if="post.additionalNotes">
            <span class="detail-label">Additional Notes:</span>
            <p class="detail-value">{{ post.additionalNotes }}</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button class="btn report-btn" @click="openReportModal(post)">
            <span class="material-icons">flag</span>
            Report
          </button>
          <button class="btn contact-btn">
            <span class="material-icons">message</span>
            Contact
          </button>
          <button class="btn profile-btn" @click="openProfileModal(post)">
            <span class="material-icons">account_circle</span>
            View Profile
          </button>
        </div>
      </div>
    </div>

    <!-- Request Skill Form Modal -->
    <div v-if="showForm" class="modal-overlay" @click="showForm = false">
      <div class="modal-content" @click.stop>
        <h2>Request a Skill</h2>
        
        <form @submit.prevent="submitForm" class="request-form">
          <div class="form-group">
            <label for="request">Request *</label>
            <input 
              type="text" 
              id="request" 
              v-model="formData.request" 
              required 
              placeholder="What skill are you looking for?"
            >
          </div>
          
          <div class="form-group">
            <label for="description">Description *</label>
            <textarea 
              id="description" 
              v-model="formData.description" 
              required 
              rows="3"
              placeholder="Describe what you need in detail..."
            ></textarea>
          </div>
          
          <div class="form-group">
            <label for="category">Category *</label>
            <select id="category" v-model="formData.category" required>
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
            <label for="location">Location *</label>
            <input 
              type="text" 
              id="location" 
              v-model="formData.location" 
              required 
              placeholder="Where do you need this service?"
            >
          </div>
          
          <div class="form-group">
            <label for="skills-offered">Skills Offered</label>
            <input 
              type="text" 
              id="skills-offered" 
              v-model="formData.skillsOffered" 
              placeholder="What skills can you offer in return?"
            >
          </div>
          
          <div class="form-group">
            <label for="schedule">Schedule *</label>
            <input 
              type="text" 
              id="schedule" 
              v-model="formData.schedule" 
              required 
              placeholder="When do you need this done?"
            >
          </div>
          
          <div class="form-group">
            <label for="additional-notes">Additional Notes</label>
            <textarea 
              id="additional-notes" 
              v-model="formData.additionalNotes" 
              rows="2"
              placeholder="Any other important information..."
            ></textarea>
          </div>
          
          <div class="form-group">
            <label for="proof">Proof (Optional)</label>
            <div class="file-upload">
              <input 
                type="file" 
                id="proof" 
                @change="handleFileUpload"
                accept="image/*"
              >
              <label for="proof" class="file-upload-label">
                <span class="material-icons">cloud_upload</span>
                Upload Image
              </label>
              <span v-if="formData.proof" class="file-name">{{ formData.proof.name }}</span>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn cancel-btn" @click="cancelForm">Cancel</button>
            <button type="submit" class="btn submit-btn">Submit Request</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Report Modal -->
    <div v-if="showReportModal" class="modal-overlay" @click="closeReportModal">
      <div class="modal-content report-modal" @click.stop>
        <h2>Reason for reporting {{ reportUser }}</h2>
        
        <form @submit.prevent="submitReport" class="report-form">
          <div class="report-reasons">
            <label 
              v-for="reason in reportReasons" 
              :key="reason.value" 
              class="reason-option"
            >
              <input 
                type="radio" 
                :value="reason.value" 
                v-model="reportData.reason"
                class="reason-radio"
              >
              <span class="reason-label">{{ reason.label }}</span>
            </label>
          </div>
          
          <div class="form-group" v-if="reportData.reason === 'other'">
            <label for="other-description">Please describe the reason:</label>
            <textarea 
              id="other-description" 
              v-model="reportData.description" 
              rows="3"
              placeholder="Please provide details about your report..."
              required
            ></textarea>
          </div>
          
          <div class="form-actions1">
            <button type="button" class="btn cancel-btn1" @click="closeReportModal">Cancel</button>
            <button type="submit" class="btn submit-btn1" :disabled="!reportData.reason || (reportData.reason === 'other' && !reportData.description)">
              Confirm Report
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Profile Modal -->
    <div v-if="showProfileModal" class="modal-overlay" @click="closeProfileModal">
      <div class="modal-content profile-modal" @click.stop>
        <div class="profile-popup-header">
          <h3>User Profile: {{ currentProfile.fullName }}</h3>
          <button class="close-btn" @click="closeProfileModal">
            <span class="material-icons">close</span>
          </button>
        </div>
        
        <div class="profile-popup-content">
          <!-- Basic Information -->
          <div class="profile-section">
            <h4>Basic Information</h4>
            <div class="profile-details">
              <div class="detail-item">
                <label>Full Name:</label>
                <span class="detail-value">{{ currentProfile.fullName }}</span>
              </div>
              <div class="detail-item">
                <label>Email Address:</label>
                <span class="detail-value">{{ currentProfile.email }}</span>
              </div>
              <div class="detail-item">
                <label>Phone Number:</label>
                <span class="detail-value">{{ currentProfile.phone }}</span>
              </div>
              <div class="detail-item">
                <label>Government ID:</label>
                <span class="detail-value">{{ currentProfile.isVerified ? 'Verified' : 'Not Verified' }}</span>
              </div>
              <div class="detail-item">
                <label>Linked Accounts:</label>
                <div class="linked-accounts">
                  <span v-for="account in currentProfile.linkedAccounts" :key="account.platform" class="account-tag">
                    {{ account.platform }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Skill Offer Posts -->
          <div class="profile-section">
            <h4>Skill Offer Posts</h4>
            <div class="posts-container">
              <div v-for="offer in currentProfile.skillOffers" :key="offer.id" class="post-card">
                <div class="post-header">
                  <span class="post-time">{{ offer.timePosted }}</span>
                </div>
                <div class="post-content">
                  <div class="detail-item">
                    <label>Skills:</label>
                    <div class="skills-tags">
                      <span v-for="skill in offer.skills.split(' & ')" :key="skill" class="skill-tag">
                        {{ skill }}
                      </span>
                    </div>
                  </div>
                  <div class="detail-item">
                    <label>Description:</label>
                    <span class="detail-value">{{ offer.description }}</span>
                  </div>
                  <div class="detail-row">
                    <div class="detail-item">
                      <label>Category:</label>
                      <span class="detail-value">{{ offer.category }}</span>
                    </div>
                    <div class="detail-item">
                      <label>Location:</label>
                      <span class="detail-value">{{ offer.location }}</span>
                    </div>
                  </div>
                  <div class="detail-item">
                    <label>Skills Requested:</label>
                    <span class="detail-value">{{ offer.skillsRequested }}</span>
                  </div>
                  <div class="detail-item">
                    <label>Schedule:</label>
                    <span class="detail-value">{{ offer.schedule }}</span>
                  </div>
                  <div class="detail-item">
                    <label>Additional Notes:</label>
                    <span class="detail-value">{{ offer.additionalNotes }}</span>
                  </div>
                  <div class="detail-item" v-if="offer.proof">
                    <label>Proof:</label>
                    <img :src="offer.proof" alt="Proof" class="proof-image" @error="handleImageError">
                  </div>
                </div>
                <div class="post-actions">
                  <button class="btn1 report-btn" @click="openReportModalFromProfile(offer, currentProfile.fullName)">
                    <span class="material-icons">flag</span>
                    Report
                  </button>
                  <button class="btn1 contact-btn">
                    <span class="material-icons">message</span>
                    Contact
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Skill Request Posts -->
          <div class="profile-section">
            <h4>Skill Request Posts</h4>
            <div class="posts-container">
              <div v-for="request in currentProfile.skillRequests" :key="request.id" class="post-card">
                <div class="post-header">
                  <span class="post-time">{{ request.timePosted }}</span>
                </div>
                <div class="post-content">
                  <div class="detail-item">
                    <label>Request:</label>
                    <span class="detail-value">{{ request.request }}</span>
                  </div>
                  <div class="detail-item">
                    <label>Description:</label>
                    <span class="detail-value">{{ request.description }}</span>
                  </div>
                  <div class="detail-row">
                    <div class="detail-item">
                      <label>Category:</label>
                      <span class="detail-value">{{ request.category }}</span>
                    </div>
                    <div class="detail-item">
                      <label>Location:</label>
                      <span class="detail-value">{{ request.location }}</span>
                    </div>
                  </div>
                  <div class="detail-item">
                    <label>Skills Offered:</label>
                    <span class="detail-value">{{ request.skillsOffered }}</span>
                  </div>
                  <div class="detail-item">
                    <label>Schedule:</label>
                    <span class="detail-value">{{ request.schedule }}</span>
                  </div>
                  <div class="detail-item">
                    <label>Additional Notes:</label>
                    <span class="detail-value">{{ request.additionalNotes }}</span>
                  </div>
                  <div class="detail-item" v-if="request.proof">
                    <label>Proof:</label>
                    <img :src="request.proof" alt="Proof" class="proof-image" @error="handleImageError">
                  </div>
                </div>
                <div class="post-actions">
                  <button class="btn1 report-btn" @click="openReportModalFromProfile(request, currentProfile.fullName)">
                    <span class="material-icons">flag</span>
                    Report
                  </button>
                  <button class="btn1 contact-btn">
                    <span class="material-icons">message</span>
                    Contact
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

// Search functionality
const searchQuery = ref('')

// Modal state
const showForm = ref(false)
const showReportModal = ref(false)
const showProfileModal = ref(false)

// Form data
const formData = reactive({
  request: '',
  description: '',
  category: '',
  location: '',
  skillsOffered: '',
  schedule: '',
  additionalNotes: '',
  proof: null
})

// Report data
const reportData = reactive({
  reason: '',
  description: ''
})

const reportUser = ref('')
const currentReportPost = ref(null)
const currentProfile = ref({})

// Report reasons
const reportReasons = [
  { value: 'fraud', label: 'Fraud/Dishonesty' },
  { value: 'harassment', label: 'Harassment/Abuse' },
  { value: 'safety', label: 'Safety Concerns' },
  { value: 'spam', label: 'Spam/Misuse' },
  { value: 'other', label: 'Other' }
]

// Sample user profiles data
const userProfiles = {
  'Alex Johnson': {
    fullName: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    isVerified: true,
    userPicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    linkedAccounts: [
      { platform: 'Facebook', icon: 'thumb_up', url: 'https://facebook.com/alex.johnson' },
      { platform: 'Instagram', icon: 'camera_alt', url: 'https://instagram.com/alex.johnson' },
      { platform: 'LinkedIn', icon: 'work', url: 'https://linkedin.com/in/alex-johnson' }
    ],
    skillOffers: [
      {
        id: 101,
        skills: 'Web Development & UI/UX Design',
        description: 'Experienced full-stack developer offering website development and design services.',
        category: 'Technology',
        location: 'Remote',
        skillsRequested: 'Digital marketing, Content writing',
        schedule: 'Weekdays, 9 AM - 6 PM',
        additionalNotes: 'Portfolio available upon request.',
        timePosted: '1 day ago',
        proof: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop'
      }
    ],
    skillRequests: [
      {
        id: 201,
        request: 'Need help with mobile app design',
        description: 'Looking for a designer to help create a mobile app interface for my startup.',
        category: 'Design',
        location: 'Remote',
        skillsOffered: 'Backend development',
        schedule: 'Within 3 weeks',
        additionalNotes: 'Experience with Figma preferred.',
        timePosted: '2 days ago',
        proof: null
      }
    ]
  },
  'Maria Garcia': {
    fullName: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    phone: '+1 (555) 234-5678',
    isVerified: false,
    userPicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    linkedAccounts: [
      { platform: 'Facebook', icon: 'thumb_up', url: 'https://facebook.com/maria.garcia' },
      { platform: 'Instagram', icon: 'camera_alt', url: 'https://instagram.com/maria.garcia' }
    ],
    skillOffers: [
      {
        id: 102,
        skills: 'Spanish & French Tutoring',
        description: 'Native Spanish speaker with fluent French offering language tutoring for all levels.',
        category: 'Education',
        location: 'New York, NY',
        skillsRequested: 'English proofreading',
        schedule: 'Weekends preferred',
        additionalNotes: 'Materials provided.',
        timePosted: '3 days ago',
        proof: null
      }
    ],
    skillRequests: []
  },
  'James Wilson': {
    fullName: 'James Wilson',
    email: 'james.wilson@email.com',
    phone: '+1 (555) 345-6789',
    isVerified: true,
    userPicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    linkedAccounts: [
      { platform: 'LinkedIn', icon: 'work', url: 'https://linkedin.com/in/james-wilson' }
    ],
    skillOffers: [],
    skillRequests: [
      {
        id: 202,
        request: 'Looking for photography lessons',
        description: 'Want to learn basic photography techniques and camera operation.',
        category: 'Education',
        location: 'Chicago, IL',
        skillsOffered: 'Video editing',
        schedule: 'Weekends',
        additionalNotes: 'Beginner level.',
        timePosted: '1 week ago',
        proof: null
      }
    ]
  },
  'Sarah Chen': {
    fullName: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    phone: '+1 (555) 456-7890',
    isVerified: true,
    userPicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    linkedAccounts: [
      { platform: 'Facebook', icon: 'thumb_up', url: 'https://facebook.com/sarah.chen' },
      { platform: 'Instagram', icon: 'camera_alt', url: 'https://instagram.com/sarah.chen' },
      { platform: 'LinkedIn', icon: 'work', url: 'https://linkedin.com/in/sarah-chen' }
    ],
    skillOffers: [
      {
        id: 103,
        skills: 'Graphic Design & Brand Identity',
        description: 'Creative graphic designer offering logo design and brand identity packages.',
        category: 'Design',
        location: 'Los Angeles, CA',
        skillsRequested: 'Web development',
        schedule: 'Flexible, project-based',
        additionalNotes: 'Multiple revisions included.',
        timePosted: '2 days ago',
        proof: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop'
      }
    ],
    skillRequests: []
  }
}

// Sample posts data
const posts = ref([
  {
    id: 1,
    userName: 'Alex Johnson',
    userPicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    timePosted: '2 hours ago',
    request: 'Need help with website design',
    description: 'Looking for a designer to help create a modern, responsive website for my small business.',
    category: 'Design',
    location: 'Remote',
    skillsOffered: 'Social media marketing',
    schedule: 'Within 2 weeks',
    additionalNotes: 'Prefer someone with experience in e-commerce sites.'
  },
  {
    id: 2,
    userName: 'Maria Garcia',
    userPicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    timePosted: '5 hours ago',
    request: 'Looking for a Python tutor',
    description: 'Need help learning Python for data analysis. Beginner level.',
    category: 'Education',
    location: 'New York, NY',
    skillsOffered: 'Spanish tutoring',
    schedule: 'Weekends preferred',
    additionalNotes: 'Can meet at local libraries or cafes.'
  },
  {
    id: 3,
    userName: 'James Wilson',
    userPicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    timePosted: '1 day ago',
    request: 'Need content writer for blog',
    description: 'Looking for a writer to create engaging content for my tech blog.',
    category: 'Writing',
    location: 'Remote',
    skillsOffered: 'SEO optimization',
    schedule: '2-3 articles per week',
    additionalNotes: 'Tech background preferred but not required.'
  },
  {
    id: 4,
    userName: 'Sarah Chen',
    userPicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    timePosted: '2 days ago',
    request: 'Social media marketing help',
    description: 'Need assistance with creating and managing social media campaigns.',
    category: 'Marketing',
    location: 'Los Angeles, CA',
    skillsOffered: 'Graphic design',
    schedule: 'Flexible, ongoing',
    additionalNotes: 'Experience with Instagram and TikTok preferred.'
  }
])

// Filter posts based on search query
const filteredPosts = computed(() => {
  if (!searchQuery.value) return posts.value
  
  const query = searchQuery.value.toLowerCase()
  return posts.value.filter(post => 
    post.request.toLowerCase().includes(query) ||
    post.description.toLowerCase().includes(query) ||
    post.category.toLowerCase().includes(query) ||
    post.location.toLowerCase().includes(query) ||
    post.skillsOffered.toLowerCase().includes(query)
  )
})

// Handle file upload
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    formData.proof = file
  }
}

// Handle broken image links
const handleImageError = (event) => {
  event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNzI4QTlDIi8+CjxwYXRoIGQ9Ik03NSA0MEM4NS4zNzUgNDAgOTQgNDguNjI1IDk0IDU5Qzk0IDY5LjM3NSA4NS4zNzUgNzggNzUgNzhDNjQuNjI1IDc4IDU2IDY5LjM3NSA1NiA1OUM1NiA0OC42MjUgNjQuNjI1IDQwIDc1IDQwWk03NSAxMDBDODguMjUgMTAwIDEwMCAxMTEuNzUgMTAwIDEyNUg1MEM1MCAxMTEuNzUgNjEuNzUgMTAwIDc1IDEwMFoiIGZpbGw9IiNFRUVFRUUiLz4KPC9zdmc+'
}

// Open report modal
const openReportModal = (post) => {
  currentReportPost.value = post
  reportUser.value = post.userName
  showReportModal.value = true
}

// Close report modal
const closeReportModal = () => {
  showReportModal.value = false
  reportData.reason = ''
  reportData.description = ''
  currentReportPost.value = null
}

// Open profile modal
const openProfileModal = (post) => {
  currentProfile.value = userProfiles[post.userName] || {
    fullName: post.userName,
    email: 'Not provided',
    phone: 'Not provided',
    isVerified: false,
    userPicture: post.userPicture,
    linkedAccounts: [],
    skillOffers: [],
    skillRequests: []
  }
  showProfileModal.value = true
}

// Close profile modal
const closeProfileModal = () => {
  showProfileModal.value = false
  currentProfile.value = {}
}

// Open report modal from profile posts
const openReportModalFromProfile = (post, userName) => {
  currentReportPost.value = post
  reportUser.value = userName
  showReportModal.value = true
  showProfileModal.value = false
}

// Submit report
const submitReport = () => {
  console.log('Report submitted:', {
    post: currentReportPost.value,
    reason: reportData.reason,
    description: reportData.description
  })
  
  // In a real app, you would send this data to a backend
  alert(`Report submitted for ${reportUser.value}. Thank you for helping keep our community safe.`)
  
  closeReportModal()
}

// Submit form
const submitForm = () => {
  // In a real app, you would send this data to a backend
  console.log('Form submitted:', formData)
  
  // Add the new post to the posts array
  const newPost = {
    id: posts.value.length + 1,
    userName: 'Current User', // In a real app, this would come from user data
    userPicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    timePosted: 'Just now',
    request: formData.request,
    description: formData.description,
    category: formData.category,
    location: formData.location,
    skillsOffered: formData.skillsOffered,
    schedule: formData.schedule,
    additionalNotes: formData.additionalNotes
  }
  
  posts.value.unshift(newPost)
  
  // Reset form and close modal
  resetForm()
  showForm.value = false
}

// Cancel form
const cancelForm = () => {
  resetForm()
  showForm.value = false
}

// Reset form data
const resetForm = () => {
  formData.request = ''
  formData.description = ''
  formData.category = ''
  formData.location = ''
  formData.skillsOffered = ''
  formData.schedule = ''
  formData.additionalNotes = ''
  formData.proof = null
}
</script>

<style scoped>
.skill-request-platform {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Search Bar */
.search-container {
  margin-bottom: 30px;
}

.search-bar {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  padding: 10px 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.search-bar .material-icons {
  color: var(--grey);
  margin-right: 10px;
}

.search-bar input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  background: transparent;
}

/* Header */
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.requests-header {
  color: var(--primary);
  font-size: 28px;
  font-weight: 600;
}

.request-skill-btn {
  display: flex;
  align-items: center;
  background: var(--primary);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  transition: background 0.3s;
}

.request-skill-btn:hover {
  background: var(--dark);
}

.request-skill-btn .material-icons {
  margin-right: 8px;
}

/* Posts Container */
.posts-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 25px;
}

/* Post Card */
.post-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* User Info */
.user-info {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.user-picture {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
}

.user-details {
  flex: 1;
}

.user-name {
  margin: 0 0 5px 0;
  font-size: 18px;
  color: var(--primary);
}

.post-time {
  color: var(--grey);
  font-size: 14px;
}

/* Post Content */
.post-content {
  padding: 20px;
}

.request-title {
  margin: 0 0 15px 0;
  font-size: 22px;
  color: var(--primary);
}

.description {
  margin: 0 0 20px 0;
  color: #555;
  line-height: 1.5;
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
}

.detail-item {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 5px;
  font-size: 14px;
}

.detail-value {
  color: #555;
}

.additional-notes {
  margin-top: 15px;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  padding: 15px 20px;
  border-top: 1px solid #eee;
  gap: 10px;
}

.btn {
  display: flex;
  align-items: center;
  padding: 8px 15px;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s;
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

.profile-btn {
  color: #3498db;
  border: 1px solid #3498db;
}

.profile-btn:hover {
  background: #3498db;
  color: white;
}

.btn .material-icons {
  margin-right: 5px;
  font-size: 18px;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.modal-content h2 {
  margin: 0 0 25px 0;
  color: var(--primary);
  text-align: center;
}

/* Report Modal Specific Styles */
.report-modal {
  max-width: 500px;
}

.report-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.report-reasons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: -5px;
}

.reason-option {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.reason-option:hover {
  border-color: var(--primary);
  background-color: rgba(26, 37, 48, 0.02);
}

.reason-radio {
  margin-right: 12px;
}

.reason-label {
  font-weight: 500;
  color: var(--primary);
}

/* Profile Popup Styles */
.profile-popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--light);
}

.profile-popup-header h3 {
  color: var(--primary);
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: var(--grey);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.close-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.profile-popup-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.profile-section {
  border: 1px solid var(--light);
  border-radius: 12px;
  padding: 1.5rem;
}

.profile-section h4 {
  color: var(--primary);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--light);
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.linked-accounts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.account-tag {
  background-color: rgba(26, 37, 48, 0.08);
  color: var(--primary);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.posts-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.post-card {
  border: 1px solid var(--light);
  border-radius: 12px;
  padding: 1.5rem;
  background: #f8f9fa;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--light);
}

.post-time {
  color: var(--grey);
  font-size: 0.9rem;
}

.post-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.proof-image {
  max-width: 200px;
  max-height: 150px;
  border-radius: 8px;
  border: 1px solid var(--light);
}

.post-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

/* Skills Tags Styles */
.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.skill-tag {
  background-color: rgba(26, 37, 48, 0.08);
  color: var(--primary);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

/* Detail Row Styles */
.detail-row {
  display: flex;
  gap: 1.5rem;
}

.detail-row .detail-item {
  flex: 1;
}

/* Detail Item Styles */
.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-item label {
  font-weight: 600;
  color: var(--primary);
  font-size: 0.95rem;
}

.detail-value {
  color: var(--dark);
  font-size: 1rem;
  line-height: 1.5;
}

/* Button Styles */
.btn1 {
  display: flex;
  align-items: center;
  padding: 0.3rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  flex: 1;
  justify-content: center;
  min-width: 110px;
}

.btn1 .material-icons {
  font-size: 1.1rem;
  margin-right: 0.5rem;
}

.report-btn {
  color: #dc3545;
  border-color: #dc3545;
}

.report-btn:hover {
  background-color: #dc3545;
  color: white;
}

.contact-btn {
  color: var(--primary);
  border-color: var(--primary);
}

.contact-btn:hover {
  background-color: var(--primary);
  color: white;
}

/* Form */
.request-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--primary);
}

.form-group input,
.form-group textarea,
.form-group select {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: border 0.3s;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  border-color: var(--primary);
  outline: none;
}

.file-upload {
  display: flex;
  align-items: center;
  gap: 10px;
}

.file-upload input[type="file"] {
  display: none;
}

.file-upload-label {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background: #f5f5f5;
  border: 1px dashed #ccc;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.file-upload-label:hover {
  background: #eaeaea;
}

.file-upload-label .material-icons {
  margin-right: 8px;
  color: var(--grey);
}

.file-name {
  color: var(--grey);
  font-size: 14px;
}

/* Form Actions */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;
}

.cancel-btn {
  padding: 12px 25px;
  border: 1px solid var(--grey);
  color: var(--grey);
  border-radius: 6px;
}

.cancel-btn:hover {
  background: #f5f5f5;
}

.submit-btn {
  padding: 12px 25px;
  background: var(--primary);
  color: white;
  border-radius: 6px;
}

.submit-btn:hover:not(:disabled) {
  background: var(--dark);
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.form-actions1 {
  display: flex;
  justify-content: space-between; /* cancel left, submit right */
  gap: 1rem;
  margin-top: 10px;
  width: 100%; /* full width of modal */
  text-align: center;
}

.cancel-btn1,
.submit-btn1 {
  flex: 1; /* make both buttons expand evenly */
  display: flex; /* make button a flexbox */
  justify-content: center; /* center horizontally */
  align-items: center; /* center vertically */
  padding: 0.75rem 1.25rem; /* slightly bigger padding */
  text-align: center; /* fallback for multiline */
  font-size: 15px;
}


.cancel-btn1 {
  background: white;
  color: var(--grey);
  border: 1px solid var(--grey);
}

.cancel-btn1:hover {
  background-color: var(--grey);
  color: white;
}

.submit-btn1 {
  background: #dc3545;
  color: white;
  border: 1px solid #dc3545;
}

.submit-btn1:hover:not(:disabled) {
  background: #c82333;
  border-color: #c82333;
}

.submit-btn1:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 768px) {
  .posts-container {
    grid-template-columns: 1fr;
  }
  
  .header-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .details-grid {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .modal-content {
    padding: 20px;
  }
  
  .form-actions {
    flex-direction: column;
  }

  .profile-popup-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .post-details {
    grid-template-columns: 1fr;
  }

  .post-actions {
    flex-direction: column;
  }

  .detail-row {
    flex-direction: column;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .profile-section {
    padding: 1rem;
  }

  .post-card {
    padding: 1rem;
  }
}
</style>