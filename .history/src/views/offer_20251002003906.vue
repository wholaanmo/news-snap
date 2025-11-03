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
    </div>
  </template>
  
  <script setup>
  import { ref, computed, reactive } from 'vue'
  
  // Search functionality
  const searchQuery = ref('')
  
  // Modal state
  const showForm = ref(false)
  
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
  
  .submit-btn:hover {
    background: var(--dark);
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