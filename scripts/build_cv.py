"""Build the two-page portfolio CV from editable JSON using ReportLab."""
import argparse
import json
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output', type=Path, default=ROOT / 'public/cv/daniel-bodi-gil-cv.pdf')
parser.add_argument('--font-dir', type=Path, default=Path('C:/Windows/Fonts'))
args = parser.parse_args()
data = json.loads((ROOT / 'scripts/cv/content.json').read_text(encoding='utf-8'))
for name, filename in [('CV', 'arial.ttf'), ('CV-Bold', 'arialbd.ttf'), ('CV-Italic', 'ariali.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(args.font_dir / filename)))
pdfmetrics.registerFontFamily('CV', normal='CV', bold='CV-Bold', italic='CV-Italic', boldItalic='CV-Bold')

INK = colors.HexColor('#19202C')
MUTED = colors.HexColor('#505865')
ACCENT = colors.HexColor('#5143A5')
RULE = colors.HexColor('#DEDDE8')
styles = {
    'name': ParagraphStyle('Name', fontName='CV-Bold', fontSize=25, leading=28, textColor=INK, spaceAfter=5),
    'headline': ParagraphStyle('Headline', fontName='CV-Bold', fontSize=11.6, leading=15, textColor=ACCENT, spaceAfter=2),
    'specialism': ParagraphStyle('Specialism', fontName='CV', fontSize=9.6, leading=13, textColor=MUTED, spaceAfter=7),
    'contact': ParagraphStyle('Contact', fontName='CV', fontSize=8.5, leading=12, textColor=MUTED, spaceAfter=2),
    'section': ParagraphStyle('Section', fontName='CV-Bold', fontSize=10, leading=13, textColor=ACCENT, spaceBefore=12, spaceAfter=5, keepWithNext=True),
    'company': ParagraphStyle('Company', fontName='CV-Bold', fontSize=11.2, leading=14, textColor=INK, spaceBefore=6, spaceAfter=2, keepWithNext=True),
    'role': ParagraphStyle('Role', fontName='CV-Bold', fontSize=9.2, leading=12.5, textColor=MUTED, spaceAfter=4, keepWithNext=True),
    'body': ParagraphStyle('Body', fontName='CV', fontSize=9.4, leading=12.6, textColor=INK, spaceAfter=5, alignment=TA_LEFT),
    'intro': ParagraphStyle('Intro', fontName='CV-Italic', fontSize=9.2, leading=12.3, textColor=MUTED, spaceAfter=5),
    'bullet': ParagraphStyle('Bullet', fontName='CV', fontSize=9.3, leading=12.4, textColor=INK, leftIndent=10, firstLineIndent=0, bulletIndent=0, spaceAfter=4),
    'link': ParagraphStyle('Link', fontName='CV', fontSize=8.4, leading=11, textColor=ACCENT, spaceAfter=4),
    'continuation': ParagraphStyle('Continuation', fontName='CV-Bold', fontSize=12, leading=16, textColor=INK, spaceAfter=2),
}

def para(text, style='body'):
    return Paragraph(escape(text), styles[style])

def section(label):
    return para(label.upper(), 'section')

def role(entry):
    meta = f"{entry['role']} | {entry['period']}"
    if entry.get('note'):
        meta += f" | {entry['note']}"
    result = [KeepTogether([para(entry['company'], 'company'), para(meta, 'role'), para(entry['intro'], 'intro')])]
    result.extend(Paragraph(escape(item), styles['bullet'], bulletText='-') for item in entry['bullets'])
    if entry.get('link'):
        result.append(Paragraph(f'<link href="{escape(entry["link"])}" color="#5143A5">{escape(entry["link_label"])}</link>', styles['link']))
    return result

def page_chrome(canvas, doc):
    canvas.saveState()
    width, _ = A4
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(.5)
    canvas.line(doc.leftMargin, 35, width - doc.rightMargin, 35)
    canvas.setFont('CV', 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(doc.leftMargin, 23, 'Daniel Bodi Gil | danielbodigil.com')
    canvas.drawRightString(width - doc.rightMargin, 23, f'{doc.page} / 2')
    canvas.restoreState()

flow = [para(data['name'], 'name'), para(data['headline'], 'headline'), para(data['specialism'], 'specialism')]
flow.append(Paragraph(f'{escape(data["location"])} | {escape(data["phone"])} | <link href="mailto:{data["email"]}">{data["email"]}</link>', styles['contact']))
flow.append(Paragraph(f'<link href="https://{data["website"]}" color="#5143A5">{data["website"]}</link> | <link href="https://{data["linkedin"]}" color="#5143A5">{data["linkedin"]}</link>', styles['contact']))
flow.extend([section('Profile'), para(data['summary']), section('Core expertise'), para(data['competencies']), section('Experience')])
for entry in data['page_one_roles']:
    flow.extend(role(entry))
flow.extend([PageBreak(), para('Daniel Bodi Gil', 'continuation'), para('Product design, systems and engineering | Experience continued', 'specialism')])
for entry in data['page_two_roles']:
    flow.extend(role(entry))
flow.append(section('Earlier experience'))
flow.extend(para(item) for item in data['earlier_roles'])
flow.append(section('Education'))
flow.extend(para(item) for item in data['education'])
flow.extend([section('Languages'), para(data['languages'])])

args.output.parent.mkdir(parents=True, exist_ok=True)
doc = SimpleDocTemplate(str(args.output), pagesize=A4, leftMargin=43, rightMargin=43, topMargin=34, bottomMargin=47,
    title='Daniel Bodi Gil - Product Design, Design Systems & UX Engineering', author=data['name'],
    subject='Professional CV - updated September 2026', pageCompression=1)
doc.build(flow, onFirstPage=page_chrome, onLaterPages=page_chrome)
if doc.page != 2:
    raise RuntimeError(f'Expected two pages, generated {doc.page}; adjust layout before publishing.')
print(args.output)
