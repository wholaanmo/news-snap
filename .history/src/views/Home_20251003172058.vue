

<style scoped>
.dashboard {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  margin-left: 4.5rem;
  margin-right: 2rem; /* Added equal right margin */
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

/* Modal Overlay Styles */
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

/* profile modal */
.profile-modal {
  max-width: 600px;
  max-height: 90vh;
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

.btn2 {
  display: flex;
  align-items: center;
  padding: 5px 15px;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s;
  font-size: 15px;
}

.btn2 .material-icons {
  margin-right: 5px;
  font-size: 18px;
}
.report-btn2 {
  color: #e74c3c;
  border: 1px solid #e74c3c;
}

.report-btn2:hover {
  background: #e74c3c;
  color: white;
}

.contact-btn2 {
  color: var(--primary);
  border: 1px solid var(--primary);
}

.contact-btn2:hover {
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

.btn2 .material-icons2 {
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
}
</style>
