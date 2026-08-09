export const CUSTOM_CURSOR_LAYER_EVENT = "custom-cursor-layer-change";

export function setCustomCursorLayer(layer: HTMLElement | null) {
  window.dispatchEvent(
    new CustomEvent<HTMLElement | null>(CUSTOM_CURSOR_LAYER_EVENT, {
      detail: layer,
    }),
  );
}
