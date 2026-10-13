# Implementation Plan: Redesign & Re-Architect Product Detail Drawer

## User Feedback & Refinements (Completed)
1. **Tabs Cleanup**: Removed both the **Packaging** tab and the **Delivery & COD** tab from the drawer. With these removed, the drawer now presents a clean, uncluttered flow focused directly on the gift box details.
2. **Eliminated Repetitive Words**:
   - Removed "Cash on Delivery" from the image overlay.
   - Removed duplicate "Cash on Delivery" in the bottom-right footer and mobile specs, replacing them with concise delivery timeline and inspection guarantees ("Nationwide Express Delivery", "Inspected & Hand-Packed").
3. **Pill Tags vs. List De-duplication**:
   - The user noted: *"we are repeating the pills like we already have pills so we don't need the list"*.
   - Kept the clean, rounded pill tags (`product.items.map(...)`) and removed the duplicate itemized grid/list.

---

## Drawer Structure & Design Summary

### Desktop Viewport (≥ 768px)
- **Slide-In Right Drawer**: Clean backdrop blur, smooth spring entrance.
- **Hero Image**: 16:11 aspect ratio card with rounded corners, collection title, product name, price (no repeated COD overlay).
- **Description**: Tagline and complete box story.
- **Items Inside**: Single unified section featuring pill tags matching the homepage aesthetic.
- **Personalized Greeting Card**: Clean reminder of complimentary handwritten greeting card included.
- **Sticky Bottom Action Bar**: Total price, "Add to Bag", and "Checkout" actions with dispatch status.

### Mobile Viewport (< 768px)
- **Bottom Sheet Modal**: Rounded top corners (`rounded-t-3xl`), drag pill indicator.
- **Momentum Touch Scrolling**: Native iOS/Android elastic scroll with overscroll containment.
- **Items Inside**: Pill tags with expandable toggle for 8+ items.
- **Sticky Bottom Bar**: High-contrast, easy-to-tap CTA buttons.
