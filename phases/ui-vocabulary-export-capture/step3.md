# Step 3: single-card-png-capture

## 읽어야 할 파일

- `docs/ui-vocabulary/export-capture.md` — 왜: PNG dependency와 filename 계약을 따른다.
- `examples/ui-vocabulary-site/src/components/term-card.tsx` — 왜: card-level export target을 부여한다.
- `examples/ui-vocabulary-site/src/components/term-detail.tsx` — 왜: detail view에서 단일 term PNG 저장 entry를 둘 수 있다.
- `examples/ui-vocabulary-site/src/lib/search.ts` — 왜: filename에 term id/name을 안정적으로 사용할 수 있다.

## 작업

단일 term card/detail을 PNG로 저장한다.

- `src/lib/export-capture.ts`를 추가한다.
- 확정된 dependency 또는 직접 구현으로 DOM node를 PNG data URL/blob로 변환한다.
- card/detail에 stable export target attribute를 부여한다.
- detail sheet 또는 card action에서 `PNG 저장` 버튼을 제공한다.
- capture 전 font readiness와 background color를 처리한다.

## Acceptance Criteria

```bash
cd examples/ui-vocabulary-site
npm run build
npm run lint
```

## 검증 절차

1. Chrome smoke로 대표 term card target을 찾는다.
2. capture helper가 nonblank PNG data URL/blob를 반환하는지 확인한다.
3. filename이 `ui-vocabulary-<term-id>-<yyyy-mm-dd>.png` 형식을 따르는지 확인한다.
4. `phases/ui-vocabulary-export-capture/index.json` step 3을 완료 상태로 갱신한다.

## 금지사항

- canvas taint를 유발하는 외부 이미지 URL을 도입하지 않는다. 이유: PNG export가 실패한다.
- card 내부 interactive mini mock 상태를 강제로 조작하지 않는다. 이유: 사용자가 보는 현재 DOM을 캡처해야 한다.
