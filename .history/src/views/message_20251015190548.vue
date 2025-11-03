<template>
  <div class="message-page">
    <!-- Sidebar with conversation list -->
    <div class="conversation-sidebar" :class="{ 'sidebar-collapsed': !isSidebarExpanded }">
      <div class="sidebar-header">
        <h2>Messages</h2>
      </div>
      
      <div class="conversation-list">
        <div
          v-for="conversation in conversations"
          :key="conversation.id"
          class="conversation-item"
          :class="{ active: activeConversation?.id === conversation.id }"
          @click="selectConversation(conversation)"
        >
          <div class="avatar">
            <span class="material-icons">account_circle</span>
          </div>
          <div class="conversation-info">
            <div class="user-name">{{ conversation.userName }}</div>
            <div class="last-message">{{ conversation.lastMessage }}</div>
            <div class="timestamp">{{ conversation.timestamp }}</div>
          </div>
          <div v-if="conversation.unreadCount > 0" class="unread-badge">
            {{ conversation.unreadCount }}
          </div>
        </div>
      </div>
    </div>

    <!-- Main chat area -->
    <div class="chat-area">
      <div v-if="activeConversation" class="chat-container">
        <!-- Chat header -->
        <div class="chat-header">
          <div class="chat-user-info">
            <span class="material-icons">account_circle</span>
            <span class="user-name">{{ activeConversation.userName }}</span>
            <span class="status" :class="activeConversation.status">{{ activeConversation.status }}</span>
          </div>
        </div>

        <!-- Messages container -->
        <div class="messages-container" ref="messagesContainer">
          <div
            v-for="message in activeConversation.messages"
            :key="message.id"
            class="message"
            :class="message.sender"
          >
            <div v-if="message.type === 'image'" class="message-image">
              <img :src="message.content" alt="Sent image" @click="openImageModal(message.content)" />
            </div>
            <div v-else class="message-content">
              {{ message.content }}
            </div>
            <div class="message-time">
              {{ message.time }}
            </div>
          </div>
        </div>

        <!-- Message input -->
        <div class="message-input-container">
          <div class="input-wrapper">
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="handleImageUpload"
              style="display: none"
            >
            <button @click="triggerFileInput" class="attach-button">
              <span class="material-icons">attach_file</span>
            </button>
            <input
              v-model="newMessage"
              type="text"
              placeholder="Type a message..."
              @keyup.enter="sendMessage"
              class="message-input"
            >
            <button @click="sendMessage" class="send-button">
              <span class="material-icons">send</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty state when no conversation selected -->
      <div v-else class="no-conversation">
        <div class="empty-state">
          <span class="material-icons">chat</span>
          <h3>Select a conversation</h3>
          <p>Choose a conversation from the list to start messaging</p>
        </div>
      </div>
    </div>

    <!-- Image Modal -->
    <div v-if="showImageModal" class="image-modal" @click="closeImageModal">
      <div class="modal-content">
        <span class="close-button material-icons" @click="closeImageModal">close</span>
        <img :src="selectedImage" alt="Enlarged image" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

// Reactive data
const isSidebarExpanded = ref(true)
const activeConversation = ref(null)
const newMessage = ref('')
const messagesContainer = ref(null)
const fileInput = ref(null)
const showImageModal = ref(false)
const selectedImage = ref('')

// Sample conversations data
const conversations = ref([
  {
    id: 1,
    userName: 'John Doe',
    lastMessage: 'Thanks for the help!',
    timestamp: '10:30 AM',
    unreadCount: 2,
    status: 'online',
    messages: [
      { id: 1, content: 'Hi sah!', sender: 'them', time: '10:15 AM', type: 'text' },
      { id: 2, content: 'Uy musta my young stunna?', sender: 'me', time: '10:16 AM', type: 'text' },
      { id: 3, content: 'Need ko help sa project namin', sender: 'them', time: '10:20 AM', type: 'text' },
      { id: 4, content: 'Ay bounce na ko jan sah', sender: 'me', time: '10:25 AM', type: 'text' },
      { id: 5, content: 'Awit, makikita mo talaga kung sino sasama sa zero days mo', sender: 'them', time: '10:30 AM', type: 'text' }
    ]
  },
  {
    id: 2,
    userName: 'Sarah Wilson',
    lastMessage: 'See you tomorrow!',
    timestamp: 'Yesterday',
    unreadCount: 0,
    status: 'offline',
    messages: [
      { id: 1, content: 'Meeting tomorrow at 3 PM', sender: 'them', time: 'Yesterday', type: 'text' },
      { id: 2, content: 'Owkie dowkie', sender: 'me', time: 'Yesterday', type: 'text' }
    ]
  },
  {
    id: 3,
    userName: 'Mike Johnson',
    lastMessage: 'Tapos na po maem',
    timestamp: '12/15/2024',
    unreadCount: 1,
    status: 'online',
    messages: [
      { id: 1, content: 'The files you requested are ready for review', sender: 'them', time: '12/15/2024', type: 'text' }
    ]
  }
])

// Methods
const toggleSidebar = () => {
  isSidebarExpanded.value = !isSidebarExpanded.value
}

const selectConversation = (conversation) => {
  activeConversation.value = conversation
  // Mark as read when selected
  conversation.unreadCount = 0
  // Scroll to bottom of messages
  nextTick(() => {
    scrollToBottom()
  })
}

const sendMessage = () => {
  if (!newMessage.value.trim() || !activeConversation.value) return

  const newMsg = {
    id: Date.now(),
    content: newMessage.value,
    sender: 'me',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    type: 'text'
  }

  activeConversation.value.messages.push(newMsg)
  activeConversation.value.lastMessage = newMessage.value
  activeConversation.value.timestamp = 'Just now'
  
  newMessage.value = ''
  
  // Scroll to bottom after sending
  nextTick(() => {
    scrollToBottom()
  })
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file || !activeConversation.value) return

  // Create a URL for the uploaded image
  const imageUrl = URL.createObjectURL(file)

  const newMsg = {
    id: Date.now(),
    content: imageUrl,
    sender: 'me',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    type: 'image'
  }

  activeConversation.value.messages.push(newMsg)
  activeConversation.value.lastMessage = '[Image]'
  activeConversation.value.timestamp = 'Just now'

  // Reset file input
  event.target.value = ''

  // Scroll to bottom after sending
  nextTick(() => {
    scrollToBottom()
  })
}

const openImageModal = (imageUrl) => {
  selectedImage.value = imageUrl
  showImageModal.value = true
}

const closeImageModal = () => {
  showImageModal.value = false
  selectedImage.value = ''
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// Lifecycle
onMounted(() => {
  // Select first conversation by default
  if (conversations.value.length > 0) {
    selectConversation(conversations.value[0])
  }
})
</script>

<style scoped>
.message-page {
  display: flex;
  height: calc(100vh - 60px);
  margin-top: -5px;
  background-color: var(--light);
}

/* Conversation Sidebar Styles */
.conversation-sidebar {
  width: 350px;
  background-color: white;
  border-right: 1px solid var(--grey);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  overflow: hidden;
}

.sidebar-collapsed {
  width: 60px;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--grey);
  background-color: var(--grey);
}

.sidebar-header h2 {
  margin: 0;
  color: var(--primary);
  font-size: 1.5rem;
}

.toggle-sidebar {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--primary);
  padding: 0.5rem;
  border-radius: 0.25rem;
}

.toggle-sidebar:hover {
  background-color: var(--light);
}

.conversation-list {
  flex: 1;
  overflow-y: auto;
}

/* Custom scrollbar for conversation list */
.conversation-list::-webkit-scrollbar {
  width: 6px;
}

.conversation-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.conversation-list::-webkit-scrollbar-thumb {
  background: var(--primary);
  border-radius: 3px;
}

.conversation-list::-webkit-scrollbar-thumb:hover {
  background: var(--dark);
}

.conversation-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  border-bottom: 1px solid var(--grey);
  transition: background-color 0.2s ease;
  position: relative;
}

.conversation-item:hover {
  background-color: var(--light);
}

.conversation-item.active {
  background-color: var(--primary);
  color: white;
}

.conversation-item.active .user-name,
.conversation-item.active .last-message,
.conversation-item.active .timestamp {
  color: white;
}

.avatar {
  margin-right: 1rem;
  flex-shrink: 0;
}

.avatar .material-icons {
  font-size: 2.5rem;
  color: var(--primary);
}

.conversation-item.active .avatar .material-icons {
  color: white;
}

.conversation-info {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--primary);
}

.last-message {
  font-size: 0.875rem;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.timestamp {
  font-size: 0.75rem;
  color: #999;
  margin-top: 0.25rem;
}

.unread-badge {
  background-color: #ff4757;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}

/* Chat Area Styles */
.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: white;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 103%;
}

.chat-header {
  padding: 1rem;
  border-bottom: 1px solid var(--grey);
  background-color: white;
}

.chat-user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.chat-user-info .material-icons {
  font-size: 2rem;
  color: var(--primary);
}

.status {
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  text-transform: capitalize;
}

.status.online {
  background-color: #2ed573;
  color: white;
}

.status.offline {
  background-color: #747d8c;
  color: white;
}

.messages-container {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #f8f9fa;
}

/* Custom scrollbar for messages */
.messages-container::-webkit-scrollbar {
  width: 8px;
}

.messages-container::-webkit-scrollbar-track {
  background: #e9ecef;
  border-radius: 4px;
}

.messages-container::-webkit-scrollbar-thumb {
  background: #adb5bd;
  border-radius: 4px;
}

.messages-container::-webkit-scrollbar-thumb:hover {
  background: #6c757d;
}

.message {
  display: flex;
  flex-direction: column;
  max-width: 70%;
}

.message.me {
  align-self: flex-end;
  align-items: flex-end;
}

.message.them {
  align-self: flex-start;
  align-items: flex-start;
}

.message-content {
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  word-wrap: break-word;
}

.message.me .message-content {
  background-color: var(--primary);
  color: white;
  border-bottom-right-radius: 0.25rem;
}

.message.them .message-content {
  background-color: white;
  color: var(--primary);
  border: 1px solid var(--grey);
  border-bottom-left-radius: 0.25rem;
}

.message-image img {
  max-width: 300px;
  max-height: 300px;
  border-radius: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.message-image img:hover {
  transform: scale(1.02);
}

.message.me .message-image img {
  border-bottom-right-radius: 0.25rem;
}

.message.them .message-image img {
  border-bottom-left-radius: 0.25rem;
}

.message-time {
  font-size: 0.75rem;
  color: #999;
  margin-top: 0.25rem;
}

.message-input-container {
  padding: 1rem;
  border-top: 1px solid var(--grey);
  background-color: white;
}

.input-wrapper {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.message-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid var(--grey);
  border-radius: 2rem;
  outline: none;
  font-size: 1rem;
}

.message-input:focus {
  border-color: var(--primary);
}

.attach-button {
  background-color: transparent;
  color: var(--primary);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.attach-button:hover {
  background-color: var(--light);
}

.send-button {
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.send-button:hover {
  background-color: var(--dark);
}

.no-conversation {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
}

.empty-state {
  text-align: center;
  color: #666;
}

.empty-state .material-icons {
  font-size: 4rem;
  color: var(--grey);
  margin-bottom: 1rem;
}

/* Image Modal Styles */
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.modal-content img {
  max-width: 100%;
  max-height: 90vh;
  border-radius: 0.5rem;
}

.close-button {
  position: absolute;
  top: -40px;
  right: 0;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  background: rgba(0, 0, 0, 0.7);
}

/* Responsive Design */
@media (max-width: 768px) {
  .conversation-sidebar {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    z-index: 98;
    transform: translateX(0);
  }
  
  .sidebar-collapsed {
    transform: translateX(-100%);
  }
  
  .chat-area {
    width: 100%;
  }
  
  .message {
    max-width: 85%;
  }
  
  .message-image img {
    max-width: 250px;
    max-height: 250px;
  }
}

/* Material Icons alignment fix */
.material-icons {
  vertical-align: bottom;
}
</style>