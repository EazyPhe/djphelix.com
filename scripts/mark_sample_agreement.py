from __future__ import annotations

from io import BytesIO
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas

REPO_ROOT = Path(__file__).resolve().parent.parent
AGREEMENT_PATH = REPO_ROOT / 'public' / 'documents' / 'DJ_Phelix_Event_Service_Agreement_Template.pdf'
TEMP_PATH = AGREEMENT_PATH.with_suffix('.sample.pdf')
SAMPLE_NOTICE = 'SAMPLE FOR REVIEW - NOT AN EXECUTED AGREEMENT - DOES NOT RESERVE A DATE'


def _sample_stamp(width: float, height: float) -> bytes:
    buffer = BytesIO()
    stamp = canvas.Canvas(buffer, pagesize=(width, height))
    stamp.setFillColor(HexColor('#ff35d1'))
    stamp.rect(0, height - 27, width, 27, fill=1, stroke=0)
    stamp.setFillColor(HexColor('#08050b'))
    stamp.setFont('Helvetica-Bold', 9)
    stamp.drawCentredString(width / 2, height - 18, SAMPLE_NOTICE)
    stamp.save()
    return buffer.getvalue()


def mark_sample_agreement() -> Path:
    if not AGREEMENT_PATH.exists():
        raise FileNotFoundError(f'Agreement template was not generated: {AGREEMENT_PATH}')

    source = PdfReader(str(AGREEMENT_PATH))
    source_field_count = len(source.get_fields() or {})
    writer = PdfWriter(clone_from=str(AGREEMENT_PATH))

    for page in writer.pages:
        width = float(page.mediabox.width)
        height = float(page.mediabox.height)
        overlay = PdfReader(BytesIO(_sample_stamp(width, height))).pages[0]
        page.merge_page(overlay, over=True)

    with TEMP_PATH.open('wb') as output:
        writer.write(output)

    verified = PdfReader(str(TEMP_PATH))
    if len(verified.pages) != len(source.pages):
        TEMP_PATH.unlink(missing_ok=True)
        raise RuntimeError('Sample agreement stamping changed the page count.')

    verified_field_count = len(verified.get_fields() or {})
    if verified_field_count != source_field_count:
        TEMP_PATH.unlink(missing_ok=True)
        raise RuntimeError(
            'Sample agreement stamping changed the fillable-field count: '
            f'{source_field_count} -> {verified_field_count}'
        )

    TEMP_PATH.replace(AGREEMENT_PATH)
    print(
        f'Marked {AGREEMENT_PATH} as sample-only '
        f'({len(source.pages)} pages, {source_field_count} fillable fields preserved).'
    )
    return AGREEMENT_PATH


if __name__ == '__main__':
    mark_sample_agreement()
