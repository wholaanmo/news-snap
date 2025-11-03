<style scoped>
:root {
  --primary: #121731;
  --dark: #0a0f23;
  --grey: #666;
}

.users-management-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Search Bar Styles - Updated to match the image */
.search-container {
  margin-bottom: 32px; /* slightly bigger space */
  display: flex;
  justify-content: flex-end;
}

.search-bar {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 10px; /* slightly bigger rounded corners */
  padding: 12px 18px; /* made the search bar bigger */
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

.search-bar .material-icons {
  color: var(--grey);
  margin-right: 12px;
  font-size: 22px; /* increased icon size */
}

.search-bar input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 17px; /* slightly bigger text */
  background: transparent;
}

/* Users Header Styles */
.users-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.users-header h1 {
  color: var(--primary);
  margin: 0;
}

.users-count-container {
  background-color: #f5f5f5;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.users-count {
  text-align: right;
  color: var(--grey);
}

.users-count span {
  font-weight: bold;
  color: var(--primary);
}

/* Users Grid Styles - 3 containers per row */
.users-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.user-profile-container {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.user-profile-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.user-main-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.name-verified {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.user-name {
  margin: 0;
  color: var(--primary);
  font-size: 1.2rem;
}

.verified-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background-color: #e8f5e8;
  color: #2e7d32;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.verified-badge i {
  font-size: 0.9rem;
}

.view-records-btn {
  background: linear-gradient(135deg, var(--primary), #728a9c);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.view-records-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(18, 23, 49, 0.3);
}

.user-details {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.profile-picture {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f0f0f0;
}

.contact-info {
  flex: 1;
}

.user-email,
.user-phone {
  margin: 0.25rem 0;
  color: var(--grey);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-email i,
.user-phone i {
  width: 16px;
  color: #888;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: white;
  border-radius: 15px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

/* Profile Modal Styles */
.profile-modal {
  max-width: 600px;
  max-height: 90vh;
  padding: 2rem;
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

.profile-email, .profile-phone {
  margin: 0;
  color: var(--grey);
  flex: 1;
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
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.close-btn:hover {
  background: var(--dark);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .users-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .users-management-page {
    padding: 1rem;
  }
  
  .users-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .users-count-container {
    width: 100%;
  }
  
  .users-count {
    text-align: left;
  }
  
  .users-grid {
    grid-template-columns: 1fr;
  }
  
  .user-main-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .user-details {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .contact-info {
    width: 100%;
  }
  
  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .profile-picture {
    margin-right: 0;
    margin-bottom: 15px;
  }

  .verification-controls {
    flex-direction: column;
    align-items: flex-start;
  }

  .verify-btn {
    margin-left: 0;
    margin-top: 5px;
  }

  .post-details {
    grid-template-columns: 1fr;
  }

  .post-actions {
    flex-direction: column;
  }

  /* Mobile responsive adjustments for right alignment */
  .search-container {
    justify-content: flex-start;
  }
  
  .search-bar {
    max-width: 100%;
  }
}
</style>