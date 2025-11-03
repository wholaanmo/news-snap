<template>

      <p>Paste a news link to get an AI-powered summary</p>
    </div>

    <div class="chat-messages" ref="messagesContainer">
      <!-- Welcome Message -->
      <div class="message ai-message">
        <div class="message-avatar">
          <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
          <p>Hello! I'm News Snap AI. Paste any news article link below, and I'll summarize it for you in your preferred length.</p>
        </div>
      </div>

      <!-- User messages and AI responses will be added here dynamically -->
      <div v-for="(message, index) in messages" :key="index" :class="['message', message.type + '-message']">
        <div class="message-avatar">
          <i :class="message.type === 'user' ? 'fas fa-user' : 'fas fa-robot'"></i>
        </div>
        <div class="message-content">
          <p>{{ message.content }}</p>
          <div v-if="message.summary" class="summary-content">
            <h4>Summary:</h4>
            <p>{{ message.summary }}</p>
            <div v-if="message.showActions" class="summary-actions">
              <button @click="copySummary(message.summary)" class="action-btn copy-btn">
                <i class="fas fa-copy"></i> Copy Summary
              </button>
              <button @click="downloadPDF(message.summary)" class="action-btn download-btn">
                <i class="fas fa-download"></i> Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading indicator -->
      <div v-if="isLoading" class="message ai-message">
        <div class="message-avatar">
          <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
          <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>

    <div class="chat-input-container">
      <div class="paste-link-section">
        <button @click="showLinkInput = true" class="paste-link-btn" v-if="!showLinkInput">
          <i class="fas fa-link"></i> Paste Link
        </button>
        
        <div v-if="showLinkInput" class="link-input-container">
          <input
            v-model="linkInput"
            type="text"
            placeholder="Paste your news article link here..."
            class="link-input"
            @keyup.enter="processLink"
          />
          <button @click="processLink" class="send-btn">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Length Selection Modal -->
    <div v-if="showLengthModal" class="modal-overlay" @click="showLengthModal = false">
      <div class="modal-content" @click.stop>
        <h3>Choose Summary Length</h3>
        <p>How detailed would you like your summary to be?</p>
        
        <div class="length-options">
          <div class="length-option" @click="selectLength('short')">
            <div class="option-header">
              <i class="fas fa-bolt"></i>
              <h4>Short</h4>
            </div>
            <p>Quick overview of the main points</p>
          </div>
          
          <div class="length-option" @click="selectLength('standard')">
            <div class="option-header">
              <i class="fas fa-balance-scale"></i>
              <h4>Standard</h4>
            </div>
            <p>Balanced summary with key details</p>
          </div>
          
          <div class="length-option" @click="selectLength('long')">
            <div class="option-header">
              <i class="fas fa-file-alt"></i>
              <h4>Long</h4>
            </div>
            <p>In-depth version for a fuller understanding</p>
          </div>
        </div>
        
        <button @click="showLengthModal = false" class="cancel-btn">Cancel</button>
      </div>
    </div>

</template>

<script>
export default {
  name: 'ChatPage',
  data() {
    return {
      messages: [],
      showLinkInput: false,
      linkInput: '',
      showLengthModal: false,
      selectedLink: '',
      isLoading: false,
      selectedLength: 'standard'
    }
  },
  methods: {
    processLink() {
      if (!this.linkInput.trim()) return;

      // Add user message
      this.messages.push({
        type: 'user',
        content: `Pasted link: ${this.linkInput}`
      });

      this.selectedLink = this.linkInput;
      this.showLinkInput = false;
      this.linkInput = '';
      
      // Show length selection modal
      setTimeout(() => {
        this.showLengthModal = true;
      }, 500);
    },
    
    selectLength(length) {
      this.selectedLength = length;
      this.showLengthModal = false;
      this.generateSummary();
    },
    
    async generateSummary() {
      this.isLoading = true;
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock summary based on selected length
      const summaries = {
        short: "This is a brief overview of the main points from the news article. Key highlights include major developments and essential information for quick understanding.",
        standard: "This balanced summary covers the key details of the news article. It includes main points, important context, and significant developments while maintaining conciseness. The article discusses relevant topics with adequate detail for comprehensive understanding.",
        long: "This comprehensive summary provides an in-depth analysis of the news article. It covers all major aspects including background context, detailed developments, implications, and future prospects. The article thoroughly examines the subject matter with extensive coverage of relevant details, supporting evidence, and expert opinions to give you a complete understanding of the topic from multiple perspectives."
      };
      
      const lengthLabels = {
        short: "Short Summary",
        standard: "Standard Summary", 
        long: "Detailed Summary"
      };
      
      // Add AI response
      this.messages.push({
        type: 'ai',
        content: `I've analyzed the article and prepared a ${lengthLabels[this.selectedLength]}.`,
        summary: summaries[this.selectedLength],
        showActions: true
      });
      
      this.isLoading = false;
      this.scrollToBottom();
    },
    
    copySummary(summary) {
      navigator.clipboard.writeText(summary).then(() => {
        // Show copy confirmation (you could add a toast here)
        alert('Summary copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    },
    
    downloadPDF(summary) {
      // Simple PDF download simulation
      const blob = new Blob([`News Snap Summary\n\n${summary}`], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'news-snap-summary.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    }
  },
  mounted() {
    this.scrollToBottom();
  }
}
</script>

<style scoped>


.chat-header {
  background: var(--grey);
  color: var(--light);
  padding: 1.5rem 2rem;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.chat-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.chat-header p {
  margin: 0;
  opacity: 0.9;
  font-size: 0.9rem;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.message {
  display: flex;
  gap: 0.75rem;
  max-width: 85%;
}

.user-message {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.ai-message {
  align-self: flex-start;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user-message .message-avatar {
  background: var(--grey);
  color: var(--light);
}

.ai-message .message-avatar {
  background: var(--primary);
  color: var(--light);
}

.message-content {
  background: white;
  padding: 1rem 1.25rem;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex: 1;
}

.user-message .message-content {
  background: var(--grey);
  color: var(--light);
  border-bottom-right-radius: 6px;
}

.ai-message .message-content {
  border-bottom-left-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.message-content p {
  margin: 0;
  line-height: 1.5;
}

.summary-content {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.user-message .summary-content {
  border-top-color: rgba(255, 255, 255, 0.2);
}

.summary-content h4 {
  margin: 0 0 0.5rem 0;
  color: var(--primary);
  font-size: 1rem;
}

.user-message .summary-content h4 {
  color: var(--light);
}

.summary-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.action-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.copy-btn {
  background: var(--primary);
  color: var(--light);
}

.copy-btn:hover {
  background: #333;
  transform: translateY(-1px);
}

.download-btn {
  background: var(--grey);
  color: var(--light);
}

.download-btn:hover {
  background: #6a0000;
  transform: translateY(-1px);
}

.typing-indicator {
  display: flex;
  gap: 0.25rem;
  padding: 0.5rem 0;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--primary);
  animation: typing 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
.typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

@keyframes typing {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

.chat-input-container {
  padding: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background: white;
}

.paste-link-section {
  display: flex;
  justify-content: center;
}

.paste-link-btn {
  background: var(--grey);
  color: var(--light);
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.paste-link-btn:hover {
  background: #6a0000;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(90, 0, 0, 0.3);
}

.link-input-container {
  display: flex;
  gap: 0.75rem;
  width: 100%;
  max-width: 500px;
}

.link-input {
  flex: 1;
  padding: 1rem 1.25rem;
  border: 2px solid var(--grey);
  border-radius: 25px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
}

.link-input:focus {
  border-color: var(--primary);
}

.send-btn {
  background: var(--primary);
  color: var(--light);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.send-btn:hover {
  background: #333;
  transform: scale(1.05);
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
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-content h3 {
  margin: 0 0 0.5rem 0;
  color: var(--primary);
  font-size: 1.5rem;
}

.modal-content p {
  margin: 0 0 1.5rem 0;
  color: #666;
}

.length-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.length-option {
  padding: 1.25rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.length-option:hover {
  border-color: var(--grey);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.option-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.option-header i {
  color: var(--grey);
  font-size: 1.25rem;
}

.option-header h4 {
  margin: 0;
  color: var(--primary);
  font-size: 1.1rem;
}

.length-option p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.cancel-btn {
  width: 100%;
  padding: 0.75rem;
  background: #f0f0f0;
  color: #666;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background: #e0e0e0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .chat-container {
    height: calc(100vh - 100px);
    border-radius: 0;
    margin: 0;
  }
  
  .message {
    max-width: 90%;
  }
  
  .chat-header {
    padding: 1rem 1.5rem;
  }
  
  .chat-messages {
    padding: 1rem;
  }
  
  .chat-input-container {
    padding: 1rem;
  }
  
  .link-input-container {
    flex-direction: column;
  }
  
  .send-btn {
    width: 100%;
    height: 45px;
    border-radius: 25px;
  }
  
  .summary-actions {
    flex-direction: column;
  }
  
  .action-btn {
    justify-content: center;
  }
  
  .modal-content {
    margin: 1rem;
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .message {
    max-width: 95%;
  }
  
  .message-avatar {
    width: 35px;
    height: 35px;
  }
  
  .message-content {
    padding: 0.75rem 1rem;
  }
  
  .paste-link-btn {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
}
</style>