# Step 0: Account Activation And Access Recovery Batch

Date: 2026-06-27

Theme: account activation and access recovery states.

Goal: test the revised authoring workflow by collecting around 20 non-duplicate candidates, prefiltering them against existing `terms.yml`, promoting the clean set, and stopping before production deploy.

## Promoted Terms

- `email-verification-banner`
- `verification-required-screen`
- `magic-link-sent-state`
- `passkey-enrollment-prompt`
- `passkey-sign-in-sheet`
- `mfa-enrollment-card`
- `recovery-code-panel`
- `recovery-code-warning`
- `trusted-device-prompt`
- `device-approval-state`
- `access-request-panel`
- `access-pending-state`
- `invite-acceptance-screen`
- `invite-expired-state`
- `workspace-join-request`
- `welcome-choice-screen`
- `import-data-choice`
- `setup-blocker-state`
- `reconnect-account-state`
- `consent-review-screen`

## Duplicate Handling

- Initial duplicate-risk found `access-request-panel` overlapping `permission-prompt`.
- Resolution: changed the alias from generic permission wording to resource access wording.
- Final strict duplicate audit passed with zero warnings.

## Verification

- `node scripts/audit-ui-vocabulary-candidates.mjs --strict-duplicates`
- `python scripts/validate-ui-vocabulary.py`
- `cd examples/ui-vocabulary-site && npm run build`
- `cd examples/ui-vocabulary-site && npm run lint`
- Chrome smoke on local dev server for `passkey`, `reconnect`, and `consent` queries.

## Deploy Status

Not deployed. Workflow stops here until production deploy is explicitly approved.
