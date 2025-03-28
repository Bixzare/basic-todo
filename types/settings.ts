
export type LayoutStyle = "grid" | "list"
export type LayoutOrder = "Az" | "priority" | "date"
export type LayoutAscDesc  = "asc" | "desc"

export interface Settings {
  layoutStyle: LayoutStyle
  layoutOrder: LayoutOrder | string
  layoutAsc: boolean
}

export const defaultSettings: Settings = {
  layoutStyle: "grid",
  layoutOrder: "none",
  layoutAsc: true,
}

