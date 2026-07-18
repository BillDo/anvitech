document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Sticky header on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll reveal animation
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // ── Testimonials Slider ──────────────────────────────────────────────────
    const track      = document.getElementById('testimonials-track');
    const btnPrev    = document.getElementById('testimonial-prev');
    const btnNext    = document.getElementById('testimonial-next');
    const dotsWrap   = document.getElementById('testimonial-dots');

    if (track && btnPrev && btnNext && dotsWrap) {
        const cards      = Array.from(track.querySelectorAll('.testimonial-card'));
        const total      = cards.length;
        let currentIndex = 0;
        let autoTimer    = null;

        // How many cards are visible at once?
        function getVisible() {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 992) return 2;
            return 3;
        }

        // Build dots
        function buildDots() {
            dotsWrap.innerHTML = '';
            const visible   = getVisible();
            const numGroups = Math.ceil(total / visible);
            for (let i = 0; i < numGroups; i++) {
                const dot = document.createElement('button');
                dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', `Nhóm ${i + 1}`);
                dot.addEventListener('click', () => goTo(i * visible));
                dotsWrap.appendChild(dot);
            }
        }

        function updateDots() {
            const visible   = getVisible();
            const groupIdx  = Math.floor(currentIndex / visible);
            const dots      = dotsWrap.querySelectorAll('.slider-dot');
            dots.forEach((d, i) => d.classList.toggle('active', i === groupIdx));
        }

        function goTo(index) {
            const visible   = getVisible();
            const maxIndex  = total - visible;
            currentIndex    = Math.max(0, Math.min(index, maxIndex));

            // Card width + gap
            const cardEl    = cards[0];
            const gap       = parseFloat(getComputedStyle(track).gap) || 32;
            const offset    = currentIndex * (cardEl.offsetWidth + gap);

            track.style.transform = `translateX(-${offset}px)`;

            btnPrev.disabled = currentIndex === 0;
            btnNext.disabled = currentIndex >= maxIndex;
            updateDots();
        }

        function next() { goTo(currentIndex + getVisible()); }
        function prev() { goTo(currentIndex - getVisible()); }

        function startAuto() {
            autoTimer = setInterval(() => {
                const visible  = getVisible();
                const maxIndex = total - visible;
                if (currentIndex >= maxIndex) {
                    goTo(0);
                } else {
                    next();
                }
            }, 5000);
        }

        function resetAuto() {
            clearInterval(autoTimer);
            startAuto();
        }

        btnNext.addEventListener('click', () => { next(); resetAuto(); });
        btnPrev.addEventListener('click', () => { prev(); resetAuto(); });

        // Touch / swipe support
        let touchStartX = 0;
        track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
        track.addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); resetAuto(); }
        }, { passive: true });

        // Rebuild on resize
        window.addEventListener('resize', () => {
            buildDots();
            goTo(0);
        });

        buildDots();
        goTo(0);
        startAuto();
    }

    // ── Lightbox & Phân Trang cho "Ảnh Thực Tế" ──────────────────────────────
    const projectsList = [
        {
            key: 'mrs-d-villa',
            title: 'MRS D VILLA - CẦN THƠ',
            coverUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Phối cảnh mặt tiền biệt thự tân cổ điển đẳng cấp'
                },
                {
                    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Không gian phòng khách chính với thiết kế sang trọng'
                },
                {
                    url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Phòng ngủ master tông ấm cúng và tinh tế'
                },
                {
                    url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Khu vực bếp nấu đầy đủ tiện nghi cao cấp'
                }
            ]
        },
        {
            key: 'mr-a-oceanpark',
            title: 'MR A VILLA - OCEANPARK GIA LÂM',
            coverUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Góc phòng khách kiến trúc bán cổ điển kết hợp Đông Dương'
                },
                {
                    url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Không gian bàn ăn và tủ rượu âm tường tinh tế'
                },
                {
                    url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Phòng tắm đứng ốp đá marble vân mây sang trọng'
                }
            ]
        },
        {
            key: 'mr-a-mizuki',
            title: 'MR A VILLA - MIZUKI PARK',
            coverUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Phòng khách Modern Classic thời thượng'
                },
                {
                    url: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Nội thất phòng khách cận cảnh với chất liệu gỗ tự nhiên'
                },
                {
                    url: 'https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Chi tiết trang trí vách tivi và phào chỉ hiện đại'
                }
            ]
        },
        {
            key: 'happy-house',
            title: 'HAPPY HOUSE - QUẬN 2',
            coverUrl: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80',
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Phòng khách căn hộ chung cư phong cách tối giản Bắc Âu'
                },
                {
                    url: 'https://images.unsplash.com/photo-1556911220-f1a5340f1fd6?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Bếp mở kết nối với phòng khách tạo cảm giác rộng rãi'
                },
                {
                    url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Phòng ngủ nhỏ thiết kế thông minh tối ưu diện tích'
                }
            ]
        },
        {
            key: 'biet-thu-tay-ninh',
            title: 'BIỆT THỰ TÂY NINH',
            coverUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Mặt tiền biệt thự vườn trệt hiện đại'
                },
                {
                    url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Hành lang sân vườn thoáng mát bao quanh nhà'
                },
                {
                    url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Phòng sinh hoạt chung gia đình ngập tràn ánh sáng tự nhiên'
                }
            ]
        },
        {
            key: 'penthouse-grand',
            title: 'PENTHOUSE GRAND RIVERSIDE',
            coverUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Phòng khách thông tầng Penthouse ngắm trọn view sông'
                },
                {
                    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Ban công rộng thoáng nhìn ra toàn cảnh thành phố'
                },
                {
                    url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Phòng ngủ phụ cho khách đầy đủ tiện nghi như khách sạn'
                }
            ]
        },
        {
            key: 'sky-garden-apt',
            title: 'MR B APARTMENT - SKY GARDEN',
            coverUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Phòng khách căn hộ chung cư phong cách Nhật Bản tối giản'
                },
                {
                    url: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Phòng ngủ ấm cúng ngập tràn ánh nắng nhẹ ban mai'
                },
                {
                    url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Khu vực kệ sách kết hợp bàn làm việc tại nhà'
                }
            ]
        },
        {
            key: 'mrs-l-house',
            title: 'DỰ ÁN CẢI TẠO - MRS L HOUSE',
            coverUrl: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=800&q=80',
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Không gian phòng bếp hiện đại được cải tạo mới hoàn toàn'
                },
                {
                    url: 'https://images.unsplash.com/photo-1556911220-f1a5340f1fd6?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Chi tiết bồn rửa chén và các trang thiết bị tủ bếp'
                },
                {
                    url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Bàn ăn nhỏ nhắn, ấm cúng dành cho gia đình 4 người'
                }
            ]
        },
        {
            key: 'phu-my-hung-villa',
            title: 'MR C VILLA - PHÚ MỸ HƯNG',
            coverUrl: 'https://images.unsplash.com/photo-1618221381711-42ca8ab6e908?auto=format&fit=crop&w=800&q=80',
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1618221381711-42ca8ab6e908?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Biệt thự tân cổ điển xa hoa và bề thế tại Phú Mỹ Hưng'
                },
                {
                    url: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Đồ nội thất bọc da cao cấp kết hợp bàn đá tự nhiên'
                },
                {
                    url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Khu vực cầu thang xoắn ốc được ốp đá hoa cương tinh xảo'
                }
            ]
        },
        {
            key: 'green-park-villa',
            title: 'VILLA GREEN PARK - HÀ NỘI',
            coverUrl: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=800&q=80',
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Không gian sống xanh mát ngập tràn sắc hoa cỏ thiên nhiên'
                },
                {
                    url: 'https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Phòng ngủ nhỏ gọn cho bé với tông màu sắc năng động'
                },
                {
                    url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Mặt bằng phòng sinh hoạt chung hiện đại và tinh tế'
                }
            ]
        },
        {
            key: 'skyline-penthouse',
            title: 'PENTHOUSE SKYLINE - QUẬN 7',
            coverUrl: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=800&q=80',
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Góc thư giãn riêng tư sang chảnh bên cạnh ô kính lớn'
                },
                {
                    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Ban công rộng thoáng nhìn ra toàn cảnh thành phố'
                },
                {
                    url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Phòng tắm bồn độc lập hiện đại sang trọng chuẩn resort'
                }
            ]
        },
        {
            key: 'tan-binh-townhouse',
            title: 'MR H TOWNHOUSE - TÂN BÌNH',
            coverUrl: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Phòng ngủ sang trọng phong cách đương đại ấm cúng'
                },
                {
                    url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Khu vực làm việc nhỏ gọn bên cạnh giường ngủ'
                },
                {
                    url: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=80',
                    desc: 'Tủ quần áo thông minh với cánh kính cao cấp'
                }
            ]
        }
    ];

    const PROJECTS_PER_PAGE = 6;
    let currentPaginationPage = 1;

    const gridContainer = document.getElementById('real-photos-grid');
    const paginationContainer = document.getElementById('real-photos-pagination');

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-project-title');
    const lightboxDesc = document.getElementById('lightbox-image-desc');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxThumbs = document.getElementById('lightbox-thumbnails');
    const closeBtn = lightbox ? lightbox.querySelector('.lightbox-close') : null;
    const prevBtn = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
    const nextBtn = lightbox ? lightbox.querySelector('.lightbox-next') : null;

    let currentProject = null;
    let currentImgIndex = 0;
    let openLightbox = () => {};

    // Render Grid and Pagination
    function renderProjectsGrid() {
        if (!gridContainer) return;

        gridContainer.innerHTML = '';

        const startIndex = (currentPaginationPage - 1) * PROJECTS_PER_PAGE;
        const endIndex = startIndex + PROJECTS_PER_PAGE;
        const pageProjects = projectsList.slice(startIndex, endIndex);

        pageProjects.forEach((proj, index) => {
            const card = document.createElement('div');
            card.className = 'real-photo-card reveal active';
            card.style.transitionDelay = `${(index % 3) * 0.1}s`;
            card.setAttribute('data-project', proj.key);

            card.innerHTML = `
                <div class="real-photo-img-wrap">
                    <img src="${proj.coverUrl}" alt="${proj.title}" loading="lazy">
                    <div class="real-photo-brand">
                        <svg viewBox="0 0 24 24"><path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 4.5c1.93 0 3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5-3.5-1.57-3.5-3.5 1.57-3.5 3.5-3.5z"/></svg>
                        <span>HQN INTERIOR</span>
                    </div>
                </div>
                <div class="real-photo-info">
                    <h3>${proj.title}</h3>
                </div>
            `;

            card.addEventListener('click', () => {
                openLightbox(proj.key);
            });

            gridContainer.appendChild(card);
        });

        renderPaginationControls();
    }

    function renderPaginationControls() {
        if (!paginationContainer) return;

        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(projectsList.length / PROJECTS_PER_PAGE);
        if (totalPages <= 1) return;

        // Prev Button
        const prevPageBtn = document.createElement('button');
        prevPageBtn.className = 'real-photos-pagination-btn';
        prevPageBtn.innerHTML = '&#8249;';
        prevPageBtn.disabled = currentPaginationPage === 1;
        prevPageBtn.addEventListener('click', () => {
            if (currentPaginationPage > 1) {
                currentPaginationPage--;
                renderProjectsGrid();
                scrollToSection();
            }
        });
        paginationContainer.appendChild(prevPageBtn);

        // Numeric Buttons
        for (let i = 1; i <= totalPages; i++) {
            const pageNumBtn = document.createElement('button');
            pageNumBtn.className = `real-photos-pagination-btn ${i === currentPaginationPage ? 'active' : ''}`;
            pageNumBtn.textContent = i;
            pageNumBtn.addEventListener('click', () => {
                if (currentPaginationPage !== i) {
                    currentPaginationPage = i;
                    renderProjectsGrid();
                    scrollToSection();
                }
            });
            paginationContainer.appendChild(pageNumBtn);
        }

        // Next Button
        const nextPageBtn = document.createElement('button');
        nextPageBtn.className = 'real-photos-pagination-btn';
        nextPageBtn.innerHTML = '&#8250;';
        nextPageBtn.disabled = currentPaginationPage === totalPages;
        nextPageBtn.addEventListener('click', () => {
            if (currentPaginationPage < totalPages) {
                currentPaginationPage++;
                renderProjectsGrid();
                scrollToSection();
            }
        });
        paginationContainer.appendChild(nextPageBtn);
    }

    function scrollToSection() {
        const section = document.getElementById('real-photos');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    if (lightbox && lightboxImg && lightboxTitle && lightboxDesc && lightboxCounter && lightboxThumbs) {
        // Open Lightbox
        openLightbox = (projectKey) => {
            currentProject = projectsList.find(p => p.key === projectKey);
            if (!currentProject) return;

            currentImgIndex = 0;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Build Thumbnails
            lightboxThumbs.innerHTML = '';
            currentProject.images.forEach((img, index) => {
                const thumb = document.createElement('img');
                thumb.src = img.url.replace('w=1200', 'w=150');
                thumb.alt = `Thumb ${index + 1}`;
                thumb.addEventListener('click', () => {
                    currentImgIndex = index;
                    updateLightbox();
                });
                lightboxThumbs.appendChild(thumb);
            });

            updateLightbox();
        };

        // Update content in lightbox
        const updateLightbox = () => {
            const imgData = currentProject.images[currentImgIndex];
            lightboxImg.src = imgData.url;
            lightboxTitle.textContent = currentProject.title;
            lightboxDesc.textContent = imgData.desc;
            lightboxCounter.textContent = `${currentImgIndex + 1} / ${currentProject.images.length}`;

            // Update active thumbnail
            const thumbs = lightboxThumbs.querySelectorAll('img');
            thumbs.forEach((thumb, idx) => {
                thumb.classList.toggle('active', idx === currentImgIndex);
            });

            // Auto-scroll active thumb into view if overflowing
            const activeThumb = thumbs[currentImgIndex];
            if (activeThumb) {
                activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        };

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        };

        const prevImg = () => {
            currentImgIndex = (currentImgIndex - 1 + currentProject.images.length) % currentProject.images.length;
            updateLightbox();
        };

        const nextImg = () => {
            currentImgIndex = (currentImgIndex + 1) % currentProject.images.length;
            updateLightbox();
        };

        // Event listeners for lightbox controls
        closeBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', prevImg);
        nextBtn.addEventListener('click', nextImg);

        // Close when clicking outside the main image content
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-container')) {
                closeLightbox();
            }
        });

        // Key press events
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prevImg();
            if (e.key === 'ArrowRight') nextImg();
        });

        // Swipe gestures on mobile
        let swipeStartX = 0;
        lightboxImg.addEventListener('touchstart', e => {
            swipeStartX = e.touches[0].clientX;
        }, { passive: true });

        lightboxImg.addEventListener('touchend', e => {
            const swipeEndX = e.changedTouches[0].clientX;
            const diffX = swipeStartX - swipeEndX;
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    nextImg();
                } else {
                    prevImg();
                }
            }
        }, { passive: true });
    }

    // Initialize dynamic grid
    renderProjectsGrid();
});
