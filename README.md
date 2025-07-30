## 📚 Spesifikasi API

**Base URL**: `http://host:port/api`

<!-- ### Autentikasi
Semua permintaan ke endpoint yang dilindungi harus menyertakan header `Authorization` dengan skema `Bearer Token`.
**Contoh**: `Authorization: Bearer <token_yang_didapat_saat_login>` -->

---

## 1. Register : `POST /register`
> Create new user.
<!-- * **Autentikasi**: Tidak diperlukan. -->
#### Authorization : **false**
**Request Body**
```json
    {
        "username": "Budi",
        "email": "budi@example.com",
        "password": "12345678",
        "password_confirmation": "12345678",
        "created_at": "...",
        "updated_at": "..."
    }
```

**Respons OK** (`201 Created`)
```json
    {
        "statusCode": 200,
        "message": "OK",
        "data": {
            "id": "uuid-user-baru",
            "name": "Budi",
            "email": "budi@example.com",
            "created_at": "...",
            "updated_at": "..."
        }
    }
```

**Respons Error Validation** (`422`)
```json
    {
        "statusCode": 422,
        "message": "Validation Error",
    }
```


## 2. Login : `POST /login`
> Login user.
<!-- * **Autentikasi**: Tidak diperlukan. -->
#### Authorization : **false**
**Request**

```json
    {
        "email": "budi@example.com",
        "password": "12345678",
    }
```

**Respons OK** (`201 Created`)
```json
    {
        "statusCode": 200,
        "message": "OK",
        "data": {
            "user": {
            "id": "01983997-2856-7343-aa0f-43cdbaf91589",
            "email": "budi@gmail.com",
            "username": "budi",
            "created_at": "2025-07-24T06:21:04.406+07:00",
            "updated_at": "2025-07-24T06:21:04.406+07:00"
        },
        "token": {
            "type": "bearer",
            "token": <token created>,
            "expires_at": <expired token>
        }
        }
    }
```

**Respons Error** (`404`)
```json
    {
        "statusCode": 404,
        "message": "Login Failed",
    }
```

## 3. Conversation : `POST /conversation/question`
> Start new conversation.
<!-- * **Autentikasi**: Tidak diperlukan. -->
#### Authorization : **true**
**Request Header**
```
Authorization : <token>
```

**Request Body**

```json
    {
        "email": "budi@example.com",
        "password": "12345678",
    }
```

**Respons OK** (`201 Created`)
```json
    {
        "statusCode": 200,
        "message": "OK",
        "data": {
            "user": {
            "id": "01983997-2856-7343-aa0f-43cdbaf91589",
            "email": "budi@gmail.com",
            "username": "budi",
            "created_at": "2025-07-24T06:21:04.406+07:00",
            "updated_at": "2025-07-24T06:21:04.406+07:00"
        },
        "token": {
            "type": "bearer",
            "token": <token created>,
            "expires_at": <expired token>
        }
        }
    }
```

**Respons Error** (`502`)
```json
    {
        "statusCode": 502,
        "message": "Service Unavailable",
    }
```

## 4. Conversation : `POST /conversation/:sessionId/question`
> Reply existing conversation.
<!-- * **Autentikasi**: Tidak diperlukan. -->
#### Authorization : **true**
**Request Header**
```
Authorization : <token>
```

**Request Body**

```json
    {
        "message": "apa saja layanan majdigi!"
    }
```

**Respons OK** (`201 Created`)
```json
    {
        "statusCode": 200,
        "message": "OK",
        "data": {
            "sessionId": "sessionId",
            "AI": "Halo! Bagaimana saya bisa membantu Anda hari ini? 😊",
            "User": "apa saja layanan majdigi!"
        }
    }
```

## 6. Conversation : `GET /conversation`
> return all conversation each user.
<!-- * **Autentikasi**: Tidak diperlukan. -->
#### Authorization : **true**
**Request Header**
```
Authorization : <token>
```

**Request Body**

```json
 -
```

**Respons OK** (`200`)
```json
    {
            "statusCode": 200,
            "message": "OK",
            "data": [
                {
                "id": "019858b8-9976-776d-bed0-355d776606fe",
                "session_id": "019858b8-996f-7fa9-a2a8-03b61dd3496b",
                "title": "halo",
                "created_at": "2025-07-30T07:25:49.687+07:00",
                "updated_at": "2025-07-30T07:25:49.687+07:00"
            },
            ....
        ]
    }
```
## 7. Conversation : `GET /conversation/:sessionId?page=1`
> return all message in conversation.
<!-- * **Autentikasi**: Tidak diperlukan. -->
#### Authorization : **true**
**Request Header**
```
Authorization : <token>
```

**Request Body**

```json
 -
```

**Respons OK** (`200`)
```json
    {
            "statusCode": 200,
            "message": "OK",
            "data": {
                "meta": {
                    "total": 2,
                    "per_page": 5,
                    "current_page": 1,
                    "last_page": 1,
                    "first_page": 1,
                    "first_page_url": "/?page=1",
                    "last_page_url": "/?page=1",
                    "next_page_url": null,
                    "previous_page_url": null
                },
                "data": [
                    {
                        "id": "019858b8-d154-796e-b7d0-68cafd629b64",
                        "content": "Halo! Bagaimana saya bisa membantu Anda hari ini? 😊",
                        "role": "ai",
                        "created_at": "2025-07-30T07:26:03.988+07:00"
                    },
                    {
                        "id": "019858b8-997c-7de9-9a9a-58e57a6e9556",
                        "content": "halo",
                        "role": "user",
                        "created_at": "2025-07-30T07:25:49.692+07:00"
                    }
                ]
            }
    }
```

**Respons Error** (`502`)
```json
    {
        "statusCode": 502,
        "message": "Service Unavailable",
    }
```

## 8. Conversation : `DELETE /conversation/:id`
> Reply existing conversation.
<!-- * **Autentikasi**: Tidak diperlukan. -->
#### Authorization : **true**
**Request Header**
```
Authorization : <token>
```

**Request Body**

```json
    -
```

**Respons OK** (`200`)
```json
    {
        "statusCode": 200,
        "message": "OK",
    }
```

**Respons Error** (`404`)
```json
    {
        "statusCode": 404,
        "message": "Data Not Found",
    }
```
