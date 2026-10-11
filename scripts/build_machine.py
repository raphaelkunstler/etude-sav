"""Génère, à partir d'index.html :
- machine.html : démonstration, session ouverte et machine affichée ;
- maquette.html : navigation directe entre les étapes, échanges pré-remplis ;
- demo.html : navigation directe, mais tout se joue à la main, avec les voix et les délais réels.

Usage : python3 scripts/build_machine.py
À relancer après chaque modification d'index.html.
"""
from pathlib import Path

root = Path(__file__).resolve().parent.parent
src = (root / "index.html").read_text(encoding="utf-8")
marker = "\n<script>\n/* ======================= CONFIGURATION"
assert marker in src, "repère CONFIGURATION introuvable dans index.html"
out = src.replace(marker, "\n<script>window.__DEMO = true;</script>" + marker, 1)
out = out.replace("<title>Neolia Fibre</title>", "<title>Machine Neolia</title>", 1)
(root / "machine.html").write_text(out, encoding="utf-8")
mq = src.replace(marker, "\n<script>window.__MAQUETTE = true;</script>" + marker, 1)
mq = mq.replace("<title>Neolia Fibre</title>", "<title>Maquette Neolia</title>", 1)
(root / "maquette.html").write_text(mq, encoding="utf-8")
dm = src.replace(marker, "\n<script>window.__MANUEL = true;</script>" + marker, 1)
dm = dm.replace("<title>Neolia Fibre</title>", "<title>Démonstration Neolia</title>", 1)
(root / "demo.html").write_text(dm, encoding="utf-8")
print("machine.html, maquette.html et demo.html régénérés")
