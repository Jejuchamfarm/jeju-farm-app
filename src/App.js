import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function App() {
    const reputationChartRef = useRef(null);
    const reputationChartInstance = useRef(null);

    const [activeReputationTab, setActiveReputationTab] = useState('positive');
    const [activeDessertFilter, setActiveDessertFilter] = useState('all');
    // activeStrategyIndex state removed as accordion is replaced by distinct cards

    const reputationData = {
        positive: [
            { icon: '🌿', title: '청정 제주 이미지', text: '소비자들은 제주산 제품의 신선함과 품질을 신뢰합니다. 긍정적 평판이 구매로 이어집니다.' },
            { icon: '💖', title: '높은 재구매 의향', text: '여행 후 온라인으로 재구매하는 패턴이 확산되고 있으며, 만족도가 높게 나타납니다.' },
            { icon: '✨', title: '고급화/차별화 성공', text: '고품질의 프리미엄 디저트가 SNS에서 좋은 반응을 얻으며 시장을 주도합니다.' },
            { icon: '🎁', title: '선물로서의 가치', text: '가격이 다소 높더라도 품질이 뛰어나면 선물로 제격이라는 인식이 강합니다.' },
            { icon: '📱', title: 'SNS 바이럴 효과', text: '인스타그램, 유튜브 등 SNS를 통한 긍정적 리뷰와 입소문이 구매를 촉진합니다.' }
        ],
        negative: [
            { icon: '💸', title: '바가지요금 논란', text: '일부 품목의 높은 가격은 소비자 불만의 주요 원인으로, 관광지 바가지 인식이 존재합니다.' },
            { icon: '❓', title: '원산지 신뢰 문제', text: '수입산을 제주산으로 속여 파는 사례가 발생하여 소비자 신뢰를 저해합니다.' },
            { icon: '🗣️', title: '부정적 경험 확산', text: '안 좋은 경험은 SNS를 통해 빠르게 공유되어 제주 특산물 전반의 평판에 악영향을 미칠 수 있습니다.' },
            { icon: '⚖️', title: '가치 증명의 중요성', text: '소비자들은 가격에 합당한 가치(맛, 양, 경험)를 기대하며, 투명한 가격 정책이 중요합니다.' }
        ]
    };

    const dessertData = [
        { id: 1, category: 'traditional', emoji: '🍡', name: '오메기떡', desc: '전통의 재해석. 쫀득한 식감과 다양한 맛으로 젊은 층에게도 인기 폭발. 온라인 재구매율이 높습니다.', tags: ['스테디셀러', '남녀노소', 'SNS인기'] },
        { id: 2, category: 'bakery', emoji: '🪨', name: '제주돌빵', desc: '현무암 모양의 독특한 비주얼과 특허 기술. 제주의 상징성을 시각적으로 구현하여 선물 가치가 높습니다.', tags: ['비주얼', '특허', '스토리텔링'] },
        { id: 3, category: 'chocolate', emoji: '🍊', name: '프리미엄 감귤 초콜릿', desc: '고품질 원재료(실제 감귤 사용)와 세련된 개별 포장으로 차별화. "진짜 맛있다"는 리뷰가 많습니다.', tags: ['스테디셀러', '고급화', '수출효자'] },
        { id: 4, category: 'bakery', emoji: '🍵', name: '말차(녹차) 디저트', desc: '제주산 녹차의 쌉쌀하고 깊은 맛. 케이크, 푸딩, 롤 등 다양한 형태로 카페 트렌드를 선도합니다.', tags: ['MZ세대', '카페트렌드', '고품질원료'] },
        { id: 5, category: 'chocolate', emoji: '☀️', name: '말린 과일 스낵', desc: '감귤, 한라봉 등 건조 가공 칩. 새콤달콤한 맛과 쫄깃한 식감. 건강 간식 트렌드에 부합합니다.', tags: ['건강지향', '다이어트', '무첨가'] },
        { id: 6, category: 'bakery', emoji: '🥕', name: '당근 케이크 & 디저트', desc: '제주 당근의 달콤함을 활용한 디저트. 특히 구좌읍을 중심으로 카페 인기 메뉴로 자리매김했습니다.', tags: ['로컬식재료', '카페인기', '웰빙'] },
        { id: 7, category: 'traditional', emoji: '🥜', name: '우도 땅콩 디저트', desc: '우도 땅콩의 고소함을 담은 아이스크림, 라떼, 과자 등. 제주 방문 시 필수 코스로 인식됩니다.', tags: ['지역명물', '고소한맛', '다양한활용'] },
        { id: 8, category: 'bakery', emoji: '🍌', name: '제주 바나나 디저트', desc: '새롭게 떠오르는 효자 특산물인 제주산 무농약 바나나를 활용한 신선한 디저트 개발이 시작되었습니다.', tags: ['신규트렌드', '무농약', '잠재력'] },
        { id: 9, category: 'traditional', emoji: '🍬', name: '귤 양갱 & 귤 젤리', desc: '말랑말랑하고 상큼한 귤 향을 느낄 수 있는 전통 가공 과일 디저트. 꾸준한 인기를 얻고 있습니다.', tags: ['전통', '간편', '상큼'] },
        { id: 10, category: 'chocolate', emoji: '🍫', name: '감귤 건조과일 초콜릿', desc: '고급 포장의 개별 제품들이 인기. 실제 감귤 건조 과일에 초콜릿을 입힌 프리미엄 디저트입니다.', tags: ['고급화', '선물용', '프리미엄'] }
    ];
    
    const strategyData = [
        { 
            title: '1. 차별화된 제품 구성 및 디자인', 
            content: '인기 디저트들을 조합한 **\'제주 디저트 종합 선물세트\'**를 기획하세요. 단순한 나열이 아닌, 테마(예: \'제주의 사계절 맛\', \'MZ세대 취향저격 세트\')를 부여하는 것이 중요합니다. 제주의 자연과 감성을 담은 **고급스러운 패키징**과 각 디저트에 얽힌 **스토리텔링**을 더해 선물의 가치를 극대화하세요.',
            icon: '📦', color: 'border-orange-500' // Added color for visual distinction
        },
        { 
            title: '2. 온라인 판매 및 마케팅 집중', 
            content: '자사몰 구축과 함께 쿠팡, 컬리 등 **대형 이커머스 플랫폼 입점**을 적극 고려하여 전국 판매망을 확보해야 합니다. 인스타그램, 유튜브 등에서 매력적인 비주얼 콘텐츠로 **바이럴 마케팅**을 펼치고, 정기적으로 제주 디저트를 배송하는 **구독 서비스** 모델로 충성 고객을 만드세요.',
            icon: '🌐', color: 'border-green-500' // Added color for visual distinction
        },
        { 
            title: '3. 품질 및 신뢰도 관리', 
            content: '**원산지 투명성**은 기본입니다. 제주산 원재료 사용을 명확히 하고, 생산자 정보를 공개하여 신뢰를 쌓으세요. **HACCP 등 식품 안전 인증**을 통해 품질을 증명하고, 온라인 리뷰와 고객 문의에 신속하고 진정성 있게 대응하여 **긍정적인 고객 관계**를 구축하는 것이 장기적인 성공의 열쇠입니다.',
            icon: '✅', color: 'border-blue-500' // Added color for visual distinction
        }
    ];

    useEffect(() => {
        if (reputationChartRef.current) {
            if (reputationChartInstance.current) {
                reputationChartInstance.current.destroy();
            }
            reputationChartInstance.current = new Chart(reputationChartRef.current, {
                type: 'doughnut',
                data: {
                    labels: ['매우 긍정적', '보통', '부정적/개선필요'],
                    datasets: [{
                        data: [75, 20, 5],
                        backgroundColor: ['#22c55e', '#facc15', '#f87171'],
                        borderColor: '#fdfcfb',
                        borderWidth: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '60%',
                    plugins: {
                        legend: { display: false },
                        title: { display: true, text: '소비자 평판 요약 (2025년 추정)', font: { size: 16 } }
                    }
                }
            });
        }
        return () => {
            if (reputationChartInstance.current) {
                reputationChartInstance.current.destroy();
            }
        };
    }, []);

    const handleReputationTabClick = (tab) => {
        setActiveReputationTab(tab);
    };

    const handleDessertFilterClick = (filter) => {
        setActiveDessertFilter(filter);
    };

    // handleStrategyAccordionClick removed

    const filteredDesserts = activeDessertFilter === 'all' 
        ? dessertData 
        : dessertData.filter(d => d.category === activeDessertFilter);

    const navLinks = [
        { id: 'trends', text: '시장 트렌드' },
        { id: 'reputation', text: '소비자 분석' },
        { id: 'products', text: '인기 디저트' },
        { id: 'strategy', text: '사업 전략' },
    ];

    const [activeNavLink, setActiveNavLink] = useState('trends');

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveNavLink(entry.target.id);
                }
            });
        }, observerOptions);

        const sections = document.querySelectorAll('section');
        sections.forEach(section => observer.observe(section));

        return () => {
            sections.forEach(section => observer.unobserve(section));
        };
    }, []);

    const scrollToSection = (id) => {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="text-stone-800">
            <style>
                {`
                body {
                    font-family: 'Noto Sans KR', sans-serif;
                    background-color: #fdfcfb;
                }
                .chart-container {
                    position: relative;
                    width: 100%;
                    max-width: 400px;
                    margin-left: auto;
                    margin-right: auto;
                    height: 300px;
                    max-height: 350px;
                }
                @media (min-width: 768px) {
                    .chart-container {
                        height: 350px;
                    }
                }
                .nav-link {
                    transition: color 0.3s, border-bottom-color 0.3s;
                }
                .active-nav {
                    color: #F97316;
                    border-bottom: 2px solid #F97316;
                }
                .filter-btn {
                    transition: all 0.3s;
                }
                .active-filter {
                    background-color: #F97316;
                    color: white;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
                }
                .dessert-card {
                    transition: transform 0.3s, box-shadow 0.3s;
                }
                .dessert-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
                }
                `}
            </style>

            <header className="bg-white/90 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0">
                            <h1 className="text-xl md:text-2xl font-bold text-stone-800">🎁 제주 디저트 선물 사업 대시보드</h1>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navLinks.map((link) => (
                                    <button
                                        key={link.id}
                                        onClick={() => scrollToSection(link.id)}
                                        className={`nav-link px-3 py-2 rounded-md text-sm font-medium ${activeNavLink === link.id ? 'active-nav' : 'text-stone-600'}`}
                                    >
                                        {link.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

                <section id="trends" className="mb-16 scroll-mt-16 text-center">
                    <h2 className="text-3xl font-bold mb-4">성장하는 제주 디저트 시장의 3대 핵심 트렌드</h2>
                    <p className="text-center text-stone-600 max-w-3xl mx-auto mb-12">
                        2024-2025년 현재, 제주 디저트 시장은 기회로 가득 차 있습니다. 성공적인 사업을 위해 반드시 알아야 할 세 가지 핵심 동향을 확인하세요.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-orange-400">
                            <div className="text-4xl mb-4">💎</div>
                            <h3 className="font-bold text-xl mb-2">고급화 & 프리미엄화</h3>
                            <p className="text-stone-600 text-sm">과거 저가형 시장에서 벗어나, 고품질 원재료와 특별한 경험을 주는 프리미엄 디저트가 시장을 주도합니다.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-400">
                            <div className="text-4xl mb-4">🌿</div>
                            <h3 className="font-bold text-xl mb-2">다양화 & 로코노미</h3>
                            <p className="text-stone-600 text-sm">감귤 외 제주 고유 식재료(말차, 우도 땅콩, 당근 등)를 활용한 독창적인 로컬 디저트가 젊은 층에 인기입니다.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-blue-400">
                            <div className="text-4xl mb-4">🚚</div>
                            <h3 className="font-bold text-xl mb-2">온라인 유통 확장</h3>
                            <p className="text-stone-600 text-sm">쿠팡, 컬리의 새벽/하루배송 도입으로 전국 어디서든 제주 디저트를 쉽게 접할 수 있게 되어 온라인 선물 시장이 급성장했습니다.</p>
                        </div>
                    </div>
                </section>

                <section id="reputation" className="mb-16 scroll-mt-16">
                    <h2 className="text-3xl font-bold text-center mb-12">소비자 마음 엿보기: 기회와 위협</h2>
                    <p className="text-center text-stone-600 max-w-3xl mx-auto mb-12">
                        소비자들은 제주 특산물을 매우 긍정적으로 평가하지만, 일부 부정적인 이슈에 민감하게 반응합니다. 성공적인 사업을 위해서는 강점을 극대화하고 약점을 보완해야 합니다.
                    </p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="mb-4 border-b border-stone-200">
                                <nav className="flex -mb-px" id="reputationTabs">
                                    <button 
                                        data-tab="positive" 
                                        onClick={() => handleReputationTabClick('positive')}
                                        className={`reputation-tab-btn whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeReputationTab === 'positive' ? 'text-orange-500 border-orange-500' : 'text-stone-500 border-transparent hover:text-stone-700 hover:border-stone-300'}`}
                                    >
                                        👍 강점 (기회 요인)
                                    </button>
                                    <button 
                                        data-tab="negative" 
                                        onClick={() => handleReputationTabClick('negative')}
                                        className={`reputation-tab-btn whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ml-8 ${activeReputationTab === 'negative' ? 'text-orange-500 border-orange-500' : 'text-stone-500 border-transparent hover:text-stone-700 hover:border-stone-300'}`}
                                    >
                                        👎 약점 (위협 요인)
                                    </button>
                                </nav>
                            </div>
                            <div id="reputationContent" className="min-h-[250px]">
                                <ul className="space-y-4">
                                    {reputationData[activeReputationTab].map((item, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-2xl mr-4">{item.icon}</span>
                                            <div>
                                                <h4 className="font-bold">{item.title}</h4>
                                                <p className="text-sm text-stone-600">{item.text}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="lg:order-first">
                            <div className="chart-container">
                                <canvas ref={reputationChartRef}></canvas>
                            </div>
                            <p className="text-center text-xs text-stone-500 mt-2">소비자 인식 요약 (2025년 추정)</p>
                        </div>
                    </div>
                </section>

                <section id="products" className="mb-16 scroll-mt-16">
                    <h2 className="text-3xl font-bold text-center mb-12">어떤 디저트를 담을까? 인기 품목 탐색</h2>
                    <p className="text-center text-stone-600 max-w-3xl mx-auto mb-12">
                        선물 패키지의 성공은 어떤 제품을 담느냐에 달려있습니다. 현재 시장에서 가장 인기 있는 디저트들을 카테고리별로 살펴보고 사업 아이템에 대한 영감을 얻어보세요.
                    </p>
                    <div className="flex justify-center flex-wrap gap-2 mb-8">
                        <button 
                            className={`filter-btn px-4 py-2 rounded-full text-sm font-medium bg-white shadow-sm ${activeDessertFilter === 'all' ? 'active-filter' : 'hover:bg-stone-100'}`} 
                            onClick={() => handleDessertFilterClick('all')}
                        >
                            전체보기
                        </button>
                        <button 
                            className={`filter-btn px-4 py-2 rounded-full text-sm font-medium bg-white shadow-sm ${activeDessertFilter === 'traditional' ? 'active-filter' : 'hover:bg-stone-100'}`} 
                            onClick={() => handleDessertFilterClick('traditional')}
                        >
                            전통 간식
                        </button>
                        <button 
                            className={`filter-btn px-4 py-2 rounded-full text-sm font-medium bg-white shadow-sm ${activeDessertFilter === 'bakery' ? 'active-filter' : 'hover:bg-stone-100'}`} 
                            onClick={() => handleDessertFilterClick('bakery')}
                        >
                            베이커리 & 비주얼
                        </button>
                        <button 
                            className={`filter-btn px-4 py-2 rounded-full text-sm font-medium bg-white shadow-sm ${activeDessertFilter === 'chocolate' ? 'active-filter' : 'hover:bg-stone-100'}`} 
                            onClick={() => handleDessertFilterClick('chocolate')}
                        >
                            초콜릿 & 스낵
                        </button>
                    </div>
                    <div id="dessert-gallery" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredDesserts.map(dessert => (
                            <div key={dessert.id} className="dessert-card bg-white rounded-lg shadow-md p-5 flex flex-col">
                                <div className="text-5xl mb-4 text-center">{dessert.emoji}</div>
                                <h3 className="text-xl font-bold mb-2 text-center">{dessert.name}</h3>
                                <p className="text-stone-600 text-sm mb-4 flex-grow">{dessert.desc}</p>
                                <div className="text-xs text-center">
                                    {dessert.tags.map((tag, tagIndex) => (
                                        <span key={tagIndex} className="inline-block bg-stone-100 text-stone-700 rounded-full px-3 py-1 mr-1 mb-1">#{tag}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="strategy" className="scroll-mt-16">
                    <h2 className="text-3xl font-bold text-center mb-12">성공을 위한 3가지 핵심 사업 전략</h2>
                    <p className="text-center text-stone-600 max-w-3xl mx-auto mb-12">
                        시장 분석을 바탕으로, 성공적인 제주 디저트 선물 패키지 사업을 위한 세 가지 핵심 전략을 제안합니다. 각 전략을 클릭해서 자세한 내용을 확인하세요.
                    </p>
                    <div id="strategy-cards" className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {strategyData.map((item, index) => (
                            <div key={index} className={`bg-white rounded-lg shadow-lg p-6 border-t-8 ${item.color} flex flex-col items-center text-center`}>
                                <div className="text-5xl mb-4">{item.icon}</div>
                                <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                                <p className="text-stone-700 text-sm">{item.content}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </main>

            <footer className="bg-stone-800 text-white mt-16">
                <div className="container mx-auto py-4 px-5 text-center">
                    <p className="text-stone-400 text-sm">본 대시보드는 '제주 디저트 선물 패키지 사업을 위한 통합 시장 분석' 보고서를 기반으로 제작되었습니다.</p>
                </div>
            </footer>
        </div>
    );
}

export default App;
