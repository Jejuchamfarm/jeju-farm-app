<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>제주 특산물 시장 동향 분석</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
    <!-- Chosen Palette: Warm Neutral with Tangerine Accent -->
    <!-- Application Structure Plan: A thematic, dashboard-style single-page application. The structure is designed for intuitive exploration, starting with a high-level summary, then diving into consumer reputation (positive vs. negative), popular item trends with interactive filtering by category, and finally purchase channels. This non-linear structure allows users to quickly grasp key insights and then explore areas of interest, which is more user-friendly than a linear report format. -->
    <!-- Visualization & Content Choices: Report Info -> Overall perception data. Goal -> Inform. Viz -> Doughnut Chart (Chart.js) for simple proportion. Interaction -> None. Justification -> Quick visual summary of consumer sentiment. Report Info -> Online review counts for popular items. Goal -> Compare. Viz -> Interactive Bar Chart (Chart.js). Interaction -> Category filter buttons update chart data. Justification -> Allows users to compare popularity across and within categories, revealing key trends like the dominance of processed black pork and Omegi-tteok. Report Info -> Key trends and issues. Goal -> Organize & Inform. Viz -> Thematic cards and tabbed content blocks. Interaction -> Tabs reveal detailed text. Justification -> Breaks down complex information into digestible, user-controlled chunks. -->
    <!-- CONFIRMATION: NO SVG graphics used. NO Mermaid JS used. -->
    <style>
        body {
            font-family: 'Noto Sans KR', sans-serif;
            background-color: #F5F5F4; /* stone-100 */
        }
        .chart-container {
            position: relative;
            width: 100%;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
            height: 300px;
            max-height: 400px;
        }
        @media (min-width: 768px) {
            .chart-container {
                height: 400px;
            }
        }
        .nav-link {
            transition: color 0.3s, border-bottom-color 0.3s;
        }
        .nav-link:hover {
            color: #F97316; /* orange-500 */
        }
        .active-nav {
            color: #F97316; /* orange-500 */
            border-bottom: 2px solid #F97316;
        }
        .tab-btn {
            transition: background-color 0.3s, color 0.3s;
        }
        .active-tab {
            background-color: #F97316; /* orange-500 */
            color: white;
        }
    </style>
</head>
<body class="text-stone-800">

    <header class="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
        <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex-shrink-0">
                    <h1 class="text-xl md:text-2xl font-bold text-stone-800">🍊 제주 특산물 시장 대시보드</h1>
                </div>
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-4">
                        <a href="#summary" class="nav-link px-3 py-2 rounded-md text-sm font-medium text-stone-600">시장 요약</a>
                        <a href="#reputation" class="nav-link px-3 py-2 rounded-md text-sm font-medium text-stone-600">소비자 평판</a>
                        <a href="#trends" class="nav-link px-3 py-2 rounded-md text-sm font-medium text-stone-600">인기 품목 트렌드</a>
                        <a href="#channels" class="nav-link px-3 py-2 rounded-md text-sm font-medium text-stone-600">주요 구매 채널</a>
                    </div>
                </div>
            </div>
        </nav>
    </header>

    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

        <section id="summary" class="mb-16 scroll-mt-16">
            <h2 class="text-3xl font-bold text-center mb-4">한눈에 보는 제주 특산물 시장</h2>
            <p class="text-center text-stone-600 max-w-3xl mx-auto mb-12">
                본 대시보드는 제주 특산물 시장에 대한 한국 소비자의 인식, 구매 동향, 최신 트렌드를 시각적으로 분석합니다. 전반적으로 '청정 제주' 이미지를 바탕으로 긍정적 평판을 유지하고 있으나, 가격 및 신뢰도 문제는 해결 과제로 남아있습니다. 온라인 시장의 급성장과 '로코노미' 트렌드가 시장의 새로운 활력소가 되고 있습니다.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h3 class="font-bold text-lg mb-2">👍 긍정적 이미지</h3>
                    <p class="text-stone-600 text-sm">소비자 60%가 '좋다'고 평가. '청정 제주' 이미지가 구매로 연결되며, 88%가 구매 경험 보유.</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h3 class="font-bold text-lg mb-2">📈 온라인 급성장</h3>
                    <p class="text-stone-600 text-sm">온라인 구매 의향 91%. 쿠팡/컬리 등 새벽배송 도입으로 전국 접근성 향상 및 온라인 매출 급증.</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h3 class="font-bold text-lg mb-2">💎 고급화 & 다양화</h3>
                    <p class="text-stone-600 text-sm">'로코노미' 트렌드에 맞춰 고품질 가공식품(고급 초콜릿, 흑돼지 가공품 등) 인기 상승.</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h3 class="font-bold text-lg mb-2">⚠️ 신뢰도 문제</h3>
                    <p class="text-stone-600 text-sm">'바가지요금' 논란과 원산지 허위 표시 사례가 SNS를 통해 확산되며 신뢰도 저해 요인으로 작용.</p>
                </div>
            </div>
        </section>

        <section id="reputation" class="mb-16 scroll-mt-16">
            <h2 class="text-3xl font-bold text-center mb-12">빛과 그림자: 소비자 평판 분석</h2>
            <p class="text-center text-stone-600 max-w-3xl mx-auto mb-12">
                제주 특산물에 대한 소비자 인식은 매우 긍정적인 동시에 일부 부정적인 경험이 공존합니다. 아래 차트는 전반적인 인식을 보여주며, 탭을 통해 긍정적 요인과 부정적 요인을 각각 자세히 살펴볼 수 있습니다.
            </p>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div class="lg:col-span-1">
                    <div class="chart-container h-64 md:h-80 mx-auto">
                        <canvas id="reputationChart"></canvas>
                    </div>
                     <p class="text-center text-xs text-stone-500 mt-2">출처: 2015년 소비자 설문조사</p>
                </div>
                <div class="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <div class="mb-4 border-b border-stone-200">
                        <nav class="flex -mb-px" id="reputationTabs">
                            <button data-tab="positive" class="reputation-tab-btn whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300">
                                긍정적 평판 요인
                            </button>
                            <button data-tab="negative" class="reputation-tab-btn whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300 ml-8">
                                부정적 평판 요인
                            </button>
                        </nav>
                    </div>
                    <div id="reputationContent">
                    </div>
                </div>
            </div>
        </section>

        <section id="trends" class="mb-16 scroll-mt-16">
            <h2 class="text-3xl font-bold text-center mb-12">무엇이 잘 팔릴까? 인기 품목 트렌드</h2>
            <p class="text-center text-stone-600 max-w-3xl mx-auto mb-12">
                소비자들이 실제로 많이 찾고 이야기하는 품목은 무엇일까요? 온라인 리뷰 수를 기반으로 한 아래 차트와 카테고리별 분석을 통해 최신 구매 트렌드를 확인해 보세요. 카테고리 버튼을 클릭하면 차트와 설명이 업데이트됩니다.
            </p>
            <div class="text-center mb-8">
                <button data-category="all" class="tab-btn px-4 py-2 rounded-full text-sm font-medium bg-white shadow-sm hover:bg-stone-100 mx-1 my-1">전체</button>
                <button data-category="processed" class="tab-btn px-4 py-2 rounded-full text-sm font-medium bg-white shadow-sm hover:bg-stone-100 mx-1 my-1">가공식품/디저트 🍰</button>
                <button data-category="livestock" class="tab-btn px-4 py-2 rounded-full text-sm font-medium bg-white shadow-sm hover:bg-stone-100 mx-1 my-1">축산물 🐷</button>
                <button data-category="agricultural" class="tab-btn px-4 py-2 rounded-full text-sm font-medium bg-white shadow-sm hover:bg-stone-100 mx-1 my-1">농산물 🍊</button>
                <button data-category="fishery" class="tab-btn px-4 py-2 rounded-full text-sm font-medium bg-white shadow-sm hover:bg-stone-100 mx-1 my-1">수산물 🐟</button>
            </div>
            <div class="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <div class="chart-container h-80 md:h-96 lg:h-[500px]">
                    <canvas id="popularityChart"></canvas>
                </div>
                <div id="trend-description" class="mt-6 p-4 bg-stone-50 rounded-md text-stone-700">
                </div>
            </div>
        </section>

        <section id="channels" class="scroll-mt-16">
            <h2 class="text-3xl font-bold text-center mb-12">어디서 구매할까? 주요 구매 채널</h2>
             <p class="text-center text-stone-600 max-w-3xl mx-auto mb-12">
                제주 특산물은 전통적인 오프라인 채널과 급성장하는 온라인 채널을 통해 유통됩니다. 소비자들은 목적과 편의에 따라 다양한 채널을 활용하고 있으며, 특히 온라인 플랫폼의 영향력이 커지고 있습니다.
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="bg-white p-6 rounded-lg shadow-md text-center">
                    <div class="text-4xl mb-4">🛒</div>
                    <h3 class="font-bold text-lg mb-2">온라인 전문몰</h3>
                    <p class="text-stone-600 text-sm">삼다몰, 이제주몰 등<br>제주 특산물에 특화된 쇼핑몰. 높은 고객 만족도와 지역화폐 사용 가능.</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md text-center">
                    <div class="text-4xl mb-4">🚚</div>
                    <h3 class="font-bold text-lg mb-2">대형 이커머스</h3>
                    <p class="text-stone-600 text-sm">쿠팡, 컬리 등<br>새벽/당일 배송 서비스로 신선식품 구매의 패러다임을 바꾸며 전국구 고객 확보.</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md text-center">
                    <div class="text-4xl mb-4">🏪</div>
                    <h3 class="font-bold text-lg mb-2">전통시장</h3>
                    <p class="text-stone-600 text-sm">동문시장, 올레시장 등<br>관광객 필수 코스. 현장감과 다양한 품목을 직접 보고 구매하는 재미 제공.</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md text-center">
                   <div class="text-4xl mb-4">✈️</div>
                    <h3 class="font-bold text-lg mb-2">면세점/기념품샵</h3>
                    <p class="text-stone-600 text-sm">공항, 관광지 등<br>여행의 마지막 관문. 고급화된 포장의 초콜릿, 디저트류 등 선물용 상품 중심.</p>
                </div>
            </div>
        </section>

    </main>
    
    <footer class="bg-stone-800 text-white mt-16">
        <div class="container mx-auto py-4 px-5 text-center">
            <p class="text-stone-400 text-sm">본 페이지는 제공된 '제주 특산물 시장 분석 보고서'를 기반으로 제작된 대화형 데이터 시각화입니다.</p>
        </div>
    </footer>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            
            const reputationData = {
                positive: {
                    title: '✅ 긍정적 평판 요인',
                    points: [
                        { icon: '🌿', text: "'청정 제주'라는 강력한 브랜드 이미지" },
                        { icon: '🏆', text: "삼다몰 등 전문 쇼핑몰의 높은 고객 만족도 (6년 연속 1위)" },
                        { icon: '🔄', text: "여행 후 온라인 재구매 패턴 확산" },
                        { icon: '💖', text: "고급화된 가공식품(프루낵 초콜릿 등)에 대한 높은 만족도" },
                        { icon: '👍', text: "다금바리 등 '비싸지만 가치있다'는 '가심비' 품목 존재" }
                    ]
                },
                negative: {
                    title: '⚠️ 부정적 평판 요인',
                    points: [
                        { icon: '💸', text: "해산물, 식사 메뉴 등에서 불거진 '바가지요금' 논란" },
                        { icon: '❓', text: "수입산을 제주산으로 속여 파는 원산지 허위 표시 사례" },
                        { icon: '📉', text: "가격에 비해 양이 부족하다는 소비자 불만" },
                        { icon: '🗣️', text: "SNS를 통한 부정적 경험의 빠른 확산" },
                        { icon: '🤔', text: "프리미엄 이미지로 인한 전반적인 높은 가격대에 대한 부담" }
                    ]
                }
            };

            const trendData = {
                all: {
                    description: "전체적으로 제주 흑돼지 가공품과 오메기떡이 온라인에서 압도적인 인기를 보입니다. 전통적인 농수산물보다 편리하고 특색있는 가공식품에 대한 선호도가 높게 나타납니다.",
                    items: {
                        labels: ['흑돼지 양념구이', '오메기떡', '하우스 감귤', '흑돼지 두루치기', '한라봉', '고등어', '감귤초콜릿', '갈치'],
                        data: [36000, 7000, 8910, 5000, 4061, 1945, 207, 898]
                    }
                },
                processed: {
                    description: "오메기떡이 전통 간식의 현대화에 성공하며 폭발적인 인기를 얻고 있습니다. 기존의 저가형 초콜릿에서 벗어나, 실제 과일을 사용한 고급 초콜릿과 특색있는 디저트(제주돌빵 등)가 새로운 트렌드로 부상하고 있습니다. 흑돼지 육포, 족발 등 축산 가공품도 강세입니다.",
                    items: {
                        labels: ['오메기떡', '흑돼지 양념구이', '흑돼지 두루치기', '감귤초콜릿', '흑돼지 껍데기', '흑돼지 육포'],
                        data: [7000, 36000, 5000, 207, 2038, 121]
                    }
                },
                livestock: {
                    description: "제주 흑돼지는 단순 정육을 넘어 양념육, 두루치기, 껍데기, 육포 등 다양한 가공 형태로 큰 인기를 끌고 있습니다. 이는 소비자의 편의성을 높이고 부가가치를 창출한 성공적인 다각화 사례입니다.",
                    items: {
                        labels: ['흑돼지 양념구이', '흑돼지 두루치기', '흑돼지 껍데기', '흑돼지 뒷다리살', '흑돼지 육포'],
                        data: [36000, 5000, 2038, 1121, 121]
                    }
                },
                agricultural: {
                    description: "감귤, 한라봉 등 전통적인 감귤류는 여전히 선물용으로 높은 수요를 보입니다. 특히 온라인을 통한 산지 직송 구매가 활발합니다. 최근에는 무농약 바나나, 애플망고 등 새로운 아열대 과일이 주목받고 있습니다.",
                    items: {
                        labels: ['하우스 감귤', '한라봉', '황금향', '레드향', '천혜향'],
                        data: [8910, 4061, 1500, 1200, 1100]
                    }
                },
                fishery: {
                    description: "고등어와 갈치는 제주를 대표하는 수산물로, 선물세트 형태로 꾸준한 인기를 유지하고 있습니다. 옥돔, 참조기 또한 인기 품목입니다. 다만, 일부 품목의 가격 논란은 해결해야 할 과제입니다.",
                    items: {
                        labels: ['고등어', '갈치', '옥돔', '참조기'],
                        data: [1945, 898, 500, 450]
                    }
                }
            };

            const reputationCtx = document.getElementById('reputationChart').getContext('2d');
            const reputationChart = new Chart(reputationCtx, {
                type: 'doughnut',
                data: {
                    labels: ['좋다', '보통', '나쁘다'],
                    datasets: [{
                        label: '제주 특산물 이미지',
                        data: [60, 36, 3],
                        backgroundColor: [
                            'rgba(52, 211, 153, 0.7)', // green-400
                            'rgba(251, 191, 36, 0.7)', // amber-400
                            'rgba(239, 68, 68, 0.7)'   // red-500
                        ],
                        borderColor: [
                            'rgba(5, 150, 105, 1)',
                            'rgba(217, 119, 6, 1)',
                            'rgba(185, 28, 28, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: '제주 특산물 전반적 인식'
                        }
                    }
                }
            });

            const popularityCtx = document.getElementById('popularityChart').getContext('2d');
            const popularityChart = new Chart(popularityCtx, {
                type: 'bar',
                data: {
                    labels: trendData.all.items.labels,
                    datasets: [{
                        label: '온라인 상품 리뷰 수 (추정)',
                        data: trendData.all.items.data,
                        backgroundColor: 'rgba(249, 115, 22, 0.6)', // orange-500
                        borderColor: 'rgba(249, 115, 22, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    if (value >= 1000) {
                                        return (value / 1000) + 'k';
                                    }
                                    return value;
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: '주요 특산물 온라인 인기도 (리뷰 수 기준)',
                            font: {
                                size: 16
                            }
                        },
                         tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.x !== null) {
                                        label += new Intl.NumberFormat('ko-KR').format(context.parsed.x) + '개';
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
            });

            function updateTrendContent(category) {
                const data = trendData[category];
                document.getElementById('trend-description').innerHTML = `<p>${data.description}</p>`;
                
                popularityChart.data.labels = data.items.labels;
                popularityChart.data.datasets[0].data = data.items.data;
                popularityChart.update();

                document.querySelectorAll('.tab-btn').forEach(btn => {
                    btn.classList.remove('active-tab');
                    if (btn.dataset.category === category) {
                        btn.classList.add('active-tab');
                    }
                });
            }
            
            document.querySelectorAll('.tab-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const category = button.dataset.category;
                    updateTrendContent(category);
                });
            });

            function updateReputationContent(tab) {
                const content = reputationData[tab];
                const container = document.getElementById('reputationContent');
                
                let html = `<h3 class="font-bold text-lg mb-4">${content.title}</h3><ul class="space-y-3">`;
                content.points.forEach(point => {
                    html += `<li class="flex items-start"><span class="mr-3 text-xl">${point.icon}</span><span class="text-stone-600">${point.text}</span></li>`;
                });
                html += `</ul>`;
                
                container.innerHTML = html;

                document.querySelectorAll('.reputation-tab-btn').forEach(btn => {
                    btn.classList.remove('text-orange-600', 'border-orange-600');
                    btn.classList.add('text-stone-500', 'border-transparent');
                    if (btn.dataset.tab === tab) {
                        btn.classList.add('text-orange-600', 'border-orange-600');
                        btn.classList.remove('text-stone-500', 'border-transparent');
                    }
                });
            }

            document.querySelectorAll('.reputation-tab-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const tab = button.dataset.tab;
                    updateReputationContent(tab);
                });
            });

            const navLinks = document.querySelectorAll('.nav-link');
            const sections = document.querySelectorAll('section');

            window.addEventListener('scroll', () => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    if (pageYOffset >= sectionTop - 80) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active-nav');
                    if (link.getAttribute('href').includes(current)) {
                        link.classList.add('active-nav');
                    }
                });
            });

            navLinks.forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });

            updateTrendContent('all');
            updateReputationContent('positive');
        });
    </script>

</body>
</html>
