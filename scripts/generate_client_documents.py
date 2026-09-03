from __future__ import annotations

import base64
import gzip
import hashlib
from pathlib import Path

PAYLOAD_DIR = Path(__file__).with_name('client_documents_payload')
PARTS = [PAYLOAD_DIR / f'part_{index:02d}.b64' for index in range(1, 7)]
payload = ''.join(part.read_text(encoding='utf-8').strip() for part in PARTS)

expected_length = 11976
expected_sha256 = '06e1ee8592b72a11b218eb893f98101b8fb1784963bbc67d0634bbf9197dc5df'
actual_sha256 = hashlib.sha256(payload.encode('ascii')).hexdigest()
if len(payload) != expected_length or actual_sha256 != expected_sha256:
    raise RuntimeError(
        f'Client-document source payload failed integrity validation: '
        f'length={len(payload)}, sha256={actual_sha256}'
    )

source = gzip.decompress(base64.b64decode(payload, validate=True))
exec(compile(source, __file__, 'exec'))
