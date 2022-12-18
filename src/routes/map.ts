import L, { Marker } from "leaflet";
import type { SvelteComponent } from "svelte";

export function bindPopup(marker: Marker, createFn: (container: HTMLDivElement) => SvelteComponent) {
    let popupComponent: SvelteComponent | null = null;
    marker.bindPopup(() => {
      const container = L.DomUtil.create('div');
      popupComponent = createFn(container);
      return container;
    });
  
    marker.on('popupclose', () => {
      if(popupComponent) {
        const old = popupComponent;
        popupComponent = null;
        // Wait for the popup to completely fade out before destroying it.
        // Otherwise the fade out looks weird as the contents disappear too early.
        setTimeout(() => {
          old.$destroy();
        }, 500);
  
      }
    });
  }