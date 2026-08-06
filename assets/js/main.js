/**
 * معمل الأهرام للتحاليل الطبية - Al-Ahram Lab
 * ملف التفاعل المطور والإدارة الحركية والتصميم الليلي (Cinematic Interactive Engine)
 * يتضمن إدارة الحجز عبر واتساب، نافذة الخصم التفاعلية، الأسئلة الشائعة Accordion، وحركيات الظهور الأسطورية.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ====================================================
     1. نظام التحكم في الوضع الليلي (Dark Mode Engine)
     ==================================================== */
  const themeToggle = document.getElementById('theme-toggle');
  const rootElement = document.documentElement;
  const currentTheme = localStorage.getItem('al_ahram_theme') || 'light';

  const setTheme = (theme) => {
    if (theme === 'dark') {
      rootElement.setAttribute('data-theme', 'dark');
      if (themeToggle) {
        themeToggle.innerHTML = '<i class="fa-solid fa-sun" title="التبديل إلى الوضع النهاري"></i>';
        themeToggle.setAttribute('aria-label', 'التبديل إلى الوضع النهاري');
      }
    } else {
      rootElement.removeAttribute('data-theme');
      if (themeToggle) {
        themeToggle.innerHTML = '<i class="fa-solid fa-moon" title="التبديل إلى الوضع الليلي"></i>';
        themeToggle.setAttribute('aria-label', 'التبديل إلى الوضع الليلي');
      }
    }
    localStorage.setItem('al_ahram_theme', theme);
  };

  // تطبيق المظهر المفضل عند تحميل الصفحة
  setTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = rootElement.getAttribute('data-theme') === 'dark';
      setTheme(isDark ? 'light' : 'dark');
    });
  }

  /* ====================================================
     2. إدارة شريط التنقل المتنقل (Sticky Navbar effect)
     ==================================================== */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  /* ====================================================
     3. القائمة المتنقلة للهواتف (Mobile Drawer Toggle)
     ==================================================== */
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    // إغلاق القائمة عند النقر على أي رابط
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  /* ====================================================
     4. تمييز الرابط الحالي أثناء التصفح (Scroll Spy)
     ==================================================== */
  const sections = document.querySelectorAll('section[id], header[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 150;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
          navLink.classList.add('active');
        }
      }
    });
  });

  /* ====================================================
     5. فلترة الباقات والتحاليل الطبية (Services Filter)
     ==================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  if (filterButtons.length > 0 && serviceCards.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        serviceCards.forEach(card => {
          card.style.transition = 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1) translateY(0)';
            }, 30);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8) translateY(15px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 350);
          }
        });
      });
    });
  }

  /* ====================================================
     6. حركات الظهور السينمائية عند التمرير (Cinematic Scroll Reveal)
     ==================================================== */
  const revealElements = document.querySelectorAll('.reveal-el, .reveal-on-scroll');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -25px 0px" });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ====================================================
     7. الرسوم المتحركة لأرقام الإحصائيات مع التهدئة (Smooth Easing Number Counters)
     ==================================================== */
  const statNumbers = document.querySelectorAll('.counter-val');
  let animated = false;

  const animateCounters = () => {
    statNumbers.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2200; // 2.2 seconds
      const startTime = performance.now();

      // دالة التهدئة السينمائية (Ease Out Expo) لبطء طبيعي عند الاقتراب من الرقم
      const easeOutExpo = (x) => {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
      };

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentVal = Math.floor(easeOutExpo(progress) * target);

        counter.innerText = currentVal.toLocaleString('en-US');

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target.toLocaleString('en-US');
        }
      };
      
      requestAnimationFrame(updateCounter);
    });
  };

  const statsSection = document.querySelector('.stats-bar');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          animateCounters();
        }
      });
    }, { threshold: 0.25 });
    
    statsObserver.observe(statsSection);
  }

  /* ====================================================
     8. إدارة نافذة الترحيب والتنبيه الذكية (Promo Modal)
     ==================================================== */
  const modalOverlay = document.getElementById('promo-modal-overlay');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const dismissModalBtn = document.getElementById('dismiss-modal-btn');
  const claimModalBtn = document.getElementById('modal-claim-btn');

  const showPromoModal = () => {
    if (modalOverlay) {
      modalOverlay.classList.add('active');
    }
  };

  const closePromoModal = () => {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      sessionStorage.setItem('al_ahram_promo_closed', 'true');
    }
  };

  // إظهار النافذة بعد 5 ثوانٍ إذا لم تكن قد عُرضت في نفس الجلسة
  if (modalOverlay && !sessionStorage.getItem('al_ahram_promo_closed')) {
    setTimeout(showPromoModal, 5200);
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closePromoModal);
  if (dismissModalBtn) dismissModalBtn.addEventListener('click', closePromoModal);
  if (claimModalBtn) claimModalBtn.addEventListener('click', closePromoModal);

  // إغلاق النافذة عند النقر على المساحة المعتمة خارج الصندوق
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closePromoModal();
      }
    });
  }

});

/* ====================================================
   9. إغلاق وفتح إجابات الأسئلة الشائعة (FAQ Accordion Toggle)
   ==================================================== */
function toggleFaq(headerElement) {
  const faqItem = headerElement.parentElement;
  const isActive = faqItem.classList.contains('active');

  // إغلاق جميع العناصر الأخرى اختياري لتجربة منظمة
  const allFaqs = document.querySelectorAll('.faq-item');
  allFaqs.forEach(item => item.classList.remove('active'));

  // إذا لم يكن نشطاً، قمنا بفتحه
  if (!isActive) {
    faqItem.classList.add('active');
  }
}

/* ====================================================
   10. معالج إرسال نموذج الحجز إلى واتساب (WhatsApp Booking Submit)
   ==================================================== */
function submitBookingForm(event) {
  event.preventDefault();

  // التقاط البيانات المدخلة
  const name = document.getElementById('booking-name')?.value.trim() || 'عميل معمل الأهرام';
  const phone = document.getElementById('booking-phone')?.value.trim() || 'غير محدد';
  const service = document.getElementById('booking-service')?.value || 'فحص عام';
  const type = document.getElementById('booking-type')?.value || 'زيارة لمقر المعمل';
  const time = document.getElementById('booking-time')?.value || 'أقرب موعد ممكن';
  const notes = document.getElementById('booking-notes')?.value.trim() || 'لا توجد ملاحظات إضافية';

  // صياغة رسالة احترافية منظمة للإرسال عبر واتساب
  const message = `🌟 *تأكيد حجز موعد جديد - معمل الأهرام* 🌟\n\n` +
                  `🧑 *اسم العميل:* ${name}\n` +
                  `📱 *رقم التواصل:* ${phone}\n` +
                  `🔬 *الخدمة / الباقة المطلوبة:* ${service}\n` +
                  `🏥 *طريقة إجراء التحليل:* ${type}\n` +
                  `⏰ *الموعد المفضل:* ${time}\n` +
                  `📝 *ملاحظات إضافية:* ${notes}\n\n` +
                  `_مرسل تلقائياً عبر منصة حجز الموقع الإلكتروني (#صحتكم_أمانة_في_أيدينا)_`;

  // تحويل النص إلى تنسيق رابط واتساب
  const whatsappNumber = "201289614364"; // الرقم المعتمد في الموقع
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  // إظهار رسالة نجاح سريعة وفتح شات واتساب مباشرة
  alert("✅ تم تجهيز بيانات حجزك بنجاح! سيتم تحويلك الآن لمحادثة واتساب الرسمية لمعمل الأهرام لتأكيد الموعد فوراً.");
  window.open(whatsappUrl, '_blank');

  // إعادة ضبط النموذج
  const form = document.getElementById('whatsapp-booking-form');
  if (form) form.reset();
}
