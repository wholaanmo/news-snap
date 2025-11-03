<template>
    <div class="dashboard">
  
      <!-- Requests Section -->
      <section class="requests-section">
        <div class="section-header">
          <h2>Recent Requests</h2>
          <button class="see-all-btn" @click="navigateToRequests">
            See All
            <span class="material-icons">chevron_right</span>
          </button>
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
              <button class="btn report-btn">
                <span class="material-icons">flag</span>
                Report
              </button>
              <button class="btn contact-btn">
                <span class="material-icons">message</span>
                Contact
              </button>
              <button class="btn profile-btn">
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
          <button class="see-all-btn" @click="navigateToOffers">
            See All
            <span class="material-icons">chevron_right</span>
          </button>
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
              <button class="btn report-btn">
                <span class="material-icons">flag</span>
                Report
              </button>
              <button class="btn contact-btn">
                <span class="material-icons">message</span>
                Contact
              </button>
              <button class="btn profile-btn">
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
  
  // Sample data for requests with profile pictures
  const requests = ref([
    {
      id: 1,
      accountName: 'JohnDoe',
      profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      timePosted: '2 hours ago',
      request: 'Web Development Help',
      description: 'Need help building a responsive website for my small business. Looking for someone with experience in modern web technologies.',
      category: 'Technology',
      location: 'New York, NY',
      skillsOffered: ['Graphic Design', 'Content Writing', 'Social Media Management'],
      schedule: 'Weekends preferred, 10am-4pm',
      additionalNotes: 'Must have experience with Vue.js and responsive design principles. Long-term collaboration possible.'
    },
    {
      id: 2,
      accountName: 'SarahSmith',
      profilePic: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      timePosted: '5 hours ago',
      request: 'Gardening Assistance',
      description: 'Help with backyard garden maintenance and planting seasonal flowers and vegetables.',
      category: 'Home & Garden',
      location: 'Los Angeles, CA',
      skillsOffered: ['Cooking', 'Pet Sitting', 'House Cleaning'],
      schedule: 'Flexible, 2-3 times per week',
      additionalNotes: 'Organic gardening experience preferred. Tools and materials will be provided.'
    },
    {
      id: 3,
      accountName: 'AlexJohnson',
      profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      timePosted: '1 day ago',
      request: 'Math Tutoring',
      description: 'Looking for a tutor to help with high school calculus and algebra concepts.',
      category: 'Education',
      location: 'Chicago, IL',
      skillsOffered: ['Spanish Tutoring', 'Music Lessons', 'Essay Editing'],
      schedule: 'Weekday evenings after 5pm',
      additionalNotes: 'Patient and experienced tutors preferred. Online sessions acceptable.'
    }
  ])
  
  // Sample data for offers with profile pictures
  const offers = ref([
    {
      id: 1,
      accountName: 'MikeJohnson',
      profilePic: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      timePosted: '1 hour ago',
      skills: ['Web Development', 'Vue.js', 'JavaScript', 'CSS', 'API Integration'],
      description: 'Experienced web developer offering help with Vue.js projects. I can assist with component development, state management, and deployment.',
      category: 'Technology',
      location: 'Chicago, IL',
      skillsRequested: ['UI/UX Design', 'Project Management', 'Backend Development'],
      schedule: 'Evenings and weekends, flexible hours',
      additionalNotes: '5+ years of experience. Portfolio available upon request.'
    },
    {
      id: 2,
      accountName: 'EmmaWilson',
      profilePic: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      timePosted: '3 hours ago',
      skills: ['Gardening', 'Landscaping', 'Plant Care', 'Organic Farming', 'Irrigation Systems'],
      description: 'Professional gardener offering landscaping services and plant care advice for residential properties.',
      category: 'Home & Garden',
      location: 'Miami, FL',
      skillsRequested: ['General Labor', 'Photography', 'Marketing'],
      schedule: 'Weekdays only, 9am-5pm',
      additionalNotes: 'Specialized in tropical plants and sustainable gardening practices.'
    },
    {
      id: 3,
      accountName: 'DavidChen',
      profilePic: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face',
      timePosted: '6 hours ago',
      skills: ['Math Tutoring', 'Test Preparation', 'Online Teaching', 'Curriculum Development'],
      description: 'Certified math teacher offering tutoring services for middle school and high school students.',
      category: 'Education',
      location: 'Boston, MA',
      skillsRequested: ['English Tutoring', 'Computer Skills', 'Study Techniques'],
      schedule: 'Afternoons and weekends',
      additionalNotes: 'Patient and experienced with students of all learning styles. Remote sessions available.'
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
  
  const handleSearch = () => {
    // Search is handled by computed properties
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
    margin-left: ;
  }
  
  /* Search Bar Styles - Made Longer */
  .search-container {
    margin-bottom: 3rem;
    display: flex;
    justify-content: center;
  }
  
  .search-bar {
    display: flex;
    align-items: center;
    background: white;
    border-radius: 50px;
    padding: 0.75rem 1.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border: 2px solid var(--grey);
    transition: border-color 0.3s ease;
    width: 100%;
    max-width: 800px; /* Longer search bar */
  }
  
  .search-bar:focus-within {
    border-color: var(--primary);
  }
  
  .search-bar .material-icons {
    color: var(--grey);
    margin-right: 0.5rem;
  }
  
  .search-bar input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
    background: transparent;
    width: 100%;
  }
  
  .search-bar input::placeholder {
    color: var(--grey);
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
  }
  
  .see-all-btn:hover {
    color: var(--dark);
    background-color: rgba(26, 37, 48, 0.05);
  }
  
  .see-all-btn .material-icons {
    font-size: 1.2rem;
    margin-left: 0.25rem;
  }
  
  /* Cards Container - Grid Layout */
  .cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
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
  
  .btn .material-icons {
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
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    }
  }
  
  @media (max-width: 768px) {
    .dashboard {
      padding: 1rem;
    }
  
    .search-bar {
      max-width: 100%;
    }
  
    .cards-container {
      grid-template-columns: 1fr;
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
  }
  
  @media (max-width: 480px) {
    .request-card,
    .offer-card {
      padding: 1.25rem;
    }
  
    .search-bar {
      padding: 0.6rem 1.25rem;
    }
  
    .card-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
    }
  
    .user-info {
      align-self: flex-end;
    }
  }
  </style>
