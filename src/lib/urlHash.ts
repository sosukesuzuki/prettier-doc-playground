import {
  decompressFromEncodedURIComponent,
  compressToEncodedURIComponent,
} from "lz-string";

type HashState = {
  source?: string;
};

export function read(): HashState {
  const hash = document.location.hash.slice(1);
  if (!hash) {
    return { source: undefined };
  }
  const decoded = decompressFromEncodedURIComponent(hash);
  if (!decoded) {
    return { source: undefined };
  }
  try {
    return JSON.parse(decoded);
  } catch (error) {
    return { source: undefined };
  }
}

export function replace(state: HashState): void {
  const hash = compressToEncodedURIComponent(JSON.stringify(state));
  location.hash = hash;
}
