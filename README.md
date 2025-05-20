# 🛠 Full Stack Real Estate App

A full-stack real estate web application with authentication, admin control, listing management, and dynamic front-end interactions.

---

## 🚀 How to Run the Project

### 🔧 1. Local Setup

1. Clone the repository
2. Start the **Backend** (Java Spring Boot)
3. Start the **Frontend** (Next.js)

---

## 🧰 Technologies Used

- **Backend**: Java, Spring Boot, Spring Security (with JWT), Spring Data JPA  
- **Frontend**: TypeScript, Next.js (App Router)  
- **Database**: MySQL  
- **Styling**: Tailwind CSS  
- **Animations**: Framer Motion  

---

## 🔐 Features & Functionality

- User registration and login (JWT-based auth)
- Role-based routing (User / Admin)
- Listing creation (with image support)
- Newsletter subscription
- Contact form for user feedback

---

## 📚 Technology Breakdown

### 1. **Next.js**
Used for file-based routing and dynamic page rendering using the new App Router. Simplifies routing structure and improves navigation performance.

### 2. **MySQL**
Primary database with three tables:
- `users`
- `listings`
- `images` (with a foreign key referencing `listings`)

### 3. **Tailwind CSS**
Utility-first CSS framework for rapid UI development and consistent styling across the app.

### 4. **Framer Motion**
Animation library used for smooth transitions between login/register, page changes, and UI interactions.

---

## 🗺 App Structure

### 🏠 Main Page
- Hero section
- Popular listings
- Newsletter subscription
- Contact section

![Main page]()

---

### 📄 Listings Page
- Interactive listings
- Clickable for detailed view
- Stackable filters (can use all at once)

![Listings page]()

---

### 👤 Profile Page
- Accessible only when logged in
- View your listings
- Add new listings (modify/delete coming soon)

![Profile page]()

---

### 📬 Contact Us Page
- Users can send feedback or report issues

![Contact Us Page]()

---

### 🛠 Admin Page
- View and manage all users and listings
- Admin actions: delete, modify

![Admin page]()

---

### 🔐 Authentication
- **Log In**
  - Email + password form
- **Register**
  - Email, password, name form

![Log in page]()  
![Register page]()

