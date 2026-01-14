const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export interface ChatRequest {
  message: string;
  conversation_id?: number;
}

export interface ChatResponse {
  conversation_id: number;
  response: string;
  timestamp: string;
}

export interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ConversationHistoryResponse {
  conversation_id: number;
  messages: Message[];
  total_count: number;
}

/**
 * Send a message to the chat API and receive a response
 */
export async function sendMessage(
  message: string,
  history: Message[],
  conversationId?: number
): Promise<ChatResponse> {
  const token = localStorage.getItem('jwt_token');

  const response = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      message,
      conversation_id: conversationId,
      history: history.map(msg => ({ role: msg.role, content: msg.content }))
    })
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Redirect to login if unauthorized
      window.location.href = '/login';
      throw new Error('Unauthorized');
    } else if (response.status === 429) {
      throw new Error('Too many requests. Please slow down.');
    } else if (response.status === 404) {
      throw new Error('Conversation not found');
    } else {
      throw new Error('Failed to send message');
    }
  }

  return response.json();
}

/**
 * Get conversation history
 */
export async function getConversationHistory(
  userId: string,
  conversationId: number
): Promise<ConversationHistoryResponse> {
  const token = localStorage.getItem('jwt_token');

  const response = await fetch(
    `${API_URL}/${userId}/conversations/${conversationId}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      window.location.href = '/login';
      throw new Error('Unauthorized');
    } else if (response.status === 404) {
      throw new Error('Conversation not found');
    } else {
      throw new Error('Failed to fetch conversation history');
    }
  }

  return response.json();
}

/**
 * Get list of user's conversations
 */
export async function getUserConversations(
  userId: string,
  limit?: number,
  offset?: number
): Promise<{
  conversations: Array<{
    id: number;
    created_at: string;
    updated_at: string;
    last_message_preview: string;
  }>;
  total_count: number;
}> {
  const token = localStorage.getItem('jwt_token');
  const params = new URLSearchParams();

  if (limit) params.append('limit', limit.toString());
  if (offset) params.append('offset', offset.toString());

  const queryString = params.toString();
  const url = queryString ?
    `${API_URL}/${userId}/conversations?${queryString}` :
    `${API_URL}/${userId}/conversations`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    if (response.status === 401) {
      window.location.href = '/login';
      throw new Error('Unauthorized');
    } else {
      throw new Error('Failed to fetch conversations');
    }
  }

  return response.json();
}