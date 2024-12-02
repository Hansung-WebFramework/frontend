const onboardingMock = {
  articles: 127,
  trustLevel: 67,
  highTrustArticles: 86,
};

const now = new Date();
export const chartMockData = Array.from({ length: 7 }, (_, i) => {
  const date = new Date(now);
  date.setDate(now.getDate() - (6 - i)); // 7일 전부터 오늘까지 날짜 생성
  return {
      date: `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`,
      value: Math.floor(Math.random() * 51) + 50, // 50~100 사이의 랜덤 값
  };
});

export default onboardingMock;
