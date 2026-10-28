# Negros nursery — second October 2026 batch

Five Aquilaria crassna nursery photographs from Kabankalan City, Negros Occidental,
Philippines. Date: October 26, 2026, from the original camera stamps. All five
entries belong to the Nursery category. Titles and descriptions follow the user's
preference to omit the parenthetical common name.

Original JPEGs are preserved in `originals/`. Website JPEGs in `enhanced/` have the
bottom GPS overlay removed and have been enhanced with the built-in imagegen tool.
The obscured portions beneath the removed overlays are reconstructed image content.
Final PNG outputs are saved in `output/imagegen/negros-october-2026/`.

The same prompt was used separately for each photograph:

> Edit this documentary nursery photograph for the website. Remove the entire GPS/location overlay box along the bottom, including map inset, coordinates, date, location text, and GPS Map Camera badge. Restore a plausible continuation of the nearby nursery ground and grow bags ONLY in the obscured overlay area. Preserve the rest of the photograph as exactly as possible: same plants, leaves, stems, shade netting, bamboo supports, walkways, perspective and framing. Apply only subtle exposure correction, natural color balance, gentle noise reduction and sharpening; no dramatic lighting or added plants, no stylization. Keep the original aspect ratio. Do not add any text or overlays.

`manifest.json` records the Cloudinary URLs, captions, category, date, and location.
All public images use the edited Cloudinary copies. To upload and import the batch,
or import its existing manifest into another configured database, run:

```
npx tsx script/import_negros_october_2026_gallery.ts
```

The importer skips existing URLs, saves a backup before inserting records, and
verifies all pre-existing gallery records remain unchanged before committing.
No existing media is overwritten or deleted.
