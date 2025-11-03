<template>
  <div class="dashboard">
    <!-- Profile Popup -->
    <div v-if="showProfilePopup" class="profile-popup-overlay" @click="closeProfilePopup">
      <div class="profile-popup-container" @click.stop>
        <div class="profile-popup-content">
          <!-- Profile Header -->
          <div class="profile-header">
            <div class="profile-info">
              <h2 class="profile-name">
                {{ selectedProfile.fullName }}
                <span class="verified-icon">✓</span>
              </h2>
              <div class="contact-info">
                <div class="contact-item">
                  <span class="material-icons">email</span>
                  <span>{{ selectedProfile.email }}</span>
                </div>
                <div class="contact-item">
                  <span class="material-icons">phone</span>
                  <span>{{ selectedProfile.phone }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Linked Accounts -->
          <div class="linked-accounts">
            <h3>Linked Accounts</h3>
            <div class="accounts-list">
              <div class="account-item" v-for="account in selectedProfile.linkedAccounts" :key="account">
                <span class="material-icons">link</span>
                <span>{{ account }}</span>
              </div>
            </div>
          </div>

          <!-- Skill Offer Posts -->
          <div class="posts-section" v-if="selectedProfile.offerPosts && selectedProfile.offerPosts.length">
            <h3>Skill Offers</h3>
            <div class="post-cards">
              <div v-for="post in selectedProfile.offerPosts" :key="post.id" class="post-card">
                <div class="post-header">
                  <h4>{{ post.skills.join(', ') }}</h4>
                  <span class="post-time">{{ post.timePosted }}</span>
                </div>
                <div class="post-content">
                  <div class="post-detail">
                    <label>Description:</label>
                    <span>{{ post.description }}</span>
                  </div>
                  <div class="post-detail">
                    <label>Category:</label>
                    <span>{{ post.category }}</span>
                  </div>
                  <div class="post-detail">
                    <label>Location:</label>
                    <span>{{ post.location }}</span>
                  </div>
                  <div class="post-detail">
                    <label>Skills Requested:</label>
                    <div class="skills-tags">
                      <span v-for="skill in post.skillsRequested" :key="skill" class="skill-tag">
                        {{ skill }}
                      </span>
                    </div>
                  </div>
                  <div class="post-detail">
                    <label>Schedule:</label>
                    <span>{{ post.schedule }}</span>
                  </div>
                  <div class="post-detail">
                    <label>Additional Notes:</label>
                    <span>{{ post.additionalNotes }}</span>
                  </div>
                  <div class="post-detail" v-if="post.proof">
                    <label>Proof:</label>
                    <div class="proof-image">
                      <img :src="post.proof" alt="Proof" @error="handleImageError">
                    </div>
                  </div>
                </div>
                <div class="post-actions">
                  <button class="btn1 report-btn" @click="openReportPopup(selectedProfile.accountName)">
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
          <div class="posts-section" v-if="selectedProfile.requestPosts && selectedProfile.requestPosts.length">
            <h3>Skill Requests</h3>
            <div class="post-cards">
              <div v-for="post in selectedProfile.requestPosts" :key="post.id" class="post-card">
                <div class="post-header">
                  <h4>{{ post.request }}</h4>
                  <span class="post-time">{{ post.timePosted }}</span>
                </div>
                <div class="post-content">
                  <div class="post-detail">
                    <label>Description:</label>
                    <span>{{ post.description }}</span>
                  </div>
                  <div class="post-detail">
                    <label>Category:</label>
                    <span>{{ post.category }}</span>
                  </div>
                  <div class="post-detail">
                    <label>Location:</label>
                    <span>{{ post.location }}</span>
                  </div>
                  <div class="post-detail">
                    <label>Skills Offered:</label>
                    <div class="skills-tags">
                      <span v-for="skill in post.skillsOffered" :key="skill" class="skill-tag">
                        {{ skill }}
                      </span>
                    </div>
                  </div>
                  <div class="post-detail">
                    <label>Schedule:</label>
                    <span>{{ post.schedule }}</span>
                  </div>
                  <div class="post-detail">
                    <label>Additional Notes:</label>
                    <span>{{ post.additionalNotes }}</span>
                  </div>
                  <div class="post-detail" v-if="post.proof">
                    <label>Proof:</label>
                    <div class="proof-image">
                      <img :src="post.proof" alt="Proof" @error="handleImageError">
                    </div>
                  </div>
                </div>
                <div class="post-actions">
                  <button class="btn1 report-btn" @click="openReportPopup(selectedProfile.accountName)">
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
        
        <!-- Close Button -->
        <button class="close-btn" @click="closeProfilePopup">
          <span class="material-icons">close</span>
          Close
        </button>
      </div>
    </div>

    <!-- Report Popup -->
    <div v-if="showReportPopup" class="report-popup-overlay" @click="closeReportPopup">
      <div class="report-popup-container" @click.stop>
        <div class="report-popup-header">
          <h3>Reason for reporting {{ reportedUserName }}</h3>
        </div>
        <div class="report-popup-content">
          <div class="report-reasons">
            <label v-for="reason in reportReasons" :key="reason.value" class="reason-option">
              <input 
                type="radio" 
                :value="reason.value" 
                v-model="selectedReason"
                class="reason-radio"
              >
              <span class="reason-label">{{ reason.label }}</span>
            </label>
          </div>
          <div v-if="selectedReason === 'other'" class="description-box">
            <textarea 
              v-model="otherDescription" 
              placeholder="Please describe the reason for reporting..."
              class="description-textarea"
              rows="4"
            ></textarea>
          </div>
          <div class="report-actions">
            <button class="btn cancel-btn" @click="closeReportPopup">Cancel</button>
            <button class="btn submit-btn" @click="submitReport" :disabled="!selectedReason || (selectedReason === 'other' && !otherDescription.trim())">
              Submit Report
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Requests Section -->
    <section class="requests-section">
      <div class="section-header">
        <h2>Recent Requests</h2>
        <router-link to="/request" class="see-all-btn">
          See All
          <span class="material-icons">chevron_right</span>
        </router-link>
      </div>

      <div class="cards-container">
        <div 
          v-for="request in filteredRequests.slice(0, 3)" 
          :key="request.id" 
          class="request-card"
        >
          <!-- Card Header -->
          <div class="card-header">
            <span class="posted-time">{{ request.timePosted }}</span>
            <div class="user-info">
              <div class="profile-pic-container">
                <img 
                  :src="request.profilePic" 
                  :alt="request.accountName"
                  class="profile-pic"
                  @error="handleImageError"
                >
              </div>
              <span class="account-name">{{ request.accountName }}</span>
            </div>
          </div>

          <!-- Card Content -->
          <div class="card-content">
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
              <div class="skills-tags">
                <span 
                  v-for="skill in request.skillsOffered" 
                  :key="skill" 
                  class="skill-tag"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
            <div class="detail-item">
              <label>Schedule:</label>
              <span class="detail-value">{{ request.schedule }}</span>
            </div>
            <div class="detail-item">
              <label>Additional Notes:</label>
              <span class="detail-value">{{ request.additionalNotes }}</span>
            </div>
          </div>

          <!-- Card Actions -->
          <div class="card-actions">
            <button class="btn1 report-btn" @click="openReportPopup(request.accountName)">
              <span class="material-icons">flag</span>
              Report
            </button>
            <button class="btn1 contact-btn">
              <span class="material-icons">message</span>
              Contact
            </button>
            <button class="btn1 profile-btn" @click="openProfilePopup(request)">
              <span class="material-icons">account_circle</span>
              View Profile
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Offers Section -->
    <section class="offers-section">
      <div class="section-header">
        <h2>Recent Offers</h2>
        <router-link to="/offer" class="see-all-btn">
          See All
          <span class="material-icons">chevron_right</span>
        </router-link>
      </div>

      <div class="cards-container">
        <div 
          v-for="offer in filteredOffers.slice(0, 3)" 
          :key="offer.id" 
          class="offer-card"
        >
          <!-- Card Header -->
          <div class="card-header">
            <span class="posted-time">{{ offer.timePosted }}</span>
            <div class="user-info">
              <div class="profile-pic-container">
                <img 
                  :src="offer.profilePic" 
                  :alt="offer.accountName"
                  class="profile-pic"
                  @error="handleImageError"
                >
              </div>
              <span class="account-name">{{ offer.accountName }}</span>
            </div>
          </div>

          <!-- Card Content -->
          <div class="card-content">
            <div class="detail-item">
              <label>Skills:</label>
              <div class="skills-tags">
                <span 
                  v-for="skill in offer.skills" 
                  :key="skill" 
                  class="skill-tag"
                >
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
              <div class="skills-tags">
                <span 
                  v-for="skill in offer.skillsRequested" 
                  :key="skill" 
                  class="skill-tag"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
            <div class="detail-item">
              <label>Schedule:</label>
              <span class="detail-value">{{ offer.schedule }}</span>
            </div>
            <div class="detail-item">
              <label>Additional Notes:</label>
              <span class="detail-value">{{ offer.additionalNotes }}</span>
            </div>
          </div>

          <!-- Card Actions -->
          <div class="card-actions">
            <button class="btn1 report-btn" @click="openReportPopup(offer.accountName)">
              <span class="material-icons">flag</span>
              Report
            </button>
            <button class="btn1 contact-btn">
              <span class="material-icons">message</span>
              Contact
            </button>
            <button class="btn1 profile-btn" @click="openProfilePopup(offer)">
              <span class="material-icons">account_circle</span>
              View Profile
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

// Profile popup state
const showProfilePopup = ref(false)
const selectedProfile = ref({})

// Report popup state
const showReportPopup = ref(false)
const reportedUserName = ref('')
const selectedReason = ref('')
const otherDescription = ref('')

const reportReasons = [
  { value: 'fraud', label: 'Fraud/Dishonesty' },
  { value: 'harassment', label: 'Harassment/Abuse' },
  { value: 'safety', label: 'Safety Concerns' },
  { value: 'spam', label: 'Spam/Misuse' },
  { value: 'other', label: 'Other' }
]

// Profile popup methods
const openProfilePopup = (userData) => {
  // Map user data to profile format
  selectedProfile.value = {
    accountName: userData.accountName,
    fullName: userData.fullName || userData.accountName,
    email: userData.email || `${userData.accountName.toLowerCase()}@email.com`,
    phone: userData.phone || '+1 (555) 123-4567',
    linkedAccounts: ['Facebook', 'Instagram', 'LinkedIn'],
    offerPosts: offers.value.filter(offer => offer.accountName === userData.accountName),
    requestPosts: requests.value.filter(request => request.accountName === userData.accountName)
  }
  showProfilePopup.value = true
}

const closeProfilePopup = () => {
  showProfilePopup.value = false
  selectedProfile.value = {}
}

// Report popup methods
const openReportPopup = (userName) => {
  reportedUserName.value = userName
  selectedReason.value = ''
  otherDescription.value = ''
  showReportPopup.value = true
}

const closeReportPopup = () => {
  showReportPopup.value = false
  reportedUserName.value = ''
  selectedReason.value = ''
  otherDescription.value = ''
}

const submitReport = () => {
  if (!selectedReason.value || (selectedReason.value === 'other' && !otherDescription.value.trim())) {
    return
  }
  
  const reportData = {
    userName: reportedUserName.value,
    reason: selectedReason.value,
    description: selectedReason.value === 'other' ? otherDescription.value : reportReasons.find(r => r.value === selectedReason.value)?.label
  }
  
  // Here you would typically send the report data to your backend
  console.log('Submitting report:', reportData)
  
  // Show success message or handle response
  alert(`Report submitted for ${reportedUserName.value}`)
  
  closeReportPopup()
}

// Sample data for requests with profile pictures
const requests = ref([
  {
    id: 1,
    accountName: 'JohnDoe',
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    timePosted: '2 hours ago',
    request: 'Web Development Help',
    description: 'Need help building a responsive website for my small business. Looking for someone with experience in modern web technologies.',
    category: 'Technology',
    location: 'New York, NY',
    skillsOffered: ['Graphic Design', 'Content Writing', 'Social Media Management'],
    schedule: 'Weekends preferred, 10am-4pm',
    additionalNotes: 'Must have experience with Vue.js and responsive design principles. Long-term collaboration possible.',
    proof: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop'
  },
  {
    id: 2,
    accountName: 'SarahSmith',
    fullName: 'Sarah Smith',
    email: 'sarah.smith@email.com',
    phone: '+1 (555) 987-6543',
    profilePic: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    timePosted: '5 hours ago',
    request: 'Gardening Assistance',
    description: 'Help with backyard garden maintenance and planting seasonal flowers and vegetables.',
    category: 'Home & Garden',
    location: 'Los Angeles, CA',
    skillsOffered: ['Cooking', 'Pet Sitting', 'House Cleaning'],
    schedule: 'Flexible, 2-3 times per week',
    additionalNotes: 'Organic gardening experience preferred. Tools and materials will be provided.',
    proof: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop'
  },
  {
    id: 3,
    accountName: 'AlexJohnson',
    fullName: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 456-7890',
    profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    timePosted: '1 day ago',
    request: 'Math Tutoring',
    description: 'Looking for a tutor to help with high school calculus and algebra concepts.',
    category: 'Education',
    location: 'Chicago, IL',
    skillsOffered: ['Spanish Tutoring', 'Music Lessons', 'Essay Editing'],
    schedule: 'Weekday evenings after 5pm',
    additionalNotes: 'Patient and experienced tutors preferred. Online sessions acceptable.',
    proof: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=200&fit=crop'
  }
])

// Sample data for offers with profile pictures
const offers = ref([
  {
    id: 1,
    accountName: 'MikeJohnson',
    fullName: 'Mike Johnson',
    email: 'mike.johnson@email.com',
    phone: '+1 (555) 111-2222',
    profilePic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    timePosted: '1 hour ago',
    skills: ['Web Development', 'Vue.js', 'JavaScript', 'CSS', 'API Integration'],
    description: 'Experienced web developer offering help with Vue.js projects. I can assist with component development, state management, and deployment.',
    category: 'Technology',
    location: 'Chicago, IL',
    skillsRequested: ['UI/UX Design', 'Project Management', 'Backend Development'],
    schedule: 'Evenings and weekends, flexible hours',
    additionalNotes: '5+ years of experience. Portfolio available upon request.',
    proof: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop'
  },
  {
    id: 2,
    accountName: 'EmmaWilson',
    fullName: 'Emma Wilson',
    email: 'emma.wilson@email.com',
    phone: '+1 (555) 333-4444',
    profilePic: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    timePosted: '3 hours ago',
    skills: ['Gardening', 'Landscaping', 'Plant Care', 'Organic Farming', 'Irrigation Systems'],
    description: 'Professional gardener offering landscaping services and plant care advice for residential properties.',
    category: 'Home & Garden',
    location: 'Miami, FL',
    skillsRequested: ['General Labor', 'Photography', 'Marketing'],
    schedule: 'Weekdays only, 9am-5pm',
    additionalNotes: 'Specialized in tropical plants and sustainable gardening practices.',
    proof: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop'
  },
  {
    id: 3,
    accountName: 'DavidChen',
    fullName: 'David Chen',
    email: 'david.chen@email.com',
    phone: '+1 (555) 555-6666',
    profilePic: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face',
    timePosted: '6 hours ago',
    skills: ['Math Tutoring', 'Test Preparation', 'Online Teaching', 'Curriculum Development'],
    description: 'Certified math teacher offering tutoring services for middle school and high school students.',
    category: 'Education',
    location: 'Boston, MA',
    skillsRequested: ['English Tutoring', 'Computer Skills', 'Study Techniques'],
    schedule: 'Afternoons and weekends',
    additionalNotes: 'Patient and experienced with students of all learning styles. Remote sessions available.',
    proof: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=200&fit=crop'
  }
])

// Computed properties for filtered data
const filteredRequests = computed(() => {
  if (!searchQuery.value) return requests.value
  const query = searchQuery.value.toLowerCase()
  return requests.value.filter(request => 
    request.request.toLowerCase().includes(query) ||
    request.description.toLowerCase().includes(query) ||
    request.category.toLowerCase().includes(query) ||
    request.location.toLowerCase().includes(query) ||
    request.skillsOffered.some(skill => skill.toLowerCase().includes(query))
  )
})

const filteredOffers = computed(() => {
  if (!searchQuery.value) return offers.value
  const query = searchQuery.value.toLowerCase()
  return offers.value.filter(offer => 
    offer.skills.some(skill => skill.toLowerCase().includes(query)) ||
    offer.description.toLowerCase().includes(query) ||
    offer.category.toLowerCase().includes(query) ||
    offer.location.toLowerCase().includes(query) ||
    offer.skillsRequested.some(skill => skill.toLowerCase().includes(query))
  )
})

// Navigation methods
const navigateToRequests = () => {
  router.push('/requests')
}

const navigateToOffers = () => {
  router.push('/offers')
}

// Handle broken image links
const handleImageError = (event) => {
  event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNzI4QTlDIi8+CjxwYXRoIGQ9Ik03NSA0MEM4NS4zNzUgNDAgOTQgNDguNjI1IDk0IDU5Qzk0IDY5LjM3NSA4NS4zNzUgNzggNzUgNzhDNjQuNjI1IDc4IDU2IDY5LjM3NSA1NiA1OUM1NiA0OC42MjUgNjQuNjI1IDQwIDc1IDQwWk03NSAxMDBDODguMjUgMTAwIDEwMCAxMTEuNzUgMTAwIDEyNUg1MEM1MCAxMTEuNzUgNjEuNzUgMTAwIDc1IDEwMFoiIGZpbGw9IiNFRUVFRUUiLz4KPC9zdmc+'
}
</script>

<style scoped>
.dashboard {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  margin-left: 4.5rem;
  margin-right: 2rem; /* Added equal right margin */
}

/* Profile Popup Styles */
.profile-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.profile-popup-container {
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: popupFadeIn 0.3s ease;
  position: relative;
  padding-bottom: 60px; /* Space for close button */
}

.profile-popup-content {
  padding: 2rem;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--light);
}

.profile-info {
  flex: 1;
}

.profile-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary);
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.verified-icon {
  color: #4CAF50;
  font-size: 1.5rem;
  font-weight: bold;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--dark);
}

.contact-item .material-icons {
  color: var(--primary);
  font-size: 1.2rem;
}

.linked-accounts {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--light);
}

.linked-accounts h3 {
  color: var(--primary);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.accounts-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.account-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: rgba(26, 37, 48, 0.08);
  border-radius: 8px;
  color: var(--primary);
  font-weight: 500;
}

.account-item .material-icons {
  font-size: 1.1rem;
}

.posts-section {
  margin-bottom: 2rem;
}

.posts-section h3 {
  color: var(--primary);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.post-cards {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.post-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--light);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--light);
}

.post-header h4 {
  color: var(--primary);
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
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

.post-detail {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.post-detail label {
  font-weight: 600;
  color: var(--primary);
  font-size: 0.95rem;
}

.post-detail span {
  color: var(--dark);
  font-size: 1rem;
  line-height: 1.5;
}

.proof-image {
  margin-top: 0.5rem;
}

.proof-image img {
  max-width: 100%;
  border-radius: 8px;
  border: 1px solid var(--light);
}

.post-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--light);
}

.close-btn {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--grey);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.close-btn:hover {
  background-color: var(--dark);
}

/* Report Popup Styles */
.report-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.report-popup-container {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: popupFadeIn 0.3s ease;
}

@keyframes popupFadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.report-popup-header {
  display: flex;
  justify-content: center; /* center horizontally */
  align-items: center;     /* center vertically */
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--light);
}

.report-popup-header h3 {
  color: var(--primary);
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
}

.report-reasons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.reason-option {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border: 1px solid var(--light);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reason-option:hover {
  border-color: var(--primary);
  background-color: rgba(26, 37, 48, 0.05);
}

.reason-radio {
  margin-right: 0.75rem;
}

.reason-label {
  font-weight: 500;
  color: var(--dark);
}

.description-box {
  margin-bottom: 1.5rem;
}

.description-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--light);
  border-radius: 8px;
  font-family: inherit;
  font-size: 0.95rem;
  resize: vertical;
  transition: border-color 0.3s ease;
}

.description-textarea:focus {
  outline: none;
  border-color: var(--primary);
}

.report-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
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

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Section Header Styles */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 0 0.5rem;
}

.section-header h2 {
  color: var(--primary);
  font-size: 1.75rem;
  font-weight: 600;
}

.see-all-btn {
display: flex;
align-items: center;
color: var(--primary);
font-weight: 600;
font-size: 1rem;
transition: color 0.3s ease;
padding: 0.5rem 1rem;
border-radius: 6px;
white-space: nowrap;
text-decoration: none; /* removes underline */
}

.see-all-btn:hover {
color: var(--dark);
background-color: rgba(26, 37, 48, 0.05);
text-decoration: none; /* keep it removed even on hover */
}


.see-all-btn .material-icons {
  font-size: 1.2rem;
  margin-left: 0.25rem;
}

/* Cards Container - Fixed 3 columns */
.cards-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Fixed 3 columns */
  gap: 2rem;
  margin-bottom: 3rem;
}

/* Card Styles */
.request-card,
.offer-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  min-height: 580px;
  display: flex;
  flex-direction: column;
}

.request-card:hover,
.offer-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
}

/* Card Header Styles with Profile Picture */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--light);
}

.posted-time {
  color: var(--grey);
  font-size: 0.9rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.profile-pic-container {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--light);
  flex-shrink: 0;
}

.profile-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.account-name {
  color: var(--primary);
  font-weight: 600;
  font-size: 1rem;
}

/* Card Content Styles */
.card-content {
  margin-bottom: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

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

.detail-row {
  display: flex;
  gap: 1.5rem;
}

.detail-row .detail-item {
  flex: 1;
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

/* Card Actions Styles */
.card-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: auto;
}

.btn {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  flex: 1;
  justify-content: center;
  min-width: 110px;
}

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

.profile-btn {
  color: var(--grey);
  border-color: var(--grey);
}

.profile-btn:hover {
  background-color: var(--grey);
  color: white;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .cards-container {
    grid-template-columns: repeat(3, 1fr); /* Maintain 3 columns */
    gap: 1.5rem;
  }
  
  .request-card,
  .offer-card {
    padding: 1.5rem;
    min-height: 550px;
  }
}

@media (max-width: 1024px) {
  .cards-container {
    grid-template-columns: repeat(2, 1fr); /* 2 columns on tablets */
  }
  
  .dashboard {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
  
  .profile-popup-container {
    width: 95%;
    max-width: 700px;
  }
}

@media (max-width: 768px) {
  .dashboard {
    padding: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
  }

  .cards-container {
    grid-template-columns: 1fr; /* 1 column on mobile */
    gap: 1.5rem;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .request-card,
  .offer-card {
    padding: 1.5rem;
    min-height: auto;
  }

  .card-actions {
    flex-direction: column;
  }

  .detail-row {
    flex-direction: column;
    gap: 1rem;
  }

  .btn {
    min-width: auto;
  }
  
  .report-popup-container {
    padding: 1.5rem;
    margin: 1rem;
  }
  
  .report-actions {
    flex-direction: column;
  }
  
  .profile-popup-container {
    width: 95%;
    max-width: 95%;
    padding-bottom: 70px;
  }
  
  .profile-popup-content {
    padding: 1.5rem;
  }
  
  .profile-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .accounts-list {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .post-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .dashboard {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  .request-card,
  .offer-card {
    padding: 1.25rem;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .user-info {
    align-self: flex-end;
  }
  
  .profile-popup-content {
    padding: 1.25rem;
  }
  
  .profile-name {
    font-size: 1.5rem;
  }
  
  .post-card {
    padding: 1.25rem;
  }
}
</style>