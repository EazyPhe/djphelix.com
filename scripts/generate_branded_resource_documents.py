from __future__ import annotations

import base64
from pathlib import Path

from generate_resource_documents import generate_resource_documents

REPO_ROOT = Path(__file__).resolve().parent.parent
CONTACT_SOURCE_DIR = REPO_ROOT / 'src' / 'assets' / 'contact'
PUBLIC_CONTACT_DIR = REPO_ROOT / 'public' / 'images' / 'contact'

ASSETS = {
    PUBLIC_CONTACT_DIR / 'dj-phelix-logo.jpg': [
        CONTACT_SOURCE_DIR / 'logo-01.txt',
        CONTACT_SOURCE_DIR / 'logo-02.txt',
        CONTACT_SOURCE_DIR / 'logo-03.txt',
        CONTACT_SOURCE_DIR / 'logo-04.txt',
        CONTACT_SOURCE_DIR / 'logo-05.txt',
        CONTACT_SOURCE_DIR / 'logo-06.txt',
    ],
    PUBLIC_CONTACT_DIR / 'website-contact-qr.png': [
        CONTACT_SOURCE_DIR / 'qr-01.txt',
    ],
}


def _decode_parts(parts: list[Path]) -> bytes:
    missing = [str(part) for part in parts if not part.exists()]
    if missing:
        raise FileNotFoundError(f'Missing embedded contact-asset part(s): {missing}')

    encoded = ''.join(part.read_text(encoding='utf-8') for part in parts)
    compact = ''.join(encoded.split())
    return base64.b64decode(compact, validate=True)


def generate_branded_resource_documents() -> list[Path]:
    PUBLIC_CONTACT_DIR.mkdir(parents=True, exist_ok=True)
    prior_contents: dict[Path, bytes | None] = {}

    try:
        for target, parts in ASSETS.items():
            prior_contents[target] = target.read_bytes() if target.exists() else None
            payload = _decode_parts(parts)

            if target.suffix.lower() in {'.jpg', '.jpeg'} and not payload.startswith(b'\xff\xd8'):
                raise RuntimeError(f'Decoded logo is not a JPEG: {target}')
            if target.suffix.lower() == '.png' and not payload.startswith(b'\x89PNG\r\n\x1a\n'):
                raise RuntimeError(f'Decoded QR asset is not a PNG: {target}')

            target.write_bytes(payload)

        outputs = generate_resource_documents()
        print('Generated resource PDFs with the approved lion logo and contact QR asset.')
        return outputs
    finally:
        for target, prior in prior_contents.items():
            if prior is None:
                target.unlink(missing_ok=True)
            else:
                target.write_bytes(prior)

        try:
            PUBLIC_CONTACT_DIR.rmdir()
        except OSError:
            pass


if __name__ == '__main__':
    generate_branded_resource_documents()
