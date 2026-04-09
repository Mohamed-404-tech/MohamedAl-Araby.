// Theme Management
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');

function initTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', saved);
    updateThemeIcon(saved);
}

function toggleTheme() {
    const current = html.getAttribute('data-theme') || 'dark';
    const newTheme = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    if (themeBtn) {
        themeBtn.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
}

if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
initTheme();

// Profile Picture
const profilePic = document.getElementById('profilePic');
const cardAvatar = document.getElementById('cardAvatar');
const profileImagePath = './Logo.png';

function loadProfileImage() {
    if (!profilePic || !cardAvatar) return;

    const profileImage = document.createElement('img');
    profileImage.src = profileImagePath;
    profileImage.alt = 'Profile Picture';
    profileImage.onload = () => {
        profilePic.innerHTML = '';
        profilePic.appendChild(profileImage.cloneNode());
        cardAvatar.innerHTML = '';
        cardAvatar.appendChild(profileImage.cloneNode());
    };
    profileImage.onerror = () => {
        profilePic.innerHTML = '<i class="fas fa-fire"></i>';
        cardAvatar.innerHTML = '<i class="fas fa-fire"></i>';
    };
}

loadProfileImage();

// Gallery
const galleryContainer = document.getElementById('galleryContainer');
const photos = ['./me.jpeg', './me1.jpeg', './me2.jpeg', './me3.jpeg', './me4.jpeg', './me5.jpeg', './me6.jpeg', './me7.jpeg', './me8.jpeg', './me9.jpeg', './me10.jpeg', './me11.jpeg', './me12.jpeg', './me13.jpeg', './me14.jpeg', './me15.jpeg', './me16.jpeg', './me17.jpeg', './me18.jpeg', './me19.jpeg', './me20.jpeg', './me21.jpeg', './me22.jpeg', './me23.jpeg', './me24.jpeg', './me25.jpeg', './me26.jpeg', './me27.jpeg', './me28.jpeg', './me29.jpeg', './me30.jpeg', './me31.jpeg', './me32.jpeg', './me33.jpeg', './me34.jpeg', './me35.jpeg', './me36.jpeg', './me37.jpeg', './me38.jpeg', './me39.jpeg', './me40.jpeg'];
const visiblePhotos = [];

function loadGallery() {
    render();
}

function render() {
    if (!galleryContainer) return;
    galleryContainer.innerHTML = '';
    visiblePhotos.length = 0;

    photos.forEach((photo, idx) => {
        const img = new Image();
        img.alt = 'Image ' + (idx + 1);

        img.onload = () => {
            visiblePhotos.push(photo);
            const item = document.createElement('div');
            item.className = 'gallery-item';
            const thumb = document.createElement('img');
            thumb.src = photo;
            thumb.alt = img.alt;
            item.onclick = () => openLightbox(visiblePhotos.length - 1);
            item.appendChild(thumb);
            galleryContainer.appendChild(item);
        };

        img.onerror = () => {
            // Skip broken or missing images so only working photos appear
        };

        img.src = photo;
    });
}

loadGallery();

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
let currentIdx = 0;

function openLightbox(idx) {
    if (visiblePhotos.length === 0) return;
    currentIdx = idx;
    lightboxImg.src = visiblePhotos[idx];
    lightbox.classList.add('active');
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

function nextGalleryImage() {
    if (visiblePhotos.length === 0) return;
    currentIdx = (currentIdx + 1) % visiblePhotos.length;
    lightboxImg.src = visiblePhotos[currentIdx];
}

function prevGalleryImage() {
    if (visiblePhotos.length === 0) return;
    currentIdx = (currentIdx - 1 + visiblePhotos.length) % visiblePhotos.length;
    lightboxImg.src = visiblePhotos[currentIdx];
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

// QR Code
function initQR() {
    const qr = document.getElementById('qrcode');
    if (!qr) return;
    const url = 'https://mohamed-404-tech.github.io/MohamedAl-Araby./';
    new QRCode(qr, {
        text: url,
        width: 120,
        height: 120,
        colorDark: '#1e1b4b',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M
    });
}

setTimeout(initQR, 500);

// Card Download
function downloadCard() {
    const btn = document.getElementById('downloadCardBtn');
    const card = document.getElementById('businessCard');
    if (!btn || !card) return;

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>جاري التحميل...</span>';

    html2canvas(card, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#0f172a',
        logging: false
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'بطاقة-محمد.png';
        link.href = canvas.toDataURL();
        link.click();
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-download"></i><span>تحميل البطاقة</span>';
    }).catch(() => {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-download"></i><span>فشل التحميل</span>';
    });
}

// Utilities
function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function copyText(text) {
    navigator.clipboard.writeText(text);
}

document.getElementById('year').textContent = new Date().getFullYear();

// Animations
const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(s => {
    s.style.opacity = '0';
    s.style.transform = 'translateY(30px)';
    s.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    obs.observe(s);
});
