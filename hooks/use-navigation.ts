"use client"
import { useNavigationContext, type NavigationContextType } from "../providers/navigation-provider"

export function useNavigation(): NavigationContextType {
  return useNavigationContext()
}
