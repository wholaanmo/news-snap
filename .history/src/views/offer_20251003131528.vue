<template>
  <div class="skill-offer-platform">
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

    <!-- Header with Offer Skill Button -->
    <div class="header-container">
      <h1 class="offers-header">Offers</h1>
      <button class="offer-skill-btn" @click="showForm = true">
        <span class="material-icons">add</span>
        Offer Skill
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
          <h2 class="skills-title">{{ post.skills }}</h2>
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
              <span class="detail-label">Skills Requested:</span>
              <span class="detail-value">{{ post.skillsRequested }}</span>
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

    <!-- Offer Skill Form Modal -->
    <div v-if="showForm" class="modal-overlay" @click="showForm = false">
      <div class="modal-content" @click.stop>
        <h2>Offer a Skill</h2>
        
        <form @submit.prevent="submitForm" class="offer-form">
          <div class="form-group">
            <label for="skills">Skills *</label>
            <input 
              type="text" 
              id="skills" 
              v-model="formData.skills" 
              required 
              placeholder="What skills are you offering?"
            >
          </div>
          
          <div class="form-group">
            <label for="description">Description *</label>
            <textarea 
              id="description" 
              v-model="formData.description" 
              required 
              rows="3"
              placeholder="Describe what you can offer in detail..."
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
              placeholder="Where can you provide this service?"
            >
          </div>
          
          <div class="form-group">
            <label for="skills-requested">Skills Requested</label>
            <input 
              type="text" 
              id="skills-requested" 
              v-model="formData.skillsRequested" 
              placeholder="What skills are you looking for in return?"
            >
          </div>
          
          <div class="form-group">
            <label for="schedule">Schedule *</label>
            <input 
              type="text" 
              id="schedule" 
              v-model="formData.schedule" 
              required 
              placeholder="When are you available?"
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
            <button type="submit" class="btn submit-btn">Submit Offer</button>
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
          
          <div class="form-actions">
            <button type="button" class="btn cancel-btn" @click="closeReportModal">Cancel</button>
            <button type="submit" class="btn submit-btn" :disabled="!reportData.reason || (reportData.reason === 'other' && !reportData.description)">
              Confirm Report
            </button>
          </div>
        </form>
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
  skills: '',
  description: '',
  category: '',
  location: '',
  skillsRequested: '',
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
  },
  'Michael Brown': {
    fullName: 'Michael Brown',
    email: 'michael.brown@email.com',
    phone: '+1 (555) 567-8901',
    isVerified: true,
    userPicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    linkedAccounts: [
      { platform: 'Facebook', icon: 'thumb_up', url: 'https://facebook.com/michael.brown' },
      { platform: 'LinkedIn', icon: 'work', url: 'https://linkedin.com/in/michael-brown' }
    ],
    skillOffers: [
      {
        id: 104,
        skills: 'Home Repair & Maintenance',
        description: 'Handyman services including plumbing, electrical work, furniture assembly, and general home repairs.',
        category: 'Home Services',
        location: 'Chicago, IL',
        skillsRequested: 'Gardening, Car maintenance',
        schedule: 'Weekends, Emergency services available',
        additionalNotes: 'Licensed and insured. Free estimates.',
        timePosted: '3 days ago',
        proof: null
      }
    ],
    skillRequests: []
  },
  'Emily Davis': {
    fullName: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '+1 (555) 678-9012',
    isVerified: false,
    userPicture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    linkedAccounts: [
      { platform: 'Instagram', icon: 'camera_alt', url: 'https://instagram.com/emily.davis' }
    ],
    skillOffers: [
      {
        id: 105,
        skills: 'Yoga Instruction & Wellness Coaching',
        description: 'Certified yoga instructor offering private sessions and wellness coaching.',
        category: 'Health & Wellness',
        location: 'Austin, TX',
        skillsRequested: 'Nutrition advice, Meditation guidance',
        schedule: 'Mornings and evenings',
        additionalNotes: 'Virtual sessions available. First session free.',
        timePosted: '4 days ago',
        proof: null
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
    skills: 'Web Development & UI/UX Design',
    description: 'Experienced full-stack developer offering website development and design services. Specialized in React, Vue.js, and modern UI/UX principles.',
    category: 'Technology',
    location: 'Remote',
    skillsRequested: 'Digital marketing, Content writing',
    schedule: 'Weekdays, 9 AM - 6 PM',
    additionalNotes: 'Portfolio available upon request. Can work with tight deadlines.'
  },
  {
    id: 2,
    userName: 'Maria Garcia',
    userPicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    timePosted: '5 hours ago',
    skills: 'Spanish & French Tutoring',
    description: 'Native Spanish speaker with fluent French offering language tutoring for all levels. Customized lessons based on your goals.',
    category: 'Education',
    location: 'New York, NY',
    skillsRequested: 'English proofreading, Computer skills',
    schedule: 'Weekends preferred, Flexible hours',
    additionalNotes: 'Experience teaching both children and adults. Materials provided.'
  },
  {
    id: 3,
    userName: 'James Wilson',
    userPicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    timePosted: '1 day ago',
    skills: 'Content Writing & SEO Optimization',
    description: 'Professional writer offering content creation services for blogs, websites, and marketing materials. SEO optimization included.',
    category: 'Writing',
    location: 'Remote',
    skillsRequested: 'Social media management, Graphic design',
    schedule: '2-3 articles per week',
    additionalNotes: 'Fast turnaround time. Samples available.'
  },
  {
    id: 4,
    userName: 'Sarah Chen',
    userPicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    timePosted: '2 days ago',
    skills: 'Graphic Design & Brand Identity',
    description: 'Creative graphic designer offering logo design, brand identity packages, and marketing materials. Modern and professional designs.',
    category: 'Design',
    location: 'Los Angeles, CA',
    skillsRequested: 'Web development, Photography',
    schedule: 'Flexible, project-based',
    additionalNotes: 'Can work within brand guidelines. Multiple revisions included.'
  },
  {
    id: 5,
    userName: 'Michael Brown',
    userPicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    timePosted: '3 days ago',
    skills: 'Home Repair & Maintenance',
    description: 'Handyman services including plumbing, electrical work, furniture assembly, and general home repairs. Quality work guaranteed.',
    category: 'Home Services',
    location: 'Chicago, IL',
    skillsRequested: 'Gardening, Car maintenance',
    schedule: 'Weekends, Emergency services available',
    additionalNotes: 'Licensed and insured. Free estimates.'
  },
  {
    id: 6,
    userName: 'Emily Davis',
    userPicture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    timePosted: '4 days ago',
    skills: 'Yoga Instruction & Wellness Coaching',
    description: 'Certified yoga instructor offering private sessions and wellness coaching. Suitable for all levels and ages.',
    category: 'Health & Wellness',
    location: 'Austin, TX',
    skillsRequested: 'Nutrition advice, Meditation guidance',
    schedule: 'Mornings and evenings',
    additionalNotes: 'Virtual sessions available. First session free.'
  }
])

// Filter posts based on search query
const filteredPosts = computed(() => {
  if (!searchQuery.value) return posts.value
  
  const query = searchQuery.value.toLowerCase()
  return posts.value.filter(post => 
    post.skills.toLowerCase().includes(query) ||
    post.description.toLowerCase().includes(query) ||
    post.category.toLowerCase().includes(query) ||
    post.location.toLowerCase().includes(query) ||
    post.skillsRequested.toLowerCase().includes(query)
  )
})

// Handle file upload
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    formData.proof = file
  }
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
    skills: formData.skills,
    description: formData.description,
    category: formData.category,
    location: formData.location,
    skillsRequested: formData.skillsRequested,
    schedule: formData.schedule,
    additionalNotes: formData.additionalNotes
  }
  
  posts.value.unshift(newPost)
  
  // Reset form and close modal
  resetForm()
  showForm.value = false
  
  // Show success message (in a real app)
  alert('Your skill offer has been posted successfully!')
}

// Cancel form
const cancelForm = () => {
  resetForm()
  showForm.value = false
}

// Reset form data
const resetForm = () => {
  formData.skills = ''
  formData.description = ''
  formData.category = ''
  formData.location = ''
  formData.skillsRequested = ''
  formData.schedule = ''
  formData.additionalNotes = ''
  formData.proof = null
}
</script>

<style scoped>
.skill-offer-platform {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* profile modal */
.profile-modal {
  max-width: 800px;
  max-height: 95vh;
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

.verified-badge .material-icons {
  font-size: 16px;
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

.account-icon {
  color: var(--primary);
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

.post-actions .btn {
  padding: 6px 12px;
  font-size: 0.875rem;
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
  border-radius: 6px;
}

.close-btn:hover {
  background: var(--dark);
}

/* Responsive Design for Profile Modal */
@media (max-width: 768px) {
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

.offers-header {
  color: var(--primary);
  font-size: 28px;
  font-weight: 600;
}

.offer-skill-btn {
  display: flex;
  align-items: center;
  background: var(--primary);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  transition: background 0.3s;
}

.offer-skill-btn:hover {
  background: var(--dark);
}

.offer-skill-btn .material-icons {
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

.skills-title {
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

/* Form */
.offer-form {
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

.cancel-btn {
  background: white;
  color: var(--grey);
  border: 1px solid var(--grey);
}

.cancel-btn:hover {
  background-color: var(--grey);
  color: white;
}

.submit-btn {
  background: #dc3545;
  color: white;
  border: 1px solid #dc3545;
}

.submit-btn:hover:not(:disabled) {
  background: #c82333;
  border-color: #c82333;
}

.submit-btn0.6;
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
}

@media (max-width: 480px) {
  .skill-offer-platform {
    padding: 15px;
  }
  
  .post-content {
    padding: 15px;
  }
  
  .user-info {
    padding: 15px;
  }
  
  .action-buttons {
    padding: 15px;
  }
}
</style>