# Step 3: glossary-browsing-experience

## 읽어야 할 파일

- `docs/PRD.md` — 왜: 검색, 카드, 상세 보기의 사용자 가치와 성공 기준이 정의되어 있다.
- `docs/ARCHITECTURE.md` — 왜: term card/detail/visual/search component boundary가 정의되어 있다.
- `examples/ui-vocabulary-site/src/data/terms.generated.ts` — 왜: 실제 렌더링 데이터 shape를 확인한다.
- `phases/ui-vocabulary-encyclopedia/step2.md` — 왜: scaffold와 build AC를 이어받는다.

## 작업

검색, 카테고리 필터, term card grid, detail panel을 구현한다. 각 card는 용어명 옆에 `term-visual.tsx` 기반 미니 UI 컴포넌트를 실제로 보여줘야 한다.

## Acceptance Criteria

```bash
cd examples/ui-vocabulary-site
npm run build
```

## 검증 절차

1. AC 커맨드 실행
2. local dev server에서 "토글", "모달", "dropdown" 검색 smoke
3. desktop/mobile viewport에서 카드 텍스트와 미니 visual이 겹치지 않는지 확인
4. `phases/ui-vocabulary-encyclopedia/index.json` step 3을 completed 또는 error로 갱신

## 금지사항

- 카드에서 visual을 아이콘 하나로 대체하지 않는다. 이유: 사용자는 컴포넌트가 어떻게 생겼는지 알아야 한다.
- marketing landing page를 만들지 않는다. 이유: 첫 화면은 바로 사전/탐색 경험이어야 한다.
