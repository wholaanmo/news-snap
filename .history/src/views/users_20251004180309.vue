
  
  <style scoped>
  .admin-layout {
    display: flex;
    min-height: 100vh;
  }
  
  .admin-content {
    flex: 1 1 0;
    margin-left: calc(3.5rem + 32px);
    margin-top: 60px;
    transition: margin-left 0.2s ease-out;
    padding: 2rem;
  }
  
  .admin-content.sidebar-open {
    margin-left: var(--sidebar-width);
  }
  
  .users-management-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Search Bar Styles */
.search-container {
  margin-bottom: 2rem;
}

.search-bar {
  position: relative;
  max-width: 500px;
}

.search-bar i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.search-bar input {
  width: 100%;
  padding: 12px 45px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
}

.search-bar input:focus {
  border-color: #4b6cb7;
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
  color: #333;
  margin: 0;
}

.users-count {
  text-align: right;
  color: #666;
}

.users-count span {
  font-weight: bold;
  color: #4b6cb7;
}

/* Users Grid Styles */
.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
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
  color: #333;
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
  background: linear-gradient(135deg, #121731, #728a9c);
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
  box-shadow: 0 4px 8px rgba(75, 108, 183, 0.3);
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
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-email i,
.user-phone i {
  width: 16px;
  color: #888;
}

/* Modal Styles (from your existing code, enhanced for consistency) */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
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
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .users-management-page {
    padding: 1rem;
  }
  
  .users-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
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
}
</style>