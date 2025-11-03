

/* Responsive Design */
@media (max-width: 768px) {
  .account-page {
    padding: 1rem;
    margin-top: 1.5rem;
  }
  
  .account-layout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0;
  }
  
  .profile-content {
    flex-direction: column;
    gap: 1.25rem;
    align-items: center;
    text-align: center;
  }
  
  .profile-header {
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }
  
  .input-group {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .url-input {
    width: 100%;
    min-width: auto;
  }
  
  .edit-actions {
    flex-direction: column;
  }
  
  .save-btn-large, .cancel-btn-large {
    min-width: auto;
    width: 100%;
  }
  
  .posts-tabs {
    flex-direction: column;
  }
  
  .profile-card,
  .posts-card {
    padding: 1rem;
  }
  
  .linked-accounts-header {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
  
  .account-options {
    width: 100%;
    justify-content: flex-end;
  }
  
  .account-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  .account-url {
    width: 100%;
    order: 3;
  }
}

@media (max-width: 480px) {
  .account-page {
    padding: 0.5rem;
    margin-top: 1rem;
  }
  
  .avatar {
    width: 80px;
    height: 80px;
  }
  
  .profile-title {
    font-size: 1.1rem;
  }
  
  .user-name {
    font-size: 1rem;
  }
  
  .profile-card,
  .posts-card {
    padding: 0.75rem;
  }
  
  .account-item {
    flex-wrap: wrap;
  }
  
  .account-url {
    min-width: 100%;
    order: 3;
  }
  
  .profile-content {
    gap: 1rem;
  }
  
  .profile-info {
    gap: 1rem;
  }
}
</style>