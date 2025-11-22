# Admin API Endpoints - Implementation Summary

## Overview
All API endpoints for the 5 admin management pages have been successfully created with proper authentication, pagination, search filters, and error handling.

---

## 1. User Management API

### GET /api/admin/users
**Purpose:** List all users with filtering and pagination

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10)
- `search` - Search by full_name or email
- `role` - Filter by role (user/contributor)
- `include_certificates` - Include user certificates in response

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "full_name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "profile": { "avatar": "...", "bio": "..." },
      "_count": {
        "articles": 5,
        "comments": 10,
        "scan_history": 3,
        "endangered_reports": 2
      }
    }
  ],
  "pagination": { "page": 1, "limit": 10, "total": 50, "totalPages": 5 }
}
```

### POST /api/admin/users/[id]/ban
**Purpose:** Ban or unban a user

**Request Body:**
```json
{
  "banned": true
}
```

**Note:** `is_banned` field needs to be added to User schema. Currently returns placeholder response.

**Response:**
```json
{
  "success": true,
  "message": "User banned successfully"
}
```

---

## 2. Endangered Reports API

### GET /api/admin/endangered-reports
**Purpose:** List all endangered culture reports

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10)
- `search` - Search by culture_name, threat_type, or location
- `status` - Filter by status (pending/approved/rejected)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "culture_name": "Batik Tulis",
      "threat_type": "modernization",
      "description": "...",
      "location": "...",
      "status": "pending",
      "user": { "id": 1, "full_name": "..." },
      "reviewer": null
    }
  ],
  "pagination": { ... }
}
```

### POST /api/admin/endangered-reports/[id]/review
**Purpose:** Approve or reject a report

**Request Body:**
```json
{
  "status": "approved",
  "admin_notes": "Report verified and approved"
}
```

**Response:**
```json
{
  "success": true,
  "data": { ...updated report... },
  "message": "Report reviewed successfully"
}
```

### DELETE /api/admin/endangered-reports/[id]
**Purpose:** Delete a report

**Response:**
```json
{
  "success": true,
  "message": "Report deleted successfully"
}
```

---

## 3. Certificate Management API

### GET /api/admin/certificates
**Purpose:** List all certificates with optional user filter

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10)
- `user_id` - Filter by specific user
- `search` - Search by title or description

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user_id": 5,
      "title": "Master Explorer",
      "description": "Completed 10 provinces",
      "date_earned": "2024-01-15T00:00:00.000Z",
      "user": {
        "id": 5,
        "full_name": "Jane Doe",
        "email": "jane@example.com",
        "profile": { "avatar": "..." }
      }
    }
  ],
  "pagination": { ... }
}
```

### POST /api/admin/certificates
**Purpose:** Create a new certificate for a user

**Request Body:**
```json
{
  "user_id": 5,
  "title": "Culture Master",
  "description": "Mastered 5 cultural categories",
  "date_earned": "2024-01-20"
}
```

**Response:**
```json
{
  "success": true,
  "data": { ...created certificate... },
  "message": "Certificate created successfully"
}
```

### PUT /api/admin/certificates/[id]
**Purpose:** Update an existing certificate

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "date_earned": "2024-01-25"
}
```

**Response:**
```json
{
  "success": true,
  "data": { ...updated certificate... },
  "message": "Certificate updated successfully"
}
```

### DELETE /api/admin/certificates/[id]
**Purpose:** Delete a certificate

**Response:**
```json
{
  "success": true,
  "message": "Certificate deleted successfully"
}
```

---

## 4. Verification Management API

### GET /api/admin/verifications
**Purpose:** List verification requests (users requesting contributor role)

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10)
- `status` - Filter by status (pending/approved/rejected)
  - `pending` = users with role='user'
  - `approved` = users with role='contributor'
- `search` - Search by full_name or email

**Note:** `verification_status` and `rejection_reason` fields need to be added to User schema. Currently uses `role` field as proxy.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "full_name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "profile": { "avatar": "...", "bio": "..." },
      "_count": { "articles": 5, "comments": 10 }
    }
  ],
  "pagination": { ... }
}
```

### POST /api/admin/verifications/[id]/approve
**Purpose:** Approve verification and upgrade user to contributor

**Response:**
```json
{
  "success": true,
  "data": { ...updated user with role='contributor'... },
  "message": "User approved as contributor"
}
```

### POST /api/admin/verifications/[id]/reject
**Purpose:** Reject verification request with reason

**Request Body:**
```json
{
  "reason": "Incomplete submission"
}
```

**Note:** `rejection_reason` field needs to be added to User schema. Currently returns placeholder response.

**Response:**
```json
{
  "success": true,
  "message": "Verification rejected"
}
```

---

## 5. Scan History API

### GET /api/admin/scan-history
**Purpose:** View all culture scan history

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10)
- `province` - Filter by province
- `search` - Search by object_name or province

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "object_name": "Batik Parang Rusak",
      "object_type": "batik",
      "province": "Jawa Tengah",
      "accuracy": "92%",
      "description": "...",
      "scan_result": "{...JSON...}",
      "created_at": "2024-01-15T10:30:00.000Z",
      "user": {
        "id": 5,
        "full_name": "Jane Doe",
        "email": "jane@example.com",
        "profile": { "avatar": "..." }
      }
    }
  ],
  "pagination": { ... }
}
```

---

## Authentication

All endpoints require:
1. **auth_token** cookie (JWT token)
2. **user_role** cookie with value `admin`

Unauthorized requests return:
```json
{
  "success": false,
  "error": "Unauthorized"
}
```

Non-admin requests return:
```json
{
  "success": false,
  "error": "Forbidden - Admin only"
}
```

---

## Database Schema Notes

### Fields to Add (Optional Enhancements):

**User Model:**
```prisma
model User {
  // ... existing fields
  is_banned           Boolean  @default(false) @map("is_banned")
  verification_status String?  @default("pending") @map("verification_status") // pending/approved/rejected
  rejection_reason    String?  @db.Text @map("rejection_reason")
  
  @@map("users")
}
```

These fields would enable:
- Ban/unban functionality in user management
- Proper verification workflow tracking
- Rejection reason storage for transparency

---

## Error Handling

All endpoints follow consistent error response format:
```json
{
  "success": false,
  "error": "Error message here"
}
```

Status codes:
- `401` - Unauthorized (missing token)
- `403` - Forbidden (not admin)
- `404` - Not found
- `400` - Bad request (validation errors)
- `500` - Internal server error

---

## File Structure

```
app/api/admin/
├── users/
│   ├── route.ts (GET - list users)
│   └── [id]/
│       └── ban/
│           └── route.ts (POST - ban/unban)
├── endangered-reports/
│   ├── route.ts (GET - list reports)
│   └── [id]/
│       ├── route.ts (DELETE - delete report)
│       └── review/
│           └── route.ts (POST - approve/reject)
├── certificates/
│   ├── route.ts (GET, POST - list/create)
│   └── [id]/
│       └── route.ts (PUT, DELETE - update/delete)
├── verifications/
│   ├── route.ts (GET - list requests)
│   └── [id]/
│       ├── approve/
│       │   └── route.ts (POST - approve)
│       └── reject/
│           └── route.ts (POST - reject)
└── scan-history/
    └── route.ts (GET - list scans)
```

---

## Next Steps

1. ✅ All API endpoints created
2. ⏳ Update frontend pages to use these APIs
3. ⏳ Ensure FormModal component consistency
4. ⏳ Match table styling with master data pages
5. ⏳ Test all integrations end-to-end
6. ⏳ Add database schema enhancements if needed

---

## Testing Endpoints

Use tools like Postman or curl with appropriate cookies:

```bash
# Example: List users
curl -X GET "http://localhost:3000/api/admin/users?page=1&limit=10" \
  --cookie "auth_token=YOUR_JWT_TOKEN; user_role=admin"

# Example: Review report
curl -X POST "http://localhost:3000/api/admin/endangered-reports/1/review" \
  -H "Content-Type: application/json" \
  --cookie "auth_token=YOUR_JWT_TOKEN; user_role=admin" \
  -d '{"status":"approved","admin_notes":"Verified"}'
```
