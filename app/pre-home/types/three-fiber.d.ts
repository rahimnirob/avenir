/// <reference types="@react-three/fiber" />

import { ThreeElements } from '@react-three/fiber'

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

// This is important - it makes this file a module
export {}