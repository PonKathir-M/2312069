1. Get all notifications

GET /api/notifications
Authorization: Bearer token

Returns list of user's notifications with pagination support.

2. Get single notification

GET /api/notifications/:id
Authorization: Bearer token


3. Mark as read

PATCH /api/notifications/:id
Authorization: Bearer token
Body: { "isRead": true }


4. Delete notification

DELETE /api/notifications/:id
Authorization: Bearer token


5. Get unread count

GET /api/notifications/unread/count
Authorization: Bearer token


json
{
  "id": "123abc",
  "userId": "user456",
  "type": "assignment_submitted",
  "title": "Assignment Submitted",
  "message": "Your assignment has been submitted",
  "isRead": false,
  "createdAt": "2026-07-02T10:30:00Z"
}


Real time updates:
Connect to `ws://localhost:3000/api/notifications/stream?token=<jwt>` after user login. Server pushes new notifications instantly to connected clients.


Database design

users table:

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


notifications table
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  userId INT NOT NULL REFERENCES users(id),
  type VARCHAR(50),
  title VARCHAR(255),
  message TEXT,
  isRead BOOLEAN DEFAULT false,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_userId_isRead ON notifications(userId, isRead);
CREATE INDEX idx_createdAt ON notifications(createdAt DESC);

notification_preferences table

CREATE TABLE notification_preferences (
  id SERIAL PRIMARY KEY,
  userId INT UNIQUE NOT NULL REFERENCES users(id),
  emailNotifications BOOLEAN DEFAULT true,
  pushNotifications BOOLEAN DEFAULT true,
  digestFrequency VARCHAR(50) DEFAULT 'immediate'
);


Getting the notifications for the users:

SELECT * FROM notifications 
WHERE userId = $1 
ORDER BY createdAt DESC 
LIMIT 20;


marking the msg as read

UPDATE notifications:
SET isRead = true 
WHERE id = $1 AND userId = $2;

getting the count of the unread message:

SELECT COUNT(*) FROM notifications 
WHERE userId = $1 AND isRead = false;

