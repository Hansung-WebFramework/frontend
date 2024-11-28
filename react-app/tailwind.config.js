/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // src 폴더 내의 모든 컴포넌트 포함
    './index.html',              // 루트 index.html 포함
  ],
  theme: {
    extend: {
      // 폰트 설정 확장
      fontFamily: {
        amethysta: ['Amethysta', 'serif'], // Amethysta 폰트를 등록
      },
      colors: {
        primary: '#0A2647', // 헤더 및 버튼 색상
        secondary: '#F1F0F0', // 배경 색상
      },
    },
  },
  plugins: [],
};
