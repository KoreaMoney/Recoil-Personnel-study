import { atom, selector } from "recoil";

export const minuteState = atom({
  key: "minutes",
  default: 0,
});

export const hourSelector = selector<number>({
  key: "hours",
  get: ({ get }) => {
    /**selector안에 atom넣기 
     * get을 사용하여 atom의 값을 selector에게 전달하기
     */
    const minutes = get(minuteState);
    return minutes / 60;
  },

  set: ({ set }, newValue) => {
    const minutes = Number(newValue) * 60;
    /**set함수는 2개의 인자를 가진다
     * 하나는 수정하고 싶은 recoil atom을 가져오고
     * 두번째는 새로운 값을 가져온다
     * set을 사용하여 selector의 속성으로 atom의 값을 set(설정)할 수 있다
     */
    set(minuteState, minutes);
  },
});
