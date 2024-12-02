import { setupWorker } from "msw/browser";
import { handlers } from "./handlers"; // 핸들러 가져오기

// 핸들러 설정 및 서비스 워커 초기화
export const worker = setupWorker(...handlers);
