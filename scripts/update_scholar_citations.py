#!/usr/bin/env python3
"""Update the Shields.io endpoint JSON for the Google Scholar citation badge."""

from __future__ import annotations

import json
import re
import urllib.error
import urllib.request
from pathlib import Path

SCHOLAR_ID = "obJPkcYAAAAJ"
PROFILE_URL = f"https://scholar.google.com/citations?user={SCHOLAR_ID}&hl=en"
OUTPUT_PATH = Path("assets/data/scholar-citations.json")


def fetch_total_citations() -> int:
    request = urllib.request.Request(
        PROFILE_URL,
        headers={
            "User-Agent": (
                "Mozilla/5.0 (X11; Linux x86_64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/124.0 Safari/537.36"
            ),
            "Accept-Language": "en-US,en;q=0.9",
        },
    )

    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            html = response.read().decode("utf-8", errors="replace")
    except urllib.error.URLError as exc:
        raise RuntimeError(f"Unable to fetch Google Scholar profile: {exc}") from exc

    # The first value in the Scholar metrics table is total citations.
    values = re.findall(r'<td class="gsc_rsb_std">\s*([\d,]+)\s*</td>', html)
    if not values:
        raise RuntimeError(
            "Google Scholar metrics were not found. The page layout may have changed "
            "or the request may have been rate-limited."
        )

    return int(values[0].replace(",", ""))


def main() -> None:
    citations = fetch_total_citations()
    payload = {
        "schemaVersion": 1,
        "label": "Google Scholar",
        "message": f"{citations} citations",
        "color": "4285F4",
        "namedLogo": "googlescholar",
    }

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Updated Google Scholar citations: {citations}")


if __name__ == "__main__":
    main()
