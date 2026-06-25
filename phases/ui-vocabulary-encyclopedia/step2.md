# Step 2: react-shadcn-site-scaffold

## 읽어야 할 파일

- `docs/ARCHITECTURE.md` — 왜: app layout, data generation path, stack이 정의되어 있다.
- `docs/adr/0001-ui-vocabulary-static-react-site.md` — 왜: static React site 결정의 범위와 non-goal을 확인한다.
- `docs/ui-vocabulary/terms.yml` — 왜: scaffold가 실제 데이터 구조를 읽어야 한다.
- `phases/ui-vocabulary-encyclopedia/step1.md` — 왜: dataset validation AC와 이어지는 data pipeline 요구를 확인한다.

## 작업

`examples/ui-vocabulary-site/`에 Vite + React + TypeScript + Tailwind CSS + shadcn/ui 기반 앱을 만든다. `scripts/build-ui-vocabulary-data.mjs`를 추가해 YAML을 site-local TypeScript data module로 변환한다.

## Acceptance Criteria

```bash
cd examples/ui-vocabulary-site
npm run build
```

## 검증 절차

1. data generation script 실행
2. AC 커맨드 실행
3. shadcn/ui component import 경로와 generated data import 경로 확인
4. `phases/ui-vocabulary-encyclopedia/index.json` step 2를 completed 또는 error로 갱신

## 금지사항

- dataset을 app 안에 중복 작성하지 않는다. 이유: `docs/ui-vocabulary/terms.yml`이 source of truth다.
- shadcn generated component를 과하게 수정하지 않는다. 이유: 이후 업데이트와 유지보수를 쉽게 해야 한다.
