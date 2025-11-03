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
      <div class="stat-card">
        <div class="stat-header">
          <h3>Total Number of Deactivated Accounts</h3>
          <button class="see-all-btn" @click="showDeactivatedModal = true">See All</button>
        </div>
        <div class="stat-count">{{ deactivatedAccounts.length }}</div>
      </div>

      <!-- Removed Posts -->
      <div class="stat-card">
        <div class="stat-header">
          <h3>Total Number of Removed Posts</h3>
          <button class="see-all-btn" @click="showRemovedModal = true">See All</button>
        </div>
        <div class="stat-count">{{ removedPosts.length }}</div>
      </div>

      <!-- Kept Posts -->
      <div class="stat-card">
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
              </div>
            </div>
            <div class="deactivation-info">
              <span class="deactivation-duration">Deactivated for: {{ account.deactivationDuration }}</span>
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
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Modal states
const showDeactivatedModal = ref(false)
const showRemovedModal = ref(false)
const showKeptModal = ref(false)

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
    reportReason: 'Offering illegal services - software piracy and copyright infringement'
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
    reportReason: 'Requesting fraudulent activity - creating fake educational documents'
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
    reportReason: 'Academic dishonesty - promoting plagiarism services'
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
    reportReason: 'User reported as spam, but post appears legitimate'
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
    reportReason: 'Reported as inappropriate content, but post follows community guidelines'
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
    reportReason: 'Reported for suspicious activity, but verified as legitimate service'
  }
])
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
  color: var(--primary);
  text-align: center;
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
  padding-top: 15px;
  border-top: 1px solid #e9ecef;
}

.deactivation-duration {
  color: #e74c3c;
  font-weight: 600;
  font-size: 14px;
}

/* Post Items in Modals */
.post-item {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #e9ecef;
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