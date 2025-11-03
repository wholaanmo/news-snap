<template>
    <div class="message-page">
      <!-- Sidebar with conversation list -->
      <div class="conversation-sidebar" :class="{ 'sidebar-collapsed': !isSidebarExpanded }">
        <div class="sidebar-header">
          <h2>Messages</h2>
          <button class="toggle-sidebar" @click="toggleSidebar">
            <span class="material-icons">{{ isSidebarExpanded ? 'chevron_left' : 'chevron_right' }}</span>
          </button>
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
              <div class="message-content">
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
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, nextTick } from 'vue'
  
  // Reactive data
  const isSidebarExpanded = ref(true)
  const activeConversation = ref(null)
  const newMessage = ref('')
  const messagesContainer = ref(null)
  
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
        { id: 1, content: 'Hello there!', sender: 'them', time: '10:15 AM' },
        { id: 2, content: 'Hi! How can I help you?', sender: 'me', time: '10:16 AM' },
        { id: 3, content: 'I need some assistance with my project', sender: 'them', time: '10:20 AM' },
        { id: 4, content: 'Sure, what do you need help with?', sender: 'me', time: '10:25 AM' },
        { id: 5, content: 'Thanks for the help!', sender: 'them', time: '10:30 AM' }
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
        { id: 1, content: 'Meeting tomorrow at 3 PM', sender: 'them', time: 'Yesterday' },
        { id: 2, content: 'Got it, see you then!', sender: 'me', time: 'Yesterday' }
      ]
    },
    {
      id: 3,
      userName: 'Mike Johnson',
      lastMessage: 'The files are ready',
      timestamp: '12/15/2024',
      unreadCount: 1,
      status: 'online',
      messages: [
        { id: 1, content: 'The files you requested are ready for review', sender: 'them', time: '12/15/2024' }
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
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
    margin-top: 10px;
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
  }
  
  /* Material Icons alignment fix */
  .material-icons {
    vertical-align: bottom;
  }
  </style>