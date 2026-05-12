# Cookie Structure and Security Reference

Cookies are small pieces of data stored in a user's browser by websites. They help websites remember information such as login sessions, user preferences, shopping cart items, and other personalized settings.

Understanding how cookies work is important for both web developers and users because cookies play a major role in authentication, security, and user experience.

---

## The 5 Main Fields of a Cookie

### 1. Name = Value Pair
This is the actual information stored inside the cookie.

#### Example
```text
username=John
```

Here:
- `username` is the cookie name
- `Githendra` is the stored value

Usually, cookie values are encoded before storage to handle special characters safely.

### Real-World Example
When a user logs into a website, the browser may store:
```text
sessionId=abc123
```
This helps the website recognize the user during future requests.

---

### 2. Expires
The **Expires** field defines when the cookie should be automatically removed by the browser.

- If an expiry date is provided, the cookie remains stored until that date.
- If no expiry date is set, the cookie becomes a **session cookie**, which is deleted when the browser is closed.

### Example
```text
Expires=Wed, 15 Jan 2026 12:00:00 GMT
```

### Real-World Example
“Remember Me” login functionality commonly uses persistent cookies with expiry dates.

---

### 3. Domain
The **Domain** field specifies which website or domain can access the cookie.

### Example
```text
Domain=.example.com
```

This allows the cookie to be shared across subdomains such as:
- `mail.example.com`
- `shop.example.com`

### Real-World Example
Large platforms like Google use domain-based cookies to maintain login sessions across multiple services.

---

### 4. Path
The **Path** field determines the specific URL path where the cookie is valid.

### Example
```text
Path=/admin
```

This means the cookie will only be accessible within the `/admin` section of the website.

### Real-World Example
An admin authentication cookie may only work inside the admin dashboard instead of the entire website.

---

### 5. Secure Flag
The **Secure** flag ensures that cookies are transmitted only through encrypted HTTPS connections.

### Example
```text
Secure
```

### Why It Matters
This helps protect sensitive information from being intercepted during data transmission.

### Real-World Example
Banking websites always use secure cookies to protect user sessions and financial data.

---

# Cookie Security and Limitations

Modern web applications rely heavily on cookies, so proper security practices are essential.

---

## HttpOnly Flag

The **HttpOnly** attribute prevents JavaScript from directly accessing the cookie.

### Purpose
This helps protect cookies from Cross-Site Scripting (XSS) attacks.

### Example
```text
HttpOnly
```

### Real-World Example
Session cookies used for authentication are often marked as HttpOnly to prevent hackers from stealing them using malicious scripts.

---

## SameSite Attribute

The **SameSite** attribute controls whether cookies are sent during cross-site requests.

### Purpose
It helps protect websites from Cross-Site Request Forgery (CSRF) attacks.

### Common Values
- `Strict`
- `Lax`
- `None`

### Example
```text
SameSite=Strict
```

### Real-World Example
Online payment systems use SameSite cookies to prevent unauthorized requests from external websites.

---

## Cookie Limitations

Browsers impose certain limitations on cookies to improve performance and security.

### Common Restrictions
- Maximum cookie size: **4 KB**
- Maximum cookies per domain: **20 cookies** (varies slightly by browser)

### Why These Limits Exist
Restricting cookie size prevents excessive storage usage and reduces unnecessary network traffic.
