# Asset Organization Guide

This guide explains how to organize and add assets to your portfolio website.

## 📁 Folder Structure

```
assets/
├── images/
│   ├── profile/        # Your profile photos
│   └── projects/       # Project images and documents
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


## 📄 Adding New Projects

1. **Add project image** to `assets/images/projects/`
2. **Add project document** (PDF) to `assets/images/projects/`
3. **Update HTML** in `index.html`:
   ```html
   <div class="project-item" data-category="web">
       <div class="project-image">
           <img src="assets/images/projects/your-project.jpg" alt="Your Project" class="project-img">
           <button class="eye-button" onclick="openImageModal('assets/images/projects/your-project.pdf', 'Your Project')">
               <i class="bi bi-eye-fill"></i>
           </button>
       </div>
       <div class="project-content">
           <h3 class="project-title">Your Project</h3>
           <span class="project-category">Web Application</span>
       </div>
   </div>
   ```

## 📋 Adding New Skills

Update the skills section in `index.html`:
```html
<div class="skill-item">
    <span class="skill-name">Category Name</span>
    <div class="skills-text">
        <span class="skill-tag">New Skill</span>
    </div>
</div>
```

## 🎓 Adding Education

Update the education section in `index.html`:
```html
<div class="education-item">
    <div class="education-header">
        <h3 class="degree">Degree Name</h3>
        <span class="year">2024 - 2026</span>
    </div>
    <span class="college">College Name</span>
    <span class="university">University</span>
    <span class="cgpa">Grade/CGPA</span>
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
