declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

interface Window {
  electronAPI?: {
    getFullscreenState: () => Promise<boolean>;
    setFullscreenState: (value: boolean) => Promise<boolean>;
    onFullscreenChanged: (callback: (isFullscreen: boolean) => void) => () => void;
  };
}
