"""src/ 를 public/ 으로 빌드한다.

- 글꼴: Pretendard 가변 글꼴에서 앱에 쓰는 글자 + 자주 쓰는 한글 2,350자만 잘라 woff2로 저장
- 그림: tools/imgs.json(웹 이미지 data URI)을 public/assets/img/*.webp 파일로 풀고, app.js의 IMG 표에 경로를 넣음
- 페이지: src/index.html(모바일), src/pc.html(PC)을 그대로 복사

실행: python3 tools/build.py   (pyftsubset 필요: pip install fonttools brotli)
"""
import base64, json, os, shutil, subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC, OUT, TOOLS = (os.path.join(ROOT, d) for d in ("src", "public", "tools"))
A = os.path.join(OUT, "assets")

shutil.rmtree(OUT, ignore_errors=True)
os.makedirs(os.path.join(A, "img"))
os.makedirs(os.path.join(A, "fonts"))

# 그림
imgs = json.load(open(os.path.join(TOOLS, "imgs.json")))

# 앱 아이콘(홈 화면에 추가할 때 쓰임): 굿모닝 이삭이를 연한 배경 위에
import io
from PIL import Image
def icon(size, scale, name):
    ch = Image.open(io.BytesIO(base64.b64decode(imgs["wave"].split(",", 1)[1]))).convert("RGBA")
    bg = Image.new("RGBA", (size, size), (234, 241, 255, 255))
    s_ = int(size * scale); r = min(s_ / ch.width, s_ / ch.height)
    ch = ch.resize((max(1, int(ch.width * r)), max(1, int(ch.height * r))), Image.LANCZOS)
    bg.alpha_composite(ch, ((size - ch.width) // 2, (size - ch.height) // 2 + int(size * 0.02)))
    bg.convert("RGB").save(os.path.join(OUT, name), optimize=True)
icon(192, 0.82, "icon-192.png"); icon(512, 0.82, "icon-512.png"); icon(512, 0.62, "icon-maskable.png"); icon(180, 0.8, "apple-touch-icon.png")
json.dump({"name": "DAILY BRIEFING", "short_name": "데일리 브리핑", "description": "내 분야 뉴스를 한곳에 모아 보는 하루 브리핑",
           "start_url": "/?src=home", "scope": "/", "display": "standalone", "background_color": "#F3F6FB", "theme_color": "#F3F6FB", "lang": "ko",
           "icons": [{"src": "/icon-192.png", "sizes": "192x192", "type": "image/png"}, {"src": "/icon-512.png", "sizes": "512x512", "type": "image/png"},
                     {"src": "/icon-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}]},
          open(os.path.join(OUT, "manifest.webmanifest"), "w"), ensure_ascii=False)
shutil.copy(os.path.join(SRC, "sw.js"), os.path.join(OUT, "sw.js"))
paths = {}
for key, uri in imgs.items():
    head, data = uri.split(",", 1)
    ext = "webp" if "webp" in head else "png"
    fn = f"{key}.{ext}"
    open(os.path.join(A, "img", fn), "wb").write(base64.b64decode(data))
    paths[key] = f"assets/img/{fn}"

css = open(os.path.join(SRC, "app.css")).read()
js = open(os.path.join(SRC, "app.js")).read()
pages = {n: open(os.path.join(SRC, n)).read() for n in ("index.html", "pc.html")}

# 글꼴
chars = set(css + js + "".join(pages.values()))
ks = "".join(bytes([a, b]).decode("euc-kr") for a in range(0xB0, 0xC9) for b in range(0xA1, 0xFF))
chars |= set(ks) | {chr(c) for c in range(0x20, 0x7F)} | set("·…“”‘’–—×✓→←↑↓•○□△◇☆※")
txt = os.path.join(TOOLS, ".chars.txt")
open(txt, "w").write("".join(sorted(chars)))
font = os.path.join(A, "fonts", "pretendard-sub.woff2")
subprocess.run(["pyftsubset", os.path.join(TOOLS, "PretendardVariable.woff2"), f"--text-file={txt}",
                "--flavor=woff2", "--layout-features=*", f"--output-file={font}"], check=True)
os.remove(txt)

open(os.path.join(A, "app.css"), "w").write(css.replace("__FONT__", "fonts/pretendard-sub.woff2"))
open(os.path.join(A, "app.js"), "w").write(js.replace("__IMGS__", json.dumps(paths, ensure_ascii=False)))
for n, h in pages.items():
    open(os.path.join(OUT, n), "w").write(h)

size = sum(os.path.getsize(os.path.join(d, f)) for d, _, fs in os.walk(OUT) for f in fs)
print(f"public/ 빌드 완료 · 그림 {len(paths)}장 · 글꼴 {os.path.getsize(font) // 1024}KB · 전체 {size // 1024}KB")
