# Step 1: vocabulary-dataset-foundation

## 읽어야 할 파일

- `docs/ui-vocabulary/schema.md` — 왜: terms.yml의 필수 필드, asset 종류, review rule을 그대로 따라야 한다.
- `docs/ui-vocabulary/sources.md` — 왜: 각 term의 `sources.source_id`가 여기 정의된 id와 맞아야 한다.
- `docs/ARCHITECTURE.md` — 왜: YAML source of truth와 generated data 위치가 정의되어 있다.
- `phases/ui-vocabulary-encyclopedia/index.json` — 왜: step 0 summary와 현재 phase 상태를 이어받는다.

## 작업

`docs/ui-vocabulary/terms.yml`에 6개 카테고리, 총 60개 UI 용어를 입력한다. 각 entry는 schema를 따르고, `visual_anatomy`와 `asset.variant`는 React mini visual을 만들 수 있을 만큼 구체적이어야 한다. 이후 data build/validation script의 입력으로 쓸 수 있게 YAML 구조를 일관되게 유지한다.

## Acceptance Criteria

```bash
python scripts/validate-ui-vocabulary.py
```

## 검증 절차

1. AC 커맨드 실행
2. 각 카테고리가 최소 8개 이상의 term을 갖는지 확인
3. `phases/ui-vocabulary-encyclopedia/index.json` step 1을 completed 또는 error로 갱신

## 금지사항

- 출처 없는 정의를 published로 표시하지 않는다. 이유: 교육용 사전이므로 정의의 추적 가능성이 중요하다.
- `visual_anatomy`를 추상 설명으로만 쓰지 않는다. 이유: 사이트에서 실제 미니 컴포넌트로 렌더해야 한다.
