# Step 0: export-contract-and-dependencies

## 읽어야 할 파일

- `docs/PRD.md` — 왜: export/capture가 deferred H3 범위였는지와 non-goal을 확인한다.
- `docs/ARCHITECTURE.md` — 왜: existing data flow와 visual asset strategy를 유지해야 한다.
- `docs/plans/2026-06-26-ui-vocabulary-export-capture-polish.md` — 왜: 이번 phase의 scope, DoD, dependency 방침이 여기에 있다.
- `examples/ui-vocabulary-site/package.json` — 왜: PNG capture dependency 추가 여부를 결정한다.
- `examples/ui-vocabulary-site/src/App.tsx` — 왜: 현재 PDF split button과 filter state가 export contract의 시작점이다.
- `examples/ui-vocabulary-site/src/index.css` — 왜: 기존 print CSS와 data attributes를 확장한다.

## 작업

Export contract를 먼저 확정한다.

- PDF mode: `current`, `all`, `poster`를 구분한다.
- PNG mode: single card/detail target만 1차 지원한다.
- filename 규칙을 정한다: `ui-vocabulary-<scope>-<yyyy-mm-dd>.<ext>`.
- PNG capture dependency를 확정한다. 기본 후보는 `html-to-image`.
- 외부 screenshot service, remote upload, secret이 필요한 도구는 사용하지 않는다.
- 결정 내용을 `docs/ui-vocabulary/export-capture.md`에 기록한다.

## Acceptance Criteria

```bash
cd examples/ui-vocabulary-site
npm run build
npm run lint
```

## 검증 절차

1. `docs/ui-vocabulary/export-capture.md`가 export modes, filename, dependency, non-goals를 포함하는지 확인한다.
2. package 변경이 있다면 `npm run build`로 lock/install 영향이 없는지 확인한다.
3. `phases/ui-vocabulary-export-capture/index.json` step 0을 완료 상태로 갱신한다.

## 금지사항

- 구현 편의를 위해 서버 캡처 API를 추가하지 않는다. 이유: MVP는 정적 사이트다.
- 전체 257개를 단일 PNG로 저장하는 요구를 Step 0에 끼워 넣지 않는다. 이유: 가독성과 성능 리스크가 크다.
