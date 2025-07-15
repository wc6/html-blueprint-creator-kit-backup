"""
Philips Chat Assistant Flask Application
使用Jinja2模板的Flask后端示例
"""

from flask import Flask, render_template, request, jsonify, session
from datetime import datetime, timedelta
import uuid

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'  # 在生产环境中请更改

# 模拟用户数据
DEMO_USER = {
    'id': '1',
    'name': '张三',
    'email': 'zhangsan@example.com',
    'avatar': None,  # 可以设置头像URL
    'role': '普通用户'
}

# 模拟聊天历史数据
DEMO_CHATS = {
    'recent_chats': [
        {'id': 'chat1', 'title': '关于健康生活方式的咨询'},
        {'id': 'chat2', 'title': 'Philips产品推荐'},
    ],
    'yesterday_chats': [
        {'id': 'chat3', 'title': '智能家居设备配置'},
    ],
    'week_chats': [
        {'id': 'chat4', 'title': '医疗设备使用指南'},
        {'id': 'chat5', 'title': '睡眠质量改善建议'},
    ]
}

@app.route('/')
def index():
    """主页 - 聊天界面"""
    return render_template('index.html', 
                         title='Philips 小飞同学',
                         user=DEMO_USER,
                         recent_chats=DEMO_CHATS['recent_chats'],
                         yesterday_chats=DEMO_CHATS['yesterday_chats'],
                         week_chats=DEMO_CHATS['week_chats'])

@app.route('/chat/<chat_id>')
def chat_detail(chat_id):
    """特定聊天详情页"""
    # 模拟聊天消息
    messages = []
    if chat_id == 'chat1':
        messages = [
            {
                'sender': 'user',
                'content': '你好，我想了解一些健康生活方式的建议',
                'timestamp': '10:30'
            },
            {
                'sender': 'assistant', 
                'content': '你好！我很乐意为你提供健康生活方式的建议。健康的生活方式主要包括：均衡饮食、规律运动、充足睡眠和良好的心理状态。你想了解哪个方面的具体信息呢？',
                'timestamp': '10:31'
            }
        ]
    
    return render_template('index.html',
                         title='Philips 小飞同学',
                         user=DEMO_USER,
                         messages=messages,
                         recent_chats=DEMO_CHATS['recent_chats'],
                         yesterday_chats=DEMO_CHATS['yesterday_chats'],
                         week_chats=DEMO_CHATS['week_chats'])

@app.route('/api/send_message', methods=['POST'])
def send_message():
    """处理发送消息的API"""
    data = request.get_json()
    message = data.get('message', '').strip()
    
    if not message:
        return jsonify({'error': '消息不能为空'}), 400
    
    # 模拟AI响应
    ai_responses = {
        'philips': 'Philips是一家全球领先的健康科技公司，致力于在整个健康连续体中改善人们的健康和福祉。我们的产品涵盖医疗设备、消费电子和照明解决方案。',
        'health': '健康的生活方式包括：1. 均衡饮食 - 多吃蔬果，少吃加工食品；2. 规律运动 - 每周至少150分钟中等强度运动；3. 充足睡眠 - 成人每晚7-9小时；4. 心理健康 - 保持积极心态，适当减压。',
        'smart_home': 'Philips智能家居产品包括：Hue智能照明系统，可以调节颜色和亮度；空气净化器，改善室内空气质量；智能音响，支持语音控制；还有各种智能传感器和控制器。',
        'default': '感谢你的问题！作为你的AI助手，我会尽力为你提供帮助。如果你有任何关于健康、科技或Philips产品的问题，随时可以问我。'
    }
    
    # 简单的关键词匹配
    message_lower = message.lower()
    if 'philips' in message_lower or '飞利浦' in message_lower:
        response = ai_responses['philips']
    elif '健康' in message_lower or 'health' in message_lower:
        response = ai_responses['health']
    elif '智能家居' in message_lower or 'smart home' in message_lower:
        response = ai_responses['smart_home']
    else:
        response = ai_responses['default']
    
    return jsonify({
        'response': response,
        'timestamp': datetime.now().strftime('%H:%M')
    })

@app.route('/api/new_chat', methods=['POST'])
def new_chat():
    """创建新对话"""
    chat_id = str(uuid.uuid4())
    return jsonify({
        'chat_id': chat_id,
        'title': '新对话'
    })

@app.route('/api/user_info')
def user_info():
    """获取用户信息"""
    return jsonify(DEMO_USER)

@app.errorhandler(404)
def not_found(error):
    """404错误页面"""
    return render_template('index.html',
                         title='页面未找到 - Philips 小飞同学',
                         user=DEMO_USER), 404

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)