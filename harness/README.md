# harness/ — 스킬 드래프트

> 본 폴더의 스킬은 **드래프트**다. 본 레포 안에서 검증한 뒤 `~/projects/custom-skills/` 로 승격해야 글로벌 슬래시 명령으로 활용 가능.

## 현재 드래프트

### [design-bootstrap/](design-bootstrap/)

새 프로젝트에 디자인 하네스를 부팅 (DESIGN.md + lint hook + 선택적 Playwright VRT). 사용자가 한 마디만 해도 상황 파악 → 톤·VRT 옵션 묻기 → 부팅 → 검증 → 보고까지 자동.

내부 호출:
- `scripts/init-design.sh` — 파일 생성·복사·hash 추적
- `scripts/lint/index.js` — 4단계 검증
- `scripts/propagate.sh` — 후속 갱신

## 검증 방법

본 레포 안에서 실험:

```bash
# 1. 임시 테스트 프로젝트
mkdir -p tmp/test-bootstrap && cd tmp/test-bootstrap
git init -q
echo '{"name":"test","private":true,"devDependencies":{"vite":"^6","react":"^19"}}' > package.json
cd ../..

# 2. 부팅 실행
bash scripts/init-design.sh tmp/test-bootstrap --style glass

# 3. lint 통과 확인
node scripts/lint/index.js tmp/test-bootstrap/DESIGN.md

# 4. 정리
rm -rf tmp/test-bootstrap
```

SKILL.md 자체는 Claude 가 읽는 instruction 이므로, "스킬을 만든 대로 동작하는가" 는 실제 사용자가 슬래시 명령 호출했을 때 의도대로 흐르는지로 검증.

## 승격 절차

검증 끝나면:

```bash
# 1. custom-skills 로 복사
cp -r ~/projects/desing-manual/harness/design-bootstrap \
      ~/projects/custom-skills/

# 2. 글로벌 배포
bash ~/projects/custom-skills/setup.sh

# 3. 토글 확인 (기본은 ON)
/skill-toggle    # 필요 시
```

이후 어디서나 `/design-bootstrap` 또는 자연어 의도("디자인 시스템 깔아줘") 로 호출 가능.

## 승격 후 본 레포의 위상

- `harness/design-bootstrap/SKILL.md` 는 **사본**으로 남겨둔다 (디자인 히스토리 + 개발용 mirror)
- 실제 수정은 `~/projects/custom-skills/design-bootstrap/SKILL.md` 에서. 본 레포 사본은 주기적으로 sync (또는 단방향: custom-skills → harness)

## 다음 후보 (스킬 드래프트 idea)

- `harness/design-add-component/` — 기존 프로젝트에 새 컴포넌트 추가. DESIGN.md § 7 부터 spec 작성 → 코드 생성 → lint+VRT
- `harness/design-extract-tokens/` — 기존 코드에서 hex/spacing 추출해 DESIGN.md 역공학 ([prompt-patterns § 5 Token Extraction](../methodology/prompt-patterns.md) 의 자동화 버전)
- `harness/design-aesthetic-debate/` — [Three-designer Debate](../methodology/prompt-patterns.md) 자동화 — Personality 가 흐릿한 프로젝트의 초기 톤 도출
