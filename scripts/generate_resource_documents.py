from __future__ import annotations

from pathlib import Path
from textwrap import wrap
from typing import Iterable

from reportlab.lib.colors import Color, HexColor, white
from reportlab.lib.pagesizes import letter
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[0]
REPO_ROOT = ROOT.parent
OUTPUT_DIR = REPO_ROOT / 'public' / 'documents'
ASSET_ROOT = REPO_ROOT / 'public'
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

PAGE_W, PAGE_H = letter
MARGIN = 42
CONTENT_W = PAGE_W - 2 * MARGIN

BRAND_DARK = HexColor('#08050b')
BRAND_SURFACE = HexColor('#18101d')
BRAND_PINK = HexColor('#ff35d1')
BRAND_VIOLET = HexColor('#6f2bff')
BRAND_YELLOW = HexColor('#ffe847')
PAPER = HexColor('#fff7fc')
INK = HexColor('#211822')
MUTED = HexColor('#6c606d')
LINE = HexColor('#d6c8d2')
FIELD_BG = HexColor('#fbf8fa')
SOFT_PINK = HexColor('#fff0fb')
SOFT_VIOLET = HexColor('#f4efff')

VERSION = '1.0'
REVISION = 'September 2026'
WEBSITE = 'djphelix.com'
EMAIL = 'estinvilp3@gmail.com'
PHONE = '+1 774-268-1245'


def _set_metadata(c: canvas.Canvas, title: str, subject: str) -> None:
    c.setTitle(title)
    c.setAuthor('DJ Phelix')
    c.setSubject(subject)
    c.setCreator('DJ Phelix public resource generator')


def _draw_logo(c: canvas.Canvas, x: float, y: float, size: float = 42) -> None:
    logo = ASSET_ROOT / 'images' / 'contact' / 'dj-phelix-logo.jpg'
    if logo.exists():
        c.drawImage(ImageReader(str(logo)), x, y, width=size, height=size, preserveAspectRatio=True, mask='auto')
    else:
        c.setFillColor(BRAND_PINK)
        c.circle(x + size / 2, y + size / 2, size / 2, fill=1, stroke=0)
        c.setFillColor(BRAND_DARK)
        c.setFont('Helvetica-Bold', size * 0.34)
        c.drawCentredString(x + size / 2, y + size * 0.37, 'DP')


def _header(
    c: canvas.Canvas,
    title: str,
    subtitle: str,
    doc_code: str,
    page_number: int,
    page_count: int,
) -> None:
    c.setFillColor(BRAND_DARK)
    c.rect(0, PAGE_H - 88, PAGE_W, 88, fill=1, stroke=0)
    c.setFillColor(BRAND_VIOLET)
    c.rect(0, PAGE_H - 92, PAGE_W * 0.53, 4, fill=1, stroke=0)
    c.setFillColor(BRAND_PINK)
    c.rect(PAGE_W * 0.53, PAGE_H - 92, PAGE_W * 0.32, 4, fill=1, stroke=0)
    c.setFillColor(BRAND_YELLOW)
    c.rect(PAGE_W * 0.85, PAGE_H - 92, PAGE_W * 0.15, 4, fill=1, stroke=0)

    _draw_logo(c, MARGIN, PAGE_H - 75, 48)
    c.setFillColor(PAPER)
    c.setFont('Helvetica-Bold', 16)
    c.drawString(MARGIN + 61, PAGE_H - 43, title)
    c.setFont('Helvetica', 8.5)
    c.setFillColor(HexColor('#d7c9d9'))
    c.drawString(MARGIN + 61, PAGE_H - 59, subtitle)

    c.setFillColor(HexColor('#d7c9d9'))
    c.setFont('Helvetica-Bold', 7.5)
    c.drawRightString(PAGE_W - MARGIN, PAGE_H - 39, f'{doc_code}  |  v{VERSION}')
    c.setFont('Helvetica', 7.5)
    c.drawRightString(PAGE_W - MARGIN, PAGE_H - 54, f'Revised {REVISION}')
    c.drawRightString(PAGE_W - MARGIN, PAGE_H - 69, f'Page {page_number} of {page_count}')


def _footer(c: canvas.Canvas, safety: str | None = None) -> None:
    c.setStrokeColor(LINE)
    c.setLineWidth(0.6)
    c.line(MARGIN, 30, PAGE_W - MARGIN, 30)
    c.setFillColor(MUTED)
    c.setFont('Helvetica', 7.2)
    c.drawString(MARGIN, 18, f'{WEBSITE}  |  {PHONE}  |  {EMAIL}')
    if safety:
        c.drawRightString(PAGE_W - MARGIN, 18, safety)


def _section(c: canvas.Canvas, title: str, y: float, note: str | None = None) -> float:
    c.setFillColor(BRAND_PINK)
    c.rect(MARGIN, y - 3, 4, 17, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont('Helvetica-Bold', 11)
    c.drawString(MARGIN + 12, y, title.upper())
    if note:
        c.setFont('Helvetica', 7.5)
        c.setFillColor(MUTED)
        c.drawRightString(PAGE_W - MARGIN, y + 1, note)
    return y - 23


def _paragraph(c: canvas.Canvas, text: str, x: float, y: float, width: float, size: float = 8.5, leading: float = 11) -> float:
    chars = max(24, int(width / (size * 0.52)))
    lines = []
    for paragraph in text.split('\n'):
        lines.extend(wrap(paragraph, chars) or [''])
    c.setFillColor(MUTED)
    c.setFont('Helvetica', size)
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def _label(c: canvas.Canvas, text: str, x: float, y: float, required: bool = False) -> None:
    c.setFillColor(INK)
    c.setFont('Helvetica-Bold', 7.6)
    suffix = ' *' if required else ''
    c.drawString(x, y, f'{text}{suffix}')


def _text_field(
    c: canvas.Canvas,
    name: str,
    label: str,
    x: float,
    y: float,
    width: float,
    height: float = 20,
    *,
    multiline: bool = False,
    required: bool = False,
    font_size: float = 8.5,
) -> None:
    _label(c, label, x, y + height + 4, required)
    flags = 'multiline' if multiline else ''
    c.acroForm.textfield(
        name=name,
        tooltip=label,
        x=x,
        y=y,
        width=width,
        height=height,
        borderStyle='solid',
        borderWidth=0.8,
        borderColor=LINE,
        fillColor=FIELD_BG,
        textColor=INK,
        forceBorder=True,
        fontName='Helvetica',
        fontSize=font_size,
        fieldFlags=flags,
    )


def _checkbox(c: canvas.Canvas, name: str, label: str, x: float, y: float, size: float = 11) -> None:
    c.acroForm.checkbox(
        name=name,
        tooltip=label,
        x=x,
        y=y - 2,
        buttonStyle='check',
        borderStyle='solid',
        borderWidth=0.8,
        borderColor=LINE,
        fillColor=white,
        textColor=BRAND_PINK,
        forceBorder=True,
        size=size,
    )
    c.setFillColor(INK)
    c.setFont('Helvetica', 7.7)
    c.drawString(x + size + 5, y, label)


def _choice_row(c: canvas.Canvas, prefix: str, label: str, x: float, y: float, options: Iterable[str]) -> None:
    c.setFillColor(INK)
    c.setFont('Helvetica-Bold', 7.7)
    c.drawString(x, y, label)
    offset = x + 154
    for index, option in enumerate(options):
        _checkbox(c, f'{prefix}_{index + 1}', option, offset, y, 10)
        offset += max(62, len(option) * 4.6 + 25)


def _table_header(c: canvas.Canvas, x: float, y: float, widths: list[float], labels: list[str]) -> None:
    c.setFillColor(BRAND_SURFACE)
    c.rect(x, y - 18, sum(widths), 18, fill=1, stroke=0)
    pos = x
    c.setFillColor(PAPER)
    c.setFont('Helvetica-Bold', 7)
    for width, label in zip(widths, labels):
        c.drawString(pos + 5, y - 12, label.upper())
        pos += width


def _table_fields(
    c: canvas.Canvas,
    prefix: str,
    x: float,
    top_y: float,
    widths: list[float],
    rows: int,
    row_height: float = 25,
) -> float:
    y = top_y - row_height
    for row in range(rows):
        pos = x
        for col, width in enumerate(widths):
            c.acroForm.textfield(
                name=f'{prefix}_r{row + 1}_c{col + 1}',
                tooltip=f'{prefix} row {row + 1} column {col + 1}',
                x=pos,
                y=y,
                width=width,
                height=row_height,
                borderStyle='solid',
                borderWidth=0.5,
                borderColor=LINE,
                fillColor=FIELD_BG,
                textColor=INK,
                forceBorder=True,
                fontName='Helvetica',
                fontSize=7.5,
            )
            pos += width
        y -= row_height
    return y


def _notice(c: canvas.Canvas, text: str, y: float, color: Color = SOFT_PINK) -> float:
    c.setFillColor(color)
    c.roundRect(MARGIN, y - 39, CONTENT_W, 39, 4, fill=1, stroke=0)
    c.setFillColor(BRAND_PINK)
    c.setFont('Helvetica-Bold', 8)
    c.drawString(MARGIN + 12, y - 14, 'IMPORTANT')
    _paragraph(c, text, MARGIN + 74, y - 13, CONTENT_W - 88, 7.4, 9)
    return y - 52


def _new_page(c: canvas.Canvas, title: str, subtitle: str, code: str, page: int, count: int, safety: str) -> float:
    _header(c, title, subtitle, code, page, count)
    _footer(c, safety)
    return PAGE_H - 118


def generate_venue_advance() -> Path:
    path = OUTPUT_DIR / 'DJ_Phelix_Venue_Technical_Logistics_Advance.pdf'
    c = canvas.Canvas(str(path), pagesize=letter)
    _set_metadata(c, 'DJ Phelix Venue Technical and Logistics Advance', 'Fillable venue coordination and logistics worksheet.')
    title = 'Venue Technical & Logistics Advance'
    subtitle = 'Venue-completed coordination worksheet for event access, setup, power, restrictions, and contacts'
    code = 'DP-VTA'
    count = 4

    y = _new_page(c, title, subtitle, code, 1, count, 'Public planning form - do not include sensitive records')
    y = _notice(c, 'A venue manager, coordinator, or authorized representative should complete this form. Unknown items may be marked TBD. This worksheet does not add services or alter a signed agreement.', y)
    y = _section(c, 'Event and venue identification', y)
    _text_field(c, 'vta_event_name', 'Event name or client', MARGIN, y - 20, 250, required=True)
    _text_field(c, 'vta_event_date', 'Event date', MARGIN + 266, y - 20, 120, required=True)
    _text_field(c, 'vta_guest_count', 'Expected attendance', MARGIN + 402, y - 20, 126)
    y -= 54
    _text_field(c, 'vta_venue_name', 'Venue name', MARGIN, y - 20, 250, required=True)
    _text_field(c, 'vta_venue_address', 'Full venue address', MARGIN + 266, y - 20, 262, required=True)
    y -= 56
    _text_field(c, 'vta_event_spaces', 'Event spaces used (ceremony, cocktail hour, reception, after-party, etc.)', MARGIN, y - 33, CONTENT_W, 33, multiline=True)
    y -= 70

    y = _section(c, 'Primary venue contacts', y, 'Provide contacts who can answer operational questions')
    widths = [155, 130, 130, 113]
    _table_header(c, MARGIN, y, widths, ['Name and role', 'Phone', 'Email', 'Available hours'])
    y = _table_fields(c, 'vta_contacts', MARGIN, y - 18, widths, 4, 27) - 8

    y = _section(c, 'Arrival, parking, and load-in', y)
    _text_field(c, 'vta_vendor_arrival', 'Earliest vendor arrival time', MARGIN, y - 20, 160)
    _text_field(c, 'vta_setup_complete', 'Required setup-complete time', MARGIN + 176, y - 20, 176)
    _text_field(c, 'vta_event_end', 'Event end / venue curfew', MARGIN + 368, y - 20, 160)
    y -= 54
    _text_field(c, 'vta_loading_address', 'Loading entrance or alternate address', MARGIN, y - 20, 260)
    _text_field(c, 'vta_parking', 'Vendor parking location / instructions', MARGIN + 276, y - 20, 252)
    y -= 54
    _choice_row(c, 'vta_access', 'Access route includes:', MARGIN, y, ['Ground level', 'Stairs', 'Elevator', 'Long carry'])
    y -= 29
    _text_field(c, 'vta_access_notes', 'Access route, door dimensions, elevator reservation, security check-in, loading-zone limits, or cart restrictions', MARGIN, y - 43, CONTENT_W, 43, multiline=True)
    c.showPage()

    y = _new_page(c, title, subtitle, code, 2, count, 'Public planning form - do not include sensitive records')
    y = _section(c, 'Performance area and layout', y)
    _text_field(c, 'vta_dj_location', 'DJ / production location', MARGIN, y - 20, 270, required=True)
    _text_field(c, 'vta_space_dimensions', 'Usable footprint dimensions', MARGIN + 286, y - 20, 242)
    y -= 55
    _text_field(c, 'vta_stage_details', 'Stage, riser, booth, table, facade, or furniture supplied by venue', MARGIN, y - 37, CONTENT_W, 37, multiline=True)
    y -= 73
    _text_field(c, 'vta_guest_flow', 'Dance-floor location, guest circulation, exits, service paths, and cable-routing considerations', MARGIN, y - 48, CONTENT_W, 48, multiline=True)
    y -= 84
    _choice_row(c, 'vta_surface', 'Surface:', MARGIN, y, ['Carpet', 'Wood', 'Tile', 'Concrete', 'Grass', 'Other'])
    y -= 29
    _text_field(c, 'vta_surface_other', 'Surface notes or floor-protection requirements', MARGIN, y - 20, CONTENT_W, 20)
    y -= 57

    y = _section(c, 'Electrical service', y, 'Venue representative should verify available power')
    _choice_row(c, 'vta_power', 'Power near setup:', MARGIN, y, ['Standard outlets', 'Dedicated circuit', 'Unknown'])
    y -= 29
    _text_field(c, 'vta_power_location', 'Outlet locations, circuit ratings, panel contact, or extension limitations', MARGIN, y - 43, CONTENT_W, 43, multiline=True)
    y -= 77
    _text_field(c, 'vta_power_restrictions', 'Power restrictions, generator rules, inspection requirements, or venue electrician requirements', MARGIN, y - 43, CONTENT_W, 43, multiline=True)
    y -= 78

    y = _section(c, 'Sound and operating limits', y)
    _text_field(c, 'vta_sound_limit', 'Sound-level limit, measurement method, and monitoring location', MARGIN, y - 32, CONTENT_W, 32, multiline=True)
    y -= 68
    _text_field(c, 'vta_curfew', 'Music curfew, quiet hours, neighboring-property restrictions, or limiter details', MARGIN, y - 32, CONTENT_W, 32, multiline=True)
    y -= 66
    _choice_row(c, 'vta_house_sound', 'House audio available:', MARGIN, y, ['Yes', 'No', 'Unknown'])
    y -= 29
    _text_field(c, 'vta_house_audio_details', 'House audio inventory, patch point, operator requirement, or system-use fee', MARGIN, y - 34, CONTENT_W, 34, multiline=True)
    c.showPage()

    y = _new_page(c, title, subtitle, code, 3, count, 'Public planning form - do not include sensitive records')
    y = _section(c, 'Environment and weather plan', y)
    _choice_row(c, 'vta_environment', 'Primary setup:', MARGIN, y, ['Indoor', 'Outdoor', 'Tent / pavilion', 'Mixed locations'])
    y -= 30
    _text_field(c, 'vta_weather_cover', 'Weather protection for equipment and operator', MARGIN, y - 28, CONTENT_W, 28, multiline=True, required=True)
    y -= 58
    _text_field(c, 'vta_backup_location', 'Backup location, decision-maker, and deadline for moving indoors', MARGIN, y - 30, CONTENT_W, 30, multiline=True)
    y -= 60
    _text_field(c, 'vta_temperature', 'Temperature, wind, moisture, shoreline, sand, or other environmental considerations', MARGIN, y - 30, CONTENT_W, 30, multiline=True)
    y -= 61

    y = _section(c, 'Venue restrictions and approvals', y)
    _choice_row(c, 'vta_effects', 'Restrictions may apply to:', MARGIN, y, ['Haze', 'Lighting', 'Mounting', 'Tape', 'Cables', 'Decor'])
    y -= 30
    _text_field(c, 'vta_restrictions', 'Describe prohibited items, approval steps, fire-alarm procedures, rigging limits, or surface-protection rules', MARGIN, y - 34, CONTENT_W, 34, multiline=True)
    y -= 64
    _text_field(c, 'vta_safety_contact', 'Safety, security, facilities, or fire-system contact for event day', MARGIN, y - 18, CONTENT_W, 18)
    y -= 47

    y = _section(c, 'Accessibility and guest considerations', y)
    _text_field(c, 'vta_accessibility', 'Accessible routes, hearing-assistance systems, quiet-space needs, or accommodations relevant to production', MARGIN, y - 30, CONTENT_W, 30, multiline=True)
    y -= 60
    _text_field(c, 'vta_special_considerations', 'Children, animals, medical equipment, cultural requirements, or other considerations affecting setup and announcements', MARGIN, y - 30, CONTENT_W, 30, multiline=True)
    y -= 60

    y = _section(c, 'Venue-provided equipment or services', y)
    _text_field(c, 'vta_venue_equipment', 'Tables, linens, stage, microphones, speakers, lighting, power distribution, staff, or other confirmed venue support', MARGIN, y - 30, CONTENT_W, 30, multiline=True)
    c.showPage()

    y = _new_page(c, title, subtitle, code, 4, count, 'Public planning form - do not include sensitive records')
    y = _section(c, 'Vendor onboarding requirements', y)
    _choice_row(c, 'vta_vendor_registration', 'Vendor registration required:', MARGIN, y, ['Yes', 'No', 'Unknown'])
    y -= 29
    _choice_row(c, 'vta_coi', 'Certificate of insurance required:', MARGIN, y, ['Yes', 'No', 'Unknown'])
    y -= 29
    _text_field(c, 'vta_coi_requirements', 'If required: certificate holder, additional-insured wording, limits, submission method, and deadline', MARGIN, y - 48, CONTENT_W, 48, multiline=True)
    y -= 84
    _text_field(c, 'vta_onboarding_portal', 'Vendor portal, purchasing contact, required forms, purchase-order rules, or invoice instructions', MARGIN, y - 48, CONTENT_W, 48, multiline=True)
    y -= 84
    _text_field(c, 'vta_deadlines', 'Deadlines that apply before event day', MARGIN, y - 35, CONTENT_W, 35, multiline=True)
    y -= 72

    y = _section(c, 'Final confirmations', y)
    _checkbox(c, 'vta_confirm_access', 'Load-in route and arrival window have been confirmed.', MARGIN, y)
    y -= 23
    _checkbox(c, 'vta_confirm_power', 'Power availability and restrictions have been reviewed.', MARGIN, y)
    y -= 23
    _checkbox(c, 'vta_confirm_weather', 'Outdoor weather protection and backup plan have been identified.', MARGIN, y)
    y -= 23
    _checkbox(c, 'vta_confirm_limits', 'Sound, curfew, lighting, and venue restrictions have been disclosed.', MARGIN, y)
    y -= 23
    _checkbox(c, 'vta_confirm_requirements', 'Vendor onboarding and document deadlines have been disclosed.', MARGIN, y)
    y -= 37
    _text_field(c, 'vta_open_questions', 'Open questions or items still awaiting confirmation', MARGIN, y - 58, CONTENT_W, 58, multiline=True)
    y -= 95
    _text_field(c, 'vta_completed_by', 'Completed by (name and role)', MARGIN, y - 20, 252)
    _text_field(c, 'vta_completed_date', 'Date completed', MARGIN + 268, y - 20, 126)
    _text_field(c, 'vta_best_contact', 'Best contact method', MARGIN + 410, y - 20, 118)
    y -= 58
    _paragraph(c, 'Submitting this worksheet communicates venue information only. It does not confirm availability, insurance coverage, additional equipment, staffing, performance time, or any service not included in the final written agreement.', MARGIN, y, CONTENT_W, 7.5, 9)
    c.save()
    return path


def generate_milestone_checklist() -> Path:
    path = OUTPUT_DIR / 'DJ_Phelix_Event_Planning_Milestone_Checklist.pdf'
    c = canvas.Canvas(str(path), pagesize=letter)
    _set_metadata(c, 'DJ Phelix Event Planning Milestone Checklist', 'Fillable event planning checklist organized by relative planning milestones.')
    title = 'Event Planning Milestone Checklist'
    subtitle = 'A flexible two-page checklist for clients, planners, and venue teams'
    code = 'DP-EPC'
    count = 2

    y = _new_page(c, title, subtitle, code, 1, count, 'Public planning aid - signed terms control if different')
    y = _notice(c, 'This checklist uses relative milestones instead of fixed deadlines. Follow the timing in your signed agreement, venue rules, and planner instructions when they differ.', y, SOFT_VIOLET)
    _text_field(c, 'epc_event_name', 'Event name or client', MARGIN, y - 20, 220)
    _text_field(c, 'epc_event_date', 'Event date', MARGIN + 236, y - 20, 120)
    _text_field(c, 'epc_venue', 'Venue', MARGIN + 372, y - 20, 156)
    y -= 60

    y = _section(c, 'Immediately after booking', y, 'Establish the basic event framework')
    items = [
        'Save the final signed agreement and payment schedule.',
        'Confirm the event date, venue, and primary client contact.',
        'Identify the planner, venue coordinator, and other decision-makers.',
        'Record ceremony, cocktail-hour, reception, and after-party locations.',
        'Share venue onboarding, insurance, or vendor-registration requirements.',
        'Identify accessibility, language, cultural, or family considerations.'
    ]
    for idx, item in enumerate(items, 1):
        _checkbox(c, f'epc_after_booking_{idx}', item, MARGIN, y)
        y -= 23
    _text_field(c, 'epc_after_booking_notes', 'Notes or open questions', MARGIN, y - 38, CONTENT_W, 38, multiline=True)
    y -= 76

    y = _section(c, 'Early planning', y, 'Define the event experience before details harden')
    items = [
        'Describe the desired atmosphere, audience mix, and event priorities.',
        'Identify major formalities, announcements, presentations, or performances.',
        'Discuss ceremony audio, multiple locations, lighting, karaoke, or add-on interests.',
        'Begin must-play, do-not-play, and special-song lists.',
        'Confirm who may request songs or change the event timeline.',
        'Identify outdoor-weather risks and a realistic backup location.',
        'Share venue access, parking, load-in, power, sound, and curfew information.'
    ]
    for idx, item in enumerate(items, 1):
        _checkbox(c, f'epc_early_{idx}', item, MARGIN, y)
        y -= 23
    _text_field(c, 'epc_early_notes', 'Early-planning notes', MARGIN, y - 44, CONTENT_W, 44, multiline=True)
    c.showPage()

    y = _new_page(c, title, subtitle, code, 2, count, 'Public planning aid - signed terms control if different')
    y = _section(c, 'Before the final planning review', y, 'Turn concepts into a usable event plan')
    items = [
        'Complete the Event, Music & Service Request Form.',
        'Confirm the event timeline, introductions, dances, toasts, and closing plan.',
        'Verify names, titles, relationships, and phonetic pronunciations.',
        'Confirm final music direction, featured songs, and do-not-play selections.',
        'Identify microphones, speeches, performers, media playback, or presentation cues.',
        'Confirm venue access, setup location, electrical service, sound limits, and restrictions.',
        'Resolve requested services or equipment that still require written approval.'
    ]
    for idx, item in enumerate(items, 1):
        _checkbox(c, f'epc_final_review_{idx}', item, MARGIN, y)
        y -= 23
    _text_field(c, 'epc_final_review_notes', 'Items to resolve during the final review', MARGIN, y - 40, CONTENT_W, 40, multiline=True)
    y -= 79

    y = _section(c, 'During the final event week', y, 'Verify changes and day-of contacts')
    items = [
        'Send only the final approved timeline and cue list to the working team.',
        'Confirm the day-of client, planner, venue, and emergency contacts.',
        'Reconfirm arrival time, parking, loading entrance, and room access.',
        'Review weather, outdoor protection, and backup-location decisions.',
        'Confirm balances or administrative requirements according to the agreement.',
        'Report material changes immediately rather than waiting until event day.'
    ]
    for idx, item in enumerate(items, 1):
        _checkbox(c, f'epc_final_week_{idx}', item, MARGIN, y)
        y -= 23
    _text_field(c, 'epc_final_week_notes', 'Final-week notes', MARGIN, y - 34, CONTENT_W, 34, multiline=True)
    y -= 72

    y = _section(c, 'Event day', y, 'Protect the approved plan while staying adaptable')
    items = [
        'Keep the agreed setup area, power, and cable paths accessible.',
        'Give the DJ the final working timeline and identify the authorized decision-maker.',
        'Communicate delays, room changes, weather changes, or safety issues promptly.',
        'Do not assume unconfirmed equipment, staffing, overtime, or services are included.',
        'Review any last-minute announcement or pronunciation changes before they go live.'
    ]
    for idx, item in enumerate(items, 1):
        _checkbox(c, f'epc_day_of_{idx}', item, MARGIN, y)
        y -= 23
    _text_field(c, 'epc_day_of_notes', 'Day-of notes', MARGIN, y - 32, CONTENT_W, 32, multiline=True)
    y -= 66
    _paragraph(c, 'This checklist is a planning aid. It does not reserve a date, amend a signed agreement, authorize overtime, or add equipment or services.', MARGIN, y, CONTENT_W, 7.6, 9)
    c.save()
    return path


def generate_wedding_addendum() -> Path:
    path = OUTPUT_DIR / 'DJ_Phelix_Wedding_Cue_Pronunciation_Addendum.pdf'
    c = canvas.Canvas(str(path), pagesize=letter)
    _set_metadata(c, 'DJ Phelix Wedding Cue and Pronunciation Addendum', 'Fillable wedding names, pronunciations, ceremony cues, reception formalities, and MC notes.')
    title = 'Wedding Cue & Pronunciation Addendum'
    subtitle = 'Names, introductions, ceremony cues, reception formalities, and announcement guidance'
    code = 'DP-WCA'
    count = 3

    y = _new_page(c, title, subtitle, code, 1, count, 'Planning addendum - not a contract amendment by itself')
    y = _notice(c, 'Complete this addendum with the person responsible for the final timeline. Spell names exactly as they should be announced and write pronunciations phonetically.', y)
    _text_field(c, 'wca_event_date', 'Wedding date', MARGIN, y - 20, 124, required=True)
    _text_field(c, 'wca_venue', 'Venue', MARGIN + 140, y - 20, 240, required=True)
    _text_field(c, 'wca_planner', 'Planner / coordinator', MARGIN + 396, y - 20, 132)
    y -= 57
    _text_field(c, 'wca_partner_1', 'Partner 1 - full name', MARGIN, y - 20, 250, required=True)
    _text_field(c, 'wca_partner_1_pronunciation', 'Pronunciation', MARGIN + 266, y - 20, 262)
    y -= 54
    _text_field(c, 'wca_partner_2', 'Partner 2 - full name', MARGIN, y - 20, 250, required=True)
    _text_field(c, 'wca_partner_2_pronunciation', 'Pronunciation', MARGIN + 266, y - 20, 262)
    y -= 62
    _text_field(c, 'wca_couple_intro', 'Exact preferred introduction for the couple', MARGIN, y - 35, CONTENT_W, 35, multiline=True)
    y -= 74

    y = _section(c, 'Wedding party introductions', y, 'List in the intended entrance order')
    widths = [172, 104, 162, 90]
    _table_header(c, MARGIN, y, widths, ['Name(s)', 'Role / relationship', 'Pronunciation', 'Pair / cue'])
    y = _table_fields(c, 'wca_party', MARGIN, y - 18, widths, 8, 27) - 12
    _text_field(c, 'wca_party_notes', 'Entrance-order notes, grouping instructions, or names that should not be announced', MARGIN, y - 44, CONTENT_W, 44, multiline=True)
    c.showPage()

    y = _new_page(c, title, subtitle, code, 2, count, 'Planning addendum - not a contract amendment by itself')
    y = _section(c, 'Ceremony cue sheet', y)
    widths = [92, 158, 146, 132]
    _table_header(c, MARGIN, y, widths, ['Moment', 'People / action', 'Song / source', 'Start / fade cue'])
    moments = ['Prelude begins', 'Processional 1', 'Processional 2', 'Partner entrance', 'Ceremony moment', 'Recessional', 'Postlude / exit']
    y -= 18
    for row, moment in enumerate(moments, 1):
        c.setFillColor(SOFT_VIOLET if row % 2 else FIELD_BG)
        c.rect(MARGIN, y - 28, widths[0], 28, fill=1, stroke=0)
        c.setFillColor(INK)
        c.setFont('Helvetica-Bold', 7)
        c.drawString(MARGIN + 5, y - 17, moment)
        pos = MARGIN + widths[0]
        for col, width in enumerate(widths[1:], 2):
            c.acroForm.textfield(
                name=f'wca_ceremony_r{row}_c{col}',
                tooltip=f'{moment} detail',
                x=pos,
                y=y - 28,
                width=width,
                height=28,
                borderStyle='solid',
                borderWidth=0.5,
                borderColor=LINE,
                fillColor=FIELD_BG,
                textColor=INK,
                forceBorder=True,
                fontName='Helvetica',
                fontSize=7.3,
            )
            pos += width
        y -= 28
    y -= 13
    _text_field(c, 'wca_ceremony_mic', 'Ceremony microphone, reader, officiant, live musician, or media-playback notes', MARGIN, y - 42, CONTENT_W, 42, multiline=True)
    y -= 79

    y = _section(c, 'Reception formalities', y)
    widths = [126, 178, 132, 92]
    _table_header(c, MARGIN, y, widths, ['Moment', 'Names / announcement', 'Song / media', 'Approx. time'])
    moments = ['Wedding-party entrance', 'Couple entrance', 'First dance', 'Parent / family dance 1', 'Parent / family dance 2', 'Toasts / speeches', 'Cake cutting', 'Special tradition', 'Last dance']
    y -= 18
    for row, moment in enumerate(moments, 1):
        c.setFillColor(SOFT_PINK if row % 2 else FIELD_BG)
        c.rect(MARGIN, y - 24, widths[0], 24, fill=1, stroke=0)
        c.setFillColor(INK)
        c.setFont('Helvetica-Bold', 6.7)
        c.drawString(MARGIN + 5, y - 15, moment)
        pos = MARGIN + widths[0]
        for col, width in enumerate(widths[1:], 2):
            c.acroForm.textfield(
                name=f'wca_reception_r{row}_c{col}',
                tooltip=f'{moment} detail',
                x=pos,
                y=y - 24,
                width=width,
                height=24,
                borderStyle='solid',
                borderWidth=0.5,
                borderColor=LINE,
                fillColor=FIELD_BG,
                textColor=INK,
                forceBorder=True,
                fontName='Helvetica',
                fontSize=7.1,
            )
            pos += width
        y -= 24
    c.showPage()

    y = _new_page(c, title, subtitle, code, 3, count, 'Planning addendum - not a contract amendment by itself')
    y = _section(c, 'MC and announcement guidance', y)
    _text_field(c, 'wca_tone', 'Preferred MC tone (formal, warm, energetic, minimal, bilingual, etc.)', MARGIN, y - 25, CONTENT_W, 25, multiline=True)
    y -= 54
    _text_field(c, 'wca_required_announcements', 'Required announcements and the exact facts or names to include', MARGIN, y - 34, CONTENT_W, 34, multiline=True)
    y -= 66
    _text_field(c, 'wca_do_not_announce', 'Announcements, jokes, topics, titles, or personal details that must not be used', MARGIN, y - 34, CONTENT_W, 34, multiline=True)
    y -= 66
    _text_field(c, 'wca_language', 'Language, translation, cultural, religious, or family-tradition guidance', MARGIN, y - 32, CONTENT_W, 32, multiline=True)
    y -= 64

    y = _section(c, 'Timeline authority and change control', y)
    _text_field(c, 'wca_authorized_changes', 'Person(s) authorized to approve timeline, announcement, or music changes on event day', MARGIN, y - 27, CONTENT_W, 27, multiline=True, required=True)
    y -= 57
    _text_field(c, 'wca_change_process', 'How last-minute changes should be communicated to the DJ', MARGIN, y - 26, CONTENT_W, 26, multiline=True)
    y -= 56
    _choice_row(c, 'wca_requests', 'Guest requests:', MARGIN, y, ['Welcome', 'Screened by DJ', 'Client approval required', 'Not accepted'])
    y -= 36

    y = _section(c, 'Final review', y)
    _checkbox(c, 'wca_names_confirmed', 'Names and pronunciations have been reviewed for accuracy.', MARGIN, y)
    y -= 23
    _checkbox(c, 'wca_order_confirmed', 'Entrance order and major cue sequence have been reviewed.', MARGIN, y)
    y -= 23
    _checkbox(c, 'wca_music_confirmed', 'Featured songs and media sources have been identified.', MARGIN, y)
    y -= 23
    _checkbox(c, 'wca_authority_confirmed', 'The authorized day-of decision-maker has been identified.', MARGIN, y)
    y -= 35
    _text_field(c, 'wca_client_reviewed_by', 'Reviewed by client / planner', MARGIN, y - 20, 250)
    _text_field(c, 'wca_review_date', 'Review date', MARGIN + 266, y - 20, 120)
    _text_field(c, 'wca_dj_review', 'DJ review / initials', MARGIN + 402, y - 20, 126)
    y -= 58
    _paragraph(c, 'This addendum supplements event-planning information. It does not reserve a date or modify pricing, equipment, staffing, performance time, cancellation terms, or other contractual obligations unless DJ Phelix confirms the change in writing.', MARGIN, y, CONTENT_W, 7.4, 9)
    c.save()
    return path


def generate_one_sheet() -> Path:
    path = OUTPUT_DIR / 'DJ_Phelix_One_Sheet.pdf'
    c = canvas.Canvas(str(path), pagesize=letter)
    _set_metadata(c, 'DJ Phelix One-Sheet', 'Public contact and service overview for clients, planners, and venues.')

    c.setFillColor(BRAND_DARK)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(BRAND_VIOLET)
    c.circle(PAGE_W + 10, PAGE_H - 40, 185, fill=1, stroke=0)
    c.setFillColor(BRAND_PINK)
    c.circle(PAGE_W + 45, PAGE_H - 10, 126, fill=1, stroke=0)
    c.setFillColor(BRAND_YELLOW)
    c.rect(0, PAGE_H - 10, PAGE_W, 10, fill=1, stroke=0)

    _draw_logo(c, MARGIN, PAGE_H - 210, 150)
    c.setFillColor(PAPER)
    c.setFont('Helvetica-Bold', 31)
    c.drawString(215, PAGE_H - 92, 'DJ PHELIX')
    c.setFont('Helvetica-Bold', 12)
    c.setFillColor(BRAND_PINK)
    c.drawString(218, PAGE_H - 116, 'PROFESSIONAL DJ, MC & EVENT PRODUCTION')
    c.setFont('Helvetica', 10)
    c.setFillColor(HexColor('#d7c9d9'))
    c.drawString(218, PAGE_H - 139, 'Cape Cod, the South Shore, and the corridor to Boston')
    _paragraph(c, 'A flexible event partner for weddings, private and corporate events, nightlife, karaoke, audio/visual support, event lighting, and live event recording.', 218, PAGE_H - 166, 344, 9, 12)

    y = PAGE_H - 250
    c.setFillColor(PAPER)
    c.setFont('Helvetica-Bold', 13)
    c.drawString(MARGIN, y, 'SERVICES')
    c.setFillColor(BRAND_PINK)
    c.rect(MARGIN, y - 7, 42, 2, fill=1, stroke=0)
    services = [
        'Wedding DJ & MC',
        'Private & corporate events',
        'Nightlife & themed events',
        'Karaoke hosting',
        'Audio / visual setup',
        'Event lighting',
        'Live band & event recording',
    ]
    y -= 31
    for index, service in enumerate(services):
        col = 0 if index < 4 else 1
        row = index if index < 4 else index - 4
        x = MARGIN + col * 257
        yy = y - row * 31
        c.setFillColor(BRAND_PINK if col == 0 else BRAND_VIOLET)
        c.circle(x + 4, yy + 3, 3.2, fill=1, stroke=0)
        c.setFillColor(PAPER)
        c.setFont('Helvetica-Bold', 9.5)
        c.drawString(x + 16, yy, service)

    panel_y = 280
    c.setFillColor(BRAND_SURFACE)
    c.roundRect(MARGIN, panel_y, CONTENT_W, 118, 7, fill=1, stroke=0)
    c.setFillColor(PAPER)
    c.setFont('Helvetica-Bold', 13)
    c.drawString(MARGIN + 20, panel_y + 91, 'CLIENT, PLANNER & VENUE RESOURCES')
    c.setFillColor(HexColor('#c9bacd'))
    c.setFont('Helvetica', 9)
    resource_lines = [
        'Fillable event, music, wedding-cue, and venue-advance worksheets',
        'Public sample agreement for review before individualized terms are issued',
        'Private W-9 and vendor-onboarding requests reviewed before release',
        'Downloadable contact cards and direct booking contact options',
    ]
    yy = panel_y + 66
    for line in resource_lines:
        c.setFillColor(BRAND_YELLOW)
        c.rect(MARGIN + 21, yy + 2, 7, 2, fill=1, stroke=0)
        c.setFillColor(HexColor('#d7c9d9'))
        c.drawString(MARGIN + 38, yy, line)
        yy -= 20

    qr = ASSET_ROOT / 'images' / 'contact' / 'website-contact-qr.png'
    qr_size = 118
    if qr.exists():
        c.setFillColor(PAPER)
        c.roundRect(PAGE_W - MARGIN - qr_size - 14, 82, qr_size + 28, qr_size + 46, 7, fill=1, stroke=0)
        c.drawImage(ImageReader(str(qr)), PAGE_W - MARGIN - qr_size, 113, width=qr_size, height=qr_size, preserveAspectRatio=True, mask='auto')
        c.setFillColor(INK)
        c.setFont('Helvetica-Bold', 7.5)
        c.drawCentredString(PAGE_W - MARGIN - qr_size / 2, 97, 'SCAN FOR CONTACT & RESOURCES')

    c.setFillColor(PAPER)
    c.setFont('Helvetica-Bold', 13)
    c.drawString(MARGIN, 238, 'CONTACT')
    c.setFillColor(BRAND_PINK)
    c.rect(MARGIN, 231, 42, 2, fill=1, stroke=0)

    contact_y = 202
    c.setFillColor(HexColor('#d7c9d9'))
    c.setFont('Helvetica', 10)
    c.drawString(MARGIN, contact_y, PHONE)
    c.drawString(MARGIN, contact_y - 25, EMAIL)
    c.drawString(MARGIN, contact_y - 50, WEBSITE)
    c.setFont('Helvetica-Bold', 8)
    c.setFillColor(BRAND_YELLOW)
    c.drawString(MARGIN, contact_y - 81, 'TEXTING PREFERRED. CALL IF A PROMPT RESPONSE IS NEEDED.')

    c.setFillColor(HexColor('#d7c9d9'))
    c.setFont('Helvetica', 8.4)
    c.drawString(MARGIN, 66, 'Instagram: @eazy_phe   |   Digital contact card: dot.cards/phe')
    c.setFillColor(BRAND_PINK)
    c.setFont('Helvetica-Bold', 8)
    c.drawString(MARGIN, 45, 'PRIVATE TAX, BANKING, SIGNED-CONTRACT, AND INSURANCE RECORDS ARE NEVER PUBLIC DOWNLOADS.')
    c.setFillColor(HexColor('#9e8fa3'))
    c.setFont('Helvetica', 7.2)
    c.drawString(MARGIN, 24, f'Document DP-ONE  |  Version {VERSION}  |  Revised {REVISION}')
    c.save()
    return path


def generate_resource_documents() -> list[Path]:
    outputs = [
        generate_venue_advance(),
        generate_milestone_checklist(),
        generate_wedding_addendum(),
        generate_one_sheet(),
    ]
    for output in outputs:
        print(f'Generated {output}')
    return outputs


if __name__ == '__main__':
    generate_resource_documents()
