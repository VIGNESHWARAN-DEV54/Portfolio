# Portfolio Website

A modern, responsive portfolio website with a glass-morphism design. Built with vanilla HTML, CSS, and JavaScript.

## 🚀 Features

### Frontend Portfolio
- **Glass-morphism Design**: Modern, elegant UI with glass card effects
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Interactive Navigation**: Smooth scrolling and section switching
- **Project Showcase**: Filterable project gallery with categories
- **Profile Information**: Personal details, skills, education, and contact info
- **CV Download**: Direct download link for resume/CV
- **Social Media Integration**: Links to professional social profiles


## 📁 Project Structure

```
port/
├── index.html              # Main portfolio page
├── script.js               # Frontend JavaScript functionality
├── styles.css              # Main stylesheet
├── package.json            # Project configuration
├── assets/
│   ├── images/
│   │   ├── profile/        # Profile images
│   │   │   └── profile.jpg
│   │   ├── projects/       # Project images and documents
│   │   │   ├── project1.jpg
│   │   │   └── project1.pdf
│   └── resume/             # CV/Resume files
│       └── VIGNESHWARAN_CV.pdf
```

## 🛠️ Installation & Setup

### Prerequisites
- Modern web browser
- Local web server (Python, Node.js, or any static server)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd port
   ```

2. **Start the development server**
   ```bash
   # Using Python (if available)
   python -m http.server 8000
   
   # Or using Node.js http-server
   npx http-server
   
   # Or using any other local server
   ```

3. **Access the application**
   - Portfolio: `http://localhost:8000`

## 🔧 Configuration

### Content Management
To update your portfolio content, edit the HTML file directly:
- **Profile Information**: Edit the content in `index.html`
- **Projects**: Add or modify project cards in the projects section
- **Skills**: Update the skills list in the skills section
- **Education**: Modify education entries in the education section

### Asset Organization
The project uses a well-organized folder structure:
- **Profile Images**: `assets/images/profile/` - Store your profile photos here
- **Project Assets**: `assets/images/projects/` - Store project images and documents
- **Icons**: `assets/images/icons/` - Store UI icons and graphics
- **Resume**: `assets/resume/` - Store your CV/resume files

## 📖 Usage Guide

### Portfolio Website

1. **Navigation**
   - Click on "About" and "Project" tabs to switch sections
   - Smooth scrolling between sections
   - Responsive design adapts to screen size

2. **Project Filtering**
   - Use filter buttons to view projects by category
   - Categories: All Projects, Web Applications, Mobile Applications, UI Design
   - Click on project cards to view details

3. **Contact Information**
   - View contact details in the profile section
   - Download CV using the download button
   - Access social media profiles


## 🎨 Customization

### Styling
- Modify `styles.css` for design changes
- Update color schemes in CSS variables
- Adjust glass-morphism effects
- Customize responsive breakpoints

### Content
- Edit profile information directly in `index.html`
- Add/remove projects by modifying HTML
- Update skills and education in HTML
- Replace images in organized folders:
  - Profile photos: `assets/images/profile/`
  - Project images: `assets/images/projects/`
  - Icons: `assets/images/icons/`

### Functionality
- Extend JavaScript functionality in `script.js`
- Add new sections by modifying `index.html`
- Implement additional features in `script.js`

## 🔒 Security Features

- **Static Content**: No server-side processing required
- **Client-side Only**: All functionality runs in the browser
- **No Database**: No sensitive data storage

## 🌐 Browser Support

- Chrome 57+
- Firefox 52+
- Safari 11+
- Edge 16+

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🚀 Deployment

### Static Hosting
Deploy to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront

### Server Requirements
- No server-side requirements
- Works with any static file server
- HTTPS recommended for production

## 🛠️ Development

### Adding New Features
1. Update HTML structure in `index.html`
2. Add corresponding CSS in `styles.css`
3. Implement JavaScript functionality in `script.js`
4. Test changes in browser

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact: your.email@example.com

---

**Built with ❤️ using vanilla HTML, CSS, JavaScript, and SQL.js**
