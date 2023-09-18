import { Option } from "@/types";

export const initSelect = (
  regions: Option[],
  selectedRegion: string = ""
): Option =>
  regions.find((r) => r.value === selectedRegion) ?? { label: "", value: "" };
