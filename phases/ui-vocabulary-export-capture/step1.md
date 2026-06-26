# Step 1: print-and-pdf-layout-hardening

## 읽어야 할 파일

- `phases/ui-vocabulary-export-capture/step0.md` — 왜: export mode와 filename 계약을 이어받는다.
- `docs/ui-vocabulary/export-capture.md` — 왜: Step 0에서 확정한 PDF/PNG contract를 구현한다.
- `examples/ui-vocabulary-site/src/App.tsx` — 왜: split button, filter state, print trigger를 수정한다.
- `examples/ui-vocabulary-site/src/index.css` — 왜: print layout과 hidden controls를 안정화한다.
- `examples/ui-vocabulary-site/src/components/term-card.tsx` — 왜: print card sizing과 break behavior를 조정할 수 있다.

## 작업

현재 PDF 저장 흐름을 명확한 mode 기반으로 정리한다.

- `current` mode: 현재 검색/필터 결과만 print한다.
- `all` mode: query/filter를 초기화하고 전체 term grid를 print한다.
- print 전에 export mode state를 설정하고 print 후 원래 state를 복구한다.
- print CSS에서 header, count, grid, card spacing이 A4 기준으로 흔들리지 않게 한다.
- 화면 조작 UI는 print에서 숨기고, export 대상 제목/범위는 print에 남긴다.

## Acceptance Criteria

```bash
cd examples/ui-vocabulary-site
npm run build
npm run lint
```

## 검증 절차

1. Chrome smoke로 `current` PDF mode에서 필터 count가 유지되는지 확인한다.
2. Chrome smoke로 `all` PDF mode에서 `257 / 257 terms` print 대상이 되는지 확인한다.
3. `data-print-hidden`, `data-print-grid`, `data-print-card` 계약이 깨지지 않았는지 확인한다.
4. `phases/ui-vocabulary-export-capture/index.json` step 1을 완료 상태로 갱신한다.

## 금지사항

- `window.print()` 호출 전에 비동기 state 전환을 race condition으로 방치하지 않는다. 이유: 잘못된 범위가 저장될 수 있다.
- print CSS에서 일반 screen layout을 깨지 않는다.
