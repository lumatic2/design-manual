# Step 4: export-qa-and-documentation

## 읽어야 할 파일

- `docs/ui-vocabulary/export-capture.md` — 왜: 최종 사용자-facing export contract 문서다.
- `examples/ui-vocabulary-site/src/App.tsx` — 왜: export UI entrypoints를 최종 점검한다.
- `examples/ui-vocabulary-site/src/index.css` — 왜: print/capture CSS가 screen layout에 회귀를 만들지 않았는지 확인한다.
- `phases/ui-vocabulary-export-capture/index.json` — 왜: phase completion summary를 작성한다.

## 작업

Export/Capture horizon을 닫기 위한 QA와 문서화를 수행한다.

- `docs/ui-vocabulary/export-capture.md`에 사용법과 known limits를 정리한다.
- Chrome smoke checklist를 문서에 남긴다.
- PDF/PNG 검증 command와 수동 확인 항목을 기록한다.
- `docs/plans/2026-06-26-ui-vocabulary-export-capture-polish.md`의 DoD 충족 여부를 확인한다.
- ROADMAP milestone boundary에서 다음 horizon 후보를 다시 제시한다.

## Acceptance Criteria

```bash
cd examples/ui-vocabulary-site
npm run build
npm run lint
```

## 검증 절차

1. current/all/poster PDF mode smoke 결과를 기록한다.
2. single card PNG smoke 결과를 기록한다.
3. 모바일 viewport에서 export UI가 텍스트 겹침 없이 보이는지 확인한다.
4. `phases/ui-vocabulary-export-capture/index.json` step 4를 완료 상태로 갱신한다.

## 금지사항

- QA 없이 "다운로드 버튼이 있으니 완료"로 처리하지 않는다. 이유: export는 실제 출력물이 핵심이다.
- 다음 horizon을 자동 실행하지 않는다. 이유: milestone boundary에서 사용자 선택이 필요하다.
