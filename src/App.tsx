import React from "react";
import { useRecoilState } from "recoil";
import { hourSelector, minuteState } from "./atom";

const App = () => {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  /** useRecoilState에서 첫번째 item은 atom의 값이 거나 selector의 get함수의 값이라는 것을 기억해야한다*/
  const [hours, setHours] = useRecoilState(hourSelector);

  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };
  const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };
  return (
    <div>
      <input
        value={minutes}
        onChange={onMinutesChange}
        type="number"
        placeholder="Minutes"
      />
      <input
        onChange={onHoursChange}
        value={hours}
        type="number"
        placeholder="Hours"
      />
    </div>
  );
};

export default App;
