## Task contract

- Issue: Closes #
- Lane: <!-- contact | playlists | media | qa | integrator -->
- Branch: <!-- agent/<lane>/<task> or coordination/<task> -->
- Base commit reviewed:

## Delivered behavior

<!-- State only what is implemented and verified. -->

## Changed paths

<!-- List every changed path or precise grouped patterns. -->

## Shared-file and interface coordination

- Shared-file requests: None / link to issue #6 message
- Interface changes: None / link to approved decision
- Known overlap with another open PR: None / explain integrator-approved sequencing

## Verification

- [ ] `npm run coordination:test`
- [ ] `npm run coordination:check -- --base origin/main --head HEAD`
- [ ] `npm run check`
- [ ] `npm run build`
- [ ] Desktop browser review
- [ ] Tablet browser review
- [ ] Mobile browser review
- [ ] Keyboard and visible-focus review
- [ ] Reduced-motion behavior reviewed where applicable

## Risk and rollback

<!-- State likely regressions, generated artifacts, dependencies, and the clean rollback point. -->

## Agent controls

- [ ] I changed only paths assigned to this lane.
- [ ] I did not edit integrator-owned files without an approved integrator assignment.
- [ ] I did not include secrets, customer data, EIN information, or completed W-9 content.
- [ ] I did not change GitHub Pages, DNS, repository visibility, deployment settings, or production dependencies unless this is an explicitly assigned integrator PR.
- [ ] I posted `READY_FOR_QA` or `READY_FOR_INTEGRATION` in the appropriate issue when applicable.
