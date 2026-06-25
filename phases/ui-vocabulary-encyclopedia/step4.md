# Step 4: poster-style-summary-view

## 읽어야 할 파일

- `docs/PRD.md` — 왜: seed 이미지와 poster view의 MVP 범위를 확인한다.
- `docs/ARCHITECTURE.md` — 왜: poster view가 같은 term data와 visual component를 재사용해야 한다.
- `examples/ui-vocabulary-site/src/components/term-visual.tsx` — 왜: poster에서도 같은 visual asset을 재사용한다.
- `phases/ui-vocabulary-encyclopedia/step3.md` — 왜: card/detail 구현 상태와 smoke 결과를 이어받는다.

## 작업

seed 이미지처럼 6개 카테고리를 요약하는 poster-style view를 구현한다. 각 row는 이름, 짧은 설명, 실제 UI mini visual을 함께 보여준다. PNG download는 H3 후속 작업으로 남기고, 이번 step에서는 브라우저에서 포스터 뷰가 안정적으로 렌더되는 것을 목표로 한다.

## Acceptance Criteria

```bash
cd examples/ui-vocabulary-site
npm run build
```

## 검증 절차

1. AC 커맨드 실행
2. poster view desktop viewport smoke
3. 모바일에서는 poster view가 가로 스크롤 또는 축약 레이아웃으로 깨지지 않는지 확인
4. `phases/ui-vocabulary-encyclopedia/index.json` step 4를 completed 또는 error로 갱신

## 금지사항

- PNG export를 이 step의 완료 조건으로 삼지 않는다. 이유: export는 렌더 안정화 이후 H3에서 다룬다.
- seed 이미지를 그대로 복제하지 않는다. 이유: 참고하는 것은 정보 구조와 "용어 옆 실제 UI" 패턴이다.
