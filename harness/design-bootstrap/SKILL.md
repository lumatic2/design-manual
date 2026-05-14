---
name: design-bootstrap
description: 현재 프로젝트에 desing-manual 디자인 하네스를 부팅한다. DESIGN.md + lint hook + (선택) Playwright VRT 까지 한 번에. "디자인 시스템 깔아줘", "DESIGN.md 만들어줘", "랜딩 페이지 디자인 시작" 같은 의도 감지 시 사용. /design-bootstrap 호출 시 사용.
---

# design-bootstrap

새 프로젝트의 디자인 레이어를 부팅한다. 이 스킬은 사용자가 한 마디만 해도 (a) 상황 파악 (b) 톤·VRT 옵션 묻기 (c) 부팅 실행 (d) 검증 (e) 보고 까지 자동으로 진행해야 한다.

전제: harness 본체는 `~/projects/desing-manual/` 에 있다 (없으면 STOP — 사용자에게 경로 확인).

## 1) 상황 파악 (조용히 — 사용자에게 묻기 전)

```bash
# git repo?
git rev-parse --git-dir > /dev/null 2>&1 || echo "NOT_GIT"
# DESIGN.md 이미 있나?
[ -f ./DESIGN.md ] && echo "EXISTS"
# 스택 추정
if [ -f ./package.json ]; then
  jq -r '(.dependencies // {}) + (.devDependencies // {}) | keys | join(",")' package.json
fi
```

판정:
- `NOT_GIT` → 사용자에게 "`git init` 먼저" 안내 후 종료.
- DESIGN.md `EXISTS` → AskUserQuestion: "덮어쓰기 / propagate 만 / 종료" 셋 중 선택.
- 스택 추정:
  - `vite` + `react` 둘 다 있으면 `vite-react`
  - `next` → `nextjs`
  - `astro` → `astro`
  - 그 외 → `vanilla`

## 2) 사용자에게 묻기 (AskUserQuestion, 한 번에 묶기)

질문 1 — **aesthetic family**:
- Minimal — 무채색 + 1 accent, 그림자 금지, 큰 여백
- Editorial — serif 헤딩 + sans 본문, hairline border, NYT 톤
- Brutalist — 흑백 + 형광, 3px 보더, 의도된 chaos
- Glass — 반투명 패널 + backdrop blur + iris accent

질문 2 (`vite-react` 일 때만) — **Playwright VRT 같이 깔지**:
- Yes — light/dark 스크린샷 baseline + a11y smoke test 자동 생성
- No — DESIGN.md 와 lint 만 (나중에 추가 가능)

(선택) 질문 3 — **이 프로젝트의 톤을 한 문장으로**: 답이 있으면 DESIGN.md § 1 Personality 의 첫 줄로 박는다. skip 가능.

## 3) 부팅 실행

```bash
HARNESS="$HOME/projects/desing-manual"
bash "$HARNESS/scripts/init-design.sh" "$PWD" --style <family> --stack <stack>
```

`init-design.sh` 가 자동으로:
- `design-md/<family>/DESIGN.md` → `./DESIGN.md` (rendered)
- `templates/claude-design-section.md.tmpl` → `./docs/CLAUDE-design.md`
- `.git/hooks/pre-commit.design` 설치
- `vite-react` + VRT yes 면: `playwright.config.ts`, `tests/design.spec.ts`, `package.json` scripts 머지
- `.design-harness.json` 에 sha + style + stack 기록

출력 파싱: `[new]`, `[upd]`, `[skip-user-modified]` 라인을 모아 사용자 보고에 사용.

## 4) 톤 한 줄 주입 (있으면)

사용자가 질문 3 에 답했으면, DESIGN.md 의 `## 1. Personality` 섹션 첫 줄을 그 문장으로 교체.

## 5) 검증

```bash
node "$HARNESS/scripts/lint/index.js" ./DESIGN.md
```

4 단계 (parse / schema / alias / contrast) 모두 PASS 확인. fail 시:
- `.design/lint.json` 의 `stages.contrast.themes.<theme>.[i].suggest.value` 추출
- 사용자에게 "lint 가 X 를 잡았는데 Y 로 고칠까?" 한 줄 제안
- 승인 받으면 토큰 수정 후 재검증

## 6) 사용자에게 보고 (한 메시지)

다음 형식 권장:

```
[OK] desing-manual 디자인 하네스 부팅 완료

만들어진 파일:
- DESIGN.md (<family> family, lint 4단계 PASS)
- docs/CLAUDE-design.md
- .git/hooks/pre-commit.design
- (VRT) playwright.config.ts, tests/design.spec.ts
- (VRT) package.json scripts: lint:design, build:design, test:vrt

다음:
1. (있으면) npm install
2. DESIGN.md 의 § 1 Personality, § 8 Anti-patterns 채우기
   가이드: ~/projects/desing-manual/methodology/design-md-guide.md
3. theme.generated.css 빌드: npm run build:design  (Vite+React 일 때)
4. lint: npm run lint:design  또는 git commit 시 자동
```

## 한계 / 주의

- 본 스킬은 **idempotent**. 같은 디렉토리에 다시 실행해도 사용자 수정 파일은 보존 (`init-design.sh` 의 hash 추적).
- 스택이 `vite-react` 가 아니면 VRT 옵션 자체를 묻지 말 것 (의미 없음).
- `DESIGN.md` 이미 있고 사용자가 "propagate 만" 선택하면 `init-design.sh` 대신 `propagate.sh` 호출.
- harness 가 `~/projects/desing-manual/` 에 없으면 STOP — 사용자에게 클론 경로 확인 요청.
- 본 스킬은 **드래프트**다 (`harness/design-bootstrap/`). 사용자가 검증 후 `~/projects/custom-skills/design-bootstrap/` 로 승격하면 글로벌 슬래시 명령으로 사용 가능.

## 후속 (이 스킬과 짝)

- `/design-qa` (글로벌, 기존) — lint + VRT 만 돌림
- `/design-consultation` (글로벌, 기존, 토글 꺼져있을 수 있음) — DESIGN.md 작성 컨설팅
- `harness/design-add-component/` (미래) — 기존 프로젝트에 새 컴포넌트 추가, DESIGN.md § 7 부터 spec 작성
