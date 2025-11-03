<template>
  <div class="chat-container">
    <!-- Chat Messages Area -->
    <div class="chat-messages" ref="messagesContainer">
      <!-- Welcome Message -->
      <div class="message ai-message">
        <div class="message-content">
          <p>Hello! I'm your AI news summarizer. Paste a news article link below and I'll create a summary for you.</p>
        </div>
      </div>

      <!-- User Messages (Links) -->
      <div 
        v-for="(message, index) in messages" 
        :key="index" 
        :class="['message', message.type + '-message']"
      >
        <div class="message-content">
          <div v-if="message.type === 'user'" class="link-content">
            <span class="link-icon">🔗</span>
            <span class="link-text">{{ message.content }}</span>
          </div>
          <div v-else-if="message.type === 'ai' && message.summary" class="summary-content">
            <div class="summary-text">{{ message.summary }}</div>
            <div class="summary-actions" v-if="message.summary">
              <button class="action-btn copy-btn" @click="copySummary(message.summary)">
                <span class="material-icons">content_copy</span>
                Copy Summary
              </button>
              <button class="action-btn download-btn" @click="downloadPDF(message.summary)">
                <span class="material-icons">download</span>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading Indicator -->
      <div v-if="isLoading" class="message ai-message">
        <div class="message-content">
          <div class="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="chat-input-container">
      <div class="chat-input-wrapper">
        <button class="paste-link-btn" @click="showLinkInput = true" v-if="!showLinkInput">
          <span class="material-icons">link</span>
          Paste Link
        </button>
        
        <div v-if="showLinkInput" class="link-input-wrapper">
          <input
            type="text"
            v-model="linkInput"
            placeholder="Paste your news article link here..."
            class="link-input"
            @keypress.enter="processLink"
          />
          <button class="send-btn" @click="processLink" :disabled="!linkInput.trim()">
            <span class="material-icons">send</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Summary Length Modal -->
    <div v-if="showLengthModal" class="modal-overlay" @click="showLengthModal = false">
      <div class="modal-content" @click.stop>
        <h3>Choose Summary Length</h3>
        <div class="length-options">
          <div class="length-option" @click="selectLength('short')">
            <div class="option-header">
              <span class="option-icon">⚡</span>
              <h4>Short</h4>
            </div>
            <p>Quick overview of the main points</p>
          </div>
          
          <div class="length-option" @click="selectLength('standard')">
            <div class="option-header">
              <span class="option-icon">⚖️</span>
              <h4>Standard</h4>
            </div>
            <p>Balanced summary with key details</p>
          </div>
          
          <div class="length-option" @click="selectLength('long')">
            <div class="option-header">
              <span class="option-icon">📊</span>
              <h4>Long</h4>
            </div>
            <p>In-depth version for fuller understanding</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'

// Reactive data
const messages = ref([])
const linkInput = ref('')
const showLinkInput = ref(false)
const showLengthModal = ref(false)
const isLoading = ref(false)
const messagesContainer = ref(null)
const pendingLink = ref('')

// Scroll to bottom of chat
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

// Process link input
const processLink = () => {
  if (linkInput.value.trim()) {
    pendingLink.value = linkInput.value.trim()
    
    // Add user message
    messages.value.push({
      type: 'user',
      content: pendingLink.value
    })
    
    // Clear input and hide it
    linkInput.value = ''
    showLinkInput.value = false
    
    // Show length options modal
    showLengthModal.value = true
    
    scrollToBottom()
  }
}

// Select summary length
const selectLength = async (length) => {
  showLengthModal.value = false
  isLoading.value = true
  
  // Simulate AI processing
  setTimeout(() => {
    const summaries = {
      short: "This is a short summary of the news article. It provides the main points and key takeaways in a concise format, perfect for quick reading and getting the gist of the content.",
      standard: "This is a standard length summary that balances brevity with detail. It covers the main points while including important context and key details that help understand the full scope of the news article. The summary maintains clarity while providing sufficient information for most readers.",
      long: "This is a comprehensive, in-depth summary that provides detailed analysis of the news article. It covers all major points, includes supporting evidence, contextual background, and explores implications. This version is ideal for readers who want thorough understanding without reading the full original content. It maintains the article's core message while condensing the information into a more digestible format."
    }
    
    // Add AI message with summary
    messages.value.push({
      type: 'ai',
      summary: summaries[length]
    })
    
    isLoading.value = false
    scrollToBottom()
  }, 2000)
  
  scrollToBottom()
}

// Copy summary to clipboard
const copySummary = async (summary) => {
  try {
    await navigator.clipboard.writeText(summary)
    // You could add a toast notification here
    alert('Summary copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy summary:', err)
    alert('Failed to copy summary. Please try again.')
  }
}

// Download summary as PDF
const downloadPDF = (summary) => {
  // Simple PDF download simulation
  const blob = new Blob([summary], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'news-summary.txt' // Using .txt for simplicity
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  
  alert('Summary downloaded!')
}

// Watch for sidebar changes to adjust layout
watch(() => messages.value, () => {
  scrollToBottom()
}, { deep: true })
</script>

<style scoped>
body, html {
  overflow: hidden;
}
.chat-container {
  display: flex;
  flex-direction: column;
  height: 90vh;
  background-color: var(--light);
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 0;
}

.message {
  display: flex;
  max-width: 100%;
}

.ai-message {
  justify-content: flex-start;
}

.user-message {
  justify-content: flex-end;
}

.message-content {
  max-width: 70%;
  padding: 1rem 1.5rem;
  border-radius: 1.5rem;
  word-wrap: break-word;
}

.ai-message .message-content {
  background-color: var(--light);
  border: 2px solid var(--grey);
  color: var(--primary);
  border-bottom-left-radius: 0.5rem;
}

.user-message .message-content {
  background-color: var(--grey);
  color: var(--light);
  border-bottom-right-radius: 0.5rem;
}

.link-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.link-icon {
  font-size: 1.2rem;
}

.link-text {
  font-size: 0.9rem;
  opacity: 0.9;
}

.summary-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.summary-text {
  line-height: 1.6;
  white-space: pre-wrap;
}

.summary-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.copy-btn {
  background-color: var(--light);
  color: var(--primary);
  border: 1px solid var(--grey);
}

.copy-btn:hover {
  background-color: var(--grey);
  color: var(--light);
}

.download-btn {
  background-color: var(--primary);
  color: var(--light);
}

.download-btn:hover {
  background-color: var(--grey);
}

.chat-input-container {
  padding: 1rem;
  background-color: var(--light);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0;
}

.chat-input-wrapper {
  max-width: 100%;
  margin: 0 auto;
}

.paste-link-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background-color: var(--grey);
  color: var(--light);
  border: none;
  border-radius: 2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 auto;
  font-family: inherit;
}

.paste-link-btn:hover {
  background-color: var(--primary);
  transform: translateY(-2px);
}

.link-input-wrapper {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  background-color: var(--light);
  border: 2px solid var(--grey);
  border-radius: 2rem;
  padding: 0.5rem;
}

.link-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 0.75rem 1rem;
  background: transparent;
  font-size: 1rem;
  color: var(--primary);
  font-family: inherit;
}

.link-input::placeholder {
  color: rgba(0, 0, 0, 0.5);
}

.send-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background-color: var(--grey);
  color: var(--light);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.send-btn:hover:not(:disabled) {
  background-color: var(--primary);
  transform: scale(1.05);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Loading Animation */
.loading-dots {
  display: flex;
  gap: 0.25rem;
}

.loading-dots span {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: var(--grey);
  animation: bounce 1.4s infinite ease-in-out both;
}

.loading-dots span:nth-child(1) { animation-delay: -0.32s; }
.loading-dots span:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--light);
  padding: 2rem;
  border-radius: 1rem;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-content h3 {
  color: var(--primary);
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.5rem;
}

.length-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.length-option {
  padding: 1.5rem;
  border: 2px solid var(--grey);
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: var(--light);
}

.length-option:hover {
  background-color: var(--grey);
  color: var(--light);
  transform: translateY(-2px);
}

.length-option:hover .option-header h4,
.length-option:hover p {
  color: var(--light);
}

.option-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.option-icon {
  font-size: 1.5rem;
}

.option-header h4 {
  color: var(--primary);
  margin: 0;
  font-size: 1.2rem;
}

.length-option p {
  color: var(--primary);
  margin: 0;
  opacity: 0.8;
  font-size: 0.95rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .chat-messages {
    padding: 0.5rem;
    gap: 1rem;
  }
  
  .message-content {
    max-width: 85%;
    padding: 0.75rem 1rem;
  }
  
  .chat-input-container {
    padding: 0.75rem;
  }
  
  .paste-link-btn {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
  
  .modal-content {
    margin: 1rem;
    padding: 1.5rem;
  }
  
  .length-option {
    padding: 1rem;
  }
  
  .summary-actions {
    flex-direction: column;
  }
  
  .action-btn {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .message-content {
    max-width: 90%;
    padding: 0.5rem 0.75rem;
  }
  
  .link-input-wrapper {
    padding: 0.25rem;
  }
  
  .link-input {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
  }
  
  .send-btn {
    width: 2.5rem;
    height: 2.5rem;
  }
}
</style>