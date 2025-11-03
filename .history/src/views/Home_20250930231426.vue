<template>
    <div class="dashboard">
      <!-- Search Bar -->
      <div class="search-container">
        <div class="search-bar">
          <span class="material-icons">search</span>
          <input 
            type="text" 
            placeholder="Search requests and offers..." 
            v-model="searchQuery"
            @input="handleSearch"
          >
        </div>
      </div>
  
      <!-- Requests Section -->
      <section class="requests-section">
        <div class="section-header">
          <h2>Recent Requests</h2>
          <button class="see-all-btn" @click="navigateToRequests">
            See All
            <span class="material-icons">chevron_right</span>
          </button>
        </div>
  
        <div class="requests-container">
          <div 
            v-for="request in filteredRequests" 
            :key="request.id" 
            class="request-card"
          >
            <!-- Card Header -->
            <div class="card-header">
              <span class="posted-time">{{ request.timePosted }}</span>
              <span class="account-name">{{ request.accountName }}</span>
            </div>
  
            <!-- Card Content -->
            <div class="card-content">
              <div class="detail-item">
                <label>Request:</label>
                <span>{{ request.request }}</span>
              </div>
              <div class="detail-item">
                <label>Description:</label>
                <span>{{ request.description }}</span>
              </div>
              <div class="detail-item">
                <label>Category:</label>
                <span>{{ request.category }}</span>
              </div>
              <div class="detail-item">
                <label>Location:</label>
                <span>{{ request.location }}</span>
              </div>
              <div class="detail-item">
                <label>Skills Offered:</label>
                <span>{{ request.skillsOffered }}</span>
              </div>
              <div class="detail-item">
                <label>Schedule:</label>
                <span>{{ request.schedule }}</span>
              </div>
              <div class="detail-item">
                <label>Additional Notes:</label>
                <span>{{ request.additionalNotes }}</span>
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
  
        <div class="offers-container">
          <div 
            v-for="offer in filteredOffers" 
            :key="offer.id" 
            class="offer-card"
          >
            <!-- Card Header -->
            <div class="card-header">
              <span class="posted-time">{{ offer.timePosted }}</span>
              <span class="account-name">{{ offer.accountName }}</span>
            </div>
  
            <!-- Card Content -->
            <div class="card-content">
              <div class="detail-item">
                <label>Skills:</label>
                <span>{{ offer.skills }}</span>
              </div>
              <div class="detail-item">
                <label>Description:</label>
                <span>{{ offer.description }}</span>
              </div>
              <div class="detail-item">
                <label>Category:</label>
                <span>{{ offer.category }}</span>
              </div>
              <div class="detail-item">
                <label>Location:</label>
                <span>{{ offer.location }}</span>
              </div>
              <div class="detail-item">
                <label>Skills Requested:</label>
                <span>{{ offer.skillsRequested }}</span>
              </div>
              <div class="detail-item">
                <label>Schedule:</label>
                <span>{{ offer.schedule }}</span>
              </div>
              <div class="detail-item">
                <label>Additional Notes:</label>
                <span>{{ offer.additionalNotes }}</span>
              </div>
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
  
  // Sample data for requests
  const requests = ref([
    {
      id: 1,
      accountName: 'JohnDoe',
      timePosted: '2 hours ago',
      request: 'Web Development Help',
      description: 'Need help building a responsive website for my small business',
      category: 'Technology',
      location: 'New York, NY',
      skillsOffered: 'Graphic Design, Content Writing',
      schedule: 'Weekends preferred',
      additionalNotes: 'Must have experience with Vue.js'
    },
    {
      id: 2,
      accountName: 'SarahSmith',
      timePosted: '5 hours ago',
      request: 'Gardening Assistance',
      description: 'Help with backyard garden maintenance and planting',
      category: 'Home & Garden',
      location: 'Los Angeles, CA',
      skillsOffered: 'Cooking, Pet Sitting',
      schedule: 'Flexible',
      additionalNotes: 'Organic gardening experience preferred'
    }
  ])
  
  // Sample data for offers
  const offers = ref([
    {
      id: 1,
      accountName: 'MikeJohnson',
      timePosted: '1 hour ago',
      skills: 'Web Development, Vue.js, JavaScript',
      description: 'Experienced web developer offering help with Vue.js projects',
      category: 'Technology',
      location: 'Chicago, IL',
      skillsRequested: 'UI/UX Design, Project Management',
      schedule: 'Evenings and weekends',
      additionalNotes: '5+ years of experience'
    },
    {
      id: 2,
      accountName: 'EmmaWilson',
      timePosted: '3 hours ago',
      skills: 'Gardening, Landscaping, Plant Care',
      description: 'Professional gardener offering landscaping services',
      category: 'Home & Garden',
      location: 'Miami, FL',
      skillsRequested: 'General Labor, Photography',
      schedule: 'Weekdays only',
      additionalNotes: 'Specialized in tropical plants'
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
      request.skillsOffered.toLowerCase().includes(query)
    )
  })
  
  const filteredOffers = computed(() => {
    if (!searchQuery.value) return offers.value
    const query = searchQuery.value.toLowerCase()
    return offers.value.filter(offer => 
      offer.skills.toLowerCase().includes(query) ||
      offer.description.toLowerCase().includes(query) ||
      offer.category.toLowerCase().includes(query) ||
      offer.location.toLowerCase().includes(query) ||
      offer.skillsRequested.toLowerCase().includes(query)
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
  </script>
  
  <style scoped>
  .dashboard {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  /* Search Bar Styles */
  .search-container {
    margin-bottom: 2rem;
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
  }
  
  .search-bar input::placeholder {
    color: var(--grey);
  }
  
  /* Section Header Styles */
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .section-header h2 {
    color: var(--primary);
    font-size: 1.5rem;
  }
  
  .see-all-btn {
    display: flex;
    align-items: center;
    color: var(--primary);
    font-weight: 600;
    transition: color 0.3s ease;
  }
  
  .see-all-btn:hover {
    color: var(--dark);
  }
  
  .see-all-btn .material-icons {
    font-size: 1.2rem;
    margin-left: 0.25rem;
  }
  
  /* Card Container Styles */
  .requests-container,
  .offers-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
  
  /* Card Styles */
  .request-card,
  .offer-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .request-card:hover,
  .offer-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
  
  /* Card Header Styles */
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--light);
  }
  
  .posted-time {
    color: var(--grey);
    font-size: 0.875rem;
  }
  
  .account-name {
    color: var(--primary);
    font-weight: 600;
    font-size: 0.9rem;
  }
  
  /* Card Content Styles */
  .card-content {
    margin-bottom: 1.5rem;
  }
  
  .detail-item {
    margin-bottom: 0.75rem;
    display: flex;
    flex-direction: column;
  }
  
  .detail-item label {
    font-weight: 600;
    color: var(--primary);
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
  }
  
  .detail-item span {
    color: var(--dark);
    font-size: 0.9rem;
    line-height: 1.4;
  }
  
  /* Card Actions Styles */
  .card-actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }
  
  .btn {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.3s ease;
    border: 1px solid transparent;
  }
  
  .btn .material-icons {
    font-size: 1rem;
    margin-right: 0.25rem;
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
  @media (max-width: 768px) {
    .dashboard {
      padding: 1rem;
    }
  
    .requests-container,
    .offers-container {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  
    .section-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
  
    .card-actions {
      flex-direction: column;
    }
  
    .btn {
      justify-content: center;
    }
  }
  
  @media (max-width: 480px) {
    .request-card,
    .offer-card {
      padding: 1rem;
    }
  
    .search-bar {
      padding: 0.5rem 1rem;
    }
  }
  </style>
