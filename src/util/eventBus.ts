import mitt, { Emitter } from "mitt";

type Events = {
  name: string;
  payload?: object;
};

const emitter: Emitter<Events> = mitt<Events>();

export { emitter };
