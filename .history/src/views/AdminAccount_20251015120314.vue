<template>
  <div class="admin-dashboard">
    <!-- Admin Header -->
    <div class="admin-header">
      <h1>Admin</h1>
    </div>

    <!-- Profile Container -->
    <div class="profile-container">
      <div class="profile-info">
        <span class="material-icons user-icon">account_circle</span>
        <span class="admin-email">admin@skillswap.com</span>
      </div>
    </div>

    <!-- Statistics Containers -->
    <div class="stats-container">
      <!-- Deactivated Accounts -->
      <div class="stat-card deactivated-stat">
        <div class="stat-header">
          <h3>Total Number of Deactivated Accounts</h3>
          <button class="see-all-btn" @click="showDeactivatedModal = true">See All</button>
        </div>
        <div class="stat-count">{{ deactivatedAccounts.length }}</div>
      </div>

      <!-- Removed Posts -->
      <div class="stat-card removed-stat">
        <div class="stat-header">
          <h3>Total Number of Removed Posts</h3>
          <button class="see-all-btn" @click="showRemovedModal = true">See All</button>
        </div>
        <div class="stat-count">{{ removedPosts.length }}</div>
      </div>

      <!-- Kept Posts -->
      <div class="stat-card kept-stat">
        <div class="stat-header">
          <h3>Total Number of Kept Posts</h3>
          <button class="see-all-btn" @click="showKeptModal = true">See All</button>
        </div>
        <div class="stat-count">{{ keptPosts.length }}</div>
      </div>
    </div>

    <!-- Deactivated Accounts Modal -->
    <div v-if="showDeactivatedModal" class="modal-overlay" @click="showDeactivatedModal = false">
  <div class="modal-content deactivated-modal" @click.stop>
    <div class="modal-header">
      <h2>Deactivated Accounts</h2>
      <button class="close-btn" @click="showDeactivatedModal = false">
        <span class="material-icons">close</span>
      </button>
    </div>
    
    <div class="modal-body">
      <div 
        v-for="account in deactivatedAccounts" 
        :key="account.id" 
        class="account-item"
      >
        <div class="account-header">
          <img :src="account.profilePicture" :alt="account.fullName" class="profile-picture">
          <div class="account-info">
            <h4 class="account-name">{{ account.fullName }}</h4>
            <p class="account-email">{{ account.email }}</p>
            <p class="account-phone">{{ account.phone }}</p>
            <span class="deactivation-duration">Deactivated for: {{ account.deactivationDuration }}</span>
          </div>
          <button class="reactivate-btn" @click="reactivateAccount(account.id)">
            Reactivate Account
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

    <!-- Removed Posts Modal -->
    <div v-if="showRemovedModal" class="modal-overlay" @click="showRemovedModal = false">
      <div class="modal-content removed-modal" @click.stop>
        <div class="modal-header">
          <h2>Removed Posts</h2>
          <button class="close-btn" @click="showRemovedModal = false">
            <span class="material-icons">close</span>
          </button>
        </div>
        
        <div class="modal-body">
          <div 
            v-for="post in removedPosts" 
            :key="post.id" 
            class="post-item"
          >
            <div class="post-header-user">
              <img :src="post.userProfilePicture" :alt="post.userFullName" class="user-profile-picture">
              <div class="user-info">
                <h4 class="user-name">{{ post.userFullName }}</h4>
              </div>
              <button class="view-profile-btn" @click="openProfileModal(post.userId)">
                View Profile
              </button>
            </div>
            
            <div class="post-type-badge" :class="post.type">
              {{ post.type === 'offer' ? 'Offer Post' : 'Request Post' }}
            </div>
            
            <div class="post-content">
              <!-- Offer Post Content -->
              <div v-if="post.type === 'offer'">
                <h4 class="post-title">{{ post.skills }}</h4>
                <p class="post-description">{{ post.description }}</p>
                
                <div class="post-details">
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
              </div>
              
              <!-- Request Post Content -->
              <div v-else>
                <h4 class="post-title">{{ post.request }}</h4>
                <p class="post-description">{{ post.description }}</p>
                
                <div class="post-details">
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
              </div>
              
              <div class="additional-notes" v-if="post.additionalNotes">
                <span class="detail-label">Additional Notes:</span>
                <p class="detail-value">{{ post.additionalNotes }}</p>
              </div>
              
              <div class="report-reason">
                <span class="detail-label">Reason for Report:</span>
                <p class="detail-value">{{ post.reportReason }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Kept Posts Modal -->
    <div v-if="showKeptModal" class="modal-overlay" @click="showKeptModal = false">
      <div class="modal-content kept-modal" @click.stop>
        <div class="modal-header">
          <h2>Kept Posts</h2>
          <button class="close-btn" @click="showKeptModal = false">
            <span class="material-icons">close</span>
          </button>
        </div>
        
        <div class="modal-body">
          <div 
            v-for="post in keptPosts" 
            :key="post.id" 
            class="post-item"
          >
            <div class="post-header-user">
              <img :src="post.userProfilePicture" :alt="post.userFullName" class="user-profile-picture">
              <div class="user-info">
                <h4 class="user-name">{{ post.userFullName }}</h4>
              </div>
              <button class="view-profile-btn" @click="openProfileModal(post.userId)">
                View Profile
              </button>
            </div>
            
            <div class="post-type-badge" :class="post.type">
              {{ post.type === 'offer' ? 'Offer Post' : 'Request Post' }}
            </div>
            
            <div class="post-content">
              <!-- Offer Post Content -->
              <div v-if="post.type === 'offer'">
                <h4 class="post-title">{{ post.skills }}</h4>
                <p class="post-description">{{ post.description }}</p>
                
                <div class="post-details">
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
              </div>
              
              <!-- Request Post Content -->
              <div v-else>
                <h4 class="post-title">{{ post.request }}</h4>
                <p class="post-description">{{ post.description }}</p>
                
                <div class="post-details">
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
              </div>
              
              <div class="additional-notes" v-if="post.additionalNotes">
                <span class="detail-label">Additional Notes:</span>
                <p class="detail-value">{{ post.additionalNotes }}</p>
              </div>
              
              <div class="report-reason">
                <span class="detail-label">Reason for Report:</span>
                <p class="detail-value">{{ post.reportReason }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  <!-- Profile Modal -->
<div v-if="showProfileModal" class="modal-overlay profile-overlay" @click="closeProfileModal">
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
              <button class="btn delete-btn" @click="openDeleteModal(offer)">
                <span class="material-icons">delete</span>
                Delete
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
              <button class="btn delete-btn" @click="openDeleteModal(request)">
                <span class="material-icons">delete</span>
                Delete
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

    <div class="profile-actions1">
      <button class="btn close-btn1" @click="closeProfileModal">Close</button>
    </div>
  </div>
</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Modal states
const showDeactivatedModal = ref(false)
const showRemovedModal = ref(false)
const showKeptModal = ref(false)
const showProfileModal = ref(false)

// Current profile for modal
const currentProfile = ref({})

// Sample data for deactivated accounts
const deactivatedAccounts = ref([
  {
    id: 1,
    fullName: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    deactivationDuration: '7 days'
  },
  {
    id: 2,
    fullName: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 987-6543',
    profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    deactivationDuration: '14 days'
  },
  {
    id: 3,
    fullName: 'Michael Brown',
    email: 'michael.b@example.com',
    phone: '+1 (555) 456-7890',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    deactivationDuration: '30 days'
  }
])

// Sample data for removed posts
const removedPosts = ref([
  {
    id: 1,
    type: 'offer',
    skills: 'Illegal Software Services',
    description: 'Offering help with cracking software licenses and bypassing security measures.',
    category: 'Technology',
    location: 'Remote',
    skillsRequested: 'Graphic design services',
    schedule: 'ASAP',
    additionalNotes: 'Must be discreet about this service.',
    reportReason: 'Offering illegal services - software piracy and copyright infringement',
    userId: 1,
    userFullName: 'John Smith',
    userProfilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 2,
    type: 'request',
    request: 'Fake Certificate Creation',
    description: 'Need someone to create fake educational certificates for job applications.',
    category: 'Education',
    location: 'Remote',
    skillsOffered: 'Data entry work',
    schedule: 'Within 1 week',
    additionalNotes: 'Certificates need to look authentic and pass basic verification.',
    reportReason: 'Requesting fraudulent activity - creating fake educational documents',
    userId: 2,
    userFullName: 'Sarah Johnson',
    userProfilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 3,
    type: 'offer',
    skills: 'Academic Essay Writing (Plagiarism)',
    description: 'Offering to write academic essays and assignments with guaranteed plagiarism.',
    category: 'Education',
    location: 'Online',
    skillsRequested: 'Website development',
    schedule: 'Flexible deadlines',
    additionalNotes: 'Can handle any subject and academic level.',
    reportReason: 'Academic dishonesty - promoting plagiarism services',
    userId: 3,
    userFullName: 'Michael Brown',
    userProfilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
  }
])

// Sample data for kept posts
const keptPosts = ref([
  {
    id: 1,
    type: 'offer',
    skills: 'Web Development & UI/UX Design',
    description: 'Experienced full-stack developer offering website development and design services for small businesses.',
    category: 'Technology',
    location: 'Remote',
    skillsRequested: 'Digital marketing, Content writing',
    schedule: 'Weekdays, 9 AM - 6 PM',
    additionalNotes: 'Portfolio available upon request. Free initial consultation.',
    reportReason: 'User reported as spam, but post appears legitimate',
    userId: 4,
    userFullName: 'Emily Davis',
    userProfilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 2,
    type: 'request',
    request: 'Need help with mobile app design',
    description: 'Looking for a designer to help create a mobile app interface for my startup focused on sustainability.',
    category: 'Design',
    location: 'Remote',
    skillsOffered: 'Backend development in Node.js',
    schedule: 'Within 3 weeks',
    additionalNotes: 'Experience with Figma preferred. Open to collaboration.',
    reportReason: 'Reported as inappropriate content, but post follows community guidelines',
    userId: 5,
    userFullName: 'David Wilson',
    userProfilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 3,
    type: 'offer',
    skills: 'Spanish & French Tutoring',
    description: 'Native Spanish speaker with fluent French offering language tutoring for all levels, from beginner to advanced.',
    category: 'Education',
    location: 'New York, NY',
    skillsRequested: 'English proofreading, Math tutoring',
    schedule: 'Weekends preferred, flexible timing',
    additionalNotes: 'Materials provided. First lesson free for new students.',
    reportReason: 'Reported for suspicious activity, but verified as legitimate service',
    userId: 6,
    userFullName: 'Maria Garcia',
    userProfilePicture: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
  }
])

// Sample profile data
const sampleProfiles = {
  1: {
    userId: 1,
    fullName: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    userPicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    isVerified: true,
    linkedAccounts: [
      { platform: 'LinkedIn', icon: 'work', url: 'https://linkedin.com/in/johnsmith' },
      { platform: 'GitHub', icon: 'code', url: 'https://github.com/johnsmith' }
    ],
    skillOffers: [
      {
        id: 101,
        skills: 'Web Development',
        description: 'Full-stack web development services using modern technologies.',
        category: 'Technology',
        location: 'Remote',
        skillsRequested: 'UI/UX Design',
        schedule: 'Flexible',
        timePosted: '2 days ago',
        additionalNotes: 'Available for long-term projects.',
        proof: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
      }
    ],
    skillRequests: [
      {
        id: 201,
        skills: 'Mobile App Design',
        description: 'Looking for a mobile app designer for my startup project.',
        category: 'Design',
        location: 'Remote',
        skillsOffered: 'Backend Development',
        schedule: 'Within 2 weeks',
        timePosted: '1 week ago',
        additionalNotes: 'Budget flexible for the right designer.'
      }
    ]
  },
  2: {
    userId: 2,
    fullName: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 987-6543',
    userPicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    isVerified: false,
    linkedAccounts: [
      { platform: 'Twitter', icon: 'flutter_dash', url: 'https://twitter.com/sarahj' }
    ],
    skillOffers: [
      {
        id: 102,
        skills: 'Graphic Design',
        description: 'Professional graphic design services for businesses and individuals.',
        category: 'Design',
        location: 'Remote',
        skillsRequested: 'Web Development',
        schedule: 'Weekdays',
        timePosted: '3 days ago',
        additionalNotes: 'Specializing in branding and logo design.'
      }
    ],
    skillRequests: []
  }
}

// Methods
const reactivateAccount = (accountId) => {
  // Remove account from deactivated accounts
  deactivatedAccounts.value = deactivatedAccounts.value.filter(account => account.id !== accountId)
  // In a real application, you would make an API call here
  console.log(`Reactivated account with ID: ${accountId}`)
}

const openProfileModal = (userId) => {
  currentProfile.value = sampleProfiles[userId] || {}
  showProfileModal.value = true
}

const closeProfileModal = () => {
  showProfileModal.value = false
  currentProfile.value = {}
}

const openDeleteModal = (post) => {
  // Implementation for delete modal
  console.log('Open delete modal for post:', post)
}
</script>

<style scoped>
.admin-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Admin Header */
.admin-header {
  margin-bottom: 30px;
}

.admin-header h1 {
  color: var(--primary);
  font-size: 32px;
  font-weight: 600;
  margin: 0;
}

/* Profile Container */
.profile-container {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-icon {
  font-size: 40px;
  color: var(--primary);
}

.admin-email {
  font-size: 18px;
  font-weight: 500;
  color: var(--primary);
}

/* Statistics Container */
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.stat-header h3 {
  color: var(--primary);
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  flex: 1;
  margin-right: 15px;
}

.see-all-btn {
  background: var(--primary);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
  white-space: nowrap;
}

.see-all-btn:hover {
  background: var(--dark);
}

.stat-count {
  font-size: 48px;
  font-weight: 700;
  text-align: center;
}

/* Color coding for stat cards */
.deactivated-stat .stat-count {
  color: #e74c3c; /* Red for deactivated accounts */
}

.removed-stat .stat-count {
  color: #e74c3c; /* Red for removed posts */
}

.kept-stat .stat-count {
  color: #27ae60; /* Green for kept posts */
}

/* Modal Styles */
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
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 30px;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
  border-radius: 12px 12px 0 0;
}

.modal-header h2 {
  color: var(--primary);
  margin: 0;
  font-size: 24px;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: background 0.3s;
}

.close-btn:hover {
  background: #f5f5f5;
}

.close-btn .material-icons {
  color: var(--grey);
  font-size: 24px;
}

.modal-body {
  padding: 30px;
}

/* Deactivated Accounts Modal */
.account-item {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  border: 1px solid #e9ecef;
  position: relative; /* added so absolute positioning works inside */
}

.account-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.profile-picture {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.account-info {
  flex: 1;
}

.account-name {
  margin: 0 0 5px 0;
  color: var(--primary);
  font-size: 18px;
}

.account-email,
.account-phone {
  margin: 2px 0;
  color: var(--grey);
  font-size: 14px;
}

.deactivation-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #e9ecef;
}

.deactivation-duration {
  color: #e74c3c;
  font-weight: 600;
  font-size: 14px;
}

.reactivate-btn {
  background: #27ae60;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
  position: absolute; /* added */
  top: 15px; /* distance from top */
  right: 15px; /* distance from right */
}

.reactivate-btn:hover {
  background: #219653;
}


/* Post Items in Modals */
.post-item {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #e9ecef;
}

.post-header-user {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e9ecef;
}

.user-profile-picture {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  flex: 1;
}

.user-name {
  margin: 0;
  color: var(--primary);
  font-size: 16px;
  font-weight: 600;
}

.view-profile-btn {
  background: var(--primary);
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
  font-size: 12px;
}

.view-profile-btn:hover {
  background: var(--dark);
}

.post-type-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 15px;
}

.post-type-badge.offer {
  background: #d4edda;
  color: #155724;
}

.post-type-badge.request {
  background: #d1ecf1;
  color: #0c5460;
}

.post-title {
  margin: 0 0 10px 0;
  color: var(--primary);
  font-size: 18px;
  font-weight: 600;
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

.detail-item {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 2px;
  font-size: 13px;
}

.detail-value {
  color: #555;
  font-size: 14px;
}

.additional-notes {
  margin-bottom: 15px;
  padding: 10px;
  background: white;
  border-radius: 6px;
  border-left: 3px solid var(--primary);
}

.report-reason {
  padding: 12px;
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 6px;
  color: #856404;
}

.report-reason .detail-label {
  color: #856404;
  font-weight: 700;
}

/* Modal Specific Styles */
.deactivated-modal {
  max-width: 600px;
}

.removed-modal,
.kept-modal {
  max-width: 700px;
}

/* Profile Modal Styles */
.profile-modal {
  background: #ffffff;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.profile-header .profile-picture {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-header .profile-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start; 
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

.name-verified h2 {
  font-size: 22px;
  font-weight: 600;
  margin: 0;
  color: #333;
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

.material-icons {
  font-size: 18px;
  margin-right: 2px;
}

.verification-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.profile-email,
.profile-phone {
  margin: 0.2rem 0 0 0; /* small top margin for spacing */
  color: var(--grey);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-left: 0px
}

.profile-email i,
.profile-phone i {
  width: 16px;
  color: #888;
}


.verify-btn {
  background: var(--primary);
  border: 1px solid var(--grey);
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s;
  margin-left: 10px;
  float: right;
  color: #fff;
}

.verify-btn:hover {
  background: var(--grey);
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
  font-size: 20px;
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

.detail-item {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-weight: 600;
  color: var(--primary);
  font-size: 0.875rem;
  margin-bottom: 4px;
}

.detail-value {
  color: #555;
}

.additional-notes {
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

.post-actions {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  font-size: 0.830rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: -14px;
  margin-bottom: -10px;
}

.btn {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s;
  font-size: 0.900rem;
}

.delete-btn {
  color: #e74c3c;
  border: 1px solid #e74c3c;
}

.delete-btn:hover {
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

.profile-actions1 {
  display: flex;
  justify-content: flex-end; 
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.close-btn1 {
  padding: 12px 30px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.close-btn1:hover {
  background: var(--dark);
}

/* Responsive Design */
@media (max-width: 768px) {
  .admin-dashboard {
    padding: 15px;
  }
  
  .stats-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .stat-header {
    flex-direction: column;
    gap: 10px;
  }
  
  .stat-header h3 {
    margin-right: 0;
  }
  
  .profile-info {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
  
  .modal-content {
    margin: 10px;
  }
  
  .modal-header {
    padding: 20px;
  }
  
  .modal-body {
    padding: 20px;
  }
  
  .post-details {
    grid-template-columns: 1fr;
  }
  
  .account-header {
    flex-direction: column;
    text-align: center;
  }
  
  .deactivation-info {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
  
  .post-header-user {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
  
  .name-verified {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .admin-header h1 {
    font-size: 28px;
  }
  
  .stat-count {
    font-size: 36px;
  }
  
  .modal-header h2 {
    font-size: 20px;
  }
}
</style>