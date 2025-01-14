import request from './request';
import { Message, Conversation } from '../types/message';
import { RootState, store } from '../store';

// 存储键名
const MESSAGES_STORAGE_KEY = 'local_messages';
const CONVERSATIONS_STORAGE_KEY = 'local_conversations';

// 固定的测试用户ID，确保登录用户ID保持一致
const CURRENT_USER_ID = 1; // 固定当前用户的ID

// 智能助手配置
const AI_ASSISTANT = {
  userId: 0, // 使用0作为AI助手的ID
  username: "智能助手",
  avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=ai"
};

const TEST_USER = {
  userId: 2,
  username: "张三",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhang"
};

// 获取当前用户ID的辅助函数
const getCurrentUserId = () => {
  return CURRENT_USER_ID; // 始终返回固定的用户ID
};

// 从 localStorage 获取消息
const getStoredMessages = (): Message[] => {
  const stored = localStorage.getItem(MESSAGES_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

// 保存消息到 localStorage
const saveMessages = (messages: Message[]) => {
  localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
};

// 从 localStorage 获取会话
const getStoredConversations = (): Conversation[] => {
  const stored = localStorage.getItem(CONVERSATIONS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

// 保存会话到 localStorage
const saveConversations = (conversations: Conversation[]) => {
  localStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(conversations));
};

// 初始化默认消息
const initializeMessages = () => {
  let messages = getStoredMessages();
  if (messages.length === 0) {
    messages = [
      {
        messageId: 1,
        senderId: TEST_USER.userId,
        receiverId: CURRENT_USER_ID,
        content: "你好，我是张三",
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        isRead: true
      },
      {
        messageId: 2,
        senderId: CURRENT_USER_ID,
        receiverId: TEST_USER.userId,
        content: "你好，张三",
        createdAt: new Date(Date.now() - 3000000).toISOString(),
        isRead: true
      },
      {
        messageId: 3,
        senderId: TEST_USER.userId,
        receiverId: CURRENT_USER_ID,
        content: "很高兴认识你",
        createdAt: new Date(Date.now() - 2400000).toISOString(),
        isRead: true
      }
    ];
    saveMessages(messages);
  }
  return messages;
};

// 智能助手的回复逻辑
const getAIResponse = async (message: string) => {
  const msg = message.toLowerCase();
  let reply = '';

  // 检查是否是询问功能的问题
  const introQuestions = ['你可以做什么', '你能做什么', '你有什么功能', '你是谁', '介绍一下自己'];
  if (introQuestions.some(q => msg.includes(q))) {
    return `我是这个论坛的智能助手，很高兴为您服务！我可以：\n1. 回答关于发帖、评论等论坛使用问题\n2. 提供学习建议和帮助\n3. 陪你聊天解闷\n4. 回答一些简单的问题\n\n你可以试着问我一些具体的问题，我会尽力帮助你！😊`;
  }

  // 基础问候和常用语回复
  const basicResponses: { [key: string]: string[] } = {
    "你好": [
      "你好！我是智能助手，有什么可以帮你的吗？",
      "你好啊！今天有什么我能帮你的吗？",
      "很高兴见到你！需要什么帮助吗？"
    ],
    "在吗": [
      "我一直在这里，随时为你服务！",
      "在的，有什么需要帮助的吗？",
      "我在呢，请问有什么事？"
    ],
    "再见": [
      "再见！如果有问题随时来问我。",
      "下次见！祝你有愉快的一天！",
      "再见，期待下次与你交流！"
    ],
    "谢谢": [
      "不客气！很高兴能帮到你。",
      "这是我应该做的，随时都可以来找我。",
      "不用谢，能帮到你我很开心！"
    ]
  };

  // 功能性问题回复
  const functionResponses: { [key: string]: (param?: string) => string } = {
    "时间": () => `现在的时间是：${new Date().toLocaleTimeString()}`,
    "日期": () => `今天是：${new Date().toLocaleDateString()}`,
    "天气": () => "抱歉，我目前还不能查询天气信息。不过我可以帮你解答其他问题！",
    "帮助": () => `我可以帮你：
1. 回答基本问题
2. 查看时间日期
3. 提供学习建议
4. 解答论坛使用问题
5. 闲聊交谈
有什么需要了解的，尽管问我！`
  };

  // 论坛相关问题回复
  const forumResponses: { [key: string]: string } = {
    '发帖': '发帖步骤：\n1. 点击右上角的发帖按钮\n2. 选择合适的板块\n3. 填写标题和内容\n4. 可以添加标签\n5. 点击发布即可',
    '评论': '在帖子下方的评论框输入内容，点击发送即可评论。评论支持@其他用户，也可以回复具体的评论。'
  };

  // 学习建议回复
  const studyResponses: { [key: string]: string } = {
    "学习": "高效学习建议：\n1. 制定明确的学习计划\n2. 使用番茄工作法\n3. 及时复习和总结\n4. 多与同学交流讨论\n5. 保持充足的休息",
    "考试": "考试建议：\n1. 提前复习，制定计划\n2. 整理重点知识点\n3. 多做练习题\n4. 保持良好的作息\n5. 考前保持轻松心态",
    "专业": "选择专业建议：\n1. 了解自己的兴趣\n2. 考虑就业前景\n3. 评估自身能力\n4. 可以咨询学长学姐\n5. 关注行业发展动态",
    "实习": "找实习建议：\n1. 提前准备简历\n2. 关注招聘信息\n3. 提升相关技能\n4. 参加校园招聘会\n5. 多与学长学姐交流"
  };

  // 情感回复
  const emotionResponses: { [key: string]: string } = {
    "难过": "别难过，每个人都会遇到不开心的时候。说出来会好受些，我在这里听你说。",
    "开心": "很高兴听到你这么开心！愿你每天都能保持这样好的心情！",
    "压力": "压力是暂时的，要学会调节心情：\n1. 听听音乐\n2. 运动放松\n3. 与朋友聊天\n4. 适当休息\n5. 制定解决计划",
    "累": "感到累很正常，记得：\n1. 合理安排时间\n2. 保证充足睡眠\n3. 适当运动\n4. 劳逸结合\n5. 保持积极心态"
  };

  // 默认回复
  const defaultResponses = [
    "抱歉，我可能没有完全理解你的意思。你能换个方式描述吗？",
    "这个问题有点复杂，你能具体说说吗？",
    "我在学习理解你的问题，能详细解释一下吗？",
    "让我想想怎么回答比较好...",
    "这是个好问题，不过我需要更多信息才能帮你。"
  ];

  // 检查基础回复
  for (const [keyword, responses] of Object.entries(basicResponses)) {
    if (msg.includes(keyword)) {
      reply = responses[Math.floor(Math.random() * responses.length)];
      break;
    }
  }

  // 检查功能性问题
  for (const [keyword, func] of Object.entries(functionResponses)) {
    if (msg.includes(keyword)) {
      reply = func();
      break;
    }
  }

  // 检查论坛相关问题
  for (const [keyword, response] of Object.entries(forumResponses)) {
    if (msg.includes(keyword)) {
      reply = response;
      break;
    }
  }

  // 检查学习相关问题
  for (const [keyword, response] of Object.entries(studyResponses)) {
    if (msg.includes(keyword)) {
      reply = response;
      break;
    }
  }

  // 检查情感相关问题
  for (const [keyword, response] of Object.entries(emotionResponses)) {
    if (msg.includes(keyword)) {
      reply = response;
      break;
    }
  }

  // 如果没有匹配到任何回复，使用默认回复
  if (!reply) {
    reply = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }

  // 如果消息很短，可能是简单的表情符号或语气词
  if (message.length <= 2) {
    reply = message; // 简单地回复相同的表情或语气词
  }

  // 添加一些随机的语气词
  const emotions = ["😊", "👋", "💪", "🎉", "👍", "🌟"];
  if (Math.random() > 0.7) { // 30%的概率添加表情
    reply += " " + emotions[Math.floor(Math.random() * emotions.length)];
  }

  return reply;
};

// 获取会话列表
export const getConversations = async () => {
  const messages = getStoredMessages();
  
  // 创建AI助手的会话
  const aiMessages = messages.filter(
    msg => msg.senderId === AI_ASSISTANT.userId || msg.receiverId === AI_ASSISTANT.userId
  );
  
  const aiLastMessage = aiMessages.length > 0 
    ? aiMessages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
    : {
      messageId: 0,
      senderId: AI_ASSISTANT.userId,
      receiverId: CURRENT_USER_ID,
      content: "你好！我是智能助手，有什么可以帮你的吗？",
      createdAt: new Date().toISOString(),
      isRead: false
    };

  const aiConversation: Conversation = {
    conversationId: AI_ASSISTANT.userId,
    otherUser: AI_ASSISTANT,
    lastMessage: aiLastMessage,
    unreadCount: messages.filter(
      msg => !msg.isRead && 
      msg.senderId === AI_ASSISTANT.userId && 
      msg.receiverId === CURRENT_USER_ID
    ).length
  };

  // 获取张三的最后一条消息
  const zhangSanMessages = messages.filter(
    msg => msg.senderId === TEST_USER.userId || msg.receiverId === TEST_USER.userId
  );
  
  const lastMessage = zhangSanMessages.length > 0
    ? zhangSanMessages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
    : {
      messageId: 1,
      senderId: TEST_USER.userId,
      receiverId: CURRENT_USER_ID,
      content: "你好，我是张三",
      createdAt: new Date().toISOString(),
      isRead: false
    };

  // 计算未读消息数
  const unreadCount = messages.filter(
    msg => !msg.isRead && 
    msg.senderId === TEST_USER.userId && 
    msg.receiverId === CURRENT_USER_ID
  ).length;

  const testConversation: Conversation = {
    conversationId: TEST_USER.userId,
    otherUser: TEST_USER,
    lastMessage,
    unreadCount
  };

  // 返回会话列表，智能助手置顶
  return [aiConversation, testConversation];
};

// 获取与特定用户的聊天记录
export const getMessages = async (userId: number) => {
  // 如果是与AI助手的对话
  if (userId === AI_ASSISTANT.userId) {
    let messages = getStoredMessages().filter(
      msg => msg.senderId === AI_ASSISTANT.userId || msg.receiverId === AI_ASSISTANT.userId
    );
    if (messages.length === 0) {
      // 初始化AI助手的欢迎消息
      const welcomeMessage: Message = {
        messageId: Date.now(),
        senderId: AI_ASSISTANT.userId,
        receiverId: CURRENT_USER_ID,
        content: "你好！我是智能助手，有什么可以帮你的吗？",
        createdAt: new Date().toISOString(),
        isRead: false
      };
      messages = [welcomeMessage];
      saveMessages([...getStoredMessages(), welcomeMessage]);
    }
    return messages;
  }
  
  // 如果是与张三的对话
  if (userId === TEST_USER.userId) {
    let messages = getStoredMessages().filter(
      msg => msg.senderId === TEST_USER.userId || msg.receiverId === TEST_USER.userId
    );
    if (messages.length === 0) {
      messages = initializeMessages();
    }
    return messages;
  }
  
  return [];
};

// 发送私信
export const sendMessage = async (data: { receiverId: number; content: string }) => {
  // 创建新消息
  const newMessage: Message = {
    messageId: Date.now(),
    senderId: CURRENT_USER_ID,
    receiverId: data.receiverId,
    content: data.content,
    createdAt: new Date().toISOString(),
    isRead: false
  };

  // 保存新消息
  const messages = getStoredMessages();
  messages.push(newMessage);
  saveMessages(messages);

  // 如果是发给AI助手的消息
  if (data.receiverId === AI_ASSISTANT.userId) {
    setTimeout(async () => {
      const aiReply = await getAIResponse(data.content);
      const aiMessage: Message = {
        messageId: Date.now() + 1,
        senderId: AI_ASSISTANT.userId,
        receiverId: CURRENT_USER_ID,
        content: aiReply,
        createdAt: new Date().toISOString(),
        isRead: false
      };
      
      // 保存AI的回复
      const updatedMessages = getStoredMessages();
      updatedMessages.push(aiMessage);
      saveMessages(updatedMessages);
    }, 1000);
  }
  
  // 如果是发给张三的消息，模拟张三的自动回复
  if (data.receiverId === TEST_USER.userId) {
    setTimeout(() => {
      const autoReply: Message = {
        messageId: Date.now() + 1,
        senderId: TEST_USER.userId,
        receiverId: CURRENT_USER_ID,
        content: "收到你的消息了",
        createdAt: new Date().toISOString(),
        isRead: false
      };
      
      // 保存自动回复
      const updatedMessages = getStoredMessages();
      updatedMessages.push(autoReply);
      saveMessages(updatedMessages);
    }, 1000);
  }

  return newMessage;
};

// 标记消息为已读
export const markAsRead = async (conversationId: number) => {
  const messages = getStoredMessages();
  const updatedMessages = messages.map(msg => {
    // 只更新来自指定用户的消息的已读状态
    if (msg.senderId === conversationId && msg.receiverId === CURRENT_USER_ID) {
      return {
        ...msg,
        isRead: true
      };
    }
    return msg;
  });
  saveMessages(updatedMessages);

  // 更新会话的未读计数
  const conversations = getStoredConversations();
  const updatedConversations = conversations.map((conv: Conversation) => {
    if (conv.conversationId === conversationId) {
      return {
        ...conv,
        unreadCount: 0
      };
    }
    return conv;
  });
  saveConversations(updatedConversations);

  return { success: true };
}; 