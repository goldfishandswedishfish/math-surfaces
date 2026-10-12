# Inline the precomputed sieve verdicts (node gen_sieve_table.js > sieve_table.json).
import os
html = html.replace("/*SIEVE_TABLE*/null", open(os.path.join(here, "sieve_table.json")).read().strip(), 1)
