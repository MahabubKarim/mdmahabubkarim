/**
* Template Name: iPortfolio
* Updated: Nov 17 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },  

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  function changeDetailPage(){
    const portfolioId = getQueryParam('id');
    
    if (portfolioId === '1') {
      const imagesLink = [
        'assets/img/portfolio/similaumcher1.webp',
        'assets/img/portfolio/similaumcher2.webp',
        'assets/img/portfolio/similaumcher3.webp',
        // 'assets/img/portfolio/similaumcher3.webp',
      ]
      changeUrlDetails( "https://play.google.com/store/apps/details?id=com.simiconnect.similauncher", "https://play.google.com/store/apps/details?id=com.simiconnect.similauncher" );
      changePortfolioDetails(
        "Simi Launcher", 
        "Our flagship mobile app allows users to use our machine learning technology to instantly add and grade your TCG and Sport cards." +
        "\n" +
        "1. Create & Manage Content and Ad Campaigns:\n" +
        "\n" +
        "Easily create and manage content and ad campaigns from your phone or computer. " +
        "With integration to content editors like Canva, access millions of images, videos, " +
        "and templates to seamlessly publish on your local screens and across the SIMI network, " +
        "reaching both local and global audiences.\n" +
        "\n" +
        "2. Global Reach:\n" +
        "\n" +
        "Display your content on any of your TV’s or screens worldwide, ensuring consistent messaging " +
        "across multiple locations. Control and synchronize content in different cities or countries, " +
        "maintaining a unified brand image while tailoring to specific markets.\n" +
        "\n" +
        "3. Turn Screens into Billboards:\n" +
        "\n" +
        "Transform any display into a dynamic advertising platform. Use digital billboards to showcase " +
        "products, offers, events, or announcements. Easily update and refresh your ads to keep messaging " +
        "current and engaging.\n" +
        "\n" +
        "4. Centralised Control:\n" +
        "\n" +
        "Manage all your advertising from a single, intuitive dashboard. Create, schedule, and monitor " +
        "ad campaigns with ease. Access analytics to track performance and optimize your strategy, " +
        "ensuring efficient management of your advertising efforts."
    );
      updateSwiperImages(imagesLink);
    } else if (portfolioId === '2') { 
      const imagesLink = [
        'assets/img/portfolio/ags1.webp',
        'assets/img/portfolio/ags2.webp',
        ]

      changeUrlDetails( "https://play.google.com/store/apps/details?id=com.wooter.ags", "https://play.google.com/store/apps/details?id=com.wooter.ags" );     

      changePortfolioDetails(
        "AGS Collector", 
        "Our flagship mobile app allows users to use our machine learning technology to instantly add and grade your TCG and Sport cards.");
      updateSwiperImages(imagesLink);

    } else if (portfolioId === '3') { 
      const imagesLink = [
        'assets/img/portfolio/yellowpages.webp',
        ]

      changeUrlDetails( "https://play.google.com/store/apps/details?id=com.yellowpages_uae.app", "https://play.google.com/store/apps/details?id=com.yellowpages_uae.app" );

      changePortfolioDetails(
        "YP UAE for Yellow Pages", 
        "The user friendly UAE’s local search engine for Yellow Pages, lists the contacts and company information of thousands of businesses, different products, categories and business segments. \
        Finding contact details through YP-UAE App is very simple, can be done by searching using company name, by searching for products and services or by merely searching through emirate and location. \
        Features: \
        1. Search business, products & services by Name, Category, Keyword or Brand. \
        2. Search the business around you or in a specific Emirate. \
        3. ‘Quick Access’ to most popular categories, i.e. Restaurants, Hospitals, Car Hire, Building Materials, Real Estate etc. \
        4. Comprehensive coverage of Abu Dhabi, Al Ain, Dubai, Sharjah, Ajman, Umm AL Quwain, Ras Al Khaimah and Fujairah. \
        5. Advertiser’s photos, brands, company descriptions, maps, turn by turn navigation, menus and more. \
        6. Add business info to your contacts with a single touch. \
        7. Save your favorite listings for your future recall."
        );
      updateSwiperImages(imagesLink);

    } else if (portfolioId === '4') { 
      const imagesLink = [
        'assets/img/portfolio/sarmad1.webp',
        'assets/img/portfolio/sarmad2.webp'
      ]

      changeUrlDetails( "https://play.google.com/store/apps/details?id=com.sarmad.app", "https://play.google.com/store/apps/details?id=com.sarmad.app" );

      changePortfolioDetails(
        "Sarmad - سرمد", 
        "The application is concerned with the local news of the State of Kuwait and the Gulf States and the most important Arab and international news in its political, economic, sports, and image categories. It is the official application of the news platform provided by Sarmad, an official media network based in Kuwait licensed by the Ministries of Information and Trade.");
      updateSwiperImages(imagesLink);

    } else if (portfolioId === '5') { 
      const imagesLink = [
        'assets/img/portfolio/kulushae1.webp',
        'assets/img/portfolio/kulushae2.webp',
        'assets/img/portfolio/kulushae3.webp',
        'assets/img/portfolio/kulushae4.webp'
      ]

      changeUrlDetails( "https://play.google.com/store/apps/details?id=com.cashgate.kulushae", "https://play.google.com/store/apps/details?id=com.cashgate.kulushae");

      changePortfolioDetails(
        "Kulushae", 
        "Kulushae is all-in-one online platform enabling users to search, buy, and sell a wide range of products seamlessly.");
      updateSwiperImages(imagesLink);

    } else if (portfolioId === '6') { 
      const imagesLink = [
        'assets/img/portfolio/chobi1.webp',
        'assets/img/portfolio/chobi2.webp',
        'assets/img/portfolio/chobi3.webp'
      ]

      changeUrlDetails( "https://play.google.com/store/apps/details?id=com.cashgate.chobi", "https://play.google.com/store/apps/details?id=com.cashgate.chobi" );

      changePortfolioDetails(
        "CHOBI", 
        "Safety starts with understanding how developers collect and share your data. Data privacy and security practices may vary based on your use, region, and age. The developer provided this information and may update it over time.");
      updateSwiperImages(imagesLink);

    } else if (portfolioId === '7') { 
      const imagesLink = [
        'assets/img/portfolio/elocks1.webp',
        'assets/img/portfolio/elocks2.webp'      ]

      changeUrlDetails( "https://play.google.com/store/apps/details?id=com.elocks.elocks", "https://play.google.com/store/apps/details?id=com.elocks.elocks");

      changePortfolioDetails(
        "E-Locks", 
        "With the “E-locks” App you can operate and manage your electronic “E-Win” patio- and window lock and/or your “E-Pad” Bluetooth padlock.");
      updateSwiperImages(imagesLink);

    } else if (portfolioId === '8') { 
      const imagesLink = [
        'assets/img/portfolio/traffic1.webp',
        'assets/img/portfolio/traffic2.webp',
        'assets/img/portfolio/traffic3.webp'
      ]

      changeUrlDetails( "https://play.google.com/store/apps/details?id=dk.trafficapp.traffic", "https://play.google.com/store/apps/details?id=dk.trafficapp.traffic");

      changePortfolioDetails(
        "Traffic APP", 
        "Whether it comes to field work or planning the office, helping Traffic APP you to get an overview of your projects. It is easy to use on your smartphone or tablet. You can also access the app's features on your computer at home or office. The app features include among others .: - Documentation of tration (images and GPS coordinates) - Printing and sharing vejtilsynsrapporter - Plans for marking of road works - Choosing the right traffic protection - Access to road regulations, handbooks. - Information about road equipment");
      updateSwiperImages(imagesLink);

    } else if (portfolioId === '9') { 
      const imagesLink = [
        'assets/img/portfolio/quranic.png'
      ]

      changeUrlDetails( "https://play.google.com/store/apps/details?id=com.quranic.app", "https://play.google.com/store/apps/details?id=com.quranic.app");

      changePortfolioDetails(
        "Quranic - Learn Quran", 
        "Quranic is a Wikipedia style app where the users can write about a topic of interest or edit existing topics to add more detail on the subject so muslims looking for information can find what they want. All information on topics will be Quranic evidence based so there will be no misleading information allowed. As Muslims, it is important to start reading, debating, understanding and practicing God's laws detailed in the Quran. Too often are we told that only certain people; scholars, mullahs and imaams, can be experts in the message in the Quran. I want every Muslim to be an expert in the book they claim to follow. This can be achieved by putting our heads together and discussing what God is telling us. 1. Quran in Arabic and various other Languages 2. Like and comment on a verse 3. Discuss traditions and practices 4. Chat room to talk to other users");
      updateSwiperImages(imagesLink);

    } else if (portfolioId === '10') { 
      const imagesLink = [
        'assets/img/portfolio/simitv1.webp',
        'assets/img/portfolio/simitv2.webp',
        'assets/img/portfolio/simitv3.webp'
        ]

      changeUrlDetails( "https://play.google.com/store/apps/details?id=com.simiconnect.simidigitalplatform", "https://play.google.com/store/apps/details?id=com.simiconnect.simidigitalplatform");

      changePortfolioDetails(
        "SIMI AdTV", 
        "SIMI: The Ultimate Digital Display Screen Advertising Platform. \
        \
        1. Create & Manage Content and Ad Campaigns, \
        Easily create and manage content and ad campaigns from your phone or computer. With integration to content editors like Canva, access millions of images, videos, and templates to seamlessly publish on your local screens and across the SIMI network, reaching both local and global audiences. \
        \
        2. Global Reach \
        Display your content on any of your TV’s or screens worldwide, ensuring consistent messaging across multiple locations. Control and synchronize content in different cities or countries, maintaining a unified brand image while tailoring to specific markets. \
        \
        3. Turn Screens into Billboards \
        Transform any display into a dynamic advertising platform. Use digital billboards to showcase products, offers, events, or announcements. Easily update and refresh your ads to keep messaging current and engaging. \
        \
        4. Centralised Control \
        Manage all your advertising from a single, intuitive dashboard. Create, schedule, and monitor ad campaigns with ease. Access analytics to track performance and optimize your strategy, ensuring efficient management of your advertising efforts. \
        \
        5. Seamless Scheduling \
        Coordinate your campaigns across all screens and social media platforms, including Facebook, Instagram, LinkedIn, TikTok, YouTube, and Pinterest. Schedule ads to reach your audience at optimal times, maximizing engagement and impact. \
        \
        6. Link Multiple Venues \
        Network multiple screens for a cohesive advertising experience across all locations. Deliver consistent messaging while customising content for specific venues, enhancing relevance and effectiveness. \
        \
        7. Maximise Earnings \
        Monetise your screens with our revenue-sharing program. SIMI serves ads from our ad partner network, allowing you to earn additional income. Depending on the venue's location and audience, each screen could earn $500 or more per month, offering a scalable source of passive income. \
        \
        8. Advertise Across the SIMI Network \
        Extend your reach beyond your screens. Advertise across SIMI's expansive network, tapping into new markets and diverse audiences in various venues. This targeted advertising ensures your content reaches the right demographics, increasing visibility and engagement. \
        \
        9. Competitive Advertising Rates \
        Access cost-effective advertising solutions tailored to your needs. SIMI offers transparent pricing and flexible packages, making it easy for businesses of all sizes to reach a broad and engaged audience without exceeding their budget."
    );
      updateSwiperImages(imagesLink);

    } else if (portfolioId === '11') { 
      const imagesLink = [
        'assets/img/portfolio/simismart1.webp',
        'assets/img/portfolio/simismart2.webp',
        'assets/img/portfolio/simismart3.webp',
        'assets/img/portfolio/simismart4.webp'
      ]

      changeUrlDetails( "https://play.google.com/store/apps/details?id=com.simiconnect.simismart", "https://play.google.com/store/apps/details?id=com.simiconnect.simismart");

      changePortfolioDetails(
        "Simi Smart",  "Transform any building into a smart and connected environment with SIMI Smart. Enjoy the convenience of managing all your devices from one app, with the ability to connect to hundreds of compatible brands, thousands of devices, across multiple sites and groups. \
        \
        Key Features: \
        • Manage and control multiple devices from one app \
        • New brands and devices added regularly \
        • Multiple users can save and access their own settings, giving everyone the ability to control their own space. \
        • Connect to multiple sites from one account \
        • Control and manage any premise from anywhere in the world \
        • Track your energy consumption & monitor your carbon footprint, costs & statistics by individual device or room, across multiple sites & groups \
        • Protect any premises both onsite or remotely, whilst reducing energy consumption on the go \
        • Easily connect supported devices and make any building smart \
        • Create and manage your group with ease. Group creator can add or delete users as needed."
    );
      updateSwiperImages(imagesLink);

    }  else if (portfolioId === '12') { 
      const imagesLink = [
        'assets/img/portfolio/weather1.jpg',
        'assets/img/portfolio/weather2.jpg'
      ]

      changeUrlDetails( "https://github.com/AliBadar/WeatherApp", "https://github.com/AliBadar/WeatherApp");

      changePortfolioDetails(
        "Weather App", 
        "The Weather - App consuming an Open Weather API to display Current Weather and Search the Weather for different cities. It has been built with clean architecture principles, Repository Pattern, and MVVM pattern, as well as Architecture Components. \
        \
        App features: \
        • Current Location Weather \
        • Search Weather for different cities \
        • Saved Search Favorite Cities"
    );
      updateSwiperImages(imagesLink);

    }  else if (portfolioId === '13') { 
      const imagesLink = [
        'assets/img/portfolio/currency1.jpg',
        'assets/img/portfolio/currency2.jpg'
      ]

      changeUrlDetails( "https://github.com/AliBadar/CurrencyConverterCompose", "CurrencyConverter");

      changePortfolioDetails(
        "Currency Converter", 
        "Currency Converter - App consuming an Open Exchange Rates API to display exchange rates for different countries and apply conversions based on the selected currency. It has been built with clean architecture principles, Repository Pattern, and MVVM pattern, as well as Architecture Components. \
        \
        App features: \
        • Get exchange rates of different countries \
        • Convert rates based on the selected base currency \
        • Saved exchange rates"
    );
      updateSwiperImages(imagesLink);

    }  else if (portfolioId === '14') { 
      const imagesLink = [
        'assets/img/portfolio/portfolio-details-1.jpg',
        'assets/img/portfolio/portfolio-details-1.jpg',
        'assets/img/portfolio/portfolio-details-1.jpg'
      ]

      changeUrlDetails( "https://play.google.com/store/apps/details?id=com.quranic.app", "https://play.google.com/store/apps/details?id=com.quranic.app");

      changePortfolioDetails(
        "Quranic - Learn Quran", 
        "Quranic is a Wikipedia style app where the users can write about a topic of interest or edit existing topics to add more detail on the subject so muslims looking for information can find what they want. All information on topics will be Quranic evidence based so there will be no misleading information allowed. As Muslims, it is important to start reading, debating, understanding and practicing God's laws detailed in the Quran. Too often are we told that only certain people; scholars, mullahs and imaams, can be experts in the message in the Quran. I want every Muslim to be an expert in the book they claim to follow. This can be achieved by putting our heads together and discussing what God is telling us. 1. Quran in Arabic and various other Languages 2. Like and comment on a verse 3. Discuss traditions and practices 4. Chat room to talk to other users");
      updateSwiperImages(imagesLink);

    }   else {
      
    }
  }

  function changeUrlDetails(link, textContent){
    const anchor = document.querySelector('.detail-url');
    anchor.href = link;
    anchor.textContent = textContent;
  }

  const changePortfolioDetails  = (heading, desc)=>{
    const header = document.querySelector(".portfolio-description h2")
    const description = document.querySelector(".portfolio-description p")
    header.textContent = heading
    description.textContent = desc
  }

  function updateSwiperImages(newImages=[]) {
    const swiperWrapper = document.querySelector('.swiper-wrapper');

    swiperWrapper.innerHTML = '';


    newImages.forEach((imageSrc, index) => {
        const newSlide = document.createElement('div');
        newSlide.classList.add('swiper-slide');
        newSlide.setAttribute('data-swiper-slide-index', index);

        const imgElement = document.createElement('img');
        imgElement.setAttribute('src', imageSrc);
        imgElement.setAttribute('alt', '');

        newSlide.appendChild(imgElement);

        swiperWrapper.appendChild(newSlide);
    });

  }



  changeDetailPage()


  // function updateDetailsPage(){
  //   const contentDiv = document.getElementById('content');
  // }

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()