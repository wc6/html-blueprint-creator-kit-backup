# Philips Chat Assistant - Flask版本

基于Flask + Jinja2模板的聊天界面应用，完全重现React版本的功能和设计。

## 功能特点

✅ **完整的聊天界面** - 侧边栏 + 主聊天区域  
✅ **响应式设计** - 适配桌面和移动端  
✅ **Jinja2模板** - 服务端渲染，SEO友好  
✅ **用户信息管理** - 用户资料和弹窗  
✅ **聊天历史** - 分组显示和管理  
✅ **实时交互** - AJAX消息发送  
✅ **现代化UI** - Philips品牌设计系统  

## 项目结构

```
├── app.py                 # Flask主应用
├── templates/
│   └── index.html        # Jinja2主模板
├── static/
│   ├── css/
│   │   └── style.css     # 样式文件
│   ├── js/
│   │   └── main.js       # JavaScript逻辑
│   └── images/           # 图片资源
└── README.md
```

## 快速开始

### 1. 安装依赖

```bash
pip install flask
```

### 2. 运行应用

```bash
python app.py
```

### 3. 访问应用

打开浏览器访问：`http://localhost:5000`

## API接口

### 发送消息
```http
POST /api/send_message
Content-Type: application/json

{
  "message": "你好"
}
```

### 创建新对话
```http
POST /api/new_chat
```

### 获取用户信息
```http
GET /api/user_info
```

## 自定义配置

### 修改用户信息
在 `app.py` 中修改 `DEMO_USER` 字典：

```python
DEMO_USER = {
    'id': '1',
    'name': '你的名字',
    'email': 'your@email.com',
    'avatar': 'your-avatar-url.jpg',
    'role': '管理员'
}
```

### 添加聊天历史
在 `app.py` 中修改 `DEMO_CHATS` 字典来自定义聊天历史。

### 自定义AI响应
在 `send_message()` 函数中修改 `ai_responses` 字典来自定义AI回复逻辑。

## 样式自定义

所有样式都在 `static/css/style.css` 中，使用CSS变量进行主题配置：

```css
:root {
    --primary: #3B82F6;           /* 主色调 */
    --primary-hover: #2563EB;     /* 悬停色 */
    --background: #FFFFFF;        /* 背景色 */
    --text-primary: #1E293B;      /* 主文本色 */
    /* ... 更多变量 */
}
```

## JavaScript功能

`static/js/main.js` 包含所有交互逻辑：

- 侧边栏切换
- 消息发送和显示
- 用户模态框
- 响应式适配
- 自动滚动和动画

## 部署建议

### 生产环境配置

1. **设置密钥**
```python
app.secret_key = 'your-production-secret-key'
```

2. **使用WSGI服务器**
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

3. **Nginx配置**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    location /static {
        alias /path/to/your/app/static;
        expires 30d;
    }
}
```

## 扩展功能

### 数据库集成
推荐使用SQLAlchemy：

```python
from flask_sqlalchemy import SQLAlchemy

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///chat.db'
db = SQLAlchemy(app)
```

### 用户认证
推荐使用Flask-Login：

```python
from flask_login import LoginManager, login_required

login_manager = LoginManager()
login_manager.init_app(app)
```

### WebSocket支持
推荐使用Flask-SocketIO实现实时通信：

```python
from flask_socketio import SocketIO, emit

socketio = SocketIO(app)
```

## 技术栈

- **后端**: Flask 2.x
- **模板**: Jinja2
- **前端**: 原生HTML/CSS/JavaScript
- **UI框架**: 纯CSS (基于设计系统)
- **图标**: Font Awesome 6
- **字体**: 系统默认字体栈

## 浏览器支持

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

---

## React版本说明

此项目同时包含React版本的聊天界面，可通过以下方式运行：

### React版本快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### React版本技术栈

- Vite
- TypeScript  
- React
- shadcn-ui
- Tailwind CSS

### 部署React版本

访问 [Lovable](https://lovable.dev/projects/066460e0-9396-40dc-95e5-aaeb79f18f61) 并点击 Share -> Publish。

## 许可证

MIT License
