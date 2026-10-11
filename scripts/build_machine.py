"""Génère machine.html (démonstration : session ouverte, machine affichée) à partir d'index.html.

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
print("machine.html régénéré")
