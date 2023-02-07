import { atom } from "recoil";

/**여기에서 default는 기본값이 필요하기 때문에 사용된다. */
export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});
