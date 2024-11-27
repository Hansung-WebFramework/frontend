// 뉴스 분석 페이지 구성
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Link } from 'react-router-dom'; // Link 컴포넌트를 사용하기 위해 임포트
import '../components/layout/AnalysisPage.module.css';
import Navbar from '../components/layout/Navbar.jsx';

export default function AnalysisPage() {
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
                                        하마스 무장세력이 이스라엘 군인의 시신을 가자지구 거리로 끌고 다녀 양측의 긴장이 고조되었습니다.
                                    </h3>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="secondary">
                                            번역하기
                                        </Button>
                                        <Button size="sm" variant="secondary">
                                            뉴스 요약
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
                                                <div className="text-4xl font-bold">93%</div>
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
                            <CardTitle>What are Israel&apos;s Iron Dome, David&apos;s Sling, and Arrow missile defenses?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* next/image 대신 img 태그 사용 */}
                            <img
                                alt="Israel missile defense system at night"
                                className="rounded-lg object-cover"
                                height={300}
                                src="/src/assets/images/fakenewsimg.png"
                                width={600}
                            />
                            <div className="mt-4 space-y-4">
                                <p className="text-sm text-muted-foreground">
                                    Israel uses its elaborate system of air defenses to counter hundreds of missiles and drones launched by Iran on Tuesday night.
                                </p>
                                <h3 className="font-medium">What are the different tiers of Israel&apos;s missile defence system?</h3>
                                <p className="text-sm text-muted-foreground">
                                    Israel has several air defence systems, each one designed to intercept incoming missiles at different altitudes and distances...
                                </p>
                                <Link to="/read-more" className="text-blue-500 hover:underline">
                                    Read More
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
