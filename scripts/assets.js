export const MODULE_ID = "los-abuelos-de-la-justicia";
export const ASSET_MAP_PATH = `modules/${MODULE_ID}/assets/asset-map.json`;

let cachedAssetMap = null;

export async function loadAssetMap() {
  if (cachedAssetMap) return cachedAssetMap;
  const response = await fetch(ASSET_MAP_PATH);
  if (!response.ok) throw new Error(`No se pudo cargar ${ASSET_MAP_PATH}`);
  cachedAssetMap = await response.json();
  return cachedAssetMap;
}
