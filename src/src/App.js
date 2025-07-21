import React, { useState, useEffect } from 'react';
import { MapPin, Share2, Heart, Star, Package, Info, Volume2, ChevronRight, ChevronLeft } from 'lucide-react';

// ProductCard Component for reusable product display
const ProductCard = ({ imageSrc, imageAlt, name, description, originalPrice, discountedPrice, rating, onBuyClick }) => {
  const [isPackagingTooltipVisible, setIsPackagingTooltipVisible] = useState(false); // Local state for tooltip

  // Function to display star ratings based on the given value
  const displayRating = (value) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= value) {
        stars.push(<Star key={i} fill="currentColor" size={18} />);
      } else {
        stars.push(<Star key={i} size={18} />);
      }
    }
    return stars;
  };

  return (
    <div className="relative bg-white rounded-xl shadow-md overflow-hidden group border border-orange-100 hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/cccccc/333333?text=Image+Not+Found"; }} // Fallback for broken images
      />
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-xl font-semibold text-gray-900 mb-1 leading-tight">{name}</h3>
        {/* Product Description */}
        <p className="text-gray-600 text-sm mb-2">{description}</p>
        {/* Star Rating */}
        <div className="flex items-center text-yellow-500 mb-2">
          {displayRating(rating)}
          <span className="ml-2 text-gray-600 text-sm">({rating.toFixed(1)}/5.0)</span>
        </div>
        {/* Price Information */}
        <div className="flex flex-col items-start mb-3">
          {originalPrice && (
            <span className="text-gray-500 text-sm line-through mb-0.5">{originalPrice.toLocaleString()}원</span>
          )}
          <span className="text-2xl font-bold text-orange-700">{discountedPrice.toLocaleString()}원</span>
        </div>
        {/* Buy Now Button */}
        <button
          className="w-full px-4 py-2 bg-orange-500 text-white rounded-full font-semibold shadow-sm hover:bg-orange-600 transition-colors transform hover:scale-105"
          onClick={onBuyClick}
        >
          구매하기
        </button>
      </div>
      {/* Packaging Info Tooltip */}
      <div
        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md cursor-pointer"
        onMouseEnter={() => setIsPackagingTooltipVisible(true)}
        onMouseLeave={() => setIsPackagingTooltipVisible(false)}
      >
        <Package size={20} className="text-gray-600" />
        {isPackagingTooltipVisible && (
          <div className="absolute top-full right-0 mt-2 p-3 bg-gray-800 text-white text-sm rounded-lg shadow-lg w-48 z-10">
            <p>신선도 유지를 위한 개별 포장 및 에어캡 완충 포장</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Main App component
const App = () => {
  // State for managing the current image index in the hero carousel
  const [currentHeroImageIndex, setCurrentHeroImageIndex] = useState(0);
  // State for managing the visibility of the representative's message popup
  const [showRepresentativeMessage, setShowRepresentativeMessage] = useState(false);

  // Array of hero images for the carousel
  // These URLs have been updated with the provided Google Drive links.
  const heroImages = [
    {
      // Image 1: 따스한 아침 햇살에 빛나는 한라봉/감귤 바구니
      src: "https://drive.google.com/uc?export=view&id=1H6Z61Bu7UuDR85wVRU-a8gfBvycyEtj5",
      alt: "따스한 아침 햇살에 빛나는 한라봉/감귤 바구니"
    },
    {
      // Image 2: 제주참농원 대표가 고급스러운 우드 테이블 위에서 과일을 정성스레 선별하는 장면
      src: "https://drive.google.com/uc?export=view&id=1pS6_JYjl9mEauu3wy1bt8Dj2lS2SvWYj",
      alt: "제주참농원 대표가 과일을 선별하는 장면"
    },
    {
      // Image 3: 고객이 선물 박스를 받아드는 순간의 포근한 표정
      src: "https://drive.google.com/uc?export=view&id=1fx3mqPIzOIrEHAMKJbzKNYvImvUdchT6",
      alt: "고객이 선물 박스를 받아드는 장면"
    },
    {
      // Image 4: 깔끔하고 따뜻한 매장 내부
      src: "https://drive.google.com/uc?export=view&id=1Ygr6VZkx3opovn6LVYK9rdqJMkUvdAhM",
      alt: "깔끔하고 따뜻한 매장 내부"
    },
    {
      // Image 5: 방금 잡아 올린 듯한 신선 생선
      src: "https://drive.google.com/uc?export=view&id=1Y-IRXm8FJE54Fpg4iftLGhCkC5seh3Yg",
      alt: "방금 잡아 올린 듯한 신선 생선"
    },
  ];

  // Effect for auto-advancing the hero image carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [heroImages.length]);

  // Function to navigate to the previous image in the carousel
  const goToPreviousHeroImage = () => {
    setCurrentHeroImageIndex((prevIndex) => (prevIndex - 1 + heroImages.length) % heroImages.length);
  };

  // Function to navigate to the next image in the carousel
  const goToNextHeroImage = () => {
    setCurrentHeroImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
  };

  // Handler for the "View Map" button
  const handleViewMap = () => {
    // Direct link to Google Maps for the store address
    const address = "제주특별자치도 제주시 번영로 345, 내트럭하우스 1층";
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
  };

  // Handler for the "Share" button (placeholder functionality)
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: '제주참농원',
        text: '제주 청정 자연 속, 신선함을 담다!',
        url: window.location.href,
      }).then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that do not support the Web Share API
      const messageBox = document.createElement('div');
      messageBox.className = 'fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50';
      messageBox.innerHTML = `
        <div class="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center relative animate-fade-in-up">
          <h3 class="text-2xl font-bold text-orange-700 mb-4">공유 기능 안내</h3>
          <p class="text-lg leading-relaxed text-gray-700 mb-6">이 브라우저에서는 공유 기능을 지원하지 않습니다. 아래 URL을 복사하여 공유해주세요:</p>
          <input type="text" value="${window.location.href}" readonly class="w-full p-3 border border-gray-300 rounded-lg mb-4 text-center text-gray-800" />
          <button class="px-6 py-3 bg-orange-600 text-white font-bold rounded-full shadow-md hover:bg-orange-700 transition-all transform hover:scale-105" onclick="this.closest('.fixed').remove()">닫기</button>
        </div>
      `;
      document.body.appendChild(messageBox);
    }
  };

  // Function to show a custom message box instead of alert()
  const showCustomMessageBox = (title, message) => {
    const messageBox = document.createElement('div');
    messageBox.className = 'fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50';
    messageBox.innerHTML = `
      <div class="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center relative animate-fade-in-up">
        <h3 class="text-2xl font-bold text-orange-700 mb-4">${title}</h3>
        <p class="text-lg leading-relaxed text-gray-700 mb-6">${message}</p>
        <button class="px-6 py-3 bg-orange-600 text-white font-bold rounded-full shadow-md hover:bg-orange-700 transition-all transform hover:scale-105" onclick="this.closest('.fixed').remove()">확인</button>
      </div>
    `;
    document.body.appendChild(messageBox);
  };

  // Handler for the "Listen to Voice" icon
  const handleListenVoice = () => {
    showCustomMessageBox('대표 음성 안내', '안녕하세요, 제주참농원 대표입니다. 직접 정성껏 관리하고 있습니다.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 font-['Inter'] text-gray-800">
      {/* Header Section */}
      <header className="relative w-full overflow-hidden rounded-b-3xl shadow-xl">
        {/* Hero Image Carousel */}
        <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh]">
          {heroImages.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentHeroImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1200x600/cccccc/333333?text=Image+Not+Found"; }}
            />
          ))}
          {/* Carousel Navigation Buttons */}
          <button
            onClick={goToPreviousHeroImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black bg-opacity-40 text-white rounded-full hover:bg-opacity-60 transition-all focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNextHeroImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black bg-opacity-40 text-white rounded-full hover:bg-opacity-60 transition-all focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
          {/* Carousel Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentHeroImageIndex ? 'bg-white scale-125' : 'bg-gray-400 bg-opacity-70'
                }`}
                onClick={() => setCurrentHeroImageIndex(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg mb-2">🌿 제주참농원</h1>
          <p className="text-xl md:text-2xl font-semibold drop-shadow-md">제주 청정 자연 속, 신선함을 담다</p>
          {/* Slogan Example: "제주 참맛, 당신의 식탁에 따뜻하게 전합니다." */}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* About Section */}
        <section className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-orange-700 mb-4">제주참농원 소개</h2>
          <p className="text-lg leading-relaxed mb-4">
            따스한 햇살, 제주 참맛 그대로
          </p>
          <p className="text-lg leading-relaxed mb-4">
            제주참농원은 청정 제주의 자연 속에서
            <br />
            가장 <strong className="font-bold text-orange-600">신선한</strong> 과일과 해산물만을 <strong className="font-bold text-orange-600">정성스럽게</strong> 선별해
            <br />
            매일 산지에서 바로, 고객님께 전해드립니다.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            2010년 오픈 이래,
            <br />
            저희는 <strong className="font-bold text-orange-600">신선함과 믿음</strong>을 약속드리며
            <br />
            고객 한 분, 한 분께
            <br />
            제주만의 <strong className="font-bold text-orange-600">따뜻한 감성과 고급스러움</strong>을 담아
            <br />
            <strong className="font-bold text-orange-600">진심</strong>을 전하고 있습니다.
          </p>
          <p className="text-lg leading-relaxed">
            한라봉 한 알, 옥돔 한 마리에도
            <br />
            제주의 햇살과 바람, 그리고 저희의 마음을 가득 담았습니다.
            {/* Slogan Example: "햇살도 바람도 담아, 제주에서 오늘 바로" */}
          </p>
        </section>

        {/* Producer Story Section */}
        <section className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-orange-700 mb-4">생산자 스토리</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Image 6: 제주참농원 대표 */}
            <div className="relative">
              <img
                src="https://drive.google.com/uc?export=view&id=16YzDNj634ClOfYarI3VPvqR0jTDYhN3H"
                alt="제주참농원 대표"
                className="w-48 h-48 rounded-full object-cover shadow-md cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setShowRepresentativeMessage(true)}
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/200x200/cccccc/333333?text=Image+Not+Found"; }}
              />
              <button
                onClick={handleListenVoice}
                className="absolute bottom-2 right-2 p-2 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-600 transition-colors transform hover:scale-110"
                aria-label="대표 음성 듣기"
              >
                <Volume2 size={20} />
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-lg leading-relaxed mb-4">
                오늘 수확, 오늘 포장, 오늘 출고
                <br />
                제주참농원은
                <br />
                제주산 <strong className="font-bold text-orange-600">신선함이 변하지 않도록</strong>
                <br />
                수확과 동시에 바로 포장해
                <br />
                <strong className="font-bold text-orange-600">가장 빠르게</strong> 고객님께 배송합니다.
              </p>
              <p className="text-lg leading-relaxed">
                <strong className="font-bold text-orange-600">대표의 약속, 품질의 자부심</strong>
                <br />
                저희 대표가 <strong className="font-bold text-orange-600">직접 상품의 상태와 맛,</strong>
                <br />
                <strong className="font-bold text-orange-600">하나하나 정성껏 확인합니다.</strong>
                <br />
                오랜 노하우와 양심을 담아
                <br />
                <strong className="font-bold text-orange-600">믿고 드실 수 있는 제주 참맛만을</strong>
                <br />
                엄선해 전해드립니다.
              </p>
            </div>
          </div>
        </section>

        {/* Store Information Section */}
        <section className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-orange-700 mb-4">매장 안내</h2>
          <ul className="text-lg leading-relaxed space-y-2">
            <li><strong>주소:</strong> 제주특별자치도 제주시 번영로 345, 내트럭하우스 1층</li>
            <li><strong>운영 시간:</strong> 08:30 ~ 19:00 (연중무휴)</li>
            <li><strong>특징:</strong> 방문/예약/픽업 가능</li>
          </ul>
          <button
            onClick={handleViewMap}
            className="mt-6 px-6 py-3 bg-orange-600 text-white font-bold rounded-full shadow-md hover:bg-orange-700 transition-all flex items-center justify-center transform hover:scale-105"
          >
            <MapPin size={24} className="mr-2" /> 지도보기
          </button>
        </section>

        {/* Product Showcase - Redesigned for CJ Market style */}
        <section className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8">
          <h2 className="text-3xl font-bold text-orange-700 mb-6">제주참농원 상품</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Product Card 1: Hallabong */}
            <ProductCard
              imageSrc="https://drive.google.com/uc?export=view&id=1VT15mtrv-wqlKP8jq_LqrEu19IcmkaTL"
              imageAlt="탐스러운 제주 한라봉"
              name="탐스러운 제주 한라봉"
              description="제주 햇살을 머금고 자란 달콤한 한라봉"
              originalPrice={30000}
              discountedPrice={25000}
              rating={4.5}
              onBuyClick={() => showCustomMessageBox('구매하기', '장바구니에 담기 기능은 현재 개발 중입니다.')}
            />

            {/* Product Card 2: Gosori-sul (Updated from Silver Hairtail) */}
            <ProductCard
              imageSrc="https://drive.google.com/uc?export=view&id=1lpmhqJ91hlcBMdwAAYCnUvriBqlV6j1_"
              imageAlt="향긋한 제주 고소리술"
              name="향긋한 제주 고소리술"
              description="제주를 담은 향긋한 전통주"
              originalPrice={45000}
              discountedPrice={38000}
              rating={5.0}
              onBuyClick={() => showCustomMessageBox('구매하기', '장바구니에 담기 기능은 현재 개발 중입니다.')}
            />

            {/* Product Card 3: Mandarin Chocolate */}
            <ProductCard
              imageSrc="https://drive.google.com/uc?export=view&id=1eKio39eRn-wTUl-dU-01Zs6FUKlb-N3Y"
              imageAlt="제주 감귤 초콜릿"
              name="제주 감귤 초콜릿"
              description="제주 감귤의 상큼함이 가득한 초콜릿"
              originalPrice={15000}
              discountedPrice={12000}
              rating={3.8}
              onBuyClick={() => showCustomMessageBox('구매하기', '장바구니에 담기 기능은 현재 개발 중입니다.')}
            />

            {/* Product Card 4: Cheonhyehyang */}
            <ProductCard
              imageSrc="https://drive.google.com/uc?export=view&id=1uEJtJX2YxQ4MpwL8nKd7nAFV3ku4RuEX"
              imageAlt="달콤한 제주 천혜향"
              name="달콤한 제주 천혜향"
              description="하늘이 내린 향기, 제주 천혜향"
              originalPrice={35000}
              discountedPrice={30000}
              rating={4.9}
              onBuyClick={() => showCustomMessageBox('구매하기', '장바구니에 담기 기능은 현재 개발 중입니다.')}
            />

            {/* Product Card 5: Okdom */}
            <ProductCard
              imageSrc="https://drive.google.com/uc?export=view&id=1TFCu52enK0lBVJ2YziKbhekXxQGVN810"
              imageAlt="귀한 제주 옥돔"
              name="귀한 제주 옥돔"
              description="제주 바다의 보물, 귀한 옥돔"
              originalPrice={50000}
              discountedPrice={45000}
              rating={4.7}
              onBuyClick={() => showCustomMessageBox('구매하기', '장바구니에 담기 기능은 현재 개발 중입니다.')}
            />

            {/* New Product Card 6: Jeju Black Pork */}
            <ProductCard
              imageSrc="https://placehold.co/600x400/FFD700/FFF8DC?text=Image+12"
              imageAlt="제주 흑돼지"
              name="제주 프리미엄 흑돼지"
              description="육즙 가득, 고소한 제주 흑돼지"
              originalPrice={40000}
              discountedPrice={35000}
              rating={4.8}
              onBuyClick={() => showCustomMessageBox('구매하기', '장바구니에 담기 기능은 현재 개발 중입니다.')}
            />

            {/* New Product Card 7: Jeju Omegi Tteok */}
            <ProductCard
              imageSrc="https://placehold.co/600x400/FFA500/FFF8DC?text=Image+13"
              imageAlt="제주 오메기떡"
              name="쫄깃한 제주 오메기떡"
              description="제주 전통의 맛, 쫄깃한 오메기떡"
              originalPrice={20000}
              discountedPrice={18000}
              rating={4.2}
              onBuyClick={() => showCustomMessageBox('구매하기', '장바구니에 담기 기능은 현재 개발 중입니다.')}
            />

            {/* New Product Card 8: Jeju Mandarin Juice */}
            <ProductCard
              imageSrc="https://placehold.co/600x400/FF8C00/FFF8DC?text=Image+14"
              imageAlt="제주 감귤 주스"
              name="상큼한 제주 감귤 주스"
              description="제주 감귤 100%, 상큼한 주스"
              originalPrice={10000}
              discountedPrice={8500}
              rating={4.6}
              onBuyClick={() => showCustomMessageBox('구매하기', '장바구니에 담기 기능은 현재 개발 중입니다.')}
            />
          </div>
        </section>

        {/* Reviews/Social Share Section */}
        <section className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8 text-center">
          <h2 className="text-3xl font-bold text-orange-700 mb-6">고객 후기 및 공유</h2>
          <p className="text-gray-600 mb-6">
            따뜻한 조명 아래, 고객이 직접 찍은 한라봉 언박싱/식탁 사진처럼 소중한 후기를 남겨주세요!
          </p>
          <div className="flex justify-center space-x-4 mb-6">
            <button
              className="flex items-center px-6 py-3 bg-blue-500 text-white font-bold rounded-full shadow-md hover:bg-blue-600 transition-all transform hover:scale-105"
              onClick={() => showCustomMessageBox('후기 작성', '후기 작성 기능은 현재 개발 중입니다.')}
            >
              <Info size={24} className="mr-2" /> 후기 작성
            </button>
            <button
              className="flex items-center px-6 py-3 bg-purple-500 text-white font-bold rounded-full shadow-md hover:bg-purple-600 transition-all transform hover:scale-105"
              onClick={handleShare}
            >
              <Share2 size={24} className="mr-2" /> 공유하기
            </button>
            <button
              className="flex items-center px-6 py-3 bg-red-500 text-white font-bold rounded-full shadow-md hover:bg-red-600 transition-all transform hover:scale-105"
              onClick={() => showCustomMessageBox('좋아요', '좋아요 기능은 현재 개발 중입니다.')}
            >
              <Heart size={24} className="mr-2" /> 좋아요
            </button>
          </div>
          <p className="text-gray-600">
            고객님들의 소중한 후기와 함께 제주참농원의 신선함을 널리 알려주세요!
            {/* Slogan Example: "정성과 신뢰로, 프리미엄 산지직송" */}
          </p>
        </section>
      </main>

      {/* Representative Message Popup */}
      {showRepresentativeMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center relative animate-fade-in-up">
            <h3 className="text-2xl font-bold text-orange-700 mb-4">제주참농원 대표 인사말</h3>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              "안녕하세요, 제주참농원 대표입니다. 저희는 제주 청정 자연의 선물인 신선한 과일과 해산물을 고객님의 식탁까지 가장 빠르고 정직하게 전해드리기 위해 최선을 다하고 있습니다. 15년간 쌓아온 신뢰를 바탕으로, 앞으로도 변함없이 최고의 품질과 진심을 담아 보답하겠습니다. 제주참농원에 많은 관심과 사랑 부탁드립니다!"
            </p>
            <button
              onClick={() => setShowRepresentativeMessage(false)}
              className="px-6 py-3 bg-orange-600 text-white font-bold rounded-full shadow-md hover:bg-orange-700 transition-all transform hover:scale-105"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* Tailwind CSS Script - Always include this for Tailwind to work */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Custom styles for animations (optional, but good for dynamic effects) */}
      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: slideInUp 0.5s ease-out forwards;
        }
        `}
      </style>
    </div>
  );
};

export default App;
