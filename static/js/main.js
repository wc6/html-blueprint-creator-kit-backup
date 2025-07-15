// Philips Chat Assistant JavaScript

class ChatApp {
    constructor() {
        this.currentChatId = 'current';
        this.messages = [];
        this.isLoading = false;
        
        this.initializeElements();
        this.bindEvents();
        this.initializeTextarea();
    }

    initializeElements() {
        // Core elements
        this.sidebar = document.getElementById('sidebar');
        this.sidebarToggle = document.getElementById('sidebarToggle');
        this.newChatBtn = document.getElementById('newChatBtn');
        this.welcomeScreen = document.getElementById('welcomeScreen');
        this.chatMessages = document.getElementById('chatMessages');
        this.chatForm = document.getElementById('chatForm');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.loadingIndicator = document.getElementById('loadingIndicator');
        
        // User modal elements
        this.userInfo = document.getElementById('userInfo');
        this.userModal = document.getElementById('userModal');
        this.closeModal = document.getElementById('closeModal');
        
        // Suggestion cards
        this.suggestionCards = document.querySelectorAll('.suggestion-card');
        
        // Chat items
        this.chatItems = document.querySelectorAll('.chat-item');
    }

    bindEvents() {
        // Sidebar toggle
        this.sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        
        // New chat button
        this.newChatBtn.addEventListener('click', () => this.startNewChat());
        
        // Chat form submission
        this.chatForm.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Message input events
        this.messageInput.addEventListener('input', () => this.handleInputChange());
        this.messageInput.addEventListener('keydown', (e) => this.handleKeyDown(e));
        
        // User modal events
        this.userInfo.addEventListener('click', () => this.showUserModal());
        this.closeModal.addEventListener('click', () => this.hideUserModal());
        this.userModal.addEventListener('click', (e) => {
            if (e.target === this.userModal) this.hideUserModal();
        });
        
        // Suggestion cards
        this.suggestionCards.forEach(card => {
            card.addEventListener('click', () => {
                const suggestion = card.dataset.suggestion;
                this.sendMessage(suggestion);
            });
        });
        
        // Chat item selection
        this.chatItems.forEach(item => {
            item.addEventListener('click', () => this.selectChat(item));
        });
        
        // Window resize
        window.addEventListener('resize', () => this.handleResize());
        
        // Initial resize check
        this.handleResize();
    }

    initializeTextarea() {
        // Auto-resize textarea
        this.messageInput.addEventListener('input', () => {
            this.messageInput.style.height = 'auto';
            this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
        });
    }

    toggleSidebar() {
        if (window.innerWidth <= 768) {
            // Mobile: toggle sidebar visibility
            this.sidebar.classList.toggle('open');
        } else {
            // Desktop: toggle sidebar width
            this.sidebar.classList.toggle('collapsed');
        }
    }

    handleResize() {
        if (window.innerWidth > 768) {
            // Desktop: remove mobile classes
            this.sidebar.classList.remove('open');
        } else {
            // Mobile: remove desktop collapsed state
            this.sidebar.classList.remove('collapsed');
        }
    }

    startNewChat() {
        this.currentChatId = 'new_' + Date.now();
        this.messages = [];
        this.showWelcomeScreen();
        this.clearChatSelection();
        this.messageInput.focus();
    }

    showWelcomeScreen() {
        this.welcomeScreen.style.display = 'flex';
        this.chatMessages.style.display = 'none';
    }

    showChatMessages() {
        this.welcomeScreen.style.display = 'none';
        this.chatMessages.style.display = 'block';
    }

    clearChatSelection() {
        this.chatItems.forEach(item => item.classList.remove('active'));
    }

    selectChat(chatItem) {
        this.clearChatSelection();
        chatItem.classList.add('active');
        this.currentChatId = chatItem.dataset.chatId;
        
        // Load chat messages (in real app, this would fetch from server)
        this.loadChatMessages(this.currentChatId);
    }

    loadChatMessages(chatId) {
        // Simulate loading chat messages
        if (chatId === 'current') {
            this.messages = []; // Empty for demo
            this.showWelcomeScreen();
        } else {
            // In real app, fetch messages from server
            this.messages = [];
            this.showWelcomeScreen();
        }
        
        this.renderMessages();
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const message = this.messageInput.value.trim();
        if (!message || this.isLoading) return;
        
        this.sendMessage(message);
    }

    async sendMessage(messageText) {
        if (this.isLoading) return;
        
        // Add user message
        this.addMessage('user', messageText);
        this.messageInput.value = '';
        this.updateCharCount();
        this.autoResizeTextarea();
        
        // Show chat messages if showing welcome screen
        if (this.welcomeScreen.style.display !== 'none') {
            this.showChatMessages();
        }
        
        // Show loading indicator
        this.showLoading();
        
        // Simulate AI response
        try {
            await this.simulateAIResponse(messageText);
        } catch (error) {
            console.error('Error sending message:', error);
            this.addMessage('assistant', '抱歉，发生了错误。请稍后重试。');
        } finally {
            this.hideLoading();
        }
        
        // Focus input
        this.messageInput.focus();
    }

    addMessage(sender, content) {
        const message = {
            id: Date.now(),
            sender,
            content,
            timestamp: this.formatTimestamp(new Date())
        };
        
        this.messages.push(message);
        this.renderMessage(message);
        this.scrollToBottom();
    }

    renderMessages() {
        this.chatMessages.innerHTML = '';
        this.messages.forEach(message => this.renderMessage(message));
        this.scrollToBottom();
    }

    renderMessage(message) {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${message.sender}`;
        
        const isUser = message.sender === 'user';
        
        messageEl.innerHTML = `
            ${!isUser ? `
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
            ` : ''}
            <div class="message-content">
                <div class="message-text">${this.escapeHtml(message.content)}</div>
                <div class="message-time">${message.timestamp}</div>
            </div>
            ${isUser ? `
                <div class="message-avatar">
                    <div class="user-avatar-small">U</div>
                </div>
            ` : ''}
        `;
        
        this.chatMessages.appendChild(messageEl);
        
        // Animate message appearance
        messageEl.style.opacity = '0';
        messageEl.style.transform = 'translateY(10px)';
        
        requestAnimationFrame(() => {
            messageEl.style.transition = 'all 0.3s ease-out';
            messageEl.style.opacity = '1';
            messageEl.style.transform = 'translateY(0)';
        });
    }

    async simulateAIResponse(userMessage) {
        // Simulate thinking time
        await this.delay(1000 + Math.random() * 2000);
        
        // Generate response based on user message
        const response = this.generateAIResponse(userMessage);
        this.addMessage('assistant', response);
    }

    generateAIResponse(userMessage) {
        const responses = {
            'hello': '你好！很高兴与你对话。我是小飞同学，你的AI助手。有什么我可以帮助你的吗？',
            'philips': 'Philips是一家全球领先的健康科技公司，致力于在整个健康连续体中改善人们的健康和福祉。',
            'health': '健康的生活方式包括均衡饮食、规律运动、充足睡眠和定期体检。你想了解哪个方面的具体信息？',
            'smart home': 'Philips的智能家居产品包括Hue智能照明系统、空气净化器、智能音响等，让你的家更智能、更舒适。',
            'default': '感谢你的问题！作为你的AI助手，我会尽力为你提供帮助。你还有其他问题吗？'
        };
        
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('你好') || lowerMessage.includes('hi')) {
            return responses.hello;
        } else if (lowerMessage.includes('philips') || lowerMessage.includes('飞利浦')) {
            return responses.philips;
        } else if (lowerMessage.includes('健康') || lowerMessage.includes('health')) {
            return responses.health;
        } else if (lowerMessage.includes('智能家居') || lowerMessage.includes('smart home')) {
            return responses['smart home'];
        } else {
            return responses.default;
        }
    }

    showLoading() {
        this.isLoading = true;
        this.loadingIndicator.style.display = 'block';
        this.sendBtn.disabled = true;
    }

    hideLoading() {
        this.isLoading = false;
        this.loadingIndicator.style.display = 'none';
        this.sendBtn.disabled = false;
    }

    scrollToBottom() {
        requestAnimationFrame(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        });
    }

    handleInputChange() {
        this.updateCharCount();
        this.autoResizeTextarea();
        this.updateSendButton();
    }

    handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.handleSubmit(e);
        }
    }

    updateCharCount() {
        const charCount = this.messageInput.value.length;
        const charCountEl = document.querySelector('.char-count');
        if (charCountEl) {
            charCountEl.textContent = `${charCount}/2000`;
            
            if (charCount > 1800) {
                charCountEl.style.color = '#EF4444';
            } else if (charCount > 1500) {
                charCountEl.style.color = '#F59E0B';
            } else {
                charCountEl.style.color = 'var(--text-muted)';
            }
        }
    }

    autoResizeTextarea() {
        this.messageInput.style.height = 'auto';
        this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
    }

    updateSendButton() {
        const hasText = this.messageInput.value.trim().length > 0;
        this.sendBtn.disabled = !hasText || this.isLoading;
    }

    showUserModal() {
        this.userModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    hideUserModal() {
        this.userModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    formatTimestamp(date) {
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) { // Less than 1 minute
            return '刚刚';
        } else if (diff < 3600000) { // Less than 1 hour
            const minutes = Math.floor(diff / 60000);
            return `${minutes}分钟前`;
        } else if (diff < 86400000) { // Less than 1 day
            const hours = Math.floor(diff / 3600000);
            return `${hours}小时前`;
        } else {
            return date.toLocaleDateString('zh-CN', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatApp = new ChatApp();
});

// Handle modal actions
document.addEventListener('click', (e) => {
    if (e.target.matches('.action-btn')) {
        const actionText = e.target.querySelector('span').textContent;
        
        switch (actionText) {
            case '设置':
                alert('设置功能开发中...');
                break;
            case '导出聊天记录':
                alert('导出功能开发中...');
                break;
            case '帮助与支持':
                alert('帮助页面开发中...');
                break;
            case '退出登录':
                if (confirm('确定要退出登录吗？')) {
                    alert('已退出登录');
                    // In real app: redirect to login page
                }
                break;
        }
    }
});