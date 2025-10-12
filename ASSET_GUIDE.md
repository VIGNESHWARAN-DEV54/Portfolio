# Asset Organization Guide

This guide explains how to organize and add assets to your portfolio website.

## 📁 Folder Structure

```
assets/
├── images/
│   ├── profile/        # Your profile photos
│   ├── projects/       # Project images and documents
│   └── icons/          # UI icons and graphics
└── resume/            # CV/Resume files
```

## 🖼️ Adding New Images

### Profile Images
- **Location**: `assets/images/profile/`
- **Supported formats**: JPG, PNG, SVG
- **Recommended size**: 400x400px or square aspect ratio
- **Update in HTML**: Change the `src` attribute in the profile image tag

### Project Images
- **Location**: `assets/images/projects/`
- **Supported formats**: JPG, PNG, SVG, PDF
- **Recommended size**: 600x400px or 16:9 aspect ratio
- **Naming convention**: `project1.jpg`, `project2.jpg`, etc.

### Icons
- **Location**: `assets/images/icons/`
- **Supported formats**: SVG, PNG
- **Recommended size**: 24x24px, 32x32px, or 48x48px

## 📄 Adding New Projects

1. **Add project image** to `assets/images/projects/`
2. **Add project document** (PDF) to `assets/images/projects/`
3. **Update HTML** in `index.html`:
   ```html
   <div class="project-item" data-category="web">
       <div class="project-card">
           <div class="project-image">
               <img src="assets/images/projects/your-project.jpg" alt="Your Project" class="project-img">
               <div class="project-overlay">
                   <button class="view-btn" onclick="openImageModal('assets/images/projects/your-project.pdf', 'Your Project')">View Details</button>
               </div>
           </div>
           <div class="project-info">
               <h3 class="project-title">Your Project</h3>
               <p class="project-description">Project description here</p>
           </div>
       </div>
   </div>
   ```

## 📋 Adding New Skills

Update the skills section in `index.html`:
```html
<div class="skill-item">
    <div class="skill-name">Your Skill</div>
</div>
```

## 🎓 Adding Education

Update the education section in `index.html`:
```html
<div class="education-item">
    <div class="education-degree">Your Degree</div>
    <div class="education-year">2020-2024</div>
    <div class="education-college">Your College</div>
    <div class="education-university">Your University</div>
    <div class="education-cgpa">8.5/10</div>
</div>
```

## 💼 Updating Resume

1. **Replace** `assets/resume/VIGNESHWARAN_CV.pdf` with your CV
2. **Keep the same filename** or update the download link in `script.js`

## 🎨 Best Practices

- **Optimize images** for web (compress JPGs, optimize SVGs)
- **Use consistent naming** conventions
- **Keep file sizes small** for faster loading
- **Use appropriate formats** (SVG for icons, JPG for photos, PDF for documents)
- **Test on different devices** after adding new content

## 🔧 Troubleshooting

- **Images not loading**: Check file paths in HTML
- **Large file sizes**: Compress images before adding
- **Broken links**: Verify file names and paths
- **Layout issues**: Check image dimensions and aspect ratios
