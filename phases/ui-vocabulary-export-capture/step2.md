# Step 2: poster-view-for-filtered-category-exports

## 읽어야 할 파일

- `docs/ui-vocabulary/export-capture.md` — 왜: poster export scope와 filename 규칙을 따른다.
- `examples/ui-vocabulary-site/src/App.tsx` — 왜: poster mode 진입 UI와 현재 filter state를 연결한다.
- `examples/ui-vocabulary-site/src/components/term-visual.tsx` — 왜: poster view도 같은 mini visual renderer를 재사용해야 한다.
- `examples/ui-vocabulary-site/src/lib/search.ts` — 왜: 대분류/세부 카테고리 label과 filtered terms를 poster heading에 사용한다.

## 작업

Seed 이미지처럼 학습 자료로 쓸 수 있는 compact poster view를 만든다.

- `components/poster-view.tsx`를 추가한다.
- 현재 filter/category 결과를 poster layout으로 보여준다.
- poster는 term 이름, English name, one-liner, mini visual을 compact row로 배치한다.
- 너무 많은 terms가 한 화면에 들어오면 category/filtered scope 중심으로 안내한다.
- PDF split button에 `포스터로 저장` option을 추가한다.

## Acceptance Criteria

```bash
cd examples/ui-vocabulary-site
npm run build
npm run lint
```

## 검증 절차

1. Chrome smoke로 poster mode DOM에 `data-export-poster`가 있는지 확인한다.
2. 대표 필터 `입력`, `커머스·청구`에서 poster heading과 count가 맞는지 확인한다.
3. poster view가 `TermVisual`을 재사용하고 fallback 없는 visual을 표시하는지 확인한다.
4. `phases/ui-vocabulary-export-capture/index.json` step 2를 완료 상태로 갱신한다.

## 금지사항

- poster를 별도 데이터셋으로 만들지 않는다. 이유: `terms.yml`이 단일 출처다.
- 257개 전체를 seed 이미지 같은 한 장 포스터에 억지로 넣지 않는다. 이유: 글자 크기와 가독성이 깨진다.
