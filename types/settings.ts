export type LayoutStyle = "grid" | "list"
export type LayoutOrder = "AZ" | "ZA" | "none"
export type LayoutStatus = "complete" | "incomplete" | "none"
export type LayoutPriority = "high" | "medium" | "low" | "none"
export type LayoutAscDesc  = "asc" | "desc"

export interface Settings {
  layoutStyle: LayoutStyle
  layoutOrder: LayoutOrder 
  layoutStatus: LayoutStatus
  layoutPriority: LayoutPriority
  layoutAsc: boolean
}

export const defaultSettings: Settings = {
  layoutStyle: "grid",
  layoutOrder: "none",
  layoutStatus: "none",
  layoutPriority: "none",
  layoutAsc: true,
}

