# Agent Handoff — Issue <number>

- Lane: <lane>
- Branch: <branch>
- Pull request: <number>
- Base commit: <SHA>
- Head commit: <SHA>
- State: ready-for-qa | ready-for-integration | blocked

## Delivered behavior

- Describe only behavior that is implemented and verified.

## Changed paths

- List every changed path or a precise grouped pattern.

## Verification completed

- `npm run coordination:test`: pass/fail
- `npm run coordination:check -- --base origin/main --head HEAD`: pass/fail
- `npm run check`: pass/fail
- `npm run build`: pass/fail
- Browser widths reviewed: desktop/tablet/mobile
- Accessibility checks completed: describe

## Shared-file requests

- None, or list the control-room message and affected path.

## Known limitations

- State unresolved limitations plainly. Do not hide incomplete work.

## Integration notes

- Dependencies, expected merge order, migrations, generated assets, and rollback considerations.
