# Around The U.S.

## Project Overview
"Around The U.S." is an interactive web application that allows users to view, add, and manage photo cards from various locations across the United States. The application features a responsive design that works seamlessly across all device sizes, real-time server integration via RESTful APIs, custom form validation, and an intuitive user interface.

![Around The U.S. Screenshot](./images/project-screenshot.png)

## 🎥 Demo Video
**[Watch the full demo on YouTube](https://youtu.be/JNKkMnoLiiM)**

See the application in action, including API integration, form validation, and all interactive features!

## Features
- **Server Integration**: Real-time data fetching and updates via RESTful API
- **Responsive Design**: Optimized for various screen sizes from mobile to desktop
- **Interactive UI Elements**: 
  - Edit user profile information with server persistence
  - Update profile avatar with hover effect
  - Add new location cards with custom titles and images
  - Like/unlike location cards with instant feedback
  - Delete cards with confirmation dialog
  - View images in fullscreen preview mode
- **Form Validation**: Real-time client-side validation with error messages
- **Loading States**: Visual feedback during API operations ("Saving...", "Deleting...")
- **Enhanced UX**: 
  - Close modals by clicking outside or pressing Esc key
  - Smooth transitions and hover effects
  - Error handling with user-friendly messages

## Technologies Used
- **HTML5**: Semantic markup with template elements
- **CSS3**: 
  - Flexbox and Grid layouts
  - BEM methodology for class naming
  - Responsive design with media queries
  - CSS transitions and animations
- **JavaScript ES6+**: 
  - Object-Oriented Programming (OOP) with classes
  - Asynchronous programming with Promises and async/await
  - RESTful API integration
  - DOM manipulation and event handling
  - Modular architecture with ES6 modules
- **Build Tools**:
  - Webpack for module bundling
  - Babel for JavaScript transpilation
  - PostCSS with Autoprefixer for CSS processing
- **Version Control**: Git and GitHub
- **Deployment**: GitHub Pages

## Project Architecture
The project follows Object-Oriented Programming principles with the following class structure:

- **Card**: Manages individual card elements and interactions
- **FormValidator**: Handles form validation and error states
- **Section**: Utility class for rendering DOM elements
- **Popup**: Base class for modal functionality
- **PopupWithImage**: Extends Popup for image preview
- **PopupWithForm**: Extends Popup for form submissions
- **UserInfo**: Manages user profile information display
- **Api**: Handles all server communication

## Design & Planning
The project was developed based on Figma designs, emphasizing clean visual aesthetics and intuitive user experience.
- [Link to the project design on Figma](https://www.figma.com/file/ii4xxsJ0ghevUOcssTlHZv/Sprint-3%3A-Around-the-US?node-id=0%3A1)

## Development Process
This project was built in multiple phases across several sprints:

1. **Sprint 3**: Initial static layout and responsive design
2. **Sprint 4**: Adding interactivity with JavaScript
3. **Sprint 5**: Implementing modular JavaScript functions
4. **Sprint 6**: Creating and validating forms
5. **Sprint 7**: Refactoring with Object-Oriented Programming
6. **Sprint 8**: Advanced OOP and class-based architecture
7. **Sprint 9**: API integration, Webpack bundling, and deployment

## Installation & Setup
```bash
# Clone the repository
git clone https://github.com/ogeokoh/se_project_aroundtheus.git

# Navigate to project directory
cd se_project_aroundtheus

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## API Integration
The application connects to a RESTful API server to:
- Fetch and display user information
- Load initial cards from the server
- Create new cards on the server
- Delete cards from the server
- Like/unlike cards with persistent state
- Update user profile information
- Update user avatar

## Future Enhancements
- User authentication and authorization
- Multiple user support with private galleries
- Image upload functionality with file handling
- Card filtering and sorting options
- Comments and social features
- Progressive Web App (PWA) capabilities

## Project Links
- **Live Demo**: https://ogeokoh.github.io/se_project_aroundtheus/
- **Video Demo**: https://youtu.be/JNKkMnoLiiM
- **Repository**: https://github.com/ogeokoh/se_project_aroundtheus

## Author
**Oge Okoh** - Front-End Developer

- LinkedIn: [Ogechukwu Okoh](https://www.linkedin.com/in/ogechukwu-okoh/)
- GitHub: [ogeokoh](https://github.com/ogeokoh)

---

_This project was created as part of the Software Engineering program curriculum at TripleTen._
