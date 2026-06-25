# Step 0: product-spec-and-phase-scaffolding

## 읽어야 할 파일

- `CLAUDE.md` — 왜: design-manual의 목적, 데모 프론트엔드 스택, DESIGN.md 우선 원칙을 확인한다.
- `docs/ui-vocabulary/PLAN.md` — 왜: UI Vocabulary horizon의 기존 범위와 H1-H4 경계를 확인한다.
- `docs/ui-vocabulary/schema.md` — 왜: terms.yml의 필수 필드와 asset contract가 정의되어 있다.
- `docs/ui-vocabulary/sources.md` — 왜: 용어 수집의 신뢰도 규칙과 1차 출처 목록이 정의되어 있다.

## 작업

UI Vocabulary Encyclopedia를 product milestone으로 다룰 수 있도록 PRD, architecture, ADR, durable plan, phase index를 만든다.

## Acceptance Criteria

```bash
Test-Path docs/PRD.md; Test-Path docs/ARCHITECTURE.md; Test-Path docs/adr/0001-ui-vocabulary-static-react-site.md; Test-Path docs/plans/2026-06-26-ui-vocabulary-encyclopedia.md; Test-Path phases/ui-vocabulary-encyclopedia/index.json
```

## 검증 절차

1. AC 커맨드 실행
2. `docs/PRD.md`와 `docs/ARCHITECTURE.md`가 사용자가 확정한 React + Tailwind + shadcn 방향을 반영하는지 확인
3. `phases/ui-vocabulary-encyclopedia/index.json`에서 step 0을 completed로 기록

## 금지사항

- MVP에 로그인, 서버, 결제, DB를 끼워 넣지 않는다. 이유: 사용자의 현재 목표는 용어와 생김새를 보여주는 학습/참조 사이트다.
- poster PNG export를 step 0에 포함하지 않는다. 이유: 먼저 데이터와 렌더링이 안정적이어야 한다.
