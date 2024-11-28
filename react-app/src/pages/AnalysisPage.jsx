// 뉴스 분석 페이지 구성
import { useParams } from 'react-router-dom'; // useParams 훅을 임포트
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import '../components/layout/AnalysisPage.module.css';
import Navbar from '../components/layout/Navbar.jsx';
import { useEffect, useState } from 'react';

async function getAnalitics() { // fetch 쿼리문
    const res = await fetch("http://localhost:5173/analysis");

    if (!res.ok) {
        throw new Error("HTTP ERROR");
    }

    return res.json();
}

const AnalysisPage = () => {
    const { id } = useParams(); // URL에서 id 파라미터 가져오기
    const [data, setData] = useState(null); // 데이터 상태 선언
    const [error, setError] = useState(null); // 에러 상태 선언
    const [selectedData, setSelectedData] = useState(null); // 선택된 뉴스 데이터
    const [displayedSummary, setDisplayedSummary] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const analyticsData = await getAnalitics();
                setData(analyticsData); // 전체 데이터 업데이트
    
                // id에 해당하는 데이터 찾기
                const selected = analyticsData.find((item) => item.id === id);
                if (selected) {
                    setSelectedData(selected); // 선택된 데이터 설정
                    setDisplayedSummary(selected.summary); // 초기 요약 설정
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error); // 에러 상태 업데이트
            }
        };

        fetchData();
  }, [id]); // id 값 변경 시마다 실행

  console.log(data);

  if (error) {
      return <div>데이터를 불러오는 중 오류가 발생했습니다: {error.message}</div>;
  }

  if (!data) {
      return <div>데이터를 불러오는 중입니다...</div>;
  }

  const handleShowKoreanSummary = () => {
    setDisplayedSummary(selectedData['summary-kor']); // 한국어 요약 표시
  };

  const handleShowEnglishSummary = () => {
    setDisplayedSummary(selectedData.summary); // 영어 요약 표시
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar 사용 */}
      <Navbar />

      {/* 메인 콘텐츠 영역 */}
      <main className="container mx-auto p-4">
        <div className="grid gap-6 md:grid-cols-2">
          {/* 왼쪽 섹션: 요약 및 분석 카드 */}
          <div className="space-y-6">
            {/* 요약 박스 */}
            <Card>
              <CardHeader>
                <CardTitle>뉴스 요약</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border bg-muted p-4 mb-4">
                    <h3 className="text-lg font-medium mb-4">
                        {displayedSummary}
                    </h3>
                    <div className="flex gap-2">
                    <Button onClick={handleShowEnglishSummary} size="sm" variant="secondary">
                        뉴스 요약
                    </Button>
                    <Button onClick={handleShowKoreanSummary} size="sm" variant="secondary">
                        번역하기
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 분석 결과 카드 */}
            <Card>
              <CardHeader>
                <CardTitle>Analysis Result</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <div className="relative h-48 w-48">
                    <div className="absolute inset-0 flex items-center justify-center rounded-full border-8 border-primary/20">
                      <div className="text-center">
                        <div className="text-4xl font-bold">{selectedData.accuracy}% {/* 정확도 분석 accuracy */}</div>
                        <div className="text-sm text-muted-foreground">Accuracy</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-gray-300" />
                    <span className="text-sm">0-25%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-300" />
                    <span className="text-sm">26-50%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500" />
                    <span className="text-sm">51-75%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-700" />
                    <span className="text-sm">76-100%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 오른쪽 섹션: 원본 기사 카드 */}
          <Card>
            <CardHeader>
              <CardTitle>{selectedData.title} {/* 뉴스 제목 title */}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* next/image 대신 img 태그 사용 */}
              <img
                alt="news image is loading"
                className="rounded-lg object-cover"
                height={300}
                src={selectedData.originalArticle.image}
                width={600}
              />
              <div className="mt-4 space-y-4">
                <p className="text-sm text-muted-foreground">
                    {selectedData.originalArticle.description} {/* 뉴스 내용 originalArticle */}
                </p>
                <p className="text-sm text-muted-foreground">
                    {selectedData.originalArticle.extraDetails} {/* 뉴스 내용 extraDetails */}
                </p>
                <a href={selectedData.originalArticle.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    Read More
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
    );
};

export default AnalysisPage;
