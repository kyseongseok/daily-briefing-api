# DAILY BRIEFING

RDA 직원용 데일리 뉴스 브리핑 웹앱 (비공식) · 연구정책국 연구정책과

## 구조

```
src/            화면 원본 (index.html = 모바일, pc.html = PC, app.js · app.css = 공통)
tools/build.py  src → public 빌드 (글꼴 잘라내기 + 캐릭터 그림 파일로 풀기)
tools/imgs.json 이삭이·새싹이·전설 그림 (도감 추가 시 여기에 넣고 다시 빌드)
public/         배포되는 결과물 (Vercel)
```

## 빌드

```
pip install fonttools brotli
python3 tools/build.py
```

## 진행 상황

- [x] 1단계: 시안 → 앱 화면 (지금은 예시 기사, 이 브라우저에 저장)
- [ ] 2단계: 네이버 뉴스 검색 연결 (`/api/news`)
- [ ] 3단계: Supabase 저장 (출석·스크랩·도감·팀·동기화)
- [ ] 4단계: Vercel 배포
- [ ] 5단계: 매일 기사 수 자동 기록 (통계)
